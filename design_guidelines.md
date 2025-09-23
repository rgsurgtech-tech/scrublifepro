# SurgiTech Connect Design Guidelines

## Design Approach
**Selected Approach:** Design System (Material Design) with medical industry adaptations
**Justification:** This is a utility-focused, information-dense application where efficiency, learnability, and trust are paramount. Medical professionals need quick access to critical information with zero ambiguity.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Primary Blue: 210 85% 45% (medical trust and professionalism)
- Primary Dark: 210 25% 25% (headers and emphasis)

**Supporting Colors:**
- Success Green: 145 70% 45% (confirmations, completed procedures)
- Warning Orange: 25 85% 55% (important notes, cautions)
- Error Red: 0 75% 50% (critical alerts)
- Neutral Gray: 210 10% 60% (secondary text, borders)

**Background:**
- Light mode: 0 0% 98% (clean medical environment feel)
- Dark mode: 210 15% 8% (reduced eye strain in OR environments)

### B. Typography
**Font System:** Inter (via Google Fonts CDN)
- **Headers:** Inter 600-700 (medical authority)
- **Body:** Inter 400-500 (optimal readability)
- **Captions:** Inter 400 (secondary information)
- **Sizes:** Scale from 14px to 32px for mobile-first design

### C. Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, and 8
- Tight spacing (p-2, m-2) for data-dense areas
- Medium spacing (p-4, m-4) for general content
- Generous spacing (p-6, p-8) for section separation and breathing room

### D. Component Library

**Navigation:**
- Bottom tab navigation (5 tabs max) for primary functions
- Top app bar with search and user profile access
- Breadcrumb navigation for deep procedure hierarchies

**Data Display:**
- Card-based layout for procedure guides with clear hierarchy
- Expandable sections for detailed information
- Quick-scan bullet points and numbered lists
- Progress indicators for multi-step procedures

**Forms:**
- Large touch targets (minimum 44px) for mobile use
- Clear field labels and validation states
- Toggle switches for preferences and settings
- Floating action button for "Create New" functions

**Content Organization:**
- Specialty tabs/filters at top level
- Search with autocomplete and recent searches
- Favorite/bookmark system with visual indicators
- Recently viewed procedures section

**Community Features:**
- Simple threaded discussion layout
- User verification badges for CSTs
- Clean typography hierarchy for forum posts

### E. Mobile-First Considerations
- Touch-friendly interface with adequate spacing
- Thumb-zone optimization for primary actions
- Swipe gestures for navigation between procedure steps
- Quick access to search from any screen
- Offline indicators and download status

### F. Medical Context Adaptations
- High contrast ratios for various lighting conditions
- Quick access patterns (information within 2-3 taps)
- Clear visual hierarchy to prevent medical errors
- Subtle animations only - no distracting movement
- Professional, clinical aesthetic that builds trust

## Images
**Hero Image:** No large hero image - this is a utility app focused on quick information access
**Procedure Images:** Placeholder rectangles for medical diagrams, instrument photos, and setup images throughout procedure guides
**Icon System:** Heroicons for consistency, with medical-specific icons as needed

This design system prioritizes clarity, speed, and professional trust while maintaining modern usability standards essential for medical applications.