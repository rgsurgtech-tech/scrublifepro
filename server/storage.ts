import { User, InsertUser, Specialty, Procedure, UserNote, InsertUserNote, ForumPost, InsertForumPost, ForumReply, InsertForumReply, VideoCategory, Video, InsertVideo, InsertVideoCategory, VideoProgress, InsertVideoProgress, VideoComment, InsertVideoComment, BetaTester, InsertBetaTester } from "@shared/schema";

export interface IStorage {
  // User management (keeping existing methods for compatibility)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Extended user methods
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, updates: Partial<User>): Promise<User | null>;
  
  // Specialties
  getAllSpecialties(): Promise<Specialty[]>;
  getSpecialtyById(id: string): Promise<Specialty | null>;
  
  // Procedures
  getAllProcedures(): Promise<Procedure[]>;
  getProcedureById(id: string): Promise<Procedure | null>;
  getProceduresBySpecialty(specialtyId: string): Promise<Procedure[]>;
  searchProcedures(query: string): Promise<Procedure[]>;
  
  // User favorites and activity
  getUserFavorites(userId: string): Promise<Procedure[]>;
  addUserFavorite(userId: string, procedureId: string): Promise<void>;
  removeUserFavorite(userId: string, procedureId: string): Promise<void>;
  recordUserActivity(userId: string, procedureId: string): Promise<void>;
  getUserRecentProcedures(userId: string, limit?: number): Promise<Procedure[]>;
  
  // User notes
  getUserNotes(userId: string, procedureId: string): Promise<UserNote | null>;
  saveUserNote(note: InsertUserNote): Promise<UserNote>;
  updateUserNote(userId: string, procedureId: string, content: string): Promise<UserNote | null>;
  
  // Community forum
  getAllForumPosts(): Promise<ForumPost[]>;
  getForumPostById(id: string): Promise<ForumPost | null>;
  createForumPost(post: InsertForumPost): Promise<ForumPost>;
  getForumReplies(postId: string): Promise<ForumReply[]>;
  createForumReply(reply: InsertForumReply): Promise<ForumReply>;
  likeForumPost(userId: string, postId: string): Promise<void>;
  unlikeForumPost(userId: string, postId: string): Promise<void>;
  
  // Video library
  getAllVideoCategories(): Promise<VideoCategory[]>;
  getVideoCategoryById(id: string): Promise<VideoCategory | null>;
  createVideoCategory(category: InsertVideoCategory): Promise<VideoCategory>;
  
  getAllVideos(userSubscriptionTier?: string): Promise<Video[]>;
  getVideoById(id: string): Promise<Video | null>;
  getVideosByCategory(categoryId: string, userSubscriptionTier?: string): Promise<Video[]>;
  getVideosBySpecialty(specialtyId: string, userSubscriptionTier?: string): Promise<Video[]>;
  getVideosByProcedure(procedureId: string, userSubscriptionTier?: string): Promise<Video[]>;
  searchVideos(query: string, userSubscriptionTier?: string): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: string, updates: Partial<Video>): Promise<Video | null>;
  deleteVideo(id: string): Promise<boolean>;
  incrementVideoViews(videoId: string): Promise<void>;
  
  // Video user interactions
  getUserVideoProgress(userId: string, videoId: string): Promise<VideoProgress | null>;
  updateVideoProgress(progress: InsertVideoProgress): Promise<VideoProgress>;
  getUserVideoFavorites(userId: string): Promise<Video[]>;
  addVideoFavorite(userId: string, videoId: string): Promise<void>;
  removeVideoFavorite(userId: string, videoId: string): Promise<void>;
  toggleVideoLike(userId: string, videoId: string): Promise<boolean>;
  
  // Video comments
  getVideoComments(videoId: string): Promise<VideoComment[]>;
  createVideoComment(comment: InsertVideoComment): Promise<VideoComment>;
  deleteVideoComment(commentId: string, userId: string): Promise<boolean>;
  
  // Beta testers
  getBetaTesterByEmail(email: string): Promise<BetaTester | null>;
  getBetaTesterCount(): Promise<number>;
  createBetaTester(tester: InsertBetaTester): Promise<BetaTester>;
}

