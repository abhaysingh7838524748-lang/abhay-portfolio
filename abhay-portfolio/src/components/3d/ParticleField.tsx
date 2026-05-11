import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh, Object3D, Color } from 'three'
import { useSceneStore } from '@/store/sceneStore'

interface ParticleFieldProps {
  count?: number
}

export function ParticleField({ count = 600 }: ParticleFieldProps) {
  const meshRef = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])
  const mouseNormX = useSceneStore((s) => s.mouseNormX)
  const mouseNormY = useSceneStore((s) => s.mouseNormY)

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 40,
      z: (Math.random() - 0.5) * 30 - 5,
      speed: Math.random() * 0.002 + 0.0005,
      offset: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.06 + 0.02,
      colorRand: Math.random(),
    }))
  }, [count])

  const emerald = useMemo(() => new Color('#50C878'), [])
  const violet = useMemo(() => new Color('#8F00FF'), [])
  const white = useMemo(() => new Color('#ffffff'), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    particles.forEach((p, i) => {
      const y = p.y + Math.sin(t * p.speed * 10 + p.offset) * 0.3
      const x = p.x + mouseNormX * 0.3
      const yy = y + mouseNormY * 0.2

      dummy.position.set(x, yy, p.z)
      dummy.scale.setScalar(p.scale + Math.sin(t * p.speed * 5 + p.offset) * 0.01)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)

      const color = p.colorRand > 0.7 ? emerald : p.colorRand > 0.4 ? violet : white
      meshRef.current!.setColorAt(i, color)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial transparent opacity={0.6} />
    </instancedMesh>
  )
}
