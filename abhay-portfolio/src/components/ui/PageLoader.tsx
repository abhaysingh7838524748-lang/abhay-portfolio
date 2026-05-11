import { motion } from 'framer-motion'

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border border-neon-emerald/30 rounded-full animate-spin-slow" />
          <div className="absolute inset-2 border border-electric-violet/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-neon-emerald text-xl">A</span>
          </div>
        </div>
        <span className="font-mono text-xs text-white/30 tracking-[0.3em] animate-pulse">
          LOADING REALITY
        </span>
      </div>
    </div>
  )
}

export function NoiseOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9990] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
      }}
    />
  )
}

interface PageWrapProps {
  children: React.ReactNode
  className?: string
}

export function PageWrap({ children, className = '' }: PageWrapProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`min-h-screen w-full ${className}`}
    >
      {children}
    </motion.div>
  )
}
