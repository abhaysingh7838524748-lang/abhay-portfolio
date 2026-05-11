import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { MeshTransmissionMaterial, Float, Torus, RoundedBox } from '@react-three/drei'
import { useSceneStore } from '@/store/sceneStore'

interface ProjectsSceneProps {
  visible: boolean
}

function GlassPortal({ position, color, rotation }: {
  position: [number, number, number]
  color: string
  rotation?: [number, number, number]
}) {
  const ref = useRef<any>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = (rotation?.[1] ?? 0) + Math.sin(clock.getElapsedTime() * 0.4) * 0.15
  })

  return (
    <group position={position} ref={ref} rotation={rotation}>
      {/* Portal ring */}
      <Torus args={[1.0, 0.04, 12, 64]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </Torus>
      {/* Glass portal surface */}
      <mesh>
        <circleGeometry args={[0.96, 48]} />
        <MeshTransmissionMaterial
          transmission={0.85}
          roughness={0.02}
          thickness={0.5}
          chromaticAberration={0.2}
          color={color}
          anisotropicBlur={0.05}
        />
      </mesh>
      <pointLight color={color} intensity={3} distance={5} />
    </group>
  )
}

export function ProjectsScene({ visible }: ProjectsSceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.visible = visible
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef} visible={visible}>
      <pointLight position={[0, 5, 5]} color="#50C878" intensity={8} distance={20} />
      <pointLight position={[-5, -3, 3]} color="#8F00FF" intensity={6} distance={20} />

      {/* Three glass portals for three projects */}
      <Float speed={1.2} floatIntensity={0.3}>
        <GlassPortal position={[-4, 1, -3]} color="#50C878" rotation={[0, 0.5, 0]} />
      </Float>
      <Float speed={0.9} floatIntensity={0.4}>
        <GlassPortal position={[0, 0, -4]} color="#8F00FF" rotation={[0, 0, 0]} />
      </Float>
      <Float speed={1.4} floatIntensity={0.25}>
        <GlassPortal position={[4, 1, -3]} color="#50C878" rotation={[0, -0.5, 0]} />
      </Float>

      {/* Background artifact panels */}
      <RoundedBox args={[8, 0.02, 5]} radius={0.01} position={[0, -3, -5]}>
        <meshStandardMaterial color="#50C878" emissive="#50C878" emissiveIntensity={0.3} transparent opacity={0.4} />
      </RoundedBox>
    </group>
  )
}