// Note: MemStorage class kept for compatibility but not used
export class MemStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    throw new Error('Use database storage instead');
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error('Use database storage instead');
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error('Use database storage instead');
  }

  async getUserById(id: string): Promise<User | null> {
    throw new Error('Use database storage instead');
  }

  async getUserByEmail(email: string): Promise<User | null> {
    throw new Error('Use database storage instead');
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    throw new Error('Use database storage instead');
  }

  async getAllSpecialties(): Promise<Specialty[]> {
    throw new Error('Use database storage instead');
  }

  async getSpecialtyById(id: string): Promise<Specialty | null> {
    throw new Error('Use database storage instead');
  }

  async getAllProcedures(): Promise<Procedure[]> {
    throw new Error('Use database storage instead');
  }

  async getProcedureById(id: string): Promise<Procedure | null> {
    throw new Error('Use database storage instead');
  }

  async getProceduresBySpecialty(specialtyId: string): Promise<Procedure[]> {
    throw new Error('Use database storage instead');
  }

  async searchProcedures(query: string): Promise<Procedure[]> {
    throw new Error('Use database storage instead');
  }

  async getUserFavorites(userId: string): Promise<Procedure[]> {
    throw new Error('Use database storage instead');
  }

  async addUserFavorite(userId: string, procedureId: string): Promise<void> {
    throw new Error('Use database storage instead');
  }

  async removeUserFavorite(userId: string, procedureId: string): Promise<void> {
    throw new Error('Use database storage instead');
  }

  async recordUserActivity(userId: string, procedureId: string): Promise<void> {
    throw new Error('Use database storage instead');
  }

  async getUserRecentProcedures(userId: string, limit?: number): Promise<Procedure[]> {
    throw new Error('Use database storage instead');
  }

  async getUserNotes(userId: string, procedureId: string): Promise<UserNote | null> {
    throw new Error('Use database storage instead');
  }

  async saveUserNote(note: InsertUserNote): Promise<UserNote> {
    throw new Error('Use database storage instead');
  }

  async updateUserNote(userId: string, procedureId: string, content: string): Promise<UserNote | null> {
    throw new Error('Use database storage instead');
  }

  async getAllForumPosts(): Promise<ForumPost[]> {
    throw new Error('Use database storage instead');
  }

  async getForumPostById(id: string): Promise<ForumPost | null> {
    throw new Error('Use database storage instead');
  }

  async createForumPost(post: InsertForumPost): Promise<ForumPost> {
    throw new Error('Use database storage instead');
  }

  async getForumReplies(postId: string): Promise<ForumReply[]> {
    throw new Error('Use database storage instead');
  }

  async createForumReply(reply: InsertForumReply): Promise<ForumReply> {
    throw new Error('Use database storage instead');
  }

  async likeForumPost(userId: string, postId: string): Promise<void> {
    throw new Error('Use database storage instead');
  }

  async unlikeForumPost(userId: string, postId: string): Promise<void> {
    throw new Error('Use database storage instead');
  }

  // Video library
  async getAllVideoCategories(): Promise<VideoCategory[]> {
    throw new Error('Use database storage instead');
  }

  async getVideoCategoryById(id: string): Promise<VideoCategory | null> {
    throw new Error('Use database storage instead');
  }

  async createVideoCategory(category: InsertVideoCategory): Promise<VideoCategory> {
    throw new Error('Use database storage instead');
  }

  async getAllVideos(): Promise<Video[]> {
    throw new Error('Use database storage instead');
  }

  async getVideoById(id: string): Promise<Video | null> {
    throw new Error('Use database storage instead');
  }

  async getVideosByCategory(categoryId: string): Promise<Video[]> {
    throw new Error('Use database storage instead');
  }

  async getVideosBySpecialty(specialtyId: string): Promise<Video[]> {
    throw new Error('Use database storage instead');
  }

  async getVideosByProcedure(procedureId: string): Promise<Video[]> {
    throw new Error('Use database storage instead');
  }

  async searchVideos(query: string): Promise<Video[]> {
    throw new Error('Use database storage instead');
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    throw new Error('Use database storage instead');
  }

  async updateVideo(id: string, updates: Partial<Video>): Promise<Video | null> {
    throw new Error('Use database storage instead');
  }

  async deleteVideo(id: string): Promise<boolean> {
    throw new Error('Use database storage instead');
  }

  async incrementVideoViews(videoId: string): Promise<void> {
    throw new Error('Use database storage instead');
  }

  async getUserVideoProgress(userId: string, videoId: string): Promise<VideoProgress | null> {
    throw new Error('Use database storage instead');
  }

  async updateVideoProgress(progress: InsertVideoProgress): Promise<VideoProgress> {
    throw new Error('Use database storage instead');
  }

  async getUserVideoFavorites(userId: string): Promise<Video[]> {
    throw new Error('Use database storage instead');
  }

  async addVideoFavorite(userId: string, videoId: string): Promise<void> {
    throw new Error('Use database storage instead');
  }

  async removeVideoFavorite(userId: string, videoId: string): Promise<void> {
    throw new Error('Use database storage instead');
  }

  async toggleVideoLike(userId: string, videoId: string): Promise<boolean> {
    throw new Error('Use database storage instead');
  }

  async getVideoComments(videoId: string): Promise<VideoComment[]> {
    throw new Error('Use database storage instead');
  }

  async createVideoComment(comment: InsertVideoComment): Promise<VideoComment> {
    throw new Error('Use database storage instead');
  }

  async deleteVideoComment(commentId: string, userId: string): Promise<boolean> {
    throw new Error('Use database storage instead');
  }
}

// Use database storage instead of in-memory storage
import { dbStorage } from './db-storage';
export const storage = dbStorage;
