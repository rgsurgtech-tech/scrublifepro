# Scrub Life Pro - Mobile Guide for Surgical Technologists

## Overview

Scrub Life Pro is a comprehensive mobile reference guide and professional community hub designed specifically for surgical technologists. The application provides quick access to procedure guides, instrumentation references, and community knowledge sharing. It features a subscription-based model with multiple tiers (free, standard, premium) and emphasizes a premium medical aesthetic with glassmorphism design elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for development tooling
- **Styling**: Tailwind CSS with custom design system implementing glassmorphism aesthetics
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interfaces
- **State Management**: TanStack Query for server state management and React Context for authentication
- **Routing**: Wouter for lightweight client-side routing
- **Design System**: Custom medical-themed color palette with cyan-purple gradients and glass effects

### Backend Architecture
- **Runtime**: Node.js with Express framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Session-based authentication with bcrypt password hashing
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **API Design**: RESTful API with Express routes handling authentication, user management, and content delivery

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon serverless platform
- **Schema Design**: Comprehensive surgical data model including users, specialties, procedures, notes, forums, and activity tracking
- **Session Management**: PostgreSQL session store for persistent user sessions
- **File Storage**: Static assets served through Vite with attached_assets directory

### Authentication and Authorization
- **Authentication Method**: Email/password-based with session management
- **Password Security**: bcrypt hashing with salt rounds for secure password storage
- **Session Management**: Server-side sessions with HTTP-only cookies
- **User Roles**: Subscription-tier based access control (free, standard, premium)
- **Verification System**: CST certification verification for content contributors

### Content Management System
- **Procedure Database**: Detailed surgical procedure guides with step-by-step instructions
- **Specialty Organization**: Categorized content by surgical specialties with procedure counts
- **User-Generated Content**: Personal notes, favorites, and community forum posts
- **Content Verification**: CST-verified procedures and community moderation system

### Mobile-First Design
- **Responsive Design**: Mobile-optimized with glassmorphism UI elements
- **Bottom Navigation**: Primary navigation pattern with active state indicators
- **Touch Interactions**: Optimized for mobile touch interfaces with appropriate sizing
- **Progressive Web App**: Configured for mobile app-like experience

## External Dependencies

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database operations with schema migrations
- **WebSocket Support**: ws library for Neon serverless WebSocket connections

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom medical theme
- **Radix UI**: Headless UI primitives for accessibility and keyboard navigation
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Inter font family via CDN for typography

### Development Tools
- **Vite**: Build tool with development server and hot module replacement
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment with runtime error handling

### Authentication and Security
- **bcryptjs**: Password hashing and comparison utilities
- **express-session**: Session middleware for Express applications
- **connect-pg-simple**: PostgreSQL session store adapter

### Data Fetching and State
- **TanStack Query**: Server state management with caching and synchronization
- **React Hook Form**: Form validation with Zod schema validation
- **date-fns**: Date manipulation and formatting utilities

### Payment Processing and Subscriptions
- **Stripe Integration**: Full subscription management with Stripe Checkout
- **Subscription Tiers**: Three tiers - Free ($0), Standard, Premium
- **Flexible Billing**: Monthly or annual billing options with 16.7% discount for annual (2 months free)
  - Standard: $14.99/month or $149.90/year
  - Premium: $29.99/month or $299.90/year
- **Webhook Handler**: Automated subscription status updates via Stripe webhooks
- **Customer Management**: Automatic Stripe customer creation and linking to user accounts
- **Checkout Session**: Secure redirect-based payment flow using Stripe Checkout
- **Subscription Status Tracking**: Real-time subscription status and tier management in database

## Recent Changes

### Specialty Selection System with Tier Limits (October 2025)
- **Backend API Endpoints**: 
  - GET /api/user/specialties - Returns user's selected specialties, tier, and max limit
  - POST /api/user/specialties - Saves specialty selections with server-side tier validation
- **Specialty Selector Modal Component**:
  - Dialog-based UI for selecting specialties with checkboxes
  - Real-time validation with toast error messages for tier limit violations
  - Shows tier information and selection count
  - Cancel and Save buttons with loading states
  - Automatic query invalidation and page refresh after save
- **Tier-Based Access Control**:
  - Free tier: 1 specialty maximum
  - Standard tier: 10 specialties maximum
  - Premium tier: Unlimited access (all 20 specialties)
- **Specialties Page Filtering**:
  - Free/Standard users see only their selected specialties
  - Premium users see all 20 specialties
  - Empty state with call-to-action for users without selections
  - "Manage Specialties" button in header for tier-restricted users
- **User Experience**:
  - Click specialty cards to toggle selection
  - Visual feedback with checkmarks and ring highlights
  - Selection summary displayed in modal
  - Graceful error handling with toast notifications

### Screenshot Protection System (October 2025)
- **Multi-Layer Protection**:
  - CSS-based watermarking with user-select: none
  - JavaScript event blocking for right-click and context menus
  - Keyboard shortcut blocking (PrintScreen, Ctrl+P, Ctrl+S, F12, DevTools)
  - Blur event detection for screenshot tool monitoring
- **User-Friendly Implementation**:
  - Form fields remain selectable for usability
  - Silent error handling for clipboard operations
  - Non-intrusive content protection
  - Maintains professional user experience while protecting content

### Annual Billing Option Added (October 2025)
- Added monthly and annual billing options with toggle on subscribe page
- Annual plans offer 16.7% discount (equivalent to 2 months free) - industry standard
- Pricing: Standard $14.99/month or $149.90/year, Premium $29.99/month or $299.90/year
- Automatic annual price creation in Stripe via initialization endpoint
- Webhook handlers updated to recognize both monthly and annual subscriptions
- UI shows savings breakdown and encourages annual subscriptions as default

### Production Ready - Beta Testing Removed (October 2025)
- Removed beta testing access modal and banner
- App is now publicly accessible without beta restrictions
- Ready for live deployment and production use

### Stripe Payment Integration (October 2025)
- Implemented full Stripe Checkout integration for subscription payments
- Created subscription products and pricing in Stripe
- Set up webhook endpoint for handling subscription lifecycle events
- Configured proper success/cancel URLs for checkout flow with correct domain handling
- Integrated subscription tier updates with user authentication system
- Added customer portal access for subscription management
- Success and cancel pages implemented with proper routing
- Note: Stripe Checkout requires opening in new tab (not iframe) for security compliance