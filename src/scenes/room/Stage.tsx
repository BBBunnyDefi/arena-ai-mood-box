import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { DoubleSide, MeshBasicMaterial } from 'three'
import { lightingRuntime } from '@/engine/lighting'

export function Stage() {
  const halo = useRef<MeshBasicMaterial>(null)
  const glow = useRef<MeshBasicMaterial>(null)

  useFrame(() => {
    if (halo.current) {
      halo.current.color.copy(lightingRuntime.practicalColor)
      halo.current.opacity = 0.28 + lightingRuntime.practical * 0.35
    }
    if (glow.current) {
      glow.current.color.copy(lightingRuntime.windowColor)
      glow.current.opacity = 0.08 + lightingRuntime.windowEmissive * 0.22
    }
  })

  return (
    <group>
      <RoundedBox
        args={[8.7, 0.34, 7.15]}
        radius={0.22}
        smoothness={4}
        position={[0.15, -0.78, 0.08]}
        receiveShadow
        castShadow
      >
        <meshPhysicalMaterial color="#1c1e22" roughness={0.86} metalness={0.08} />
      </RoundedBox>
      <RoundedBox
        args={[7.85, 0.2, 6.25]}
        radius={0.16}
        smoothness={4}
        position={[0.08, -0.28, 0.04]}
        receiveShadow
        castShadow
      >
        <meshPhysicalMaterial
          color="#cbb9a2"
          roughness={0.74}
          metalness={0.02}
          clearcoat={0.08}
          clearcoatRoughness={0.55}
        />
      </RoundedBox>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.1, -0.42, 0.02]}>
        <torusGeometry args={[3.05, 0.012, 10, 96]} />
        <meshBasicMaterial ref={halo} color="#c4a574" transparent opacity={0.45} />
      </mesh>

      <mesh position={[0.2, 2.35, -1.4]} rotation={[0, 0.22, 0]} receiveShadow>
        <cylinderGeometry args={[10.2, 10.2, 6.8, 64, 1, true, 0.55, Math.PI * 1.12]} />
        <meshStandardMaterial color="#141416" roughness={0.96} metalness={0} side={DoubleSide} />
      </mesh>

      <mesh position={[0.45, 1.7, -3.55]}>
        <planeGeometry args={[5.4, 3.4]} />
        <meshBasicMaterial
          ref={glow}
          color="#ffb07a"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
