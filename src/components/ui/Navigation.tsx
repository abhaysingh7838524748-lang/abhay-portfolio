import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { path: '/', label: 'HERO', sub: '01' },
  { path: '/experience', label: 'MASTERY', sub: '02' },
  { path: '/projects', label: 'ARTIFACTS', sub: '03' },
  { path: '/connect', label: 'NEXUS', sub: '04' },
]

export function Navigation() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Top nav bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'backdrop-blur-xl border-b border-white/5' : ''
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-neon-emerald flex items-center justify-center relative overflow-hidden">
            <span className="font-display text-neon-emerald text-lg leading-none">A</span>
            <div className="absolute inset-0 bg-neon-emerald/10 group-hover:bg-neon-emerald/20 transition-colors" />
          </div>
          <span className="font-mono text-xs text-white/50 tracking-[0.2em] group-hover:text-white/80 transition-colors">
            ABHAY.SINGH
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative group flex items-center gap-2"
              >
                <span className="font-mono text-[10px] text-neon-emerald/50 group-hover:text-neon-emerald transition-colors">
                  {link.sub}
                </span>
                <span
                  className={`font-display text-sm tracking-[0.15em] transition-all duration-300 ${
                    active
                      ? 'text-neon-emerald'
                      : 'text-white/50 group-hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-neon-emerald"
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <Link
          to="/connect"
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-neon-emerald/30 text-neon-emerald font-mono text-xs tracking-widest hover:bg-neon-emerald/10 transition-all duration-300"
        >
          <span className="w-1.5 h-1.5 bg-neon-emerald rounded-full animate-pulse-glow" />
          CONNECT
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-2/3'}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  to={link.path}
                  className="font-display text-5xl tracking-widest text-white hover:text-neon-emerald transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route indicator - bottom right */}
      <div className="fixed bottom-6 right-8 z-50 flex items-center gap-3">
        <span className="font-mono text-[10px] text-white/30 tracking-widest">
          {NAV_LINKS.find((l) => l.path === location.pathname)?.sub ?? '01'} / 04
        </span>
        <div className="flex gap-1.5">
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path}>
              <div
                className={`w-5 h-px transition-all duration-500 ${
                  location.pathname === link.path
                    ? 'bg-neon-emerald scale-x-150'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
