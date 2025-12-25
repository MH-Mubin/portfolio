'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

// Tech icons data with brand colors
const techIcons = [
  { name: 'Node.js', color: '#339933', position: [2, 1, -2] },
  { name: 'React', color: '#61DAFB', position: [-2, 2, -1] },
  { name: 'PostgreSQL', color: '#336791', position: [3, -1, -3] },
  { name: 'MongoDB', color: '#47A248', position: [-3, -2, -2] },
  { name: 'Express', color: '#000000', position: [1, 3, -1] },
  { name: 'NestJS', color: '#E0234E', position: [-1, -3, -3] },
  { name: 'Docker', color: '#2496ED', position: [4, 0, -2] },
  { name: 'TypeScript', color: '#3178C6', position: [-4, 1, -1] },
  { name: 'Git', color: '#F05032', position: [0, 2, -4] },
  { name: 'Prisma', color: '#2D3748', position: [2, -2, -1] },
]

// Floating tech badge component
function TechBadge({ position, name, color }: { position: [number, number, number], name: string, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1.5, 0.8, 0.1]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// Background particles
function BackgroundParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 100
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06B6D4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Main particle background component
function ParticleScene() {
  // Responsive particle count based on screen size
  const getVisibleTechIcons = () => {
    if (typeof window === 'undefined') return techIcons.slice(0, 8)
    
    const width = window.innerWidth
    if (width < 640) return techIcons.slice(0, 6)  // Mobile
    if (width < 1024) return techIcons.slice(0, 8) // Tablet
    return techIcons // Desktop
  }

  const visibleIcons = getVisibleTechIcons()

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />
      
      {/* Background particles */}
      <BackgroundParticles />
      
      {/* Tech badges */}
      {visibleIcons.map((tech, index) => (
        <TechBadge
          key={tech.name}
          position={tech.position as [number, number, number]}
          name={tech.name}
          color={tech.color}
        />
      ))}
    </>
  )
}

// Main component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ParticleScene />
      </Canvas>
    </div>
  )
}

export default ParticleBackground