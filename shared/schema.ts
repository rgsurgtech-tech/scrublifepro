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

export type InsertSpecialty = z.infer<typeof insertSpecialtySchema>;
export type InsertProcedure = z.infer<typeof insertProcedureSchema>;
export type InsertUserNote = z.infer<typeof insertUserNoteSchema>;
export type InsertForumPost = z.infer<typeof insertForumPostSchema>;
export type InsertForumReply = z.infer<typeof insertForumReplySchema>;
