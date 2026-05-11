import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, MathUtils } from 'three'
import { MeshTransmissionMaterial, Text, Float, Torus, RoundedBox, Sphere } from '@react-three/drei'
import { useSceneStore } from '@/store/sceneStore'

interface HeroSceneProps {
  visible: boolean
}

// Sudarshan Chakra - spinning disc of marketing
function SudarshanChakra({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)
  const innerRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = clock.getElapsedTime() * 0.8
    if (innerRef.current) innerRef.current.rotation.z = -clock.getElapsedTime() * 1.5
  })

  const spokes = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2,
      length: 0.8,
    })),
  [])

  return (
    <group position={position}>
      {/* Outer ring */}
      <group ref={groupRef}>
        <Torus args={[1.2, 0.04, 8, 64]}>
          <meshStandardMaterial
            color="#50C878"
            emissive="#50C878"
            emissiveIntensity={2}
            metalness={0.8}
            roughness={0.1}
          />
        </Torus>
        {/* Spokes */}
        {spokes.map((s, i) => (
          <mesh
            key={i}
            position={[Math.cos(s.angle) * 0.6, Math.sin(s.angle) * 0.6, 0]}
            rotation={[0, 0, s.angle]}
          >
            <boxGeometry args={[s.length, 0.03, 0.03]} />
            <meshStandardMaterial
              color="#50C878"
              emissive="#50C878"
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}
      </group>

      {/* Inner disc - glass */}
      <group ref={innerRef}>
        <mesh>
          <circleGeometry args={[0.6, 32]} />
          <MeshTransmissionMaterial
            transmission={0.95}
            roughness={0.05}
            thickness={0.5}
            chromaticAberration={0.1}
            color="#8F00FF"
          />
        </mesh>
      </group>

      {/* Center glow */}
      <pointLight color="#50C878" intensity={3} distance={5} />
    </group>
  )
}

// Orbiting tech icons as glowing geometric shapes
function OrbitingIcon({ radius, speed, offset, color, shape }: {
  radius: number
  speed: number
  offset: number
  color: string
  shape: 'box' | 'sphere' | 'torus'
}) {
  const ref = useRef<any>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed + offset
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.y = Math.sin(t) * radius * 0.5
    ref.current.rotation.y = t
    ref.current.rotation.x = t * 0.5
  })

  return (
    <group ref={ref}>
      {shape === 'box' && (
        <mesh>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} metalness={0.9} roughness={0.1} />
        </mesh>
      )}
      {shape === 'sphere' && (
        <Sphere args={[0.15, 16, 16]}>
          <MeshTransmissionMaterial
            transmission={0.9}
            color={color}
            roughness={0.05}
            thickness={0.3}
          />
        </Sphere>
      )}
      {shape === 'torus' && (
        <Torus args={[0.15, 0.05, 8, 24]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </Torus>
      )}
      <pointLight color={color} intensity={1} distance={2} />
    </group>
  )
}

// Central avatar proxy - a glass humanoid silhouette
function AvatarSilhouette() {
  const ref = useRef<Group>(null)
  const mouseNormX = useSceneStore((s) => s.mouseNormX)
  const mouseNormY = useSceneStore((s) => s.mouseNormY)

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y = MathUtils.lerp(
      ref.current.rotation.y,
      mouseNormX * 0.4,
      0.05
    )
    ref.current.rotation.x = MathUtils.lerp(
      ref.current.rotation.x,
      -mouseNormY * 0.2,
      0.05
    )
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={[0, 0, 0]}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.35, 1.2, 8, 16]} />
          <MeshTransmissionMaterial
            transmission={0.92}
            roughness={0.0}
            thickness={1}
            chromaticAberration={0.15}
            color="#50C878"
            anisotropicBlur={0.1}
          />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <MeshTransmissionMaterial
            transmission={0.9}
            roughness={0.05}
            thickness={0.6}
            chromaticAberration={0.2}
            color="#8F00FF"
          />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.55, 0.2, 0]} rotation={[0, 0, 0.3]}>
          <capsuleGeometry args={[0.1, 0.7, 4, 8]} />
          <meshStandardMaterial color="#50C878" emissive="#50C878" emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0.55, 0.2, 0]} rotation={[0, 0, -0.3]}>
          <capsuleGeometry args={[0.1, 0.7, 4, 8]} />
          <meshStandardMaterial color="#50C878" emissive="#50C878" emissiveIntensity={0.3} transparent opacity={0.5} />
        </mesh>

        {/* Aura ring */}
        <Torus args={[0.8, 0.015, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#8F00FF" emissive="#8F00FF" emissiveIntensity={3} />
        </Torus>

        {/* Inner glow light */}
        <pointLight color="#50C878" intensity={4} distance={4} />
      </group>
    </Float>
  )
}

export function HeroScene({ visible }: HeroSceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const opacity = visible ? 1 : 0
    groupRef.current.visible = visible
    // Subtle scene breathing
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.05
  })

  return (
    <group ref={groupRef} visible={visible}>
      {/* Key lighting */}
      <pointLight position={[5, 5, 5]} color="#50C878" intensity={8} distance={20} />
      <pointLight position={[-5, -3, 3]} color="#8F00FF" intensity={6} distance={20} />
      <spotLight
        position={[0, 10, 5]}
        color="#ffffff"
        intensity={2}
        angle={0.3}
        penumbra={0.8}
        castShadow={false}
      />

      {/* Avatar centered */}
      <AvatarSilhouette />

      {/* Sudarshan Chakra - left */}
      <SudarshanChakra position={[-3.5, 0.5, -2]} />

      {/* Orbiting icons */}
      <OrbitingIcon radius={2.2} speed={0.6} offset={0} color="#50C878" shape="box" />
      <OrbitingIcon radius={2.2} speed={0.6} offset={Math.PI * 0.66} color="#8F00FF" shape="sphere" />
      <OrbitingIcon radius={2.2} speed={0.6} offset={Math.PI * 1.33} color="#50C878" shape="torus" />

      {/* Outer orbit */}
      <OrbitingIcon radius={3.5} speed={0.35} offset={Math.PI / 4} color="#ffffff" shape="sphere" />
      <OrbitingIcon radius={3.5} speed={0.35} offset={Math.PI * 0.9} color="#8F00FF" shape="box" />

      {/* Glass platform */}
      <RoundedBox
        args={[4, 0.08, 2]}
        radius={0.04}
        position={[0, -1.9, 0]}
      >
        <MeshTransmissionMaterial
          transmission={0.85}
          roughness={0.1}
          thickness={0.2}
          color="#50C878"
          chromaticAberration={0.05}
        />
      </RoundedBox>

      {/* Floor glow */}
      <pointLight position={[0, -2, 0]} color="#50C878" intensity={4} distance={8} />

      {/* 3D floating text - skill labels */}
      <Text
        position={[-4, 2, -3]}
        fontSize={0.18}
        color="#50C878"
        font={undefined}
        anchorX="center"
        anchorY="middle"
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
      >
        INSTAGRAM GROWTH
      </Text>
      <Text
        position={[4, 1.5, -3]}
        fontSize={0.18}
        color="#8F00FF"
        anchorX="center"
        anchorY="middle"
      >
        DIGITAL STRATEGY
      </Text>
      <Text
        position={[-3.5, -1, -3]}
        fontSize={0.15}
        color="#ffffff"
        transparent
        fillOpacity={0.4}
        anchorX="center"
        anchorY="middle"
      >
        META · GOOGLE · CONTENT
      </Text>
    </group>
  )
}
