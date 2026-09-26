import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MeshStandardMaterial, PointLight } from 'three'
import { lightingRuntime } from '@/engine/lighting'
import { EntityRoot } from '@/engine/runtime/EntityRoot'
import { useExperience } from '@/engine/state'
import { Surface } from './Surface'

export function LightingObjects() {
  return <FloorLamp />
}

function FloorLamp() {
  const bulb = useRef<PointLight>(null)
  const shade = useRef<MeshStandardMaterial>(null)
  const quality = useExperience((s) => s.quality)

  useFrame(() => {
    if (bulb.current) {
      bulb.current.intensity = 0.15 + lightingRuntime.practical * 2.4
      bulb.current.color.copy(lightingRuntime.practicalColor)
    }
    if (shade.current) {
      shade.current.emissive.copy(lightingRuntime.practicalColor)
      shade.current.emissiveIntensity = 0.08 + lightingRuntime.practical * 0.85
    }
  })

  return (
    <EntityRoot id="floor-lamp">
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.16, 0.03, 24]} />
        <Surface entityId="floor-lamp" />
      </mesh>
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.022, 1.58, 12]} />
        <Surface entityId="floor-lamp" />
      </mesh>
      <mesh position={[0, 1.62, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.2, 0.22, 24]} />
        <meshStandardMaterial
          ref={shade}
          color="#efe6d6"
          roughness={0.7}
          emissive="#ffb070"
          emissiveIntensity={0.2}
        />
      </mesh>
      <pointLight
        ref={bulb}
        position={[0, 1.55, 0]}
        distance={5.2}
        decay={2}
        intensity={0.4}
        castShadow={quality === 'high'}
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.0002}
      />
    </EntityRoot>
  )
}
