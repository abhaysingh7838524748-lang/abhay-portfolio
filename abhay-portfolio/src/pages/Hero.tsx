import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageWrap } from '@/components/ui/PageLoader'
import gsap from 'gsap'

const SKILLS = [
  'Instagram Growth Strategy',
  'Facebook & Google Ads',
  'Short-form Video & Reel Hooks',
  'Brand Positioning',
  'Content Architecture',
]

const STATS = [
  { value: '3+', label: 'Years Experience' },
  { value: '∞', label: 'Ideas Generated' },
  { value: '360°', label: 'Marketing View' },
]

export default function HeroPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word')
      tl.fromTo(words,
        { y: 80, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }
      )
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
    }
    if (statsRef.current) {
      const items = statsRef.current.querySelectorAll('.stat-item')
      tl.fromTo(items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      )
    }

    return () => { tl.kill() }
  }, [])

  const headline = ['GROWTH', 'ARCHITECT']

  return (
    <PageWrap>
      <div className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pb-16">

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-2 mb-10"
        >
          <span className="w-1.5 h-1.5 bg-neon-emerald rounded-full animate-pulse" />
          <span className="font-mono text-xs text-white/30 tracking-[0.25em]">
            NEW DELHI · INDIA
          </span>
        </motion.div>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {headline.map((word, wi) => (
            <div key={wi} className="overflow-hidden">
              <span
                className="word block font-display text-[clamp(5rem,14vw,14rem)] leading-none tracking-tight text-white"
                style={{ display: 'block' }}
              >
                {wi === 0 ? (
                  <span className="text-neon-emerald glow-emerald">{word}</span>
                ) : word}
              </span>
            </div>
          ))}
        </h1>

        {/* Subtitle row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-6 gap-8">
          <p
            ref={subtitleRef}
            className="max-w-md font-body text-base text-white/50 leading-relaxed"
          >
            Results-driven digital strategist fusing{' '}
            <em className="not-italic text-electric-violet">ancient wisdom</em>{' '}
            with modern growth frameworks. Social media, paid ads, and story-driven content.
          </p>

          <div ref={statsRef} className="flex gap-10">
            {STATS.map((s, i) => (
              <div key={i} className="stat-item text-right">
                <div className="font-display text-4xl text-neon-emerald leading-none">{s.value}</div>
                <div className="font-mono text-[10px] text-white/30 tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center gap-4 mt-12"
        >
          <Link
            to="/projects"
            className="group relative px-8 py-4 bg-neon-emerald text-black font-display text-sm tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(80,200,120,0.4)]"
          >
            <span className="relative z-10">VIEW ARTIFACTS</span>
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </Link>
          <Link
            to="/experience"
            className="px-8 py-4 border border-white/20 text-white/70 font-display text-sm tracking-[0.2em] hover:border-electric-violet hover:text-electric-violet transition-all duration-300"
          >
            THE JOURNEY
          </Link>
        </motion.div>

        {/* Skills marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-0 right-0 overflow-hidden pointer-events-none"
        >
          <div className="border-t border-white/5 pt-4 px-8 md:px-16">
            <div className="flex gap-8 overflow-x-hidden whitespace-nowrap">
              {[...SKILLS, ...SKILLS].map((skill, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase shrink-0"
                >
                  {skill}
                  <span className="mx-4 text-neon-emerald/40">·</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="fixed bottom-16 left-8 flex items-center gap-3"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-neon-emerald/60" />
          <span className="font-mono text-[9px] text-white/20 tracking-[0.3em] writing-mode-vertical">
            SCROLL
          </span>
        </motion.div>
      </div>
    </PageWrap>
  )
}
