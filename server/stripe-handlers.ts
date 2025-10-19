import Stripe from 'stripe';
import { storage } from './storage';
import { ANNUAL_PRICING } from './subscription-config';

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
});

/**
 * Initialize annual Stripe products and prices
 * Call this once to create annual pricing options
 */
export async function initializeAnnualPrices() {
  try {
    console.log('🔧 Checking for annual Stripe prices...');
    
    // Get existing products
    const products = await stripe.products.list({ limit: 100 });
    
    // Find Standard and Premium products
    const standardProduct = products.data.find(p => p.name === 'Scrub Life Pro Standard');
    const premiumProduct = products.data.find(p => p.name === 'Scrub Life Pro Premium');
    
    if (!standardProduct || !premiumProduct) {
      console.log('⚠️ Standard or Premium product not found. Please create monthly products first.');
      return null;
    }
    
    // Check if annual prices already exist
    const standardPrices = await stripe.prices.list({ product: standardProduct.id });
    const premiumPrices = await stripe.prices.list({ product: premiumProduct.id });
    
    const standardAnnualExists = standardPrices.data.some(p => p.recurring?.interval === 'year');
    const premiumAnnualExists = premiumPrices.data.some(p => p.recurring?.interval === 'year');
    
    let standardAnnualPrice, premiumAnnualPrice;
    
    // Create Standard annual price if it doesn't exist
    if (!standardAnnualExists) {
      console.log('📝 Creating Standard annual price...');
      standardAnnualPrice = await stripe.prices.create({
        product: standardProduct.id,
        unit_amount: Math.round(ANNUAL_PRICING.standard * 100), // Convert to cents
        currency: 'usd',
        recurring: {
          interval: 'year',
        },
      });
      console.log(`✅ Standard annual price created: ${standardAnnualPrice.id}`);
    } else {
      standardAnnualPrice = standardPrices.data.find(p => p.recurring?.interval === 'year');
      console.log(`✅ Standard annual price already exists: ${standardAnnualPrice?.id}`);
    }
    
    // Create Premium annual price if it doesn't exist
    if (!premiumAnnualExists) {
      console.log('📝 Creating Premium annual price...');
      premiumAnnualPrice = await stripe.prices.create({
        product: premiumProduct.id,
        unit_amount: Math.round(ANNUAL_PRICING.premium * 100), // Convert to cents
        currency: 'usd',
        recurring: {
          interval: 'year',
        },
      });
      console.log(`✅ Premium annual price created: ${premiumAnnualPrice.id}`);
    } else {
      premiumAnnualPrice = premiumPrices.data.find(p => p.recurring?.interval === 'year');
      console.log(`✅ Premium annual price already exists: ${premiumAnnualPrice?.id}`);
    }
    
    return {
      standardAnnual: standardAnnualPrice?.id,
      premiumAnnual: premiumAnnualPrice?.id,
    };
  } catch (error) {
    console.error('Error initializing annual prices:', error);
    throw error;
  }
}

/**
 * Create a Stripe Checkout session for subscription
 */
export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    const user = await storage.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Create or get Stripe customer
    let customerId = user.stripeCustomerId;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
      customerId = customer.id;
      
      // Save customer ID to user record
      await storage.updateUserStripeInfo(user.id, customerId, user.stripeSubscriptionId || '');
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: user.id,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Create a Stripe Billing Portal session
 */
export async function createPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

/**
 * Handle checkout.session.completed event
 */
export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    const userId = session.metadata?.userId;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    if (!userId) {
      console.error('No userId in checkout session metadata');
      return;
    }

    // Update user with Stripe customer and subscription IDs
    await storage.updateUserStripeInfo(userId, customerId, subscriptionId);

    // Get subscription to determine tier
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0]?.price.id;

    // Determine tier based on price ID (check both monthly and annual)
    let tier = 'free';
    if (priceId === process.env.STRIPE_STANDARD_PRICE_ID || 
        priceId === process.env.STRIPE_STANDARD_ANNUAL_PRICE_ID) {
      tier = 'standard';
    } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID || 
               priceId === process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID) {
      tier = 'premium';
    }

    // Update user subscription tier
    await storage.updateUserSubscriptionTier(userId, tier);

    console.log(`✅ Subscription activated for user ${userId}: ${tier}`);
  } catch (error) {
    console.error('Error handling checkout completed:', error);
    throw error;
  }
}

/**
 * Handle subscription.updated event
 */
export async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    
    // Find user by Stripe customer ID
    const user = await storage.getUserByStripeCustomerId(customerId);

    if (!user) {
      console.error('No user found for customer:', customerId);
      return;
    }

    const priceId = subscription.items.data[0]?.price.id;
    const status = subscription.status;

    // Determine tier based on subscription status and price (check both monthly and annual)
    let tier = 'free';
    
    if (status === 'active' || status === 'trialing') {
      if (priceId === process.env.STRIPE_STANDARD_PRICE_ID || 
          priceId === process.env.STRIPE_STANDARD_ANNUAL_PRICE_ID) {
        tier = 'standard';
      } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID || 
                 priceId === process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID) {
        tier = 'premium';
      }
    }

    // Update user subscription tier
    await storage.updateUserSubscriptionTier(user.id, tier);

    console.log(`✅ Subscription updated for user ${user.id}: ${tier} (status: ${status})`);
  } catch (error) {
    console.error('Error handling subscription updated:', error);
    throw error;
  }
}

/**
 * Handle subscription.deleted event (cancellation)
 */
export async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    
    // Find user by Stripe customer ID
    const user = await storage.getUserByStripeCustomerId(customerId);

    if (!user) {
      console.error('No user found for customer:', customerId);
      return;
    }

    // Downgrade to free tier
    await storage.updateUserSubscriptionTier(user.id, 'free');
    
    // Clear subscription ID
    await storage.updateUserStripeInfo(user.id, user.stripeCustomerId || '', '');

    console.log(`✅ Subscription cancelled for user ${user.id}, downgraded to free`);
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
    throw error;
  }
}

/**
 * Handle customer.subscription.trial_will_end event
 */
export async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string;
    
    // Find user by Stripe customer ID
    const user = await storage.getUserByStripeCustomerId(customerId);

    if (!user) {
      console.error('No user found for customer:', customerId);
      return;
    }

    // Here you could send an email notification about trial ending
    console.log(`⚠️ Trial ending soon for user ${user.email}`);
    
    // TODO: Implement email notification
  } catch (error) {
    console.error('Error handling trial will end:', error);
    throw error;
  }
}
