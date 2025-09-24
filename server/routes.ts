import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { storage } from "./storage";
import { insertUserSchema, insertUserNoteSchema, insertForumPostSchema } from "@shared/schema";

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
      res.clearCookie('connect.sid');
      res.json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/auth/me", async (req, res) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      
      const user = await storage.getUserById(req.session.userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      
      // Don't send password back
      const { password, ...userResponse } = user;
      
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
  
  app.get("/api/procedures/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const procedure = await storage.getProcedureById(id);
      
      if (!procedure) {
        return res.status(404).json({ error: "Procedure not found" });
      }
      
      // Record user activity if authenticated
      if (req.session.userId) {
        await storage.recordUserActivity(req.session.userId, id);
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

  const httpServer = createServer(app);

  return httpServer;
}
