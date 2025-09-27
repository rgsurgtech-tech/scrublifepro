import { eq, and, ilike, or, desc, sql } from 'drizzle-orm';
import { db } from './db';
import { 
  users, 
  specialties, 
  procedures, 
  userNotes, 
  userFavorites, 
  userActivity,
  forumPosts,
  forumReplies,
  postLikes,
  User, 
  InsertUser, 
  Specialty, 
  Procedure, 
  UserNote, 
  InsertUserNote, 
  ForumPost, 
  InsertForumPost, 
  ForumReply, 
  InsertForumReply 
} from '@shared/schema';
import { IStorage } from './storage';

export class DatabaseStorage implements IStorage {
  // User management
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getUserById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const result = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  }

  async updateUserStripeInfo(id: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User | null> {
    const result = await db.update(users)
      .set({ 
        stripeCustomerId, 
        stripeSubscriptionId,
        updatedAt: new Date() 
      })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  }

  async updateUserSubscriptionTier(id: string, subscriptionTier: string): Promise<User | null> {
    const result = await db.update(users)
      .set({ 
        subscriptionTier,
        updatedAt: new Date() 
      })
      .where(eq(users.id, id))
      .returning();
    return result[0] || null;
  }

  // Specialties
  async getAllSpecialties(): Promise<Specialty[]> {
    // Get specialties with actual procedure counts
    const result = await db
      .select({
        id: specialties.id,
        name: specialties.name,
        description: specialties.description,
        icon: specialties.icon,
        procedureCount: sql<number>`CAST(COUNT(${procedures.id}) AS INTEGER)`,
        color: specialties.color,
      })
      .from(specialties)
      .leftJoin(procedures, eq(specialties.id, procedures.specialtyId))
      .groupBy(specialties.id, specialties.name, specialties.description, specialties.icon, specialties.color)
      .orderBy(specialties.name);
    
    return result;
  }

  async getSpecialtyById(id: string): Promise<Specialty | null> {
    const result = await db.select().from(specialties).where(eq(specialties.id, id)).limit(1);
    return result[0] || null;
  }

  // Procedures
  async getAllProcedures(): Promise<Procedure[]> {
    return await db.select().from(procedures).orderBy(procedures.name);
  }

  async getProcedureById(id: string): Promise<Procedure | null> {
    const result = await db.select().from(procedures).where(eq(procedures.id, id)).limit(1);
    return result[0] || null;
  }

  async getProceduresBySpecialty(specialtyId: string): Promise<Procedure[]> {
    return await db.select()
      .from(procedures)
      .where(eq(procedures.specialtyId, specialtyId))
      .orderBy(procedures.name);
  }

  async searchProcedures(query: string): Promise<Procedure[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    return await db.select()
      .from(procedures)
      .where(
        or(
          ilike(procedures.name, searchTerm),
          ilike(procedures.description, searchTerm)
        )
      )
      .orderBy(procedures.name)
      .limit(20);
  }

  // User favorites and activity
  async getUserFavorites(userId: string): Promise<Procedure[]> {
    const result = await db.select({
      id: procedures.id,
      name: procedures.name,
      specialtyId: procedures.specialtyId,
      description: procedures.description,
      duration: procedures.duration,
      difficulty: procedures.difficulty,
      positioning: procedures.positioning,
      draping: procedures.draping,
      instruments: procedures.instruments,
      mayoSetup: procedures.mayoSetup,
      procedureSteps: procedures.procedureSteps,
      medications: procedures.medications,
      complications: procedures.complications,
      tips: procedures.tips,
      verifiedBy: procedures.verifiedBy,
      verifiedAt: procedures.verifiedAt,
      createdAt: procedures.createdAt,
      updatedAt: procedures.updatedAt,
    })
      .from(userFavorites)
      .innerJoin(procedures, eq(userFavorites.procedureId, procedures.id))
      .where(eq(userFavorites.userId, userId))
      .orderBy(desc(userFavorites.createdAt));
    
    return result;
  }

  async addUserFavorite(userId: string, procedureId: string): Promise<void> {
    await db.insert(userFavorites).values({ userId, procedureId }).onConflictDoNothing();
  }

  async removeUserFavorite(userId: string, procedureId: string): Promise<void> {
    await db.delete(userFavorites)
      .where(and(
        eq(userFavorites.userId, userId),
        eq(userFavorites.procedureId, procedureId)
      ));
  }

  async recordUserActivity(userId: string, procedureId: string): Promise<void> {
    await db.insert(userActivity).values({ userId, procedureId });
  }

  async getUserRecentProcedures(userId: string, limit = 10): Promise<Procedure[]> {
    const result = await db.select({
      id: procedures.id,
      name: procedures.name,
      specialtyId: procedures.specialtyId,
      description: procedures.description,
      duration: procedures.duration,
      difficulty: procedures.difficulty,
      positioning: procedures.positioning,
      draping: procedures.draping,
      instruments: procedures.instruments,
      mayoSetup: procedures.mayoSetup,
      procedureSteps: procedures.procedureSteps,
      medications: procedures.medications,
      complications: procedures.complications,
      tips: procedures.tips,
      verifiedBy: procedures.verifiedBy,
      verifiedAt: procedures.verifiedAt,
      createdAt: procedures.createdAt,
      updatedAt: procedures.updatedAt,
    })
      .from(userActivity)
      .innerJoin(procedures, eq(userActivity.procedureId, procedures.id))
      .where(eq(userActivity.userId, userId))
      .orderBy(desc(userActivity.viewedAt))
      .limit(limit);
    
    // Remove duplicates by keeping only the most recent view of each procedure
    const uniqueProcedures = new Map();
    result.forEach(proc => {
      if (!uniqueProcedures.has(proc.id)) {
        uniqueProcedures.set(proc.id, proc);
      }
    });
    
    return Array.from(uniqueProcedures.values());
  }

  // User notes
  async getUserNotes(userId: string, procedureId: string): Promise<UserNote | null> {
    const result = await db.select()
      .from(userNotes)
      .where(and(
        eq(userNotes.userId, userId),
        eq(userNotes.procedureId, procedureId)
      ))
      .limit(1);
    return result[0] || null;
  }

  async getAllUserNotes(userId: string): Promise<any[]> {
    const result = await db.select({
      id: userNotes.id,
      procedureId: userNotes.procedureId,
      content: userNotes.content,
      createdAt: userNotes.createdAt,
      updatedAt: userNotes.updatedAt,
      procedureTitle: procedures.name,
      specialtyId: procedures.specialtyId,
      specialtyName: specialties.name,
    })
      .from(userNotes)
      .leftJoin(procedures, eq(userNotes.procedureId, procedures.id))
      .leftJoin(specialties, eq(procedures.specialtyId, specialties.id))
      .where(eq(userNotes.userId, userId))
      .orderBy(desc(userNotes.updatedAt));
    return result;
  }

  async saveUserNote(note: InsertUserNote): Promise<UserNote> {
    const result = await db.insert(userNotes).values(note).returning();
    return result[0];
  }

  async updateUserNote(userId: string, procedureId: string, content: string): Promise<UserNote | null> {
    const result = await db.update(userNotes)
      .set({ content, updatedAt: new Date() })
      .where(and(
        eq(userNotes.userId, userId),
        eq(userNotes.procedureId, procedureId)
      ))
      .returning();
    return result[0] || null;
  }

  // Community forum
  async getAllForumPosts(): Promise<ForumPost[]> {
    return await db.select()
      .from(forumPosts)
      .orderBy(desc(forumPosts.isPinned), desc(forumPosts.createdAt));
  }

  async getForumPostById(id: string): Promise<ForumPost | null> {
    const result = await db.select().from(forumPosts).where(eq(forumPosts.id, id)).limit(1);
    return result[0] || null;
  }

  async createForumPost(post: InsertForumPost): Promise<ForumPost> {
    const result = await db.insert(forumPosts).values(post).returning();
    return result[0];
  }

  async getForumReplies(postId: string): Promise<ForumReply[]> {
    return await db.select()
      .from(forumReplies)
      .where(eq(forumReplies.postId, postId))
      .orderBy(forumReplies.createdAt);
  }

  async createForumReply(reply: InsertForumReply): Promise<ForumReply> {
    // Insert reply and update post reply count
    const result = await db.transaction(async (tx) => {
      const newReply = await tx.insert(forumReplies).values(reply).returning();
      
      await tx.update(forumPosts)
        .set({ 
          replyCount: sql`reply_count + 1`,
          updatedAt: new Date() 
        })
        .where(eq(forumPosts.id, reply.postId));
      
      return newReply[0];
    });
    
    return result;
  }

  async likeForumPost(userId: string, postId: string): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.insert(postLikes).values({ userId, postId }).onConflictDoNothing();
      
      await tx.update(forumPosts)
        .set({ 
          likeCount: sql`like_count + 1`,
          updatedAt: new Date() 
        })
        .where(eq(forumPosts.id, postId));
    });
  }

  async unlikeForumPost(userId: string, postId: string): Promise<void> {
    await db.transaction(async (tx) => {
      const deleted = await tx.delete(postLikes)
        .where(and(
          eq(postLikes.userId, userId),
          eq(postLikes.postId, postId)
        ));
      
      if (deleted) {
        await tx.update(forumPosts)
          .set({ 
            likeCount: sql`like_count - 1`,
            updatedAt: new Date() 
          })
          .where(eq(forumPosts.id, postId));
      }
    });
  }
}

// Export the database storage instance
export const dbStorage = new DatabaseStorage();