import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function PhoneMesh({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.6 + 2) * 0.09
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={[1.5, 3.0, 0.12]} radius={0.22} smoothness={6}>
        <meshPhysicalMaterial color="#0a0710" metalness={0.7} roughness={0.3} clearcoat={0.7} />
      </RoundedBox>
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[1.34, 2.82]} />
        <meshStandardMaterial color="#120a1c" emissive="#3d1866" emissiveIntensity={0.5} toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.28, 0.07]}>
        <circleGeometry args={[0.05, 24]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
    </group>
  )
}
