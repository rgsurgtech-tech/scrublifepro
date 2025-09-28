import type { Express } from "express";
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
  insertVideoCommentSchema
} from "@shared/schema";

// Initialize Stripe - From javascript_stripe integration
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user with hashed password
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
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
        
        res.send({
          subscriptionId: subscription.id,
          clientSecret: latestInvoice?.payment_intent?.client_secret,
        });
        return;
      }
      
      if (!user.email) {
        throw new Error('No user email on file');
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
      
      res.send({
        subscriptionId: subscription.id,
        clientSecret: latestInvoice?.payment_intent?.client_secret,
      });
    } catch (error: any) {
      console.error('Create subscription error:', error);
      return res.status(400).send({ error: { message: error.message } });
    }
  });

  // Update subscription tier after successful payment
  app.post('/api/update-subscription-tier', requireAuth, async (req: any, res) => {
    try {
      const { tier } = req.body;
      const user = await storage.updateUserSubscriptionTier(req.user.id, tier);
      res.json({ user });
    } catch (error: any) {
      console.error('Update subscription tier error:', error);
      res.status(500).json({ error: "Failed to update subscription tier" });
    }
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
      
      // Get user subscription tier if authenticated
      let userSubscriptionTier: string | undefined;
      if (req.session.userId) {
        const user = await storage.getUserById(req.session.userId);
        userSubscriptionTier = user?.subscriptionTier;
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

  const httpServer = createServer(app);

  return httpServer;
}
