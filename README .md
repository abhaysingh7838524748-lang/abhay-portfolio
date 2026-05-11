# Abhay Singh — Portfolio
## "Ancient Wisdom, Modern Growth"

Ultra-high-end 4-page portfolio. React 19 + R3F + GSAP + Lenis.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173
```

## Build for Production

```bash
npm run build
# Output in /dist — deploy to Vercel, Netlify, or any static host
```

## Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add a `vercel.json` for SPA routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Pages
| Route | Page |
|-------|------|
| `/` | Hero Odyssey — 3D glass avatar + Sudarshan Chakra |
| `/experience` | Funnel of Mastery — Career timeline + skill matrix |
| `/projects` | Digital Artifacts — Expandable project case studies |
| `/connect` | Holographic Nexus — Multi-step contact form |

## Customization
- **Content**: Edit page files in `src/pages/`
- **Projects**: Edit `PROJECTS` array in `src/pages/Projects.tsx`
- **Colors**: Change CSS vars in `src/index.css`
- **3D Scenes**: Edit `src/components/3d/scenes/`

See `claude.md` for full project memory.
