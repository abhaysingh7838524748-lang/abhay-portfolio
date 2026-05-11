import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, CylinderGeometry, MathUtils } from 'three'
import { MeshTransmissionMaterial, Text, Torus } from '@react-three/drei'
import { useSceneStore } from '@/store/sceneStore'

interface ExperienceSceneProps {
  visible: boolean
}

const FUNNEL_STAGES = [
  { label: 'AWARENESS', y: 2, topR: 2.2, botR: 1.8, color: '#8F00FF', emissive: '#8F00FF' },
  { label: 'INTEREST', y: 0.5, topR: 1.8, botR: 1.3, color: '#6A30FF', emissive: '#6A30FF' },
  { label: 'DESIRE', y: -0.8, topR: 1.3, botR: 0.8, color: '#50C878', emissive: '#50C878' },
  { label: 'ACTION', y: -2, topR: 0.8, botR: 0.2, color: '#39FF14', emissive: '#39FF14' },
]

function GrowthFunnel() {
  const groupRef = useRef<Group>(null)
  const scrollProgress = useSceneStore((s) => s.scrollProgress)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.15
    // Morph-like: stages shift on scroll
    groupRef.current.scale.setScalar(
      MathUtils.lerp(0.8, 1.1, Math.min(scrollProgress * 3, 1))
    )
  })

  return (
    <group ref={groupRef} position={[2, 0, -2]}>
      {FUNNEL_STAGES.map((stage, i) => (
        <group key={i} position={[0, stage.y, 0]}>
          <mesh>
            <cylinderGeometry args={[stage.topR, stage.botR, 1.2, 32, 1, true]} />
            <meshStandardMaterial
              color={stage.color}
              emissive={stage.emissive}
              emissiveIntensity={0.6}
              transparent
              opacity={0.25}
              side={2}
              wireframe={false}
            />
          </mesh>
          {/* Ring at each stage */}
          <Torus args={[stage.topR, 0.03, 8, 48]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color={stage.color} emissive={stage.emissive} emissiveIntensity={3} />
          </Torus>
          <Text
            position={[stage.topR + 0.6, 0.2, 0]}
            fontSize={0.2}
            color={stage.color}
            anchorX="left"
          >
            {stage.label}
          </Text>
          <pointLight color={stage.color} intensity={1.5} distance={4} />
        </group>
      ))}

      {/* Bottom glow */}
      <pointLight position={[0, -3, 0]} color="#39FF14" intensity={5} distance={6} />
    </group>
  )
}

// Trishul (Trident) - SEO/Meta/Google power
function Trishul() {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.3
    ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.2
  })

  return (
    <group ref={ref} position={[-3, 0, -1]} scale={0.9}>
      {/* Center prong */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.5, 8]} />
        <meshStandardMaterial color="#50C878" emissive="#50C878" emissiveIntensity={2} metalness={1} />
      </mesh>
      {/* Tip */}
      <mesh position={[0, 2.9, 0]}>
        <coneGeometry args={[0.12, 0.6, 8]} />
        <meshStandardMaterial color="#50C878" emissive="#50C878" emissiveIntensity={3} metalness={1} />
      </mesh>

      {/* Left prong */}
      <mesh position={[-0.4, 2.1, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
        <meshStandardMaterial color="#8F00FF" emissive="#8F00FF" emissiveIntensity={2} metalness={1} />
      </mesh>
      <mesh position={[-0.7, 2.7, 0]} rotation={[0, 0, 0.1]}>
        <coneGeometry args={[0.09, 0.4, 8]} />
        <meshStandardMaterial color="#8F00FF" emissive="#8F00FF" emissiveIntensity={3} />
      </mesh>

      {/* Right prong */}
      <mesh position={[0.4, 2.1, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
        <meshStandardMaterial color="#8F00FF" emissive="#8F00FF" emissiveIntensity={2} metalness={1} />
      </mesh>
      <mesh position={[0.7, 2.7, 0]} rotation={[0, 0, -0.1]}>
        <coneGeometry args={[0.09, 0.4, 8]} />
        <meshStandardMaterial color="#8F00FF" emissive="#8F00FF" emissiveIntensity={3} />
      </mesh>

      {/* Handle */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.06, 0.04, 3, 8]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Labels */}
      <Text position={[-1.4, 2.7, 0]} fontSize={0.14} color="#8F00FF">SEO</Text>
      <Text position={[0.9, 2.7, 0]} fontSize={0.14} color="#8F00FF">META</Text>
      <Text position={[0, 3.3, 0]} fontSize={0.14} color="#50C878">GOOGLE</Text>

      <pointLight color="#50C878" intensity={5} distance={6} />
    </group>
  )
}

export function ExperienceScene({ visible }: ExperienceSceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (groupRef.current) groupRef.current.visible = visible
  })

  return (
    <group ref={groupRef} visible={visible}>
      <pointLight position={[5, 5, 5]} color="#8F00FF" intensity={6} distance={20} />
      <pointLight position={[-5, 0, 3]} color="#50C878" intensity={5} distance={20} />

      <GrowthFunnel />
      <Trishul />
    </group>
  )
}
