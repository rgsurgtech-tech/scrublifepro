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
    - Free tier: 1 permanent specialty selection with access to ALL procedures within that specialty.
    - Standard tier: Up to 6 changeable specialties with access to ALL procedures across those specialties.
    - Premium tier: Unlimited specialties with access to ALL procedures across ALL specialties.
- **Procedure Access**: No limits on procedures within selected specialties. All tiers have unlimited access to procedures within their allowed specialties.
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
- **Influencer Marketing**: Lifetime memberships and custom promotional codes for influencers to share with subscribers.

## Admin API Endpoints

### Authentication
All admin endpoints require authentication via the `requireAdmin` middleware. Admin access is granted to users whose email addresses are in the `ADMIN_EMAILS` environment variable (comma-separated) or the default admin email: `admin@scrublifepro.com`.

### Lifetime Access Management

#### Grant Lifetime Access
**Endpoint:** `POST /api/admin/lifetime-access/grant`

**Description:** Grants lifetime premium access to a user, allowing them to enjoy all premium features without an active subscription.

**Request Body:**
```json
{
  "userId": "user-id-here"
}
```

**Response:**
```json
{
  "message": "Lifetime access granted successfully",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "hasLifetimeAccess": true,
    "lifetimeGrantedAt": "2025-01-01T00:00:00.000Z",
    "lifetimeGrantedBy": "admin-user-id",
    ...
  }
}
```

**Use Case:** Grant lifetime access to influencers or special partners who will promote the platform.

---

#### Revoke Lifetime Access
**Endpoint:** `POST /api/admin/lifetime-access/revoke`

**Description:** Revokes lifetime access from a user. The user will revert to their actual subscription tier.

**Request Body:**
```json
{
  "userId": "user-id-here"
}
```

**Response:**
```json
{
  "message": "Lifetime access revoked successfully",
  "user": {
    "id": "user-id",
    "hasLifetimeAccess": false,
    ...
  }
}
```

---

### Promotional Code Management

#### Create Promotional Code
**Endpoint:** `POST /api/admin/promo-codes`

**Description:** Creates a new promotional code in both Stripe and the local database. Influencers can share this code with their subscribers.

**Request Body:**
```json
{
  "code": "INFLUENCER10",
  "influencerName": "Dr. Sarah Johnson",
  "influencerContact": "sarah@example.com",
  "discountType": "percentage",
  "discountValue": 10,
  "duration": "forever",
  "notes": "10% off for Dr. Johnson's subscribers"
}
```

**Fields:**
- `code` (required): The promotional code (will be converted to uppercase)
- `influencerName` (required): Name of the influencer
- `influencerContact` (optional): Contact info for the influencer
- `discountType` (required): Either "percentage" or "amount"
- `discountValue` (required): The discount value (e.g., 10 for 10% or 5 for $5)
- `duration` (required): "once", "forever", or "repeating"
- `notes` (optional): Internal notes about this code

**Response:**
```json
{
  "message": "Promotional code created successfully",
  "promoCode": {
    "id": "promo-id",
    "code": "INFLUENCER10",
    "stripePromotionCodeId": "promo_xxx",
    "stripeCouponId": "coup_xxx",
    "influencerName": "Dr. Sarah Johnson",
    "timesUsed": 0,
    "isActive": true,
    ...
  },
  "stripePromotionCode": { ... }
}
```

**Use Case:** Create custom discount codes for influencers to share with their audience, tracking usage and conversions.

---

#### List All Promotional Codes
**Endpoint:** `GET /api/admin/promo-codes`

**Description:** Retrieves all promotional codes with usage statistics.

**Response:**
```json
[
  {
    "id": "promo-id",
    "code": "INFLUENCER10",
    "influencerName": "Dr. Sarah Johnson",
    "timesUsed": 25,
    "isActive": true,
    ...
  },
  ...
]
```

---

#### Get Specific Promotional Code
**Endpoint:** `GET /api/admin/promo-codes/:code`

**Description:** Retrieves detailed information about a specific promotional code, including Stripe details.

**Response:**
```json
{
  "id": "promo-id",
  "code": "INFLUENCER10",
  "influencerName": "Dr. Sarah Johnson",
  "timesUsed": 25,
  "stripeDetails": { ... },
  ...
}
```

---

#### Deactivate Promotional Code
**Endpoint:** `POST /api/admin/promo-codes/:id/deactivate`

**Description:** Deactivates a promotional code in both Stripe and the local database.

**Response:**
```json
{
  "message": "Promotional code deactivated successfully",
  "promoCode": {
    "id": "promo-id",
    "code": "INFLUENCER10",
    "isActive": false,
    ...
  }
}
```

---

### How Lifetime Access Works

1. **Grant Lifetime Access**: Admin grants lifetime access to an influencer via `/api/admin/lifetime-access/grant`
2. **Effective Tier**: The system automatically treats users with lifetime access as premium tier users
3. **Access Control**: All tier-based restrictions check the "effective tier" (considers lifetime access)
4. **Subscription Protection**: Lifetime members cannot create new subscriptions and won't be downgraded if their subscription expires

### How Promotional Codes Work

1. **Code Creation**: Admin creates a promotional code via `/api/admin/promo-codes`
2. **Code Sharing**: Influencer shares the code with their subscribers
3. **Code Usage**: Users apply the code during Stripe checkout
4. **Usage Tracking**: Stripe webhook automatically tracks code usage and increments the counter
5. **Analytics**: Admin can view usage statistics via `/api/admin/promo-codes`