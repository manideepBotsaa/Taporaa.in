import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SignalWaves({
  position = [0, 0, 0] as [number, number, number],
  count = 3,
  color = '#b76bff',
}) {
  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const phase = ((t * 0.5 + i / count) % 1)
      const s = 0.2 + phase * 1.6
      mesh.scale.setScalar(s)
      const mat = mesh.material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(0, 0.6 * (1 - phase))
    })
  })

  return (
    <group position={position} rotation={[0, 0, 0]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el }}>
          <ringGeometry args={[0.42, 0.46, 48]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}
