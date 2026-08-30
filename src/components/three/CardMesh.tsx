import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'
import { createDemoQRTexture } from '@/lib/qrTexture'

export type CardVariant = 'review' | 'table'

interface CardMeshProps {
  variant: CardVariant
  tableNumber?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  floatSpeed?: number
  seed?: number
}

/**
 * A physically-styled premium card: beveled edges, dark body, glossy clearcoat,
 * soft purple rim light, engraved wordmark, NFC glyph and a demo QR patch.
 */
export default function CardMesh({
  variant,
  tableNumber = '07',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  floatSpeed = 1,
  seed = 3,
}: CardMeshProps) {
  const group = useRef<THREE.Group>(null)
  const rim = useRef<THREE.Mesh>(null)
  const qrTexture = useMemo(() => createDemoQRTexture(seed), [seed])

  const accent = variant === 'review' ? '#b76bff' : '#8b3fe0'

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * floatSpeed
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(t * 0.7) * 0.08
      group.current.rotation.z = rotation[2] + Math.sin(t * 0.5) * 0.02
    }
    if (rim.current) {
      const mat = rim.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 0.55 + Math.sin(t * 1.4) * 0.25
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {/* card body */}
      <RoundedBox args={[2.4, 3.4, 0.09]} radius={0.14} smoothness={6} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#0b0710"
          metalness={0.55}
          roughness={0.28}
          clearcoat={0.9}
          clearcoatRoughness={0.18}
          reflectivity={0.6}
        />
      </RoundedBox>

      {/* rim light edge */}
      <mesh ref={rim} position={[0, 0, -0.001]}>
        <torusGeometry args={[1.55, 0.012, 8, 4]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.6} toneMapped={false} />
      </mesh>

      {/* brand micro-label */}
      <Text
        position={[-0.92, 1.42, 0.052]}
        fontSize={0.15}
        letterSpacing={0.12}
        color="#f2edf7"
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.ttf"
      >
        TAPORAA
      </Text>

      {/* NFC glyph */}
      <group position={[0.75, 1.0, 0.052]}>
        {[0.05, 0.12, 0.19].map((r, i) => (
          <mesh key={i} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[r, 0.006, 8, 24, Math.PI]} />
            <meshStandardMaterial color="#c9a6ff" emissive="#c9a6ff" emissiveIntensity={0.4} toneMapped={false} />
          </mesh>
        ))}
      </group>

      {/* headline */}
      {variant === 'review' ? (
        <>
          <Text position={[-0.92, 0.15, 0.052]} fontSize={0.22} color="#f2edf7" anchorX="left" anchorY="middle" maxWidth={1.8}>
            GOOGLE
          </Text>
          <Text position={[-0.92, -0.14, 0.052]} fontSize={0.22} color="#f2edf7" anchorX="left" anchorY="middle" maxWidth={1.8}>
            REVIEW CARD
          </Text>
          <Text
            position={[-0.92, -0.42, 0.052]}
            fontSize={0.09}
            letterSpacing={0.08}
            color="#a89bb8"
            anchorX="left"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.ttf"
          >
            TAP OR SCAN TO REVIEW
          </Text>
        </>
      ) : (
        <>
          <Text
            position={[-0.92, 0.18, 0.052]}
            fontSize={0.1}
            letterSpacing={0.1}
            color="#a89bb8"
            anchorX="left"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.ttf"
          >
            TABLE
          </Text>
          <Text position={[-0.92, -0.12, 0.052]} fontSize={0.5} color="#f2edf7" anchorX="left" anchorY="middle">
            {tableNumber}
          </Text>
          <Text
            position={[-0.92, -0.42, 0.052]}
            fontSize={0.09}
            letterSpacing={0.08}
            color="#a89bb8"
            anchorX="left"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n1i8q131nj-o.ttf"
          >
            TAP OR SCAN TO ORDER
          </Text>
        </>
      )}

      {/* QR patch */}
      <mesh position={[0.62, -1.15, 0.052]}>
        <planeGeometry args={[0.85, 0.85]} />
        <meshBasicMaterial map={qrTexture} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}
