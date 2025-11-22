import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import pg from "pg";
const { Pool } = pg;
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import Stripe from "stripe";
import {
  handleCheckoutCompleted,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handleTrialWillEnd
} from "./stripe-handlers";

const app = express();

// CRITICAL: Stripe webhook MUST be registered BEFORE express.json() middleware
// Webhook needs raw body for signature verification
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).send('Webhook signature or secret missing');
  }

  // Initialize Stripe for webhook verification
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).send('Stripe not configured');
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
  });

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

// NOW apply JSON parsing for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PostgreSQL session store
const PgSession = ConnectPgSimple(session);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Session middleware - Secure and working configuration
const isProduction = process.env.REPLIT_DEPLOYMENT === 'true' || process.env.NODE_ENV === 'production';
console.log('🔧 Session config - ENV:', process.env.NODE_ENV, 'Production:', isProduction);

app.use(session({
  store: new PgSession({
    pool,
    tableName: 'session',
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET || 'surgitech-connect-secret-key-development',
  resave: true, // CRITICAL: Force resave for persistence
  saveUninitialized: false,
  cookie: {
    secure: isProduction, // True for HTTPS in production
    httpOnly: true, // SECURE: Restore XSS protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days  
    sameSite: 'lax'
  },
  name: 'surgiprep.sid' // Match the logout cookie name
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Auto-seed database in production if empty or incomplete
  if (process.env.REPLIT_DEPLOYMENT) {
    const { db } = await import('./db');
    const { procedures } = await import('@shared/schema');
    
    try {
      const procedureCount = await db.select().from(procedures);
      
      // Re-seed if database has fewer than 100 procedures (completely empty)
      // Current production has 133 procedures which is the correct baseline
      if (procedureCount.length < 100) {
        log(`🌱 Production database empty (${procedureCount.length} procedures), re-seeding...`);
        const seedFn = (await import('./seed')).default;
        await seedFn();
        log('✅ Production database seeded successfully!');
      } else {
        log(`✓ Production database ready with ${procedureCount.length} procedures`);
      }
    } catch (error) {
      log('⚠️ Auto-seeding error:', String(error));
    }
  }

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
