# AcdyOn Technologies — Homepage Redesign

> **Frontend Challenge Submission — Part 2 (Premium Home Page)**

A premium, cinematic homepage redesign for AcdyOn Global Executive Education & Academic Recognition Platform. Built with intentional design, honest content, and production-ready engineering.

**GitHub Repository:** [https://github.com/Shivam96530/AcdyOn_C](https://github.com/Shivam96530/AcdyOn_C)  
**Challenge Brief:** [AcdyOn Frontend Challenge](https://github.com/acdyon/frontend-challenge)

---

## Project Goals

This redesign addresses three core objectives from the challenge brief:
1. **First 3 Seconds** — Create an immediate "wow, I want an account" reaction through cinematic storytelling.
2. **Product Demonstration** — Show the product through interactive exploration, not just claims.
3. **Honest Design** — No fabricated testimonials, fake user counts, or invented statistics.

---

## 🛠 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | React 18 + Vite | Fast builds, minimal config, excellent DX |
| **Styling** | Tailwind CSS | Consistent spacing system, responsive utilities |
| **Animation** | Framer Motion | Declarative animations, gesture support |
| **Maps** | React Leaflet + OpenStreetMap | Free, no API key required, React-compatible |
| **Icons** | Lucide React | Consistent stroke weight, accessible |
| **Deployment** | Vercel | Zero-config deployment, edge caching |

---

## Project Structure

```text
acdyon-redesign/
├── public/
│   ├── acdyon-logo.webp       # High-res logo for intro
│   └── rider-pov.png          # First-person motorcycle image
├── src/
│   ├── components/
│   │   ├── IntroExperience.jsx  # Cinematic intro experience
│   │   ├── Navbar.jsx           # Mega-menu navigation
│   │   ├── Hero.jsx             # Value prop + stats panel
│   │   ├── RecognitionTicker.jsx# Partner marquee
│   │   ├── FindYourPath.jsx     # Interactive pathway selector
│   │   ├── Programs.jsx         # Program categories
│   │   ├── TransformationJourney.jsx
│   │   ├── AcdyOnAdvantage.jsx  # 6-card advantage grid
│   │   ├── FeaturedAIProgram.jsx
│   │   ├── GlobalMap.jsx        # 3 regional maps + location list
│   │   ├── Process.jsx          # 4-step process
│   │   ├── FAQ.jsx              # Accordion FAQs
│   │   ├── Contact.jsx          # Office locations + form
│   │   ├── Footer.jsx           # Multi-column footer
│   │   └── Chatbot.jsx          # Demo chatbot (offline)
│   ├── data/
│   │   ├── locations.js         # 14 institutions + 3 offices
│   │   ├── content.js           # Copy and content blocks
│   │   └── universities.js      # Process steps, FAQs
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Design tokens, animations
├── DECISIONS.md              # Required 1-page design document
├── AUDIT.md                  # Pre-submission checklist
└── package.json
```

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/Shivam96530/AcdyOn_C.git
cd AcdyOn_C/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#f5f1ea` | Primary background (warm ivory) |
| `--paper-2` | `#ebe4d6` | Alternate sections (deeper cream) |
| `--ink` | `#12213a` | Primary text, dark sections (deep navy) |
| `--accent` | `#c8451f` | Primary actions (terracotta) |
| `--gold` | `#c9a961` | Premium accents (bronze/gold) |

### Typography
- **Primary**: Inter (300–700 weights)
- **Display**: Instrument Serif (headlines)

---

## ✨ Key Features

1. **Cinematic Intro Experience**
   - Perspective question cards leading to centered brand mark zoom
   - Smooth 60fps GPU acceleration via direct DOM transforms
   - Skip button + Escape key + session storage (plays once per session)
   - Reduced motion support (`prefers-reduced-motion`)

2. **Interactive "Find Your Path"**
   - 3-question pathway discovery
   - Personalized pathway recommendation based on user goals
   - Clear disclaimer (indicative, review-based pathway)

3. **Global Partner Network Map**
   - 3 regional maps (Americas, Europe, Asia)
   - 14 partner institutions + 3 offices plotted with custom pins
   - Fixed top-left info overlay card (no overlap or flicker)
   - Complete directory list grouped by region below maps

4. **Honest Content**
   - All 14 partner institutions are real (from acdyon.com)
   - All 3 office addresses verified from official site
   - No fake testimonials or false statistics
   - Clear disclaimers on academic facilitation model

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| **Mobile** | 390px | Single column, stacked sections, mobile drawer |
| **Tablet** | 768px | 2-column grids, responsive navigation |
| **Desktop** | 1440px | 3–4 column grids, mega-menu floating cards |

---

## ♿ Accessibility

- WCAG 2.1 AA color contrast throughout
- Keyboard navigation on all interactive elements
- Focus visible states on buttons, links, inputs
- ARIA labels on icon-only buttons
- Reduced motion respected via `prefers-reduced-motion`
- Semantic HTML (`section`, `article`, heading hierarchy)

---

## 🔒 Data & Honesty

All company information sourced from:
- [acdyon.com](https://acdyon.com/) — Official website
- Official partner university listings
- Verified office addresses from About/Contact pages

Deliberately excluded:
- ❌ Fake testimonials (none provided by client)
- ❌ Invented statistics (no unverified user counts)
- ❌ Competitor logos
- ❌ Fake trust badges

---

## 👨‍💻 Author

- **Submitted by:** Shivam
- **Repository:** [github.com/Shivam96530/AcdyOn_C](https://github.com/Shivam96530/AcdyOn_C)
