import { useEffect } from 'react'
import { useSceneStore } from '@/store/sceneStore'

export function useMouseTracker() {
  const setMouse = useSceneStore((s) => s.setMouse)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -((e.clientY / window.innerHeight) * 2 - 1)
      setMouse(e.clientX, e.clientY, nx, ny)

      // Move custom cursor
      const cursor = document.getElementById('custom-cursor')
      const follower = document.getElementById('cursor-follower')
      if (cursor) {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
      }
      if (follower) {
        // Follower lags behind
        setTimeout(() => {
          follower.style.left = `${e.clientX}px`
          follower.style.top = `${e.clientY}px`
        }, 80)
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [setMouse])
}
