import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { Grid } from '@react-three/drei'

export function FloatingGrid() {
  const groupRef = useRef<any>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.position.z = (clock.getElapsedTime() * 0.4) % 2
  })

  return (
    <group ref={groupRef} position={[0, -4, 0]} rotation={[0, 0, 0]}>
      <Grid
        position={[0, 0, 0]}
        args={[100, 100]}
        cellSize={2}
        cellThickness={0.3}
        cellColor="#50C878"
        sectionSize={10}
        sectionThickness={0.8}
        sectionColor="#8F00FF"
        fadeDistance={40}
        fadeStrength={3}
        infiniteGrid
      />
    </group>
  )
}
