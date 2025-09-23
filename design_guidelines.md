# SurgiPrep Design Guidelines

## Design Approach
**Selected Approach:** Reference-Based Approach inspired by premium medical apps with glassmorphism aesthetics
**Justification:** Experience-focused application where visual appeal builds trust and engagement with healthcare professionals. The dark glassmorphism design creates a premium, professional atmosphere suitable for surgical environments.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Medical Cyan: 180 85% 45% (medical caduceus branding)
- Deep Navy: 220 25% 8% (primary dark background)
- Surgical Blue: 210 70% 35% (accent elements)

**Gradient System:**
- Primary Gradient: Cyan (180 85% 45%) to Purple (270 65% 50%) for buttons and CTAs
- Background Gradients: Subtle navy to black overlays on surgical room imagery

**Supporting Colors:**
- Success Green: 145 60% 40%
- Warning Amber: 35 80% 50%
- Error Red: 0 70% 45%
- Glass White: 0 0% 95% (for text on glass elements)

**Glass Elements:**
- Glass backgrounds: 20% opacity with backdrop blur
- Border highlights: 10% white opacity with subtle glow effects

### B. Typography
**Font System:** Inter (Google Fonts CDN)
- **Headers:** Inter 600-700, sizes 18px-28px
- **Body:** Inter 400-500, 14px-16px
- **Glass Element Text:** Inter 500-600 for enhanced readability on transparent backgrounds

### C. Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, and 8
- Glass card padding: p-6 for breathing room
- Icon spacing: p-4 for touch targets
- Section gaps: mb-8 for clear hierarchy

### D. Component Library

**Glassmorphism Cards:**
- Semi-transparent backgrounds with backdrop blur
- Subtle border gradients with soft shadows
- Rounded corners (16px-24px) for modern medical aesthetic

**Navigation:**
- Bottom glass navigation bar with blur effects
- Floating search bar with glass treatment
- Breadcrumb trails on glass backgrounds

**Specialty Selection:**
- Circular icons with glass backgrounds
- Hover states with subtle glow effects
- Grid layout optimized for touch interaction

**Buttons:**
- Primary: Cyan-to-purple gradients with glass overlay
- Secondary: Glass treatment with cyan borders
- Floating action buttons with medical caduceus icon

**Community Features:**
- Glass cards for discussion threads
- Engagement metrics with subtle cyan highlights
- User avatars with circular glass frames

### E. Background Treatment
**Surgical Room Imagery:**
- Blurred OR backgrounds with dark overlays
- High contrast maintained for text readability
- Professional medical equipment silhouettes

### F. Mobile-First Adaptations
- Large touch targets (minimum 48px) for gloved hands
- High contrast text for various lighting conditions
- Optimized glass effects for mobile performance
- Gesture-friendly card interactions

### G. Medical Context Features
- Quick access dashboard with glass widget cards
- Emergency-ready high contrast mode toggle
- Professional color scheme suitable for sterile environments
- Minimal animations to prevent distraction during critical tasks

## Images
**Background Images:** Blurred surgical room environments (OR lights, medical equipment) as full-screen backgrounds with dark overlays
**Medical Branding:** Caduceus symbol integrated into app icon and loading states
**Procedure Visuals:** Placeholder rectangles within glass cards for medical diagrams and instrument photography
**No Large Hero:** Focus on functional dashboard layout rather than marketing imagery

This design system creates a premium, professional aesthetic that builds trust with medical professionals while maintaining the clarity and efficiency required in surgical environments.