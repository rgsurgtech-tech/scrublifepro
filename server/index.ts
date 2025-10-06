import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import pg from "pg";
const { Pool } = pg;
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PostgreSQL session store
const PgSession = ConnectPgSimple(session);
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Session middleware - Secure and working configuration
console.log('🔧 Session config - ENV:', process.env.NODE_ENV);

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
    secure: false, // False for development
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
      
      // Re-seed if database has fewer than 200 procedures (incomplete data)
      if (procedureCount.length < 200) {
        log(`🌱 Production database incomplete (${procedureCount.length} procedures), re-seeding...`);
        const seedFn = (await import('./seed')).default;
        await seedFn();
        log('✅ Production database seeded successfully with all 204 procedures!');
      } else {
        log(`✓ Production database complete with ${procedureCount.length} procedures`);
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
