import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageWrap } from '@/components/ui/PageLoader'
import { useSceneStore } from '@/store/sceneStore'

const SERVICES = [
  { id: 'social', label: 'Social Media Growth' },
  { id: 'ads', label: 'Paid Ads (Meta/Google)' },
  { id: 'content', label: 'Content Strategy' },
  { id: 'brand', label: 'Brand Development' },
  { id: 'video', label: 'Short-form Video' },
]

const CONTACT_INFO = [
  { label: 'LOCATION', value: 'New Delhi, India', icon: '◎' },
  { label: 'AVAILABILITY', value: 'Open to Projects', icon: '●' },
  { label: 'RESPONSE', value: 'Within 24 Hours', icon: '◷' },
]

function ContactForm() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  useEffect(() => {
    // Focus input after step change
    setTimeout(() => {
      const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>('.form-input-active')
      el?.focus()
    }, 300)
  }, [step])

  const STEPS = [
    {
      question: "What's your name?",
      field: 'name' as const,
      placeholder: 'Full name',
      type: 'text',
    },
    {
      question: "Your email address?",
      field: 'email' as const,
      placeholder: 'you@example.com',
      type: 'email',
    },
    {
      question: "Which service are you looking for?",
      field: 'service' as const,
      placeholder: '',
      type: 'select',
    },
    {
      question: "Tell me about your project.",
      field: 'message' as const,
      placeholder: 'What are you building? What\'s the challenge?',
      type: 'textarea',
    },
  ]

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 2000)
  }

  const currentStep = STEPS[step]

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-16 h-16 border border-neon-emerald/30 rounded-full flex items-center justify-center mb-8 relative">
          <span className="text-neon-emerald text-2xl">✓</span>
          <div className="absolute inset-0 border border-neon-emerald/20 rounded-full animate-ping" />
        </div>
        <h3 className="font-display text-3xl text-white mb-3">MESSAGE SENT</h3>
        <p className="font-mono text-xs text-white/30 tracking-widest mb-2">
          Thank you, {formData.name}.
        </p>
        <p className="font-body text-sm text-white/40">
          Abhay will respond within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="flex gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="h-px flex-1 transition-all duration-500"
            style={{
              background: i <= step ? '#50C878' : 'rgba(255,255,255,0.1)',
              boxShadow: i <= step ? '0 0 6px #50C878' : 'none',
            }}
          />
        ))}
      </div>

      {/* Step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[9px] text-neon-emerald/50 tracking-widest">
              {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
            </span>
          </div>

          <h3 className="font-display text-2xl text-white tracking-wide">{currentStep.question}</h3>

          {currentStep.type === 'select' ? (
            <div className="grid grid-cols-1 gap-2 mt-4">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setFormData({ ...formData, service: service.label })
                    setTimeout(() => setStep(step + 1), 200)
                  }}
                  className={`text-left px-4 py-3 border transition-all duration-200 font-mono text-xs tracking-widest ${
                    formData.service === service.label
                      ? 'border-neon-emerald text-neon-emerald bg-neon-emerald/5'
                      : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                  }`}
                >
                  {service.label}
                </button>
              ))}
            </div>
          ) : currentStep.type === 'textarea' ? (
            <textarea
              className="form-input-active w-full bg-transparent border-b border-white/20 focus:border-neon-emerald outline-none text-white font-body text-sm py-3 resize-none transition-colors duration-300 placeholder:text-white/20"
              rows={4}
              placeholder={currentStep.placeholder}
              value={formData[currentStep.field]}
              onChange={(e) => setFormData({ ...formData, [currentStep.field]: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Enter' && e.metaKey) handleNext() }}
            />
          ) : (
            <input
              className="form-input-active w-full bg-transparent border-b border-white/20 focus:border-neon-emerald outline-none text-white font-body text-sm py-3 transition-colors duration-300 placeholder:text-white/20"
              type={currentStep.type}
              placeholder={currentStep.placeholder}
              value={formData[currentStep.field]}
              onChange={(e) => setFormData({ ...formData, [currentStep.field]: e.target.value })}
              onKeyDown={(e) => { if (e.key === 'Enter') handleNext() }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {currentStep.type !== 'select' && (
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => step > 0 && setStep(step - 1)}
            className={`font-mono text-xs tracking-widest text-white/30 hover:text-white/60 transition-colors ${
              step === 0 ? 'invisible' : ''
            }`}
          >
            ← BACK
          </button>
          <button
            onClick={handleNext}
            disabled={!formData[currentStep.field] || loading}
            className="group flex items-center gap-3 px-6 py-3 border border-neon-emerald/30 text-neon-emerald font-mono text-xs tracking-widest hover:bg-neon-emerald/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-pulse">SENDING...</span>
            ) : step === STEPS.length - 1 ? (
              'TRANSMIT →'
            ) : (
              'CONTINUE →'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default function ConnectPage() {
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
            <span className="font-mono text-[10px] text-electric-violet tracking-[0.3em]">04 / HOLOGRAPHIC NEXUS</span>
            <div className="h-px w-10 bg-electric-violet/30" />
          </div>
          <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-none tracking-tight">
            LET'S <span className="text-electric-violet glow-violet">BUILD</span>
          </h2>
          <p className="mt-4 max-w-lg text-white/40 font-body text-sm leading-relaxed">
            Ready to grow something remarkable? Start a conversation. Every great collaboration begins with a single signal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">

          {/* Form — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-3 glass p-10"
          >
            <ContactForm />
          </motion.div>

          {/* Info panel — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact info cards */}
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-start gap-4 p-5 glass-emerald"
              >
                <span className="text-neon-emerald mt-0.5">{info.icon}</span>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-white/30 mb-1">{info.label}</p>
                  <p className="font-body text-sm text-white/70">{info.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <p className="font-mono text-[9px] tracking-widest text-white/20">FIND ME ON</p>
              {[
                { label: 'Instagram', handle: '@abhay.strategy' },
                { label: 'LinkedIn', handle: 'Abhay Singh' },
                { label: 'YouTube', handle: 'Content Drops' },
              ].map((social) => (
                <div key={social.label} className="flex items-center justify-between group cursor-pointer">
                  <span className="font-mono text-xs text-white/40 tracking-widest group-hover:text-white/70 transition-colors">
                    {social.label}
                  </span>
                  <span className="font-mono text-xs text-neon-emerald/50 group-hover:text-neon-emerald transition-colors">
                    {social.handle} →
                  </span>
                </div>
              ))}
            </div>

            {/* Availability status */}
            <div className="p-5 border border-neon-emerald/20 bg-neon-emerald/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-neon-emerald rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-neon-emerald tracking-widest">AVAILABLE FOR WORK</span>
              </div>
              <p className="font-body text-xs text-white/40 leading-relaxed">
                Currently accepting freelance projects in digital strategy, content creation, and paid media.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrap>
  )
}
