import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useSceneStore } from '@/store/sceneStore'

let lenisInstance: Lenis | null = null

export function useLenis() {
  const rafRef = useRef<number>(0)
  const setScroll = useSceneStore((s) => s.setScroll)

  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisInstance.on('scroll', ({ scroll, progress }: { scroll: number; progress: number }) => {
      setScroll(progress, scroll)
    })

    function raf(time: number) {
      lenisInstance?.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenisInstance?.destroy()
      lenisInstance = null
    }
  }, [setScroll])

  return lenisInstance
}

export function getLenis() {
  return lenisInstance
}
