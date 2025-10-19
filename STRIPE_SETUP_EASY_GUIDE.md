# Stripe Setup - Super Easy Step-by-Step Guide

## Part 1: Create Your Products (5 minutes)

### Step 1: Open Stripe Dashboard
1. Go to https://dashboard.stripe.com
2. Log in with your Stripe account
3. **IMPORTANT**: Make sure you're in **TEST MODE** (there's a toggle at the top right - it should say "Test mode ON")

### Step 2: Go to Products
1. Look at the left sidebar
2. Click on **"More"** (it's near the bottom)
3. Click on **"Product catalog"**

### Step 3: Create Standard Tier Product
1. Click the blue **"+ Create product"** button (top right)
2. Fill in these fields:

   **Name**: `Scrub Life Pro Standard`
   
   **Description**: `Access to 200+ procedures, 10 specialties, full community forum`
   
3. Scroll down to the **"Pricing"** section
4. Click **"More pricing options"**
5. Select **"Recurring"** (NOT "One time")
6. Fill in:
   - **Amount**: `14.99`
   - **Currency**: `USD`
   - **Billing period**: Select `Monthly` from the dropdown
   
7. Click the blue **"Add product"** button at the bottom

8. **CRITICAL**: After it saves, you'll see your new product. Look for the **Price** listed under it. It will look like `price_1ABC123...`
9. **Copy this Price ID** - write it down or save it somewhere safe!

### Step 4: Create Premium Tier Product
1. Click the blue **"+ Create product"** button again
2. Fill in these fields:

   **Name**: `Scrub Life Pro Premium`
   
   **Description**: `Unlimited procedures, all specialties, video library, priority support`
   
3. Scroll down to **"Pricing"** section
4. Click **"More pricing options"**
5. Select **"Recurring"**
6. Fill in:
   - **Amount**: `29.99`
   - **Currency**: `USD`
   - **Billing period**: `Monthly`
   
7. Click **"Add product"**
8. **Copy this Price ID** too - it starts with `price_...`

### ✅ You now have 2 Price IDs!
They look like:
- Standard: `price_1ABC123xyz...`
- Premium: `price_1DEF456abc...`

Keep these safe - we'll use them in a minute!

---

## Part 2: Set Up Webhook (3 minutes)

### Step 1: Go to Webhooks
1. In the left sidebar, click **"Developers"**
2. Click **"Webhooks"**

### Step 2: Add Your Endpoint
1. Click the blue **"Add endpoint"** button
2. **Endpoint URL**: Type this EXACTLY:
   ```
   https://scrublifepro.com/api/webhooks/stripe
   ```
   (or if you're testing on Replit, use your Replit URL instead)

3. **Select events to listen to**:
   - Click the dropdown that says "Select events"
   - Type `checkout.session.completed` and check the box
   - Type `customer.subscription.updated` and check the box
   - Type `customer.subscription.deleted` and check the box
   - Type `customer.subscription.trial_will_end` and check the box
   
   OR you can just click "Select all events" if you prefer (easier!)

4. Click **"Add endpoint"**

### Step 3: Get Your Webhook Secret
1. After adding the endpoint, you'll see it in the list
2. Click on it to open the details
3. Look for **"Signing secret"** - it's hidden by default
4. Click **"Reveal"** next to it
5. **Copy this secret** - it looks like `whsec_ABC123xyz...`

### ✅ You now have your Webhook Secret!

---

## Part 3: Add to Replit Secrets (2 minutes)

Now we need to add those 3 values to your Replit project.

### Step 1: Open Replit Secrets
1. In your Replit project, look at the left sidebar
2. Click the **🔒 lock icon** (it says "Secrets" when you hover)

### Step 2: Add the 3 Secrets

**Secret 1:**
- Name: `STRIPE_STANDARD_PRICE_ID`
- Value: Paste your Standard price ID (the one that starts with `price_...`)
- Click "Add new secret"

**Secret 2:**
- Name: `STRIPE_PREMIUM_PRICE_ID`
- Value: Paste your Premium price ID (the other `price_...`)
- Click "Add new secret"

**Secret 3:**
- Name: `STRIPE_WEBHOOK_SECRET`
- Value: Paste your webhook secret (the one that starts with `whsec_...`)
- Click "Add new secret"

### ✅ Done! Your Stripe is configured!

---

## Part 4: Restart Your App

After adding the secrets:
1. Go back to the Replit console/shell
2. Your app should automatically restart
3. OR click the "Stop" button and then "Run" button to restart it

---

## Testing It Works

### Quick Test:
1. Look at your app's console/logs
2. You should NOT see any errors about "Missing STRIPE_STANDARD_PRICE_ID" or similar
3. If you see those errors, double-check you added the secrets with the EXACT names above

### What Each Secret Does:
- `STRIPE_STANDARD_PRICE_ID` - Tells your app which Stripe product to use for $14.99/month tier
- `STRIPE_PREMIUM_PRICE_ID` - Tells your app which Stripe product to use for $29.99/month tier
- `STRIPE_WEBHOOK_SECRET` - Lets Stripe securely talk to your app to update user subscriptions

---

## Troubleshooting

### "I can't find Product Catalog"
- Click "More" in the left sidebar
- OR try clicking "Products" if you see it

### "I don't see Price ID"
- After creating a product, click on the product name
- The price will be listed underneath - look for something starting with `price_`

### "Webhook endpoint failed"
- Make sure your app is published and accessible at https://scrublifepro.com
- The webhook URL MUST be https:// (not http://)
- Test mode webhooks work with test URLs, but production needs your live domain

### "Where's the Signing Secret?"
- After adding a webhook endpoint, click on it in the list
- Scroll down to find "Signing secret"
- Click "Reveal" to see it

---

## What's Next?

Once you've completed these steps:

1. ✅ Your Stripe is configured
2. ✅ Your app can create subscriptions
3. ✅ Webhooks will automatically update user tiers when they pay

**Next step**: I can help you build the frontend pricing page where users can click "Upgrade" and go to Stripe checkout!

---

## Important Notes

### Test Mode vs Live Mode
- Right now you're in **TEST MODE** (that's good for testing!)
- When you're ready to accept real payments, you'll need to:
  1. Create the same products in **LIVE MODE**
  2. Get the LIVE price IDs
  3. Update your Replit secrets with the LIVE values
  4. Switch the toggle from Test to Live in Stripe Dashboard

### Test Credit Card
When in test mode, use this fake card to test:
- Card number: `4242 4242 4242 4242`
- Expiration: Any future date (like 12/25)
- CVC: Any 3 digits (like 123)
- ZIP: Any 5 digits (like 12345)

This card will always succeed in test mode!

---

**Questions?** Let me know which step you're stuck on and I'll help you through it! 🚀
