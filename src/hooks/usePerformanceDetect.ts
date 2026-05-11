import { useEffect } from 'react'
import { useSceneStore } from '@/store/sceneStore'

export function usePerformanceDetect() {
  const store = useSceneStore()

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)

    // Detect low performance: if no GPU info or mobile, flag it
    let isLowPerf = isMobile

    // Try WebGL renderer string
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string
          if (/intel|mesa|llvm/i.test(renderer)) {
            isLowPerf = true
          }
        }
      }
    } catch (_) {
      isLowPerf = true
    }

    useSceneStore.setState({ isMobile, isLowPerf })
  }, [store])
}
