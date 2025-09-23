# SurgiPrep - Mobile Guide for Surgical Technologists

## Overview

SurgiPrep is a comprehensive mobile reference guide and professional community hub designed specifically for surgical technologists. The application provides quick access to procedure guides, instrumentation references, and community knowledge sharing. It features a subscription-based model with multiple tiers (free, standard, premium) and emphasizes a premium medical aesthetic with glassmorphism design elements.

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