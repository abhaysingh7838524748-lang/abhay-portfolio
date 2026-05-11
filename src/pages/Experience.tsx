import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { PageWrap } from '@/components/ui/PageLoader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TIMELINE = [
  {
    era: 'ORIGIN',
    year: '2021',
    title: 'First Contact',
    subtitle: 'The Spark',
    description: 'Discovered the power of digital storytelling through mythology-based Instagram content. First viral reel — 100K+ views. The journey begins.',
    color: '#8F00FF',
    tags: ['Content Creation', 'Instagram', 'Storytelling'],
  },
  {
    era: 'ASCENT',
    year: '2022',
    title: 'The Platform Wars',
    subtitle: 'Battle-Tested',
    description: 'Deep-dived into Facebook and Google Ads. Managed campaigns for travel and lifestyle brands. Learned that data and creativity are not opposites.',
    color: '#6A30FF',
    tags: ['Facebook Ads', 'Google Ads', 'Analytics'],
  },
  {
    era: 'MASTERY',
    year: '2023',
    title: 'Brand Architect',
    subtitle: 'The Blueprint',
    description: 'Moved into full-spectrum brand positioning for startups. From naming conventions to landing page conversion flows — owned the entire funnel.',
    color: '#50C878',
    tags: ['Brand Strategy', 'Landing Pages', 'Conversion'],
  },
  {
    era: 'PRESENT',
    year: '2024',
    title: 'Digital Growth Operator',
    subtitle: 'Executing At Scale',
    description: 'Freelance practice spanning social growth, short-form video strategy, reel hook writing, and website optimization. Delhi → Global.',
    color: '#39FF14',
    tags: ['Freelance', 'Video Strategy', 'Growth Hacking'],
  },
]

const SKILLS_DATA = [
  { name: 'Instagram Growth', level: 92, color: '#50C878' },
  { name: 'Facebook Ads', level: 82, color: '#8F00FF' },
  { name: 'Google Ads', level: 75, color: '#50C878' },
  { name: 'Content Strategy', level: 95, color: '#8F00FF' },
  { name: 'Reel Hook Writing', level: 90, color: '#50C878' },
  { name: 'Brand Positioning', level: 85, color: '#8F00FF' },
]

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return
    const el = barRef.current
    gsap.fromTo(el,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 1.2,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        }
      }
    )
  }, [level, delay])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs text-white/60 tracking-widest">{name}</span>
        <span className="font-mono text-xs" style={{ color }}>{level}%</span>
      </div>
      <div className="h-px bg-white/5 relative overflow-visible">
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 h-px"
          style={{ background: `linear-gradient(to right, ${color}, transparent)`, boxShadow: `0 0 8px ${color}` }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  )
}

export default function ExperiencePage() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = timelineRef.current?.querySelectorAll('.timeline-card')
    if (!cards) return

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          }
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <PageWrap>
      <div className="min-h-screen px-8 md:px-16 lg:px-24 pt-32 pb-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[10px] text-electric-violet tracking-[0.3em]">02 / FUNNEL OF MASTERY</span>
            <div className="h-px flex-1 max-w-[60px] bg-electric-violet/30" />
          </div>
          <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight">
            THE <span className="text-electric-violet glow-violet">JOURNEY</span>
          </h2>
          <p className="mt-4 max-w-lg text-white/40 font-body text-sm leading-relaxed">
            From mythology-inspired storytelling to full-funnel digital growth strategy. Each chapter shaped by curiosity, data, and creative rebellion.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-electric-violet/50 via-neon-emerald/50 to-transparent hidden md:block" />

          <div className="space-y-16">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className={`timeline-card relative grid md:grid-cols-2 gap-8 ${
                  i % 2 === 0 ? 'md:pr-16' : 'md:pl-16 md:col-start-2'
                }`}
              >
                {/* Connector dot */}
                <div
                  className="absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 hidden md:block"
                  style={{ borderColor: item.color, boxShadow: `0 0 12px ${item.color}` }}
                />

                {/* Card */}
                <div
                  className={`glass p-8 relative overflow-hidden group cursor-default ${
                    i % 2 !== 0 ? 'md:col-start-2' : ''
                  }`}
                >
                  {/* BG glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.color}15 0%, transparent 70%)` }}
                  />

                  {/* Era badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-[9px] tracking-[0.3em] px-2 py-1 border"
                      style={{ color: item.color, borderColor: `${item.color}40` }}
                    >
                      {item.era}
                    </span>
                    <span className="font-display text-3xl" style={{ color: `${item.color}40` }}>
                      {item.year}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-white tracking-wide mb-1">{item.title}</h3>
                  <p className="font-mono text-xs text-white/30 tracking-widest mb-4">{item.subtitle}</p>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-6">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-1 tracking-widest"
                        style={{ color: item.color, background: `${item.color}10`, border: `1px solid ${item.color}20` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Side accent */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5"
                    style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills section */}
        <div className="mt-32 grid md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] text-neon-emerald tracking-[0.3em]">SKILL MATRIX</span>
              <div className="h-px flex-1 max-w-[40px] bg-neon-emerald/30" />
            </div>
            <div className="space-y-6">
              {SKILLS_DATA.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 0.1} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-[10px] text-electric-violet tracking-[0.3em]">TOOLS & STACK</span>
              <div className="h-px flex-1 max-w-[40px] bg-electric-violet/30" />
            </div>
            {['VS Code', 'Canva', 'CapCut', 'Instagram', 'YouTube Studio', 'Meta Ads Manager', 'Google Ads', 'AI Tools'].map((tool) => (
              <div key={tool} className="flex items-center gap-3 group">
                <div className="w-1 h-1 bg-electric-violet/50 rounded-full group-hover:bg-electric-violet transition-colors" />
                <span className="font-mono text-xs text-white/40 group-hover:text-white/70 tracking-widest transition-colors">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrap>
  )
}
