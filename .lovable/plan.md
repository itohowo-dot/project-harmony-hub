

# BitHive — Full MVP Implementation Plan

## Overview
BitHive is a premium sBTC crowdfunding platform with a Bitcoin-inspired dark theme (amber/gold + deep navy), honeycomb motifs, and polished microinteractions. We'll build all pages and flows with mock data, ready for real Stacks blockchain integration later.

---

## Phase 1: Foundation — Design System & Layout

### Design System
- Implement the full color palette as CSS variables (amber/gold primary, deep navy secondary, semantic colors, gradients, glow effects)
- Set up typography with Inter (body), Space Grotesk (headings), and JetBrains Mono (addresses/numbers)
- Define spacing (8px grid), border radius, shadow/glow tokens, and animation tokens in Tailwind config

### Base UI Components
- **Buttons**: Primary (amber), Secondary (outline), Ghost, Destructive — with hover scale, glow, and loading spinner states
- **Cards**: Campaign card (image, progress bar, title, meta, CTA), Stats card (large number + trend)
- **Progress bars**: Gradient fill with glow on overflow, milestone stepper
- **Form elements**: Styled text input, sBTC amount input with USD conversion, select/dropdown, character counters
- **Modals**: Contribution modal, transaction status modal (pending/success/error states with confetti)
- **Toast notifications**: Success, error, info, warning styles
- **Loading states**: Shimmer skeleton cards, spinners
- **Empty states**: Bee-themed illustrations with CTAs

### Layout Components
- **Header**: Sticky, backdrop-blur, logo + nav links + mock wallet button (connect/disconnect with truncated address + balance)
- **Footer**: Links, trust indicators
- **Mobile bottom navigation**: Home, Explore, Create, Profile icons
- **Page wrapper**: Fade-in-up transition on route change

---

## Phase 2: Core Pages & Flows

### Landing Page (/)
- **Hero section**: "Fund the Future with Bitcoin" headline, subtitle, two CTAs (Explore / Create), animated honeycomb background pattern, floating hexagons
- **Platform stats**: 3 stats cards (Total Raised, Campaigns, Success Rate) with count-up animation on scroll
- **Featured campaigns**: Horizontal grid of 4 campaign cards with mock data
- **How It Works**: 4-step visual flow (Connect → Create → Fund → Success)
- **Trust indicators**: Security badges ("Secured by Bitcoin", "Instant Settlements", "Transparent Fees")

### Explore Page (/explore)
- Search bar with category dropdown, sort options, and filter panel
- Tabs: All, Active, Successful, Ending Soon
- Responsive campaign card grid (auto-fill, min 320px)
- Mock dataset of ~12 campaigns with varied statuses/progress
- Load more button

### Campaign Detail Page (/campaign/:id)
- Split layout: image/video left, funding info sidebar right (progress, raised/goal, backers, time remaining, Back button, share links)
- Tabbed content: Story, Milestones (with stepper visualization), Backers (ranked list with medals), Updates
- "Back This Project" opens contribution modal

### Create Campaign Wizard (/create)
- 4-step form with progress indicator:
  1. **Basic Info**: Title, description (with character counts), category select, image upload area
  2. **Funding Goal**: sBTC amount input with USD conversion, duration radio buttons (7/14/30/60 days with block estimates), fee preview
  3. **Milestones** (optional): Add/remove milestones with title, description, amount; allocation progress bar
  4. **Review & Launch**: Preview card, summary, confirmation checkboxes, launch button
- Form validation with Zod + React Hook Form
- Back/Continue navigation between steps

### Contribution Flow
- Contribution modal: amount input, USD conversion, fee breakdown summary, confirm button
- Transaction status modal: pending (spinner + "10-30 minutes" message + explorer link) → success (checkmark + confetti animation) → error (retry option)
- Mock transaction simulation with timed state transitions

---

## Phase 3: Dashboard & Management

### Dashboard (/dashboard)
- Stats overview cards: Campaigns Created, Total Raised, Success Rate
- Quick action buttons: Create Campaign, View Contributions
- Tabs: My Campaigns / My Contributions
- Campaign list rows with status badges (Active 🟢, Successful ✓, Failed ✕), progress bars, and action buttons (Manage/Claim/Refund)
- Mock contribution history with amounts and dates

### Campaign Management (/campaign/:id/manage)
- Campaign status header with live progress
- Tabs: Overview, Milestones, Backers, Actions
- **Actions panel**: Add milestone, complete milestone, claim funds (if successful), enable refunds (if failed)
- Backer list with contribution amounts and timestamps

---

## Phase 4: Polish & Delight

### Animations & Microinteractions
- Button hover: translateY(-2px) + glow shadow
- Card hover: translateY(-4px) + amber border glow + elevated shadow
- Progress bar: smooth width transition (0.6s)
- Page transitions: fade-in-up on route change
- Celebration: confetti burst on successful contribution
- Count-up animations on stats when scrolled into view
- Honeycomb parallax background on hero

### Loading & Error States
- Skeleton shimmer cards on all data-loading pages
- Comprehensive error states with retry options
- Empty states with bee/honeycomb illustrations and CTAs
- Wallet not connected prompts where needed

### Responsive Design
- Desktop-first with full mobile adaptation
- Campaign cards stack single-column on mobile
- Bottom tab navigation on mobile (replacing header nav links)
- Touch-friendly tap targets, modal sizing
- Create wizard adapts to mobile layout

### Accessibility
- WCAG 2.1 AA color contrast on all text
- Visible focus rings on interactive elements
- Full keyboard navigation
- ARIA labels on progress bars, modals, toasts, live regions
- `prefers-reduced-motion` support to disable animations

---

## Phase 5: Production Readiness

### Performance
- Route-based code splitting with lazy loading
- Image optimization (WebP placeholders, lazy loading)
- React Query caching configuration for future API integration

### Mock Data Architecture
- Centralized mock data store with realistic campaign/backer/milestone data
- Simulated wallet state (connect/disconnect, balance, address)
- Simulated transaction flow with configurable delays
- All data access through abstracted hooks (useWallet, useCampaigns, useContribution, etc.) — designed so mock implementations can be swapped for real Stacks SDK calls later

---

## Technical Notes
- **Framework**: React + Vite + TypeScript + Tailwind (as per Lovable stack)
- **No backend needed**: All data is mock/client-side for now
- **Web3 ready**: Hook interfaces will match the PRD's contract functions so real integration is a drop-in replacement
- **Fonts**: Inter + Space Grotesk + JetBrains Mono loaded via Google Fonts

