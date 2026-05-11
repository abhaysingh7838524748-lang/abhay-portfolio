import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'

import { useSceneStore } from '@/store/sceneStore'
import { HeroScene } from './scenes/HeroScene'
import { ExperienceScene } from './scenes/ExperienceScene'
import { ProjectsScene } from './scenes/ProjectsScene'
import { ConnectScene } from './scenes/ConnectScene'
import { ParticleField } from './ParticleField'
import { FloatingGrid } from './FloatingGrid'

export function PersistentCanvas() {
  const isLowPerf = useSceneStore((s) => s.isLowPerf)
  const currentRoute = useSceneStore((s) => s.currentRoute)

  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 1000 }}
      gl={{
        antialias: !isLowPerf,
        powerPreference: 'high-performance',
        alpha: true,
        stencil: false,
        depth: true,
      }}
      dpr={isLowPerf ? 1 : [1, 2]}
    >
      <PerformanceMonitor
        onDecline={() => useSceneStore.setState({ isLowPerf: true })}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Global ambient */}
      <ambientLight intensity={0.1} />

      {/* Global background particles - always visible */}
      <Suspense fallback={null}>
        <ParticleField count={isLowPerf ? 300 : 800} />
        <FloatingGrid />
        <Stars radius={200} depth={50} count={isLowPerf ? 500 : 2000} factor={4} saturation={0} fade speed={0.5} />
      </Suspense>

      {/* Route-specific scenes */}
      <Suspense fallback={null}>
        <HeroScene visible={currentRoute === '/'} />
        <ExperienceScene visible={currentRoute === '/experience'} />
        <ProjectsScene visible={currentRoute === '/projects'} />
        <ConnectScene visible={currentRoute === '/connect'} />
      </Suspense>

      {/* Post-processing */}
      {!isLowPerf && (
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new Vector2(0.0005, 0.0005)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise opacity={0.02} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
