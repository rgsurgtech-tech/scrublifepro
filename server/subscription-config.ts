/**
 * Subscription tier configuration for Scrub Life Pro
 * 
 * To set up in Stripe Dashboard:
 * 1. Create Products: "Scrub Life Pro Free", "Scrub Life Pro Standard", "Scrub Life Pro Premium"
 * 2. Create Prices for each product
 * 3. Copy the Price IDs and add them to your .env file
 */

export const SUBSCRIPTION_TIERS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    stripePriceId: null, // No Stripe price for free tier
    features: [
      'Access to 50+ basic surgical procedures',
      'Limited specialty access (3 specialties)',
      'Community forum (read-only)',
      'Basic instrument references'
    ],
    limits: {
      proceduresPerMonth: 50,
      maxSpecialties: 3,
      forumAccess: 'read-only',
      videosAccess: false,
      notesLimit: 10
    }
  },
  STANDARD: {
    id: 'standard',
    name: 'Standard',
    price: 14.99, // $14.99/month
    stripePriceId: process.env.STRIPE_STANDARD_PRICE_ID, // Set in environment
    features: [
      'Access to 200+ surgical procedures',
      'Access to 10 specialties',
      'Community forum (full access)',
      'Complete instrument database',
      'Personal notes (unlimited)',
      'Procedure favorites'
    ],
    limits: {
      proceduresPerMonth: null, // unlimited
      maxSpecialties: 10,
      forumAccess: 'full',
      videosAccess: false,
      notesLimit: null // unlimited
    }
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 29.99, // $29.99/month
    stripePriceId: process.env.STRIPE_PREMIUM_PRICE_ID, // Set in environment
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
    ],
    limits: {
      proceduresPerMonth: null, // unlimited
      maxSpecialties: null, // all specialties
      forumAccess: 'verified',
      videosAccess: true,
      notesLimit: null // unlimited
    }
  }
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;

// Helper to get effective tier for a user (considering lifetime access)
// Users with lifetime access are treated as premium regardless of their actual subscription tier
export function getEffectiveTier(user: { subscriptionTier: string; hasLifetimeAccess?: boolean | null }): string {
  if (user.hasLifetimeAccess) {
    return 'premium';
  }
  return user.subscriptionTier;
}

// Helper to get tier config
export function getTierConfig(tier: string) {
  const tierKey = tier.toUpperCase() as SubscriptionTier;
  return SUBSCRIPTION_TIERS[tierKey] || SUBSCRIPTION_TIERS.FREE;
}

// Helper to check if user can access a feature
export function canAccessFeature(userTier: string, feature: string): boolean {
  const config = getTierConfig(userTier);
  
  switch (feature) {
    case 'videos':
      return config.limits.videosAccess === true;
    case 'forum-post':
      return config.limits.forumAccess === 'full' || config.limits.forumAccess === 'verified';
    case 'forum-read':
      return true; // All tiers can read
    case 'verified-badge':
      return config.limits.forumAccess === 'verified';
    default:
      return true;
  }
}

// Helper to check specialty access
export function canAccessSpecialty(userTier: string, userSpecialtyCount: number): boolean {
  const config = getTierConfig(userTier);
  if (config.limits.maxSpecialties === null) return true; // unlimited
  return userSpecialtyCount < config.limits.maxSpecialties;
}

// Stripe price mapping - these will be set from environment variables
export const STRIPE_PRICES = {
  standard: process.env.STRIPE_STANDARD_PRICE_ID || '',
  premium: process.env.STRIPE_PREMIUM_PRICE_ID || '',
  standardAnnual: process.env.STRIPE_STANDARD_ANNUAL_PRICE_ID || '',
  premiumAnnual: process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID || ''
};

// Annual pricing with 16.7% discount (2 months free)
export const ANNUAL_PRICING = {
  standard: 149.90, // $14.99 * 10 months
  premium: 299.90   // $29.99 * 10 months
};
