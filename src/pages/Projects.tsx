import { useState, useRef } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { PageWrap } from '@/components/ui/PageLoader'

interface Project {
  id: string
  index: string
  title: string
  subtitle: string
  description: string
  longDesc: string
  tags: string[]
  color: string
  accentColor: string
  metrics: { label: string; value: string }[]
  tools: string[]
}

const PROJECTS: Project[] = [
  {
    id: 'mythology-series',
    index: '001',
    title: 'Hindu Mythology Content Series',
    subtitle: 'Retention-Driven Storytelling',
    description: 'Cinematic short-form content for Instagram and YouTube. Scripts engineered for maximum retention using narrative tension and mythological hooks.',
    longDesc: `Developed a comprehensive content architecture for mythology-based short-form videos targeting Instagram Reels and YouTube Shorts. 

The core challenge: make ancient stories feel urgent and modern. The solution: retention-optimized scripting with pattern interrupts every 3–5 seconds, cinematic B-roll direction notes, and hook frameworks inspired by viral storytelling psychology.

Each script was built on a 3-act structure compressed into 60 seconds: hook → revelation → resonance. The mythology content consistently outperformed generic educational content in watch-time and shares.`,
    tags: ['Scriptwriting', 'Content Strategy', 'Instagram Reels', 'YouTube Shorts'],
    color: '#8F00FF',
    accentColor: '#50C878',
    metrics: [
      { label: 'Avg. Watch Rate', value: '68%' },
      { label: 'Hook Retention', value: '85%' },
      { label: 'Content Pieces', value: '30+' },
    ],
    tools: ['CapCut', 'Canva', 'YouTube Studio', 'Instagram Analytics'],
  },
  {
    id: 'travel-tourism',
    index: '002',
    title: 'Travel & Tourism Content',
    subtitle: 'Storytelling for Wanderers',
    description: 'Narrative-driven scripts and content concepts for travel businesses. Converting destinations into emotional experiences that drive bookings.',
    longDesc: `Partnered with travel-focused businesses to develop content that goes beyond "pretty places" — turning destinations into emotional journeys that trigger booking intent.

The strategy: identify the emotional transformation a traveler seeks (escape, adventure, connection) and map it to specific destinations through story-first scripting. Every piece of content was designed to make the viewer see themselves in the story.

Content frameworks included: "before/after" transformation arcs, local secret reveals, sensory immersion techniques, and urgency-building seasonal angles.`,
    tags: ['Travel Content', 'Brand Storytelling', 'Short-Form Video', 'Copywriting'],
    color: '#50C878',
    accentColor: '#8F00FF',
    metrics: [
      { label: 'Engagement Lift', value: '3.2x' },
      { label: 'Scripts Created', value: '20+' },
      { label: 'Formats', value: 'Reels · Shorts · Blogs' },
    ],
    tools: ['Canva', 'CapCut', 'Google Docs', 'Instagram'],
  },
  {
    id: 'brand-development',
    index: '003',
    title: 'Digital Brand Development',
    subtitle: 'From Idea to Identity',
    description: 'Full-stack brand strategy for digital-native startups: naming, positioning, visual direction, and growth playbooks.',
    longDesc: `End-to-end brand architecture for early-stage digital businesses. Starting from the founder's vision and working outward to build a coherent identity that resonates with their target market.

Deliverables spanned naming workshops, positioning statements, competitive landscape analysis, visual identity direction (colors, typography mood boards, content aesthetic), and a 90-day organic growth playbook.

The approach: strategy before aesthetics. A brand with a clear "why" and sharp audience definition will outperform a pretty brand with no direction every time.`,
    tags: ['Brand Strategy', 'Positioning', 'Growth Playbook', 'Identity'],
    color: '#8F00FF',
    accentColor: '#50C878',
    metrics: [
      { label: 'Brands Built', value: '5+' },
      { label: 'Avg. Growth', value: '2.8x' },
      { label: 'Playbook Length', value: '90 Days' },
    ],
    tools: ['Canva', 'VS Code', 'Meta Business Suite', 'AI Tools'],
  },
]

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={onOpen}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative glass p-8 cursor-pointer overflow-hidden group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: `radial-gradient(ellipse at 30% 20%, ${project.color}12 0%, transparent 60%)` }}
      />

      {/* Index */}
      <div className="flex items-start justify-between mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/20">{project.index}</span>
        <motion.div
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-6 h-6 flex items-center justify-center"
          style={{ color: project.color }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl text-white leading-tight mb-2 tracking-wide">
        {project.title}
      </h3>
      <p className="font-mono text-[10px] tracking-[0.2em] mb-4" style={{ color: project.color }}>
        {project.subtitle}
      </p>
      <p className="font-body text-sm text-white/40 leading-relaxed mb-8">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="font-mono text-[9px] px-2 py-1 tracking-widest text-white/30 border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      {/* Metrics preview */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
        {project.metrics.map((m) => (
          <div key={m.label}>
            <div className="font-display text-lg leading-none" style={{ color: project.color }}>{m.value}</div>
            <div className="font-mono text-[9px] text-white/25 tracking-wider mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to bottom, ${project.color}, transparent)` }}
      />
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
      />

      <motion.div
        layoutId={`card-${project.id}`}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto glass p-10 md:p-14"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/20">{project.index}</span>
          <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: project.color }}>
            CASE STUDY
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-2">{project.title}</h2>
        <p className="font-mono text-xs tracking-widest mb-8" style={{ color: project.color }}>{project.subtitle}</p>

        {/* Long description */}
        <div className="prose prose-invert max-w-none mb-10">
          {project.longDesc.split('\n\n').map((para, i) => (
            <p key={i} className="text-white/50 font-body text-sm leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6 p-6 border border-white/5 mb-8">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-display text-3xl mb-1" style={{ color: project.color }}>{m.value}</div>
              <div className="font-mono text-[9px] text-white/30 tracking-widest">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Tags + tools */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="font-mono text-[9px] tracking-widest text-white/20 mb-3">SKILLS APPLIED</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] px-2 py-1 tracking-wider" style={{ color: project.color, background: `${project.color}10`, border: `1px solid ${project.color}20` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-widest text-white/20 mb-3">TOOLS USED</p>
            <div className="flex flex-col gap-2">
              {project.tools.map((tool) => (
                <div key={tool} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ background: project.accentColor }} />
                  <span className="font-mono text-xs text-white/40">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <PageWrap>
      <div className="min-h-screen px-8 md:px-16 lg:px-24 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] text-neon-emerald tracking-[0.3em]">03 / DIGITAL ARTIFACTS</span>
            <div className="h-px w-10 bg-neon-emerald/30" />
          </div>
          <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight">
            THE <span className="text-neon-emerald glow-emerald">WORK</span>
          </h2>
          <p className="mt-4 max-w-lg text-white/40 font-body text-sm leading-relaxed">
            Select case studies from the field. Click any artifact to expand.
          </p>
        </motion.div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard
                  project={project}
                  onOpen={() => setActiveProject(project)}
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {activeProject && (
              <ProjectModal
                project={activeProject}
                onClose={() => setActiveProject(null)}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </PageWrap>
  )
}
