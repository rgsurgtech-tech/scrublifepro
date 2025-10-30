import { eq, and, ilike, or, desc, sql, inArray } from 'drizzle-orm';
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
  videoCategories,
  videos,
  videoProgress,
  videoFavorites,
  videoLikes,
  videoComments,
  betaTesters,
  examQuestions,
  examSessions,
  userQuestionProgress,
  examStatistics,
  User, 
  InsertUser, 
  Specialty, 
  Procedure, 
  UserNote, 
  InsertUserNote, 
  ForumPost, 
  InsertForumPost, 
  ForumReply, 
  InsertForumReply,
  VideoCategory,
  Video,
  InsertVideo,
  InsertVideoCategory,
  VideoProgress,
  InsertVideoProgress,
  VideoComment,
  BetaTester,
  InsertBetaTester,
  InsertVideoComment,
  ExamQuestion,
  ExamSession,
  InsertExamSession,
  UserQuestionProgress,
  ExamStatistics
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

  async getUserByStripeCustomerId(stripeCustomerId: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.stripeCustomerId, stripeCustomerId)).limit(1);
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

  async updateUserPassword(id: string, hashedPassword: string): Promise<void> {
    await db.update(users)
      .set({ 
        password: hashedPassword,
        updatedAt: new Date() 
      })
      .where(eq(users.id, id));
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

  // Video library methods
  
  // Helper method to get accessible access tiers based on user subscription
  private getAccessibleTiers(userSubscriptionTier?: string): string[] {
    // Beta testing mode: grant unlimited access to all tiers for everyone
    return ['free', 'standard', 'premium'];
  }

  async getAllVideoCategories(): Promise<VideoCategory[]> {
    return await db.select()
      .from(videoCategories)
      .orderBy(videoCategories.sortOrder, videoCategories.name);
  }

  async getVideoCategoryById(id: string): Promise<VideoCategory | null> {
    const result = await db.select().from(videoCategories).where(eq(videoCategories.id, id)).limit(1);
    return result[0] || null;
  }

  async createVideoCategory(category: InsertVideoCategory): Promise<VideoCategory> {
    const result = await db.insert(videoCategories).values(category).returning();
    return result[0];
  }

  async getAllVideos(userSubscriptionTier?: string): Promise<Video[]> {
    const accessibleTiers = this.getAccessibleTiers(userSubscriptionTier);
    
    return await db.select()
      .from(videos)
      .where(and(
        eq(videos.isPublished, true),
        inArray(videos.accessTier, accessibleTiers)
      ))
      .orderBy(desc(videos.createdAt));
  }

  async getVideoById(id: string): Promise<Video | null> {
    const result = await db.select().from(videos).where(eq(videos.id, id)).limit(1);
    return result[0] || null;
  }

  async getVideosByCategory(categoryId: string, userSubscriptionTier?: string): Promise<Video[]> {
    const accessibleTiers = this.getAccessibleTiers(userSubscriptionTier);
    
    return await db.select()
      .from(videos)
      .where(and(
        eq(videos.category, categoryId),
        eq(videos.isPublished, true),
        inArray(videos.accessTier, accessibleTiers)
      ))
      .orderBy(desc(videos.createdAt));
  }

  async getVideosBySpecialty(specialtyId: string, userSubscriptionTier?: string): Promise<Video[]> {
    const accessibleTiers = this.getAccessibleTiers(userSubscriptionTier);
    
    return await db.select()
      .from(videos)
      .where(and(
        eq(videos.specialtyId, specialtyId),
        eq(videos.isPublished, true),
        inArray(videos.accessTier, accessibleTiers)
      ))
      .orderBy(desc(videos.createdAt));
  }

  async getVideosByProcedure(procedureId: string, userSubscriptionTier?: string): Promise<Video[]> {
    const accessibleTiers = this.getAccessibleTiers(userSubscriptionTier);
    
    return await db.select()
      .from(videos)
      .where(and(
        eq(videos.procedureId, procedureId),
        eq(videos.isPublished, true),
        inArray(videos.accessTier, accessibleTiers)
      ))
      .orderBy(desc(videos.createdAt));
  }

  async searchVideos(query: string, userSubscriptionTier?: string): Promise<Video[]> {
    const searchTerm = `%${query.toLowerCase()}%`;
    const accessibleTiers = this.getAccessibleTiers(userSubscriptionTier);
    
    return await db.select()
      .from(videos)
      .where(and(
        or(
          ilike(videos.title, searchTerm),
          ilike(videos.description, searchTerm)
        ),
        eq(videos.isPublished, true),
        inArray(videos.accessTier, accessibleTiers)
      ))
      .orderBy(desc(videos.createdAt))
      .limit(20);
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const result = await db.insert(videos).values(video).returning();
    return result[0];
  }

  async updateVideo(id: string, updates: Partial<Video>): Promise<Video | null> {
    const result = await db.update(videos)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(videos.id, id))
      .returning();
    return result[0] || null;
  }

  async deleteVideo(id: string): Promise<boolean> {
    const result = await db.delete(videos).where(eq(videos.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async incrementVideoViews(videoId: string): Promise<void> {
    await db.update(videos)
      .set({ views: sql`views + 1` })
      .where(eq(videos.id, videoId));
  }

  // Video user interactions
  async getUserVideoProgress(userId: string, videoId: string): Promise<VideoProgress | null> {
    const result = await db.select()
      .from(videoProgress)
      .where(and(
        eq(videoProgress.userId, userId),
        eq(videoProgress.videoId, videoId)
      ))
      .limit(1);
    return result[0] || null;
  }

  async updateVideoProgress(progress: InsertVideoProgress): Promise<VideoProgress> {
    const existing = await this.getUserVideoProgress(progress.userId, progress.videoId);
    
    if (existing) {
      const result = await db.update(videoProgress)
        .set({ 
          progressTime: progress.progressTime,
          completed: progress.completed,
          lastWatchedAt: new Date()
        })
        .where(and(
          eq(videoProgress.userId, progress.userId),
          eq(videoProgress.videoId, progress.videoId)
        ))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(videoProgress).values(progress).returning();
      return result[0];
    }
  }

  async getUserVideoFavorites(userId: string): Promise<Video[]> {
    const result = await db.select({
      id: videos.id,
      title: videos.title,
      description: videos.description,
      duration: videos.duration,
      thumbnailUrl: videos.thumbnailUrl,
      videoUrl: videos.videoUrl,
      category: videos.category,
      specialtyId: videos.specialtyId,
      procedureId: videos.procedureId,
      difficulty: videos.difficulty,
      tags: videos.tags,
      accessTier: videos.accessTier,
      cmeCredits: videos.cmeCredits,
      certificationRequired: videos.certificationRequired,
      isPublished: videos.isPublished,
      views: videos.views,
      likes: videos.likes,
      uploadedBy: videos.uploadedBy,
      verifiedBy: videos.verifiedBy,
      verifiedAt: videos.verifiedAt,
      createdAt: videos.createdAt,
      updatedAt: videos.updatedAt,
    })
      .from(videoFavorites)
      .innerJoin(videos, eq(videoFavorites.videoId, videos.id))
      .where(eq(videoFavorites.userId, userId))
      .orderBy(desc(videoFavorites.createdAt));
    
    return result;
  }

  async addVideoFavorite(userId: string, videoId: string): Promise<void> {
    await db.insert(videoFavorites).values({ userId, videoId }).onConflictDoNothing();
  }

  async removeVideoFavorite(userId: string, videoId: string): Promise<void> {
    await db.delete(videoFavorites)
      .where(and(
        eq(videoFavorites.userId, userId),
        eq(videoFavorites.videoId, videoId)
      ));
  }

  async toggleVideoLike(userId: string, videoId: string): Promise<boolean> {
    return await db.transaction(async (tx) => {
      // Check if like exists
      const existingLike = await tx.select()
        .from(videoLikes)
        .where(and(
          eq(videoLikes.userId, userId),
          eq(videoLikes.videoId, videoId)
        ))
        .limit(1);

      if (existingLike.length > 0) {
        // Remove like
        await tx.delete(videoLikes)
          .where(and(
            eq(videoLikes.userId, userId),
            eq(videoLikes.videoId, videoId)
          ));
        
        await tx.update(videos)
          .set({ likes: sql`likes - 1` })
          .where(eq(videos.id, videoId));
          
        return false; // Unliked
      } else {
        // Add like
        await tx.insert(videoLikes).values({ userId, videoId });
        
        await tx.update(videos)
          .set({ likes: sql`likes + 1` })
          .where(eq(videos.id, videoId));
          
        return true; // Liked
      }
    });
  }

  // Video comments
  async getVideoComments(videoId: string): Promise<VideoComment[]> {
    return await db.select()
      .from(videoComments)
      .where(eq(videoComments.videoId, videoId))
      .orderBy(videoComments.createdAt);
  }

  async createVideoComment(comment: InsertVideoComment): Promise<VideoComment> {
    const result = await db.insert(videoComments).values(comment).returning();
    return result[0];
  }

  async deleteVideoComment(commentId: string, userId: string): Promise<boolean> {
    const result = await db.delete(videoComments)
      .where(and(
        eq(videoComments.id, commentId),
        eq(videoComments.authorId, userId)
      ));
    return (result.rowCount ?? 0) > 0;
  }

  // Beta testers
  async getBetaTesterByEmail(email: string): Promise<BetaTester | null> {
    const result = await db.select()
      .from(betaTesters)
      .where(eq(betaTesters.email, email))
      .limit(1);
    return result[0] || null;
  }

  async getBetaTesterCount(): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)::int` })
      .from(betaTesters);
    return result[0]?.count || 0;
  }

  async createBetaTester(tester: InsertBetaTester): Promise<BetaTester> {
    const count = await this.getBetaTesterCount();
    const result = await db.insert(betaTesters)
      .values({
        ...tester,
        signupNumber: count + 1,
      })
      .returning();
    return result[0];
  }

  async getAllBetaTesters(): Promise<BetaTester[]> {
    const result = await db.select()
      .from(betaTesters)
      .orderBy(betaTesters.signupNumber);
    return result;
  }

  // Exam prep methods
  async getExamQuestions(filters: {
    domain?: string;
    category?: string;
    difficulty?: string;
    userTier: string;
    limit: number;
    randomize?: boolean;
  }): Promise<ExamQuestion[]> {
    let query = db.select().from(examQuestions);
    
    // Build WHERE conditions
    const conditions = [];
    
    if (filters.domain) {
      conditions.push(eq(examQuestions.domain, filters.domain));
    }
    
    if (filters.category) {
      conditions.push(eq(examQuestions.category, filters.category));
    }
    
    if (filters.difficulty) {
      conditions.push(eq(examQuestions.difficulty, filters.difficulty));
    }
    
    // Tier-based access control
    // Free: only 'free' tier questions (limited subset)
    // Standard: 'free' and 'standard' tier questions
    // Premium: all questions
    if (filters.userTier === 'free') {
      conditions.push(eq(examQuestions.accessTier, 'free'));
    } else if (filters.userTier === 'standard') {
      conditions.push(or(
        eq(examQuestions.accessTier, 'free'),
        eq(examQuestions.accessTier, 'standard')
      )!);
    }
    // Premium gets all questions (no additional filter)
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)!) as any;
    }
    
    // Add random ordering if requested
    if (filters.randomize) {
      query = query.orderBy(sql`RANDOM()`) as any;
    }
    
    // Apply limit
    query = query.limit(filters.limit) as any;
    
    return await query;
  }

  async getExamQuestionById(id: string): Promise<ExamQuestion | null> {
    const result = await db.select()
      .from(examQuestions)
      .where(eq(examQuestions.id, id))
      .limit(1);
    return result[0] || null;
  }

  async createExamSession(session: InsertExamSession): Promise<ExamSession> {
    const result = await db.insert(examSessions).values(session).returning();
    return result[0];
  }

  async getExamSessionById(id: string): Promise<ExamSession | null> {
    const result = await db.select()
      .from(examSessions)
      .where(eq(examSessions.id, id))
      .limit(1);
    return result[0] || null;
  }

  async updateExamSession(id: string, updates: Partial<ExamSession>): Promise<ExamSession | null> {
    const result = await db.update(examSessions)
      .set(updates)
      .where(eq(examSessions.id, id))
      .returning();
    return result[0] || null;
  }

  async getUserExamSessions(userId: string): Promise<ExamSession[]> {
    return await db.select()
      .from(examSessions)
      .where(eq(examSessions.userId, userId))
      .orderBy(desc(examSessions.createdAt));
  }

  async getUserQuestionProgress(userId: string): Promise<UserQuestionProgress[]> {
    return await db.select()
      .from(userQuestionProgress)
      .where(eq(userQuestionProgress.userId, userId));
  }

  async updateUserQuestionProgress(data: {
    userId: string;
    questionId: string;
    isCorrect: boolean;
  }): Promise<UserQuestionProgress> {
    // Check if progress record exists
    const existing = await db.select()
      .from(userQuestionProgress)
      .where(and(
        eq(userQuestionProgress.userId, data.userId),
        eq(userQuestionProgress.questionId, data.questionId)
      ))
      .limit(1);

    if (existing.length > 0) {
      // Update existing record
      const result = await db.update(userQuestionProgress)
        .set({
          timesAttempted: sql`${userQuestionProgress.timesAttempted} + 1`,
          timesCorrect: data.isCorrect 
            ? sql`${userQuestionProgress.timesCorrect} + 1`
            : userQuestionProgress.timesCorrect,
          lastAttemptCorrect: data.isCorrect,
          lastAttemptedAt: new Date(),
          updatedAt: new Date()
        })
        .where(and(
          eq(userQuestionProgress.userId, data.userId),
          eq(userQuestionProgress.questionId, data.questionId)
        ))
        .returning();
      return result[0];
    } else {
      // Create new record
      const result = await db.insert(userQuestionProgress)
        .values({
          userId: data.userId,
          questionId: data.questionId,
          timesAttempted: 1,
          timesCorrect: data.isCorrect ? 1 : 0,
          lastAttemptCorrect: data.isCorrect,
          lastAttemptedAt: new Date()
        })
        .returning();
      return result[0];
    }
  }

  async getUserExamStatistics(userId: string): Promise<ExamStatistics | null> {
    const result = await db.select()
      .from(examStatistics)
      .where(eq(examStatistics.userId, userId))
      .limit(1);
    return result[0] || null;
  }

  async updateUserExamStatistics(userId: string, data: {
    sessionType: string;
    correctCount: number;
    totalQuestions: number;
  }): Promise<ExamStatistics> {
    const existing = await this.getUserExamStatistics(userId);
    
    const accuracy = Math.round((data.correctCount / data.totalQuestions) * 100);
    
    if (existing) {
      // Update existing statistics
      const newTotalAttempted = existing.totalQuestionsAttempted + data.totalQuestions;
      const newTotalCorrect = existing.totalCorrect + data.correctCount;
      const newTotalIncorrect = existing.totalIncorrect + (data.totalQuestions - data.correctCount);
      const newOverallAccuracy = Math.round((newTotalCorrect / newTotalAttempted) * 100);
      
      const updates: Partial<ExamStatistics> = {
        totalQuestionsAttempted: newTotalAttempted,
        totalCorrect: newTotalCorrect,
        totalIncorrect: newTotalIncorrect,
        overallAccuracy: newOverallAccuracy,
        lastStudyDate: new Date(),
        updatedAt: new Date()
      };
      
      // Update session type specific stats
      if (data.sessionType === 'practice') {
        updates.practiceSessionsCompleted = existing.practiceSessionsCompleted + 1;
      } else if (data.sessionType === 'timed') {
        updates.timedExamsCompleted = existing.timedExamsCompleted + 1;
        
        // Update average and best timed exam scores
        const newAvg = Math.round(
          ((existing.averageTimedExamScore * existing.timedExamsCompleted) + accuracy) / 
          (existing.timedExamsCompleted + 1)
        );
        updates.averageTimedExamScore = newAvg;
        
        if (accuracy > existing.bestTimedExamScore) {
          updates.bestTimedExamScore = accuracy;
        }
      }
      
      const result = await db.update(examStatistics)
        .set(updates)
        .where(eq(examStatistics.userId, userId))
        .returning();
      return result[0];
    } else {
      // Create new statistics record
      const result = await db.insert(examStatistics)
        .values({
          userId,
          totalQuestionsAttempted: data.totalQuestions,
          totalCorrect: data.correctCount,
          totalIncorrect: data.totalQuestions - data.correctCount,
          overallAccuracy: accuracy,
          practiceSessionsCompleted: data.sessionType === 'practice' ? 1 : 0,
          timedExamsCompleted: data.sessionType === 'timed' ? 1 : 0,
          averageTimedExamScore: data.sessionType === 'timed' ? accuracy : 0,
          bestTimedExamScore: data.sessionType === 'timed' ? accuracy : 0,
          studyStreak: 1,
          lastStudyDate: new Date()
        })
        .returning();
      return result[0];
    }
  }

  async markQuestionForReview(userId: string, questionId: string, markedForReview: boolean): Promise<UserQuestionProgress | null> {
    // Check if progress record exists
    const existing = await db.select()
      .from(userQuestionProgress)
      .where(and(
        eq(userQuestionProgress.userId, userId),
        eq(userQuestionProgress.questionId, questionId)
      ))
      .limit(1);

    if (existing.length > 0) {
      // Update existing record
      const result = await db.update(userQuestionProgress)
        .set({
          markedForReview,
          updatedAt: new Date()
        })
        .where(and(
          eq(userQuestionProgress.userId, userId),
          eq(userQuestionProgress.questionId, questionId)
        ))
        .returning();
      return result[0];
    } else {
      // Create new record
      const result = await db.insert(userQuestionProgress)
        .values({
          userId,
          questionId,
          markedForReview,
          timesAttempted: 0,
          timesCorrect: 0
        })
        .returning();
      return result[0];
    }
  }

  async updateQuestionNote(userId: string, questionId: string, note: string): Promise<UserQuestionProgress | null> {
    // Check if progress record exists
    const existing = await db.select()
      .from(userQuestionProgress)
      .where(and(
        eq(userQuestionProgress.userId, userId),
        eq(userQuestionProgress.questionId, questionId)
      ))
      .limit(1);

    if (existing.length > 0) {
      // Update existing record
      const result = await db.update(userQuestionProgress)
        .set({
          notes: note,
          updatedAt: new Date()
        })
        .where(and(
          eq(userQuestionProgress.userId, userId),
          eq(userQuestionProgress.questionId, questionId)
        ))
        .returning();
      return result[0];
    } else {
      // Create new record
      const result = await db.insert(userQuestionProgress)
        .values({
          userId,
          questionId,
          notes: note,
          timesAttempted: 0,
          timesCorrect: 0
        })
        .returning();
      return result[0];
    }
  }
}

// Export the database storage instance
export const dbStorage = new DatabaseStorage();