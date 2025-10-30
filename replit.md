# Scrub Life Pro - Mobile Guide for Surgical Technologists

## Overview

Scrub Life Pro is a comprehensive mobile reference guide and professional community hub for surgical technologists. It provides quick access to procedure guides, instrumentation references, and community knowledge sharing. The application features a subscription-based model (free, standard, premium) and emphasizes a premium medical aesthetic with glassmorphism design elements. The business vision is to offer a vital, accessible resource that enhances professional practice and community engagement within the surgical technology field.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React with TypeScript and Vite
- **Styling**: Tailwind CSS with custom medical-themed glassmorphism design system
- **UI Components**: Radix UI primitives and shadcn/ui library
- **State Management**: TanStack Query for server state; React Context for authentication
- **Routing**: Wouter for client-side routing
- **Mobile-First Design**: Responsive layout, bottom navigation, touch optimization, Progressive Web App (PWA) configuration
- **Screenshot Protection**: Multi-layered CSS/JS-based protection to safeguard content.

### Backend
- **Runtime**: Node.js with Express framework
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with bcrypt password hashing; PostgreSQL-backed sessions
- **API Design**: RESTful API for user management, content, and authentication
- **Content Management**: Detailed surgical procedure guides, specialty organization, user-generated content, CST-verified procedures, and community moderation.
- **CST Exam Preparation System**: Dedicated API endpoints and schema for exam questions, sessions, progress tracking, and statistics.

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon serverless platform.
- **Schema**: Comprehensive model including users, specialties, procedures, notes, forums, and activity.
- **Session Management**: PostgreSQL session store.

### Authentication and Authorization
- **Method**: Email/password with session management.
- **Security**: bcrypt hashing, HTTP-only cookies.
- **User Roles**: Subscription-tier based access control (free, standard, premium).
- **Verification**: CST certification verification for content contributors.
- **Email Validation**: Blocks test, fake, and disposable email domains during registration.

### Subscription and Access Control
- **Tier-Based Access**: Features and content access are determined by subscription tier (Free, Standard, Premium).
- **Specialty Selection**:
    - Free tier: 1 permanent specialty selection.
    - Standard tier: Up to 6 changeable specialties.
    - Premium tier: Unlimited specialties.
- **Exam Prep Access**: Tier-based question limits and mode availability for the CST Exam Preparation System.

## External Dependencies

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting.
- **Drizzle ORM**: Type-safe database operations.
- **ws library**: For WebSocket support with Neon.

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Headless UI primitives.
- **Lucide React**: Icon library.
- **Google Fonts**: Inter font family.

### Development Tools
- **Vite**: Build tool.
- **TypeScript**: For type safety.
- **ESBuild**: Fast JavaScript bundler.

### Authentication and Security
- **bcryptjs**: Password hashing.
- **express-session**: Session middleware.
- **connect-pg-simple**: PostgreSQL session store adapter.

### Data Fetching and State
- **TanStack Query**: Server state management.
- **React Hook Form**: Form validation with Zod.
- **date-fns**: Date manipulation utilities.

### Payment Processing and Subscriptions
- **Stripe**: Full subscription management with Stripe Checkout.
    - Supports Free, Standard ($14.99/month or $149.90/year), and Premium ($29.99/month or $299.90/year) tiers.
    - Monthly and annual billing options with annual discounts.
    - Webhook handler for subscription status updates.
    - Customer portal access.

### Monetization
- **Google AdSense**: Integrated for free tier users, with strategic, non-intrusive ad placements and upgrade prompts.