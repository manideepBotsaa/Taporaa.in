import { useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function PointerTilt({
  children,
  intensity = 0.35,
}: {
  children: ReactNode
  intensity?: number
}) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const targetY = state.pointer.x * intensity
    const targetX = -state.pointer.y * intensity * 0.6
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.06
  })

  return <group ref={group}>{children}</group>
}
