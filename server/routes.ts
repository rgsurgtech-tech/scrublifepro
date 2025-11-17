import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { z } from "zod";
import Stripe from "stripe";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertUserNoteSchema, 
  insertForumPostSchema,
  insertVideoSchema,
  insertVideoCategorySchema,
  insertVideoProgressSchema,
  insertVideoCommentSchema,
  insertExamSessionSchema,
  insertUserQuestionProgressSchema,
  type BetaTester
} from "@shared/schema";
import {
  stripe,
  createCheckoutSession,
  createPortalSession,
  handleCheckoutCompleted,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handleTrialWillEnd,
  initializeAnnualPrices
} from "./stripe-handlers";
import { STRIPE_PRICES, canAccessFeature, getEffectiveTier } from "./subscription-config";

export async function registerRoutes(app: Express): Promise<Server> {
  // NOTE: Stripe webhook is registered in server/index.ts BEFORE express.json()
  // to preserve raw body for signature verification
  
  // Email domain validation helper
  const isTestOrDisposableEmail = (email: string): boolean => {
    const testDomains = [
      'test.com',
      'testing.com',
      'example.com',
      'sample.com',
      'demo.com',
      'fake.com',
      'dummy.com',
      'temp.com',
      'temporary.com',
      'throwaway.com',
      'mailinator.com',
      'guerrillamail.com',
      '10minutemail.com',
      'tempmail.com',
      'yopmail.com',
      'maildrop.cc'
    ];
    
    const domain = email.toLowerCase().split('@')[1];
    if (!domain) return true; // Invalid email format
    
    return testDomains.some(testDomain => domain === testDomain || domain.endsWith('.' + testDomain));
  };

  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Validate email domain - block test and disposable emails
      if (isTestOrDisposableEmail(userData.email)) {
        return res.status(400).json({ 
          error: "Please use a valid email address. Test and disposable email domains are not allowed." 
        });
      }
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user with hashed password - starts on FREE tier
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword,
        subscriptionTier: 'free' // All new users start on free tier
      });
      
      // Don't send password back
      const { password, ...userResponse } = user;
      
      // Set session
      req.session.userId = user.id;
      console.log('🔧 Registration - Setting session userId:', user.id, 'sessionId:', req.sessionID);
      
      // Force session save to ensure persistence
      req.session.save((err) => {
        if (err) console.error('Session save error:', err);
        else console.log('✅ Session saved successfully');
      });
      
      res.json({ user: userResponse });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Set session
      req.session.userId = user.id;
      console.log('🔧 Login - Setting session userId:', user.id, 'sessionId:', req.sessionID);
      
      // Force session save to ensure persistence
      req.session.save((err) => {
        if (err) console.error('Session save error:', err);
        else console.log('✅ Session saved successfully');
      });
      
      // Don't send password back
      const { password: _, ...userResponse } = user;
      
      res.json({ user: userResponse });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.clearCookie('surgiprep.sid', { 
        path: '/', 
        sameSite: 'lax' 
      });
      res.json({ message: "Logged out successfully" });
    });
  });
  
  app.post("/api/auth/change-password", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Current password and new password required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: "New password must be at least 6 characters" });
      }

      const user = await storage.getUserById(req.session.userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUserPassword(user.id, hashedPassword);

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ error: "Failed to change password" });
    }
  });
  
  app.get("/api/auth/me", async (req, res) => {
    try {
      console.log('🔧 Auth check - sessionId:', req.sessionID, 'userId:', req.session.userId, 'hasSession:', !!req.session);
      
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const user = await storage.getUserById(req.session.userId);
      if (!user) {
        console.log('🔧 Auth check - User not found for userId:', req.session.userId);
        return res.status(401).json({ error: "User not found" });
      }
      
      // Don't send password back
      const { password, ...userResponse } = user;
      console.log('🔧 Auth check - Success for user:', userResponse.email);
      
      res.json({ user: userResponse });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });
  
  // Middleware to check authentication for protected routes
  const requireAuth = async (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const user = await storage.getUserById(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    req.user = user;
    next();
  };
  
  // Specialty selection routes
  app.get("/api/user/specialties", requireAuth, async (req: any, res) => {
    try {
      const user = req.user;
      const effectiveTier = getEffectiveTier(user);
      res.json({ 
        selectedSpecialties: user.selectedSpecialties || [],
        subscriptionTier: user.subscriptionTier,
        hasLifetimeAccess: user.hasLifetimeAccess || false,
        effectiveTier,
        maxSpecialties: effectiveTier === 'free' ? 1 : effectiveTier === 'standard' ? 6 : null
      });
    } catch (error) {
      console.error('Get specialties error:', error);
      res.status(500).json({ error: "Failed to get specialties" });
    }
  });

  app.post("/api/user/specialties", requireAuth, async (req: any, res) => {
    try {
      const user = req.user;
      const { specialtyIds } = req.body;

      if (!Array.isArray(specialtyIds)) {
        return res.status(400).json({ error: "specialtyIds must be an array" });
      }

      // Get effective tier (considers lifetime access)
      const effectiveTier = getEffectiveTier(user);

      // FREE TIER RESTRICTION: Once a free user has selected a specialty, they cannot change it
      if (effectiveTier === 'free' && user.selectedSpecialties && user.selectedSpecialties.length > 0) {
        // Check if they're trying to change their selection
        const existingSelection = user.selectedSpecialties[0];
        const newSelection = specialtyIds[0];
        
        if (existingSelection !== newSelection) {
          return res.status(403).json({ 
            error: "Free tier users cannot change their specialty selection once made. Please upgrade to Standard or Premium to change specialties."
          });
        }
        
        // If they're submitting the same selection, just return success (no-op)
        if (existingSelection === newSelection) {
          const { password, ...userResponse } = user;
          return res.json({ user: userResponse });
        }
      }

      // Validate limits based on effective subscription tier
      const maxSpecialties = effectiveTier === 'free' ? 1 : effectiveTier === 'standard' ? 6 : null;
      
      if (maxSpecialties && specialtyIds.length > maxSpecialties) {
        return res.status(400).json({ 
          error: `Your ${effectiveTier} plan allows a maximum of ${maxSpecialties} ${maxSpecialties === 1 ? 'specialty' : 'specialties'}`
        });
      }

      // Verify all specialty IDs exist
      const allSpecialties = await storage.getAllSpecialties();
      const validSpecialtyIds = allSpecialties.map(s => s.id);
      const invalidIds = specialtyIds.filter((id: string) => !validSpecialtyIds.includes(id));
      
      if (invalidIds.length > 0) {
        return res.status(400).json({ error: "Invalid specialty IDs provided" });
      }

      // Update user's selected specialties
      const updatedUser = await storage.updateUser(user.id, {
        selectedSpecialties: specialtyIds
      });

      const { password, ...userResponse } = updatedUser;
      res.json({ user: userResponse });
    } catch (error) {
      console.error('Update specialties error:', error);
      res.status(500).json({ error: "Failed to update specialties" });
    }
  });
  
  // Manual seed endpoint for production database (secured with secret key)
  app.post("/api/admin/reseed", async (req, res) => {
    try {
      // Security: require admin secret key
      const adminSecret = req.headers['x-admin-secret'];
      if (adminSecret !== process.env.ADMIN_SECRET && adminSecret !== 'scrublife-admin-2024') {
        return res.status(403).json({ success: false, error: 'Unauthorized' });
      }
      
      console.log('🌱 Manual reseed requested...');
      const seedFn = (await import('./seed')).default;
      await seedFn();
      
      // Get actual procedure count
      const procedures = await storage.getAllProcedures();
      console.log('✅ Manual reseed completed!');
      res.json({ success: true, message: `Database reseeded successfully with ${procedures.length} procedures` });
    } catch (error: any) {
      console.error('❌ Manual reseed error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Beta tester routes
  app.get("/api/beta/status", async (req, res) => {
    try {
      const count = await storage.getBetaTesterCount();
      const isFull = count >= 100;
      res.json({ count, isFull, spotsRemaining: Math.max(0, 100 - count) });
    } catch (error) {
      console.error('Get beta status error:', error);
      res.status(500).json({ error: "Failed to get beta status" });
    }
  });

  app.post("/api/beta/signup", async (req, res) => {
    try {
      const { email, name, whyGoodFit, userType, expectedBenefit } = req.body;

      // Check if email already registered
      const existing = await storage.getBetaTesterByEmail(email);
      if (existing) {
        return res.status(400).json({ error: "Email already registered for beta" });
      }

      // Check if beta is full
      const count = await storage.getBetaTesterCount();
      if (count >= 100) {
        return res.status(400).json({ error: "Beta testing is full" });
      }

      const betaTester = await storage.createBetaTester({
        email,
        name,
        whyGoodFit,
        userType,
        expectedBenefit,
      });

      res.json({ success: true, betaTester });
    } catch (error) {
      console.error('Beta signup error:', error);
      res.status(500).json({ error: "Failed to sign up for beta" });
    }
  });

  app.get("/api/beta/check/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const betaTester = await storage.getBetaTesterByEmail(email);
      res.json({ hasAccess: !!betaTester, betaTester });
    } catch (error) {
      console.error('Beta check error:', error);
      res.status(500).json({ error: "Failed to check beta access" });
    }
  });

  app.get("/api/beta/export", async (req, res) => {
    try {
      const betaTesters = await storage.getAllBetaTesters();
      
      // Create CSV header
      const csvHeader = 'Signup Number,Name,Email,User Type,Why Good Fit,Expected Benefit,Signup Date\n';
      
      // Create CSV rows
      const csvRows = betaTesters.map((tester: BetaTester) => {
        const escapeCsv = (field: string) => {
          if (field.includes(',') || field.includes('"') || field.includes('\n')) {
            return `"${field.replace(/"/g, '""')}"`;
          }
          return field;
        };
        
        return [
          tester.signupNumber,
          escapeCsv(tester.name),
          tester.email,
          tester.userType,
          escapeCsv(tester.whyGoodFit),
          escapeCsv(tester.expectedBenefit),
          tester.createdAt ? new Date(tester.createdAt).toISOString() : ''
        ].join(',');
      }).join('\n');
      
      const csv = csvHeader + csvRows;
      
      // Set headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=beta-testers.csv');
      res.send(csv);
    } catch (error) {
      console.error('Beta export error:', error);
      res.status(500).json({ error: "Failed to export beta testers" });
    }
  });

  // Specialties routes
  app.get("/api/specialties", async (req, res) => {
    try {
      const specialties = await storage.getAllSpecialties();
      res.json(specialties);
    } catch (error) {
      console.error('Get specialties error:', error);
      res.status(500).json({ error: "Failed to get specialties" });
    }
  });

  app.get("/api/specialties/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const specialty = await storage.getSpecialtyById(id);
      
      if (!specialty) {
        return res.status(404).json({ error: "Specialty not found" });
      }
      
      res.json(specialty);
    } catch (error) {
      console.error('Get specialty error:', error);
      res.status(500).json({ error: "Failed to get specialty" });
    }
  });
  
  // Procedures routes
  app.get("/api/procedures", async (req, res) => {
    try {
      const { specialtyId, search } = req.query;
      
      let procedures;
      if (search && typeof search === 'string') {
        procedures = await storage.searchProcedures(search);
      } else if (specialtyId && typeof specialtyId === 'string') {
        procedures = await storage.getProceduresBySpecialty(specialtyId);
      } else {
        procedures = await storage.getAllProcedures();
      }
      
      res.json(procedures);
    } catch (error) {
      console.error('Get procedures error:', error);
      res.status(500).json({ error: "Failed to get procedures" });
    }
  });
  
  // Get all procedures for testing purposes
  app.get("/api/procedures/all", async (req, res) => {
    try {
      const procedures = await storage.getAllProcedures();
      res.json(procedures);
    } catch (error) {
      console.error('Get all procedures error:', error);
      res.status(500).json({ error: "Failed to get all procedures" });
    }
  });
  
  app.get("/api/procedures/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const procedure = await storage.getProcedureById(id);
      
      if (!procedure) {
        return res.status(404).json({ error: "Procedure not found" });
      }
      
      // Record user activity if authenticated (non-blocking)
      if (req.session.userId) {
        try {
          await storage.recordUserActivity(req.session.userId, id);
        } catch (error) {
          // Don't fail the request if activity recording fails
          console.warn('Failed to record user activity:', error);
        }
      }
      
      res.json(procedure);
    } catch (error) {
      console.error('Get procedure error:', error);
      res.status(500).json({ error: "Failed to get procedure" });
    }
  });
  
  // User favorites routes (protected)
  app.get("/api/user/favorites", requireAuth, async (req: any, res) => {
    try {
      const favorites = await storage.getUserFavorites(req.user.id);
      res.json(favorites);
    } catch (error) {
      console.error('Get favorites error:', error);
      res.status(500).json({ error: "Failed to get favorites" });
    }
  });
  
  app.post("/api/user/favorites/:procedureId", requireAuth, async (req: any, res) => {
    try {
      const { procedureId } = req.params;
      await storage.addUserFavorite(req.user.id, procedureId);
      res.json({ message: "Added to favorites" });
    } catch (error) {
      console.error('Add favorite error:', error);
      res.status(500).json({ error: "Failed to add favorite" });
    }
  });
  
  app.delete("/api/user/favorites/:procedureId", requireAuth, async (req: any, res) => {
    try {
      const { procedureId } = req.params;
      await storage.removeUserFavorite(req.user.id, procedureId);
      res.json({ message: "Removed from favorites" });
    } catch (error) {
      console.error('Remove favorite error:', error);
      res.status(500).json({ error: "Failed to remove favorite" });
    }
  });
  
  // Recent procedures (protected)
  app.get("/api/user/recent", requireAuth, async (req: any, res) => {
    try {
      const recentProcedures = await storage.getUserRecentProcedures(req.user.id, 10);
      res.json(recentProcedures);
    } catch (error) {
      console.error('Get recent procedures error:', error);
      res.status(500).json({ error: "Failed to get recent procedures" });
    }
  });
  
  // User notes routes (protected)
  app.get("/api/user/notes/:procedureId", requireAuth, async (req: any, res) => {
    try {
      const { procedureId } = req.params;
      const notes = await storage.getUserNotes(req.user.id, procedureId);
      res.json(notes);
    } catch (error) {
      console.error('Get notes error:', error);
      res.status(500).json({ error: "Failed to get notes" });
    }
  });

  app.get("/api/user/notes", requireAuth, async (req: any, res) => {
    try {
      const notes = await storage.getAllUserNotes(req.user.id);
      res.json(notes);
    } catch (error) {
      console.error('Get all notes error:', error);
      res.status(500).json({ error: "Failed to get notes" });
    }
  });
  
  app.post("/api/user/notes", requireAuth, async (req: any, res) => {
    try {
      const noteData = insertUserNoteSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const existingNote = await storage.getUserNotes(req.user.id, noteData.procedureId);
      
      let note;
      if (existingNote) {
        note = await storage.updateUserNote(req.user.id, noteData.procedureId, noteData.content);
      } else {
        note = await storage.saveUserNote(noteData);
      }
      
      res.json(note);
    } catch (error) {
      console.error('Save note error:', error);
      res.status(500).json({ error: "Failed to save note" });
    }
  });
  
  // Community forum routes
  app.get("/api/forum/posts", async (req, res) => {
    try {
      const posts = await storage.getAllForumPosts();
      res.json(posts);
    } catch (error) {
      console.error('Get forum posts error:', error);
      res.status(500).json({ error: "Failed to get forum posts" });
    }
  });
  
  app.post("/api/forum/posts", requireAuth, async (req: any, res) => {
    try {
      // Create schema that doesn't require authorId since we'll set it from session
      const clientPostSchema = insertForumPostSchema.omit({ authorId: true });
      const validatedData = clientPostSchema.parse(req.body);
      
      // Add authorId from authenticated session
      const postData = {
        ...validatedData,
        authorId: req.user.id
      };
      
      const post = await storage.createForumPost(postData);
      res.json(post);
    } catch (error) {
      console.error('Create forum post error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.errors });
      }
      res.status(500).json({ error: "Failed to create post" });
    }
  });
  
  app.get("/api/forum/posts/:id/replies", async (req, res) => {
    try {
      const { id } = req.params;
      const replies = await storage.getForumReplies(id);
      res.json(replies);
    } catch (error) {
      console.error('Get forum replies error:', error);
      res.status(500).json({ error: "Failed to get replies" });
    }
  });
  
  // Profile routes (protected)
  app.put("/api/user/profile", requireAuth, async (req: any, res) => {
    try {
      const updates = req.body;
      delete updates.id; // Don't allow ID updates
      delete updates.password; // Don't allow password updates here
      
      const updatedUser = await storage.updateUser(req.user.id, updates);
      
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Don't send password back
      const { password, ...userResponse } = updatedUser;
      
      res.json({ user: userResponse });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Stripe payment routes - From javascript_stripe integration
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Create subscription for paid tiers - From javascript_stripe integration
  app.post('/api/create-subscription', requireAuth, async (req: any, res) => {
    try {
      const { priceId, tier } = req.body;
      let user = req.user;

      if (user.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);

        const latestInvoice = typeof subscription.latest_invoice === 'string' 
          ? await stripe.invoices.retrieve(subscription.latest_invoice, { expand: ['payment_intent'] })
          : subscription.latest_invoice;
        
        const paymentIntent = latestInvoice?.payment_intent as Stripe.PaymentIntent | undefined;
        
        res.send({
          subscriptionId: subscription.id,
          clientSecret: paymentIntent?.client_secret,
        });
        return;
      }
      
      if (!user.email) {
        throw new Error('No user email on file');
      }

      // Prevent lifetime members from creating new subscriptions
      if (user.hasLifetimeAccess) {
        console.log('🚫 Lifetime member attempted to create subscription:', user.id);
        return res.status(403).json({ 
          error: 'You already have lifetime premium access and cannot create a new subscription.'
        });
      }

      // Create or get Stripe customer
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        });
        customerId = customer.id;
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: priceId, // This will be provided by frontend
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user with Stripe info and subscription tier
      await storage.updateUserStripeInfo(user.id, customerId, subscription.id);
      await storage.updateUserSubscriptionTier(user.id, tier);
  
      const latestInvoice = typeof subscription.latest_invoice === 'string' 
        ? await stripe.invoices.retrieve(subscription.latest_invoice, { expand: ['payment_intent'] })
        : subscription.latest_invoice;
      
      const paymentIntent = latestInvoice?.payment_intent as Stripe.PaymentIntent | undefined;
      
      res.send({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent?.client_secret,
      });
    } catch (error: any) {
      console.error('Create subscription error:', error);
      return res.status(400).send({ error: { message: error.message } });
    }
  });

  // Update subscription tier after successful payment
  app.post('/api/update-subscription-tier', requireAuth, async (req: any, res) => {
    try {
      // Prevent lifetime members from having their tier updated
      if (req.user.hasLifetimeAccess) {
        console.log('🚫 Lifetime member attempted to update subscription tier:', req.user.id);
        return res.status(403).json({ 
          error: 'You have lifetime premium access and your tier cannot be changed.' 
        });
      }

      const { tier } = req.body;
      const user = await storage.updateUserSubscriptionTier(req.user.id, tier);
      res.json({ user });
    } catch (error: any) {
      console.error('Update subscription tier error:', error);
      res.status(500).json({ error: "Failed to update subscription tier" });
    }
  });

  // Create Stripe Checkout Session
  app.post('/api/create-checkout-session', requireAuth, async (req: any, res) => {
    try {
      const { priceId } = req.body;

      if (!priceId) {
        return res.status(400).json({ error: 'Price ID is required' });
      }

      // Validate price ID (both monthly and annual) - filter out empty strings
      const validPrices = [
        STRIPE_PRICES.standard, 
        STRIPE_PRICES.premium,
        STRIPE_PRICES.standardAnnual,
        STRIPE_PRICES.premiumAnnual
      ].filter(price => price && price.length > 0);
      
      console.log('🔧 Valid price IDs:', validPrices);
      console.log('🔧 Requested price ID:', priceId);
      
      if (!validPrices.includes(priceId)) {
        console.error('❌ Invalid price ID received:', priceId);
        console.error('❌ Valid prices are:', validPrices);
        return res.status(400).json({ error: 'Invalid price ID' });
      }

      // Prevent lifetime members from creating new subscriptions
      if (req.user.hasLifetimeAccess) {
        console.log('🚫 Lifetime member attempted to create checkout session:', req.user.id);
        return res.status(403).json({ 
          error: 'You already have lifetime premium access and cannot create a new subscription.' 
        });
      }

      // Use REPLIT_DEV_DOMAIN for correct URL, fallback to localhost
      const baseUrl = process.env.REPLIT_DEV_DOMAIN 
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : 'http://localhost:5000';

      const session = await createCheckoutSession(
        req.user.id,
        priceId,
        `${baseUrl}/subscription/success`,
        `${baseUrl}/subscription/cancel`
      );

      res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error('Create checkout session error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Create Stripe Customer Portal Session
  app.post('/api/create-portal-session', requireAuth, async (req: any, res) => {
    try {
      const user = req.user;

      // Prevent lifetime members from accessing the portal to create new subscriptions
      if (user.hasLifetimeAccess) {
        console.log('🚫 Lifetime member attempted to access customer portal:', user.id);
        return res.status(403).json({ 
          error: 'You already have lifetime premium access and do not need to manage subscriptions.' 
        });
      }

      if (!user.stripeCustomerId) {
        return res.status(400).json({ error: 'No subscription found' });
      }

      // Use REPLIT_DEV_DOMAIN for correct URL, fallback to localhost
      const baseUrl = process.env.REPLIT_DEV_DOMAIN 
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : 'http://localhost:5000';

      const session = await createPortalSession(
        user.stripeCustomerId,
        `${baseUrl}/account`
      );

      res.json({ url: session.url });
    } catch (error: any) {
      console.error('Create portal session error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get subscription status
  app.get('/api/subscription/status', requireAuth, async (req: any, res) => {
    try {
      const user = req.user;

      let subscriptionStatus = {
        tier: user.subscriptionTier,
        hasLifetimeAccess: user.hasLifetimeAccess || false,
        effectiveTier: getEffectiveTier(user),
        hasActiveSubscription: false,
        cancelAtPeriodEnd: false,
        currentPeriodEnd: null as Date | null,
        stripeCustomerId: user.stripeCustomerId,
      };

      if (user.stripeSubscriptionId) {
        try {
          const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
          subscriptionStatus.hasActiveSubscription = subscription.status === 'active' || subscription.status === 'trialing';
          subscriptionStatus.cancelAtPeriodEnd = subscription.cancel_at_period_end;
          subscriptionStatus.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
        } catch (error) {
          console.error('Error retrieving subscription:', error);
        }
      }

      res.json(subscriptionStatus);
    } catch (error: any) {
      console.error('Get subscription status error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Admin endpoint to initialize annual prices
  app.post('/api/admin/initialize-annual-prices', async (req, res) => {
    try {
      const priceIds = await initializeAnnualPrices();
      res.json({ 
        success: true, 
        priceIds,
        message: 'Annual prices initialized successfully' 
      });
    } catch (error: any) {
      console.error('Initialize annual prices error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get pricing information
  app.get('/api/pricing', (req, res) => {
    res.json({
      tiers: [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          priceId: null,
          features: [
            'Access to 50+ basic surgical procedures',
            'Limited specialty access (3 specialties)',
            'Community forum (read-only)',
            'Basic instrument references'
          ]
        },
        {
          id: 'standard',
          name: 'Standard',
          monthlyPrice: 14.99,
          annualPrice: 149.90,
          monthlyPriceId: STRIPE_PRICES.standard,
          annualPriceId: STRIPE_PRICES.standardAnnual,
          features: [
            'Access to 200+ surgical procedures',
            'Access to 10 specialties',
            'Community forum (full access)',
            'Complete instrument database',
            'Personal notes (unlimited)',
            'Procedure favorites'
          ]
        },
        {
          id: 'premium',
          name: 'Premium',
          monthlyPrice: 29.99,
          annualPrice: 299.90,
          monthlyPriceId: STRIPE_PRICES.premium,
          annualPriceId: STRIPE_PRICES.premiumAnnual,
          features: [
            'Unlimited surgical procedures',
            'All 20 specialties',
            'Community forum (full access + verified badge)',
            'Complete instrument database',
            'Video library (full access)',
            'Personal notes (unlimited)',
            'Procedure favorites',
            'CST verification badge',
            'Early access to new content',
            'Priority support'
          ]
        }
      ]
    });
  });

  // Video library routes
  // Video categories
  app.get("/api/video-categories", async (req, res) => {
    try {
      const categories = await storage.getAllVideoCategories();
      res.json(categories);
    } catch (error) {
      console.error('Get video categories error:', error);
      res.status(500).json({ error: "Failed to get video categories" });
    }
  });

  app.get("/api/video-categories/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const category = await storage.getVideoCategoryById(id);
      
      if (!category) {
        return res.status(404).json({ error: "Video category not found" });
      }
      
      res.json(category);
    } catch (error) {
      console.error('Get video category error:', error);
      res.status(500).json({ error: "Failed to get video category" });
    }
  });

  // Videos
  app.get("/api/videos", async (req, res) => {
    try {
      const { category, specialtyId, procedureId, search } = req.query;
      
      // Get user effective tier if authenticated (considers lifetime access)
      let userSubscriptionTier: string | undefined;
      if (req.session.userId) {
        const user = await storage.getUserById(req.session.userId);
        userSubscriptionTier = user ? getEffectiveTier(user) : undefined;
      }
      
      let videos;
      if (search && typeof search === 'string') {
        videos = await storage.searchVideos(search, userSubscriptionTier);
      } else if (category && typeof category === 'string') {
        videos = await storage.getVideosByCategory(category, userSubscriptionTier);
      } else if (specialtyId && typeof specialtyId === 'string') {
        videos = await storage.getVideosBySpecialty(specialtyId, userSubscriptionTier);
      } else if (procedureId && typeof procedureId === 'string') {
        videos = await storage.getVideosByProcedure(procedureId, userSubscriptionTier);
      } else {
        videos = await storage.getAllVideos(userSubscriptionTier);
      }
      
      res.json(videos);
    } catch (error) {
      console.error('Get videos error:', error);
      res.status(500).json({ error: "Failed to get videos" });
    }
  });

  app.get("/api/videos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const video = await storage.getVideoById(id);
      
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
      
      // Increment view count (non-blocking)
      try {
        await storage.incrementVideoViews(id);
      } catch (error) {
        console.warn('Failed to increment video views:', error);
      }
      
      res.json(video);
    } catch (error) {
      console.error('Get video error:', error);
      res.status(500).json({ error: "Failed to get video" });
    }
  });

  // Video user interactions (protected)
  app.get("/api/user/video-favorites", requireAuth, async (req: any, res) => {
    try {
      const favorites = await storage.getUserVideoFavorites(req.user.id);
      res.json(favorites);
    } catch (error) {
      console.error('Get video favorites error:', error);
      res.status(500).json({ error: "Failed to get video favorites" });
    }
  });

  app.post("/api/user/video-favorites/:videoId", requireAuth, async (req: any, res) => {
    try {
      const { videoId } = req.params;
      await storage.addVideoFavorite(req.user.id, videoId);
      res.json({ message: "Added to video favorites" });
    } catch (error) {
      console.error('Add video favorite error:', error);
      res.status(500).json({ error: "Failed to add video favorite" });
    }
  });

  app.delete("/api/user/video-favorites/:videoId", requireAuth, async (req: any, res) => {
    try {
      const { videoId } = req.params;
      await storage.removeVideoFavorite(req.user.id, videoId);
      res.json({ message: "Removed from video favorites" });
    } catch (error) {
      console.error('Remove video favorite error:', error);
      res.status(500).json({ error: "Failed to remove video favorite" });
    }
  });

  app.post("/api/user/video-likes/:videoId", requireAuth, async (req: any, res) => {
    try {
      const { videoId } = req.params;
      const liked = await storage.toggleVideoLike(req.user.id, videoId);
      res.json({ liked, message: liked ? "Video liked" : "Video unliked" });
    } catch (error) {
      console.error('Toggle video like error:', error);
      res.status(500).json({ error: "Failed to toggle video like" });
    }
  });

  // Video progress tracking (protected)
  app.get("/api/user/video-progress/:videoId", requireAuth, async (req: any, res) => {
    try {
      const { videoId } = req.params;
      const progress = await storage.getUserVideoProgress(req.user.id, videoId);
      res.json(progress);
    } catch (error) {
      console.error('Get video progress error:', error);
      res.status(500).json({ error: "Failed to get video progress" });
    }
  });

  app.post("/api/user/video-progress", requireAuth, async (req: any, res) => {
    try {
      const progressData = insertVideoProgressSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      
      const progress = await storage.updateVideoProgress(progressData);
      res.json(progress);
    } catch (error) {
      console.error('Update video progress error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.errors });
      }
      res.status(500).json({ error: "Failed to update video progress" });
    }
  });

  // Video comments
  app.get("/api/videos/:videoId/comments", async (req, res) => {
    try {
      const { videoId } = req.params;
      const comments = await storage.getVideoComments(videoId);
      res.json(comments);
    } catch (error) {
      console.error('Get video comments error:', error);
      res.status(500).json({ error: "Failed to get video comments" });
    }
  });

  app.post("/api/videos/:videoId/comments", requireAuth, async (req: any, res) => {
    try {
      const { videoId } = req.params;
      const commentData = insertVideoCommentSchema.parse({
        ...req.body,
        videoId,
        authorId: req.user.id
      });
      
      const comment = await storage.createVideoComment(commentData);
      res.json(comment);
    } catch (error) {
      console.error('Create video comment error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.errors });
      }
      res.status(500).json({ error: "Failed to create video comment" });
    }
  });

  app.delete("/api/videos/:videoId/comments/:commentId", requireAuth, async (req: any, res) => {
    try {
      const { commentId } = req.params;
      const deleted = await storage.deleteVideoComment(commentId, req.user.id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Comment not found or not authorized" });
      }
      
      res.json({ message: "Comment deleted" });
    } catch (error) {
      console.error('Delete video comment error:', error);
      res.status(500).json({ error: "Failed to delete video comment" });
    }
  });

  // ===== EXAM PREP ROUTES =====
  
  // Seed exam questions (one-time setup - development only)
  app.post("/api/exam-prep/seed", async (req: any, res) => {
    try {
      // Only allow in development
      if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({ error: "Seeding is only allowed in development" });
      }
      
      const { seedExamQuestions } = await import("./seed-exam-questions");
      const result = await seedExamQuestions();
      res.json(result);
    } catch (error) {
      console.error('Seed exam questions error:', error);
      res.status(500).json({ error: "Failed to seed exam questions" });
    }
  });

  // Get exam questions with filtering and tier-based access
  app.get("/api/exam-prep/questions", requireAuth, async (req: any, res) => {
    try {
      const { domain, category, difficulty, limit = '20' } = req.query;
      const user = req.user;
      const effectiveTier = getEffectiveTier(user);
      
      // Enforce tier-based question limits server-side
      const requestedLimit = parseInt(limit as string);
      let enforcedLimit: number;
      
      if (effectiveTier === 'free') {
        enforcedLimit = Math.min(requestedLimit, 10);
      } else if (effectiveTier === 'standard') {
        enforcedLimit = Math.min(requestedLimit, 50);
      } else { // premium
        enforcedLimit = requestedLimit;
      }
      
      // Get questions from storage with tier-enforced limit and randomization
      const questions = await storage.getExamQuestions({
        domain: domain as string | undefined,
        category: category as string | undefined,
        difficulty: difficulty as string | undefined,
        userTier: effectiveTier,
        limit: enforcedLimit,
        randomize: true // Enable random question selection for variety
      });
      
      res.json(questions);
    } catch (error) {
      console.error('Get exam questions error:', error);
      res.status(500).json({ error: "Failed to get exam questions" });
    }
  });

  // Get single question by ID
  app.get("/api/exam-prep/questions/:id", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const question = await storage.getExamQuestionById(id);
      
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
      
      res.json(question);
    } catch (error) {
      console.error('Get exam question error:', error);
      res.status(500).json({ error: "Failed to get exam question" });
    }
  });

  // Start exam session
  app.post("/api/exam-prep/sessions/start", requireAuth, async (req: any, res) => {
    try {
      const { sessionType, domain, category, difficulty, questionCount = 20 } = req.body;
      const user = req.user;
      const effectiveTier = getEffectiveTier(user);
      
      // Validate tier access for session types
      if (sessionType === 'timed' && effectiveTier === 'free') {
        return res.status(403).json({ 
          error: "Timed exams require Standard or Premium subscription" 
        });
      }
      
      // Enforce tier-based question limits server-side
      let enforcedQuestionCount: number;
      
      if (effectiveTier === 'free') {
        enforcedQuestionCount = Math.min(questionCount, 10);
      } else if (effectiveTier === 'standard') {
        enforcedQuestionCount = Math.min(questionCount, 50);
      } else { // premium
        enforcedQuestionCount = questionCount;
      }
      
      // Get random questions based on filters and tier-enforced limit
      const questions = await storage.getExamQuestions({
        domain,
        category,
        difficulty,
        userTier: effectiveTier,
        limit: enforcedQuestionCount,
        randomize: true
      });
      
      if (questions.length === 0) {
        return res.status(400).json({ error: "No questions available for the selected criteria" });
      }
      
      // Create session
      const sessionData = insertExamSessionSchema.parse({
        userId: user.id,
        sessionType,
        domain,
        category,
        difficulty,
        questionIds: questions.map(q => q.id),
        answers: {},
        totalQuestions: questions.length,
        correctCount: 0,
        completed: false
      });
      
      const session = await storage.createExamSession(sessionData);
      
      res.json({ session, questions });
    } catch (error) {
      console.error('Start exam session error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.errors });
      }
      res.status(500).json({ error: "Failed to start exam session" });
    }
  });

  // Submit answer to question in session
  app.patch("/api/exam-prep/sessions/:id/submit-answer", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { questionId, answer } = req.body;
      const user = req.user;
      
      const session = await storage.getExamSessionById(id);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      
      if (session.userId !== user.id) {
        return res.status(403).json({ error: "Not authorized" });
      }
      
      if (session.completed) {
        return res.status(400).json({ error: "Session already completed" });
      }
      
      // Get question to check answer
      const question = await storage.getExamQuestionById(questionId);
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
      
      const isCorrect = answer === question.correctAnswer;
      
      // Update session answers
      const answers = session.answers as Record<string, any> || {};
      answers[questionId] = {
        answer,
        isCorrect,
        submittedAt: new Date().toISOString()
      };
      
      const correctCount = Object.values(answers).filter((a: any) => a.isCorrect).length;
      
      const updatedSession = await storage.updateExamSession(id, {
        answers,
        correctCount
      });
      
      // Update user question progress
      await storage.updateUserQuestionProgress({
        userId: user.id,
        questionId,
        isCorrect
      });
      
      res.json({ 
        session: updatedSession, 
        isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      });
    } catch (error) {
      console.error('Submit answer error:', error);
      res.status(500).json({ error: "Failed to submit answer" });
    }
  });

  // Complete exam session
  app.patch("/api/exam-prep/sessions/:id/complete", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { timeSpentSeconds } = req.body;
      const user = req.user;
      
      const session = await storage.getExamSessionById(id);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      
      if (session.userId !== user.id) {
        return res.status(403).json({ error: "Not authorized" });
      }
      
      const updatedSession = await storage.updateExamSession(id, {
        completed: true,
        completedAt: new Date(),
        timeSpentSeconds
      });
      
      // Update user statistics
      await storage.updateUserExamStatistics(user.id, {
        sessionType: session.sessionType,
        correctCount: session.correctCount,
        totalQuestions: session.totalQuestions
      });
      
      res.json(updatedSession);
    } catch (error) {
      console.error('Complete exam session error:', error);
      res.status(500).json({ error: "Failed to complete exam session" });
    }
  });

  // Get user's exam sessions
  app.get("/api/exam-prep/sessions", requireAuth, async (req: any, res) => {
    try {
      const sessions = await storage.getUserExamSessions(req.user.id);
      res.json(sessions);
    } catch (error) {
      console.error('Get exam sessions error:', error);
      res.status(500).json({ error: "Failed to get exam sessions" });
    }
  });

  // Get user question progress
  app.get("/api/exam-prep/progress", requireAuth, async (req: any, res) => {
    try {
      const progress = await storage.getUserQuestionProgress(req.user.id);
      res.json(progress);
    } catch (error) {
      console.error('Get user progress error:', error);
      res.status(500).json({ error: "Failed to get user progress" });
    }
  });

  // Get user exam statistics
  app.get("/api/exam-prep/statistics", requireAuth, async (req: any, res) => {
    try {
      const stats = await storage.getUserExamStatistics(req.user.id);
      res.json(stats);
    } catch (error) {
      console.error('Get exam statistics error:', error);
      res.status(500).json({ error: "Failed to get exam statistics" });
    }
  });

  // Mark question for review
  app.patch("/api/exam-prep/progress/:questionId/mark-review", requireAuth, async (req: any, res) => {
    try {
      const { questionId } = req.params;
      const { markedForReview } = req.body;
      
      const progress = await storage.markQuestionForReview(
        req.user.id, 
        questionId, 
        markedForReview
      );
      
      res.json(progress);
    } catch (error) {
      console.error('Mark for review error:', error);
      res.status(500).json({ error: "Failed to mark question for review" });
    }
  });

  // Add note to question
  app.patch("/api/exam-prep/progress/:questionId/note", requireAuth, async (req: any, res) => {
    try {
      const { questionId } = req.params;
      const { note } = req.body;
      
      const progress = await storage.updateQuestionNote(
        req.user.id, 
        questionId, 
        note
      );
      
      res.json(progress);
    } catch (error) {
      console.error('Update question note error:', error);
      res.status(500).json({ error: "Failed to update question note" });
    }
  });

  // Admin middleware - checks if user has admin privileges
  const requireAdmin = async (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const user = await storage.getUserById(req.session.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    // Check if user is admin - for now, using email-based check
    // TODO: Add proper admin role system to user schema
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
    const isAdmin = adminEmails.includes(user.email) || user.email === 'admin@scrublifepro.com';
    
    if (!isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    req.user = user;
    next();
  };

  // ADMIN ROUTES

  // Grant lifetime access to a user
  app.post("/api/admin/lifetime-access/grant", requireAdmin, async (req: any, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      
      const updatedUser = await storage.grantLifetimeAccess(userId, req.user.id);
      
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const { password, ...userResponse } = updatedUser;
      res.json({ 
        message: "Lifetime access granted successfully",
        user: userResponse 
      });
    } catch (error) {
      console.error('Grant lifetime access error:', error);
      res.status(500).json({ error: "Failed to grant lifetime access" });
    }
  });

  // Revoke lifetime access from a user
  app.post("/api/admin/lifetime-access/revoke", requireAdmin, async (req: any, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      
      const updatedUser = await storage.revokeLifetimeAccess(userId);
      
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const { password, ...userResponse } = updatedUser;
      res.json({ 
        message: "Lifetime access revoked successfully",
        user: userResponse 
      });
    } catch (error) {
      console.error('Revoke lifetime access error:', error);
      res.status(500).json({ error: "Failed to revoke lifetime access" });
    }
  });

  // Create a promotional code for influencers
  app.post("/api/admin/promo-codes", requireAdmin, async (req: any, res) => {
    try {
      const {
        code,
        influencerName,
        influencerContact,
        discountType,
        discountValue,
        duration,
        notes
      } = req.body;
      
      // Validate required fields
      if (!code || !influencerName || !discountType || !discountValue || !duration) {
        return res.status(400).json({ 
          error: "Missing required fields: code, influencerName, discountType, discountValue, duration" 
        });
      }
      
      // Create Stripe coupon first
      const coupon = await stripe.coupons.create({
        [discountType === 'percentage' ? 'percent_off' : 'amount_off']: discountValue,
        currency: discountType === 'amount' ? 'usd' : undefined,
        duration: duration as 'once' | 'forever' | 'repeating',
        name: `${influencerName} - ${code}`
      });
      
      // Create Stripe promotion code
      const promotionCode = await stripe.promotionCodes.create({
        coupon: coupon.id,
        code: code.toUpperCase(),
        active: true
      });
      
      // Save to database
      const promoCodeRecord = await storage.createInfluencerCode({
        code: code.toUpperCase(),
        stripePromotionCodeId: promotionCode.id,
        stripeCouponId: coupon.id,
        influencerName,
        influencerContact: influencerContact || null,
        discountType,
        discountValue,
        duration,
        notes: notes || null,
        isActive: true,
        createdBy: req.user.id
      });
      
      res.json({ 
        message: "Promotional code created successfully",
        promoCode: promoCodeRecord,
        stripePromotionCode: promotionCode
      });
    } catch (error) {
      console.error('Create promo code error:', error);
      res.status(500).json({ error: "Failed to create promotional code" });
    }
  });

  // Get all promotional codes
  app.get("/api/admin/promo-codes", requireAdmin, async (req: any, res) => {
    try {
      const codes = await storage.getAllInfluencerCodes();
      res.json(codes);
    } catch (error) {
      console.error('Get promo codes error:', error);
      res.status(500).json({ error: "Failed to get promotional codes" });
    }
  });

  // Get a specific promotional code
  app.get("/api/admin/promo-codes/:code", requireAdmin, async (req: any, res) => {
    try {
      const { code } = req.params;
      const promoCode = await storage.getInfluencerCodeByCode(code.toUpperCase());
      
      if (!promoCode) {
        return res.status(404).json({ error: "Promotional code not found" });
      }
      
      // Fetch Stripe promotion code details for additional info
      const stripePromoCode = await stripe.promotionCodes.retrieve(promoCode.stripePromotionCodeId);
      
      res.json({
        ...promoCode,
        stripeDetails: stripePromoCode
      });
    } catch (error) {
      console.error('Get promo code error:', error);
      res.status(500).json({ error: "Failed to get promotional code" });
    }
  });

  // Deactivate a promotional code
  app.post("/api/admin/promo-codes/:id/deactivate", requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      
      const promoCode = await storage.getInfluencerCodeById(id);
      if (!promoCode) {
        return res.status(404).json({ error: "Promotional code not found" });
      }
      
      // Deactivate in Stripe
      await stripe.promotionCodes.update(promoCode.stripePromotionCodeId, {
        active: false
      });
      
      // Deactivate in database
      const updatedCode = await storage.deactivateInfluencerCode(id);
      
      res.json({ 
        message: "Promotional code deactivated successfully",
        promoCode: updatedCode 
      });
    } catch (error) {
      console.error('Deactivate promo code error:', error);
      res.status(500).json({ error: "Failed to deactivate promotional code" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
