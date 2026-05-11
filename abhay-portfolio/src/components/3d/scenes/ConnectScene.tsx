import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, MathUtils } from 'three'
import { MeshTransmissionMaterial, Torus, Sphere, Float } from '@react-three/drei'
import { useSceneStore } from '@/store/sceneStore'

interface ConnectSceneProps {
  visible: boolean
}

function HolographicSphere() {
  const outerRef = useRef<any>(null)
  const innerRef = useRef<any>(null)
  const ring1Ref = useRef<any>(null)
  const ring2Ref = useRef<any>(null)
  const mouseNormX = useSceneStore((s) => s.mouseNormX)
  const mouseNormY = useSceneStore((s) => s.mouseNormY)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.3
      outerRef.current.rotation.x = MathUtils.lerp(
        outerRef.current.rotation.x,
        mouseNormY * 0.4,
        0.05
      )
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = t * 0.3
    }
  })

  return (
    <Float speed={1} floatIntensity={0.3}>
      <group position={[2.5, 0, -1]}>
        {/* Outer glass sphere */}
        <Sphere ref={outerRef} args={[1.5, 32, 32]}>
          <MeshTransmissionMaterial
            transmission={0.92}
            roughness={0}
            thickness={1}
            chromaticAberration={0.25}
            color="#8F00FF"
            anisotropicBlur={0.05}
          />
        </Sphere>

        {/* Inner core */}
        <Sphere ref={innerRef} args={[0.6, 16, 16]}>
          <meshStandardMaterial
            color="#50C878"
            emissive="#50C878"
            emissiveIntensity={3}
            metalness={1}
            roughness={0}
          />
        </Sphere>

        {/* Orbital rings */}
        <Torus ref={ring1Ref} args={[1.8, 0.02, 8, 64]}>
          <meshStandardMaterial color="#50C878" emissive="#50C878" emissiveIntensity={2} />
        </Torus>
        <Torus ref={ring2Ref} args={[2.1, 0.015, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#8F00FF" emissive="#8F00FF" emissiveIntensity={2} />
        </Torus>

        <pointLight color="#8F00FF" intensity={6} distance={8} />
        <pointLight color="#50C878" intensity={4} distance={6} />
      </group>
    </Float>
  )
}

export function ConnectScene({ visible }: ConnectSceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (groupRef.current) groupRef.current.visible = visible
  })

  return (
    <group ref={groupRef} visible={visible}>
      <pointLight position={[-5, 5, 5]} color="#8F00FF" intensity={6} distance={20} />
      <pointLight position={[5, -3, 3]} color="#50C878" intensity={5} distance={20} />

      <HolographicSphere />
    </group>
  )
}
