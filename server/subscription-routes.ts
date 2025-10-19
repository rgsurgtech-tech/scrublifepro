/**
 * ADD THESE ROUTES TO server/routes.ts
 * Insert after the existing Stripe routes (around line 610)
 */

// Stripe Webhook Handler
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).send('Webhook signature or secret missing');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`⚠️  Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.trial_will_end':
        await handleTrialWillEnd(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create Stripe Checkout Session
app.post('/api/create-checkout-session', requireAuth, async (req: any, res) => {
  try {
    const { priceId } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    // Validate price ID
    const validPrices = [STRIPE_PRICES.standard, STRIPE_PRICES.premium];
    if (!validPrices.includes(priceId)) {
      return res.status(400).json({ error: 'Invalid price ID' });
    }

    const baseUrl = process.env.REPL_SLUG 
      ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
      : 'http://localhost:5000';

    const session = await createCheckoutSession(
      req.user.id,
      priceId,
      `${baseUrl}/subscription/success`,
      `${baseUrl}/subscription/cancel`
    );

    res.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Create checkout session error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create Stripe Customer Portal Session
app.post('/api/create-portal-session', requireAuth, async (req: any, res) => {
  try {
    const user = req.user;

    if (!user.stripeCustomerId) {
      return res.status(400).json({ error: 'No subscription found' });
    }

    const baseUrl = process.env.REPL_SLUG 
      ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
      : 'http://localhost:5000';

    const session = await createPortalSession(
      user.stripeCustomerId,
      `${baseUrl}/account`
    );

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Create portal session error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get subscription status
app.get('/api/subscription/status', requireAuth, async (req: any, res) => {
  try {
    const user = req.user;

    let subscriptionStatus = {
      tier: user.subscriptionTier,
      hasActiveSubscription: false,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: null as Date | null,
      stripeCustomerId: user.stripeCustomerId,
    };

    if (user.stripeSubscriptionId) {
      try {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        subscriptionStatus.hasActiveSubscription = subscription.status === 'active' || subscription.status === 'trialing';
        subscriptionStatus.cancelAtPeriodEnd = subscription.cancel_at_period_end;
        subscriptionStatus.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
      } catch (error) {
        console.error('Error retrieving subscription:', error);
      }
    }

    res.json(subscriptionStatus);
  } catch (error: any) {
    console.error('Get subscription status error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get pricing information
app.get('/api/pricing', (req, res) => {
  res.json({
    tiers: [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        priceId: null,
        features: [
          'Access to 50+ basic surgical procedures',
          'Limited specialty access (3 specialties)',
          'Community forum (read-only)',
          'Basic instrument references'
        ]
      },
      {
        id: 'standard',
        name: 'Standard',
        price: 14.99,
        priceId: STRIPE_PRICES.standard,
        features: [
          'Access to 200+ surgical procedures',
          'Access to 10 specialties',
          'Community forum (full access)',
          'Complete instrument database',
          'Personal notes (unlimited)',
          'Procedure favorites'
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 29.99,
        priceId: STRIPE_PRICES.premium,
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
        ]
      }
    ]
  });
});
