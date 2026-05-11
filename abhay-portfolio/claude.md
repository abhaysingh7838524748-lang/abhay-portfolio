# Claude.md — Project Memory: Abhay Singh Portfolio

## Identity
- **Owner**: Abhay Singh, Growth Marketing & Digital Strategy expert
- **Location**: Delhi, India
- **Theme**: "Ancient Wisdom, Modern Growth"
- **Aesthetic**: Cyber-brutalism × hyper-realism × neon mythology

---

## Architecture

### Framework
- React 19 + Vite + TypeScript
- React Router v7 (file-based routing)
- Framer Motion AnimatePresence for page transitions

### 3D
- React Three Fiber (R3F) + Drei
- **CRITICAL**: Canvas is **persistent** (never unmounts). Only scenes toggle `visible` prop.
- Post-processing: Bloom, ChromaticAberration, Noise (disabled on low-perf devices)

### State
- Zustand store at `src/store/sceneStore.ts`
- Manages: currentRoute, mouse coords, scroll progress, performance flags, project state, form state

### Animation
- GSAP + ScrollTrigger for timeline scroll animations (Experience page)
- Framer Motion for page transitions, card expand (Projects page)
- Lenis for global inertial smooth scroll

### Styling
- Tailwind CSS 3.x
- CSS custom properties for colors

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Pure Black | `#000000` | Background |
| Neon Emerald | `#50C878` | Growth / ROI / CTAs |
| Electric Violet | `#8F00FF` | Strategy / Mystical |
| Accent Green | `#39FF14` | Conversion stage |

**Fonts**:
- Display: Bebas Neue
- Body: DM Sans
- Mono: JetBrains Mono

---

## Page Map

| Route | Name | 3D Scene | Key Feature |
|-------|------|----------|-------------|
| `/` | Hero Odyssey | HeroScene | Glass avatar + Sudarshan Chakra + orbiting icons |
| `/experience` | Funnel of Mastery | ExperienceScene | Growth funnel + Trishul |
| `/projects` | Digital Artifacts | ProjectsScene | Glass portals + expandable project cards |
| `/connect` | Holographic Nexus | ConnectScene | Holographic sphere + multi-step form |

---

## Performance Strategy

- `isLowPerf` flag detected on mount via WebGL renderer string
- Low perf: disables post-processing, reduces particle count, drops DPR to 1
- `AdaptiveDpr` + `PerformanceMonitor` for runtime adaptation
- InstancedMesh for all particle systems

---

## Content (CV Data)

**Skills**: Instagram Growth, Facebook/Google Ads, Short-form Video, Brand Positioning, Content Architecture, HTML/CSS/JS basics

**Projects**:
1. Hindu Mythology Short-Form Series (IG/YT scripting)
2. Travel & Tourism Content Concepts
3. Digital Marketing Brand Development (startups)

**Tools**: VS Code, Canva, CapCut, Instagram, YouTube Studio, AI Tools

---

## Adding New Projects

Edit `PROJECTS` array in `src/pages/Projects.tsx`. Each project needs:
```ts
{
  id: string          // URL-safe unique ID
  index: string       // '001', '002'...
  title: string
  subtitle: string
  description: string // Short card description
  longDesc: string    // Full case study (paragraphs separated by \n\n)
  tags: string[]
  color: string       // Primary hex color
  accentColor: string // Secondary hex
  metrics: { label: string; value: string }[]
  tools: string[]
}
```

---

## Known Constraints
- No `<form>` HTML tags — use button onClick patterns
- R3F Canvas must stay mounted — use `visible` prop on scene groups
- All files end with `.tsx` for consistency
- `localStorage` not used — state is in-memory Zustand
