import Stripe from 'stripe';
import { storage } from './storage';

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
});

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

    // Determine tier based on price ID
    let tier = 'free';
    if (priceId === process.env.STRIPE_STANDARD_PRICE_ID) {
      tier = 'standard';
    } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
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

    // Determine tier based on subscription status and price
    let tier = 'free';
    
    if (status === 'active' || status === 'trialing') {
      if (priceId === process.env.STRIPE_STANDARD_PRICE_ID) {
        tier = 'standard';
      } else if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
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
