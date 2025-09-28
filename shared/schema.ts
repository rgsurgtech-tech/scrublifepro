import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication and profile data
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  certificationNumber: text("certification_number"),
  yearsExperience: text("years_experience"),
  primarySpecialty: text("primary_specialty"),
  subscriptionTier: text("subscription_tier").notNull().default("premium"), // free, standard, premium
  selectedSpecialties: text("selected_specialties").array().default(sql`ARRAY[]::text[]`),
  isVerified: boolean("is_verified").default(false), // CST verification status
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Surgical specialties
export const specialties = pgTable("specialties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  procedureCount: integer("procedure_count").default(0),
  color: text("color").notNull(),
});

// Surgical procedures with detailed guides
export const procedures = pgTable("procedures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  specialtyId: varchar("specialty_id").references(() => specialties.id).notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(), // e.g., "45-90 min"
  difficulty: text("difficulty").notNull(), // Basic, Intermediate, Advanced
  positioning: jsonb("positioning").notNull(), // Patient positioning steps
  draping: jsonb("draping").notNull(), // Draping protocol
  instruments: jsonb("instruments").notNull(), // Required instruments and sets
  mayoSetup: jsonb("mayo_setup").notNull(), // Mayo stand organization
  procedureSteps: jsonb("procedure_steps").notNull(), // Step-by-step procedure
  medications: jsonb("medications").notNull(), // Required medications and solutions
  complications: text("complications").array().notNull(), // Potential complications
  tips: text("tips").array().notNull(), // Success tips and best practices
  verifiedBy: varchar("verified_by").references(() => users.id), // CST who verified content
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User's personal notes on procedures (HIPAA-compliant)
export const userNotes = pgTable("user_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  procedureId: varchar("procedure_id").references(() => procedures.id).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User favorites for quick access
export const userFavorites = pgTable("user_favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  procedureId: varchar("procedure_id").references(() => procedures.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Community forum posts
export const forumPosts = pgTable("forum_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  authorId: varchar("author_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  specialty: text("specialty"),
  tags: text("tags").array().default(sql`ARRAY[]::text[]`),
  isPinned: boolean("is_pinned").default(false),
  replyCount: integer("reply_count").default(0),
  likeCount: integer("like_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Forum post replies
export const forumReplies = pgTable("forum_replies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").references(() => forumPosts.id).notNull(),
  authorId: varchar("author_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Post likes/reactions
export const postLikes = pgTable("post_likes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  postId: varchar("post_id").references(() => forumPosts.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// User activity tracking for recently viewed procedures
export const userActivity = pgTable("user_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  procedureId: varchar("procedure_id").references(() => procedures.id).notNull(),
  viewedAt: timestamp("viewed_at").defaultNow(),
});

// Video categories for organizing surgical videos
export const videoCategories = pgTable("video_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  sortOrder: integer("sort_order").default(0),
});

// Surgical videos with educational content
export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: integer("duration").notNull(), // Duration in seconds
  thumbnailUrl: text("thumbnail_url"),
  videoUrl: text("video_url").notNull(),
  category: varchar("category").references(() => videoCategories.id).notNull(),
  specialtyId: varchar("specialty_id").references(() => specialties.id),
  procedureId: varchar("procedure_id").references(() => procedures.id),
  difficulty: text("difficulty").notNull(), // Basic, Intermediate, Advanced
  tags: text("tags").array().default(sql`ARRAY[]::text[]`),
  accessTier: text("access_tier").notNull().default("free"), // free, standard, premium
  cmeCredits: boolean("cme_credits").default(false),
  certificationRequired: boolean("certification_required").default(false),
  isPublished: boolean("is_published").default(false),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
  verifiedBy: varchar("verified_by").references(() => users.id),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User video progress tracking
export const videoProgress = pgTable("video_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  videoId: varchar("video_id").references(() => videos.id).notNull(),
  progressTime: integer("progress_time").default(0), // Progress in seconds
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  lastWatchedAt: timestamp("last_watched_at").defaultNow(),
});

// Video favorites for user bookmarking
export const videoFavorites = pgTable("video_favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  videoId: varchar("video_id").references(() => videos.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Video likes for engagement tracking
export const videoLikes = pgTable("video_likes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  videoId: varchar("video_id").references(() => videos.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Video comments for community engagement  
export const videoComments = pgTable("video_comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  videoId: varchar("video_id").references(() => videos.id).notNull(),
  authorId: varchar("author_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  timestamp: integer("timestamp"), // Time in video when comment was made
  parentId: varchar("parent_id"), // For reply threads - will reference videoComments.id
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSpecialtySchema = createInsertSchema(specialties).omit({
  id: true,
});

export const insertProcedureSchema = createInsertSchema(procedures).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  verifiedAt: true,
});

export const insertUserNoteSchema = createInsertSchema(userNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertForumPostSchema = createInsertSchema(forumPosts).omit({
  id: true,
  replyCount: true,
  likeCount: true,
  createdAt: true,
  updatedAt: true,
});

export const insertForumReplySchema = createInsertSchema(forumReplies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVideoCategorySchema = createInsertSchema(videoCategories).omit({
  id: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  views: true,
  likes: true,
  createdAt: true,
  updatedAt: true,
  verifiedAt: true,
});

export const insertVideoProgressSchema = createInsertSchema(videoProgress).omit({
  id: true,
  completedAt: true,
  lastWatchedAt: true,
});

export const insertVideoCommentSchema = createInsertSchema(videoComments).omit({
  id: true,
  likes: true,
  createdAt: true,
  updatedAt: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Specialty = typeof specialties.$inferSelect;
export type Procedure = typeof procedures.$inferSelect;
export type UserNote = typeof userNotes.$inferSelect;
export type UserFavorite = typeof userFavorites.$inferSelect;
export type ForumPost = typeof forumPosts.$inferSelect;
export type ForumReply = typeof forumReplies.$inferSelect;
export type UserActivity = typeof userActivity.$inferSelect;
export type VideoCategory = typeof videoCategories.$inferSelect;
export type Video = typeof videos.$inferSelect;
export type VideoProgress = typeof videoProgress.$inferSelect;
export type VideoFavorite = typeof videoFavorites.$inferSelect;
export type VideoLike = typeof videoLikes.$inferSelect;
export type VideoComment = typeof videoComments.$inferSelect;

export type InsertSpecialty = z.infer<typeof insertSpecialtySchema>;
export type InsertProcedure = z.infer<typeof insertProcedureSchema>;
export type InsertUserNote = z.infer<typeof insertUserNoteSchema>;
export type InsertForumPost = z.infer<typeof insertForumPostSchema>;
export type InsertForumReply = z.infer<typeof insertForumReplySchema>;
export type InsertVideoCategory = z.infer<typeof insertVideoCategorySchema>;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type InsertVideoProgress = z.infer<typeof insertVideoProgressSchema>;
export type InsertVideoComment = z.infer<typeof insertVideoCommentSchema>;
