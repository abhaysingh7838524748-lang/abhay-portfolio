import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense, useEffect } from 'react'

import { PersistentCanvas } from '@/components/3d/PersistentCanvas'
import { Navigation } from '@/components/ui/Navigation'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { PageLoader } from '@/components/ui/PageLoader'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'

import HeroPage from '@/pages/Hero'
import ExperiencePage from '@/pages/Experience'
import ProjectsPage from '@/pages/Projects'
import ConnectPage from '@/pages/Connect'

import { useLenis } from '@/hooks/useLenis'
import { useMouseTracker } from '@/hooks/useMouse'
import { usePerformanceDetect } from '@/hooks/usePerformanceDetect'
import { useSceneStore } from '@/store/sceneStore'

function AppInner() {
  const location = useLocation()
  const setRoute = useSceneStore((s) => s.setRoute)

  useLenis()
  useMouseTracker()
  usePerformanceDetect()

  useEffect(() => {
    const path = location.pathname as '/' | '/experience' | '/projects' | '/connect'
    setRoute(path)
  }, [location.pathname, setRoute])

  return (
    <div className="relative w-full min-h-screen bg-black overflow-x-hidden">
      {/* Custom cursor elements */}
      <CustomCursor />

      {/* Noise grain overlay */}
      <NoiseOverlay />

      {/* Persistent WebGL Canvas - never unmounts */}
      <div id="r3f-canvas">
        <Suspense fallback={null}>
          <PersistentCanvas />
        </Suspense>
      </div>

      {/* Navigation - always visible */}
      <Navigation />

      {/* Page content with transitions */}
      <div id="ui-overlay">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HeroPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/connect" element={<ConnectPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <AppInner />
      </Suspense>
    </BrowserRouter>
  )
}
