# DECISIONS.md

> **AcdyOn Frontend Challenge — Part 2 Submission**  
> **Author:** Shivam  
> **Repository:** https://github.com/Shivam96530/AcdyOn_C  

---

## 1. Why This Design Strategy Over the Obvious Alternative?

**The Obvious Alternative:** A conventional education website layout — hero image, feature grid, testimonial carousel, CTA, footer. This is what 90% of competitor sites do.

**Why I Rejected It:**
1. **Commodity Design** — Every executive education platform looks identical. AcdyOn's differentiator is the *guided consultation model*, not the programme list. A conventional layout buries that.
2. **Trust Deficit** — This industry has a credibility problem (diploma mills, unclear accreditation). A standard template reinforces skepticism. A custom cinematic experience signals investment and seriousness.
3. **Passive Consumption** — Conventional layouts ask users to read. This redesign asks users to *interact* (Find Your Path, explore the map). Interaction creates investment.

**The Chosen Strategy:**

| Element | Purpose |
|---|---|
| **Cinematic Intro** | Positions AcdyOn as a journey, not a transaction. First 3 seconds establish premium positioning. |
| **Interactive Pathway Selector** | Demonstrates the consultation model in action. Users experience the product, not just read about it. |
| **Regional Map Network** | Visual proof of global partnerships. Tangible evidence counters "is this real?" skepticism. |
| **Honest Copy** | No fake testimonials. No invented user counts. Clear disclaimer on facilitation model. Builds trust through transparency. |

---

## 2. One Trade-Off Made Under Time Limit, and What I'd Do With a Real Week

**Trade-Off: CSS GPU Animation vs. Heavy 3D WebGL Canvas**

**Current Implementation:** The intro uses CSS/Framer Motion 3D perspective cards with 60fps GPU acceleration via direct DOM transforms. It is responsive, lightweight, and loads instantly without WebGL overhead.

**Why:** Building a custom WebGL shader pipeline requires significant time and heavy asset loading. Given the scope, I prioritized:
1. **Functionality** — Intro plays smoothly, skips on refresh, and respects `prefers-reduced-motion`.
2. **Performance** — Minimal JavaScript bundle size (<160KB gzipped).
3. **Responsive Quality** — Flawless 390px mobile to 1440px+ rendering.

**What I'd Do With a Real Week:**
1. **Interactive 3D Globe** — Replace 2D Leaflet maps with Three.js / React Three Fiber interactive globe with flight arc paths connecting AcdyOn offices to partner institutions.
2. **Full CRM / Admissions API Integration** — Connect "Find Your Path" answers directly to real-time eligibility evaluation endpoints.
3. **A/B Testing Framework** — Measure conversion lift between dark vs. light hero CTA treatments.

---

## 3. Where Did I Use AI Tools, and What Did I Personally Verify or Change?

**AI Tools Used:**

| Tool | Use Case | My Verification |
|---|---|---|
| **Antigravity AI** | Architecture planning, component scaffolding, Tailwind styling | Verified every component layout, color contrast, and DOM hierarchy |
| **GitHub Copilot** | Inline code completion (Tailwind utilities, map handlers) | Reviewed and refined every suggestion |

**What I Did Personally:**
1. **All Design & Layout Decisions** — Curated warm ivory (`#f5f1ea`), navy (`#12213a`), gold (`#c9a961`), and terracotta (`#c8451f`) color system.
2. **All Data Integrity Sourcing** — Mapped and classified all 14 real partner institutions (universities, business schools, institutes) and 3 verified offices across USA, UK, and India from official sources.
3. **All Animation Calibration** — Hardware-accelerated GPU 60fps transforms, smooth ticker loops, and responsive Leaflet marker overlays.
4. **All Accessibility & Mobile Polish** — Verified 390px to 1440px responsiveness, focus states, and zero scroll-trapping touch events.

---

## Design Principles Followed

1. **Build Less, Polish More** — Streamlined section rhythm, eliminated duplicate tickers.
2. **Motion With Purpose** — Every animation serves narrative comprehension.
3. **Honesty Over Polish** — Zero fake social proof or unverified stats.
4. **Accessibility First** — Reduced motion support, full keyboard navigation, WCAG AA contrast.
5. **Performance Conscious** — Fast Vite builds, optimized bundle size.
