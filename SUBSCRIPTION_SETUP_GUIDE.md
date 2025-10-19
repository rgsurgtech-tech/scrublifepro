# Scrub Life Pro - Subscription Setup Guide

## Overview
This guide will help you transition from beta testing to a live subscription-based app with Stripe integration.

## 1. Stripe Dashboard Setup

### Create Products in Stripe Dashboard

1. **Go to Stripe Dashboard** → Products
2. **Create 3 Products**:

   **Standard Tier**:
   - Name: "Scrub Life Pro Standard"
   - Description: "Access to 200+ procedures, 10 specialties, full community forum"
   - Price: $14.99/month (recurring)
   - Copy the **Price ID** (starts with `price_`)

   **Premium Tier**:
   - Name: "Scrub Life Pro Premium"
   - Description: "Unlimited procedures, all specialties, video library, priority support"
   - Price: $29.99/month (recurring)
   - Copy the **Price ID** (starts with `price_`)

### Set Environment Variables

Add these to your Replit Secrets:

```
STRIPE_STANDARD_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_PREMIUM_PRICE_ID=price_yyyyyyyyyyyyyy
STRIPE_WEBHOOK_SECRET=whsec_zzzzzzzzzzzzz (from webhook setup below)
```

## 2. Stripe Webhook Setup

### Create Webhook Endpoint

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://scrublifepro.com/api/webhooks/stripe`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `customer.subscription.trial_will_end`
5. Copy the **Signing Secret** (starts with `whsec_`)
6. Add it to Replit Secrets as `STRIPE_WEBHOOK_SECRET`

## 3. Database Schema Update

**Change default subscription tier from "premium" to "free":**

In `shared/schema.ts`, line 16:
```typescript
// BEFORE:
subscriptionTier: text("subscription_tier").notNull().default("premium"),

// AFTER:
subscriptionTier: text("subscription_tier").notNull().default("free"),
```

Then run:
```bash
npm run db:push
```

## 4. Remove Beta Testing Restrictions

### Option A: Completely Remove Beta Testing

1. Remove beta signup modal from frontend
2. Remove beta check routes
3. Allow all users to register

### Option B: Keep Beta Testing Optional (Recommended for gradual rollout)

1. Add environment variable: `BETA_MODE=false`
2. Keep beta routes but make them conditional
3. Users can register freely when `BETA_MODE=false`

## 5. Subscription Tiers & Features

### Free Tier
- ❌ No payment required
- ✅ 50+ basic procedures
- ✅ 3 specialties max
- ✅ Forum (read-only)
- ✅ Basic instruments
- ✅ 10 personal notes max

### Standard Tier ($14.99/month)
- ✅ 200+ procedures
- ✅ 10 specialties
- ✅ Forum (full access)
- ✅ Complete instrument database
- ✅ Unlimited personal notes
- ✅ Procedure favorites

### Premium Tier ($29.99/month)
- ✅ Unlimited procedures
- ✅ All 20 specialties
- ✅ Video library access
- ✅ Forum (verified badge)
- ✅ Complete instrument database
- ✅ Unlimited notes & favorites
- ✅ CST verification badge
- ✅ Priority support
- ✅ Early access to new content

## 6. User Flow

### New User Signup
1. User registers → Starts on **Free** tier
2. User can browse limited content
3. User clicks "Upgrade" button
4. Redirected to Stripe Checkout
5. After payment → Subscription tier updated automatically via webhook
6. User gets immediate access to paid features

### Subscription Management
1. User goes to "Account Settings"
2. Clicks "Manage Subscription"
3. Redirected to Stripe Customer Portal
4. Can upgrade, downgrade, or cancel
5. Changes reflected automatically via webhooks

## 7. Access Control

The system uses middleware to check subscription tiers:

```typescript
// Example: Video access (Premium only)
if (!canAccessFeature(user.subscriptionTier, 'videos')) {
  return res.status(403).json({ error: "Premium subscription required" });
}
```

## 8. Testing Payment Flow

### Test Mode (Development)
1. Use Stripe test keys
2. Test card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any 3-digit CVC
5. Any ZIP code

### Production Mode
1. Switch to live Stripe keys
2. Real payments will be processed
3. Make sure webhook endpoint uses HTTPS

## 9. Important Reminders

✅ **DO**:
- Test the complete payment flow before going live
- Set up email notifications for failed payments
- Monitor Stripe Dashboard for subscription events
- Keep webhook secret secure
- Test webhook events using Stripe CLI

❌ **DON'T**:
- Expose Stripe secret keys in frontend code
- Forget to handle subscription failures
- Ignore webhook events (they update user access)
- Use live keys in development

## 10. Deployment Checklist

- [ ] Stripe products created with correct prices
- [ ] Environment variables set (price IDs, webhook secret)
- [ ] Database schema updated (default tier = "free")
- [ ] Webhook endpoint configured in Stripe Dashboard
- [ ] Payment flow tested end-to-end in test mode
- [ ] Beta testing restrictions removed/adjusted
- [ ] Frontend pricing page created
- [ ] Subscription management page created
- [ ] Email notifications configured (optional)
- [ ] Error handling for failed payments implemented
- [ ] Analytics/tracking set up (optional)
- [ ] **Republish app** from Replit Publishing workspace

## 11. Next Steps After Setup

1. Test with real test card in Stripe test mode
2. Verify webhooks are being received
3. Check that user tiers update correctly
4. Test subscription cancellation
5. Test subscription upgrade/downgrade
6. Switch to live mode
7. Announce launch!

## Support Resources

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Test Cards**: https://stripe.com/docs/testing
- **Webhook Testing**: Use Stripe CLI for local testing
- **Customer Portal**: Stripe handles all subscription management UI

## Troubleshooting

### Webhooks not working?
- Check webhook secret is correct
- Verify endpoint URL is accessible (HTTPS required)
- Check Stripe Dashboard → Developers → Webhooks → Event delivery
- Use Stripe CLI to test locally: `stripe listen --forward-to localhost:5000/api/webhooks/stripe`

### User tier not updating?
- Check webhook events in Stripe Dashboard
- Verify `handleCheckoutCompleted` is being called
- Check database for `stripeCustomerId` and `stripeSubscriptionId`
- Review server logs for errors

### Payment failing?
- Verify Stripe public key in frontend
- Check network tab for API errors
- Verify price IDs are correct
- Test with Stripe test cards first
