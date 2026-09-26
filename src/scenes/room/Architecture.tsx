import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { DoubleSide, Group, MeshPhysicalMaterial, PointLight } from 'three'
import { createWallGeometry } from '@/engine/geometry'
import { lightingRuntime } from '@/engine/lighting'
import { motionRuntime, staggeredAmount } from '@/engine/motion'
import { EntityRoot } from '@/engine/runtime/EntityRoot'
import { Surface } from './Surface'

export function Architecture() {
  return (
    <group>
      <FloorPlate />
      <BackWall />
      <LeftWall />
      <Soffit />
    </group>
  )
}

function FloorPlate() {
  return (
    <EntityRoot id="floor">
      <RoundedBox
        args={[6.42, 0.07, 5.02]}
        radius={0.04}
        smoothness={3}
        position={[0, 0.032, 0]}
        receiveShadow
        castShadow
      >
        <Surface entityId="floor" />
      </RoundedBox>
      <mesh position={[-0.55, 0.074, -0.15]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4.6, 0.018]} />
        <meshPhysicalMaterial
          color="#b08d57"
          metalness={0.88}
          roughness={0.32}
          polygonOffset
          polygonOffsetFactor={-1}
        />
      </mesh>
      <mesh position={[-0.55, 0.074, 0.95]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} receiveShadow>
        <planeGeometry args={[2.2, 0.018]} />
        <meshPhysicalMaterial color="#b08d57" metalness={0.88} roughness={0.32} />
      </mesh>
    </EntityRoot>
  )
}

function BackWall() {
  const geometry = useMemo(
    () =>
      createWallGeometry(6.42, 2.68, 0.14, [
        { kind: 'rect', x: 0.42, y: 1.52, w: 3.48, h: 1.58 },
      ]),
    [],
  )
  useEffect(() => () => geometry.dispose(), [geometry])
  const glass = useRef<MeshPhysicalMaterial>(null)
  const windowLight = useRef<PointLight>(null)

  useFrame(() => {
    if (glass.current) {
      glass.current.emissive.copy(lightingRuntime.windowColor)
      glass.current.emissiveIntensity = 0.15 + lightingRuntime.windowEmissive * 0.85
      glass.current.color.copy(lightingRuntime.windowColor)
    }
    if (windowLight.current) {
      windowLight.current.intensity = 1.2 + lightingRuntime.windowEmissive * 6.5
      windowLight.current.color.copy(lightingRuntime.windowColor)
    }
  })

  return (
    <EntityRoot id="back-wall">
      <mesh geometry={geometry} castShadow receiveShadow>
        <Surface entityId="back-wall" />
      </mesh>

      <mesh position={[0.42, 1.52, 0.01]}>
        <planeGeometry args={[3.42, 1.52]} />
        <meshPhysicalMaterial
          ref={glass}
          color="#d7e0ee"
          transparent
          opacity={0.16}
          roughness={0.08}
          metalness={0.04}
          depthWrite={false}
          side={DoubleSide}
          emissive="#ffb07a"
          emissiveIntensity={0.4}
        />
      </mesh>

      <pointLight
        ref={windowLight}
        position={[0.42, 1.52, 0.35]}
        distance={7}
        decay={2}
        intensity={2}
      />

      <RoundedBox args={[3.62, 0.07, 0.22]} radius={0.012} position={[0.42, 0.72, 0.06]} castShadow>
        <meshPhysicalMaterial color="#ece6da" roughness={0.42} metalness={0.04} />
      </RoundedBox>
      <RoundedBox args={[3.62, 0.05, 0.12]} radius={0.008} position={[0.42, 2.32, 0.04]} castShadow>
        <meshPhysicalMaterial color="#ece6da" roughness={0.42} metalness={0.04} />
      </RoundedBox>
      <RoundedBox args={[0.05, 1.62, 0.1]} radius={0.008} position={[0.42, 1.52, 0.05]} castShadow>
        <meshPhysicalMaterial color="#d8d0c4" roughness={0.4} metalness={0.05} />
      </RoundedBox>
      <RoundedBox args={[3.7, 0.16, 0.38]} radius={0.02} position={[0.42, 2.5, 0.08]} castShadow>
        <meshPhysicalMaterial color="#ddd4c6" roughness={0.5} metalness={0} />
      </RoundedBox>
      <RoundedBox args={[6.38, 0.08, 0.05]} radius={0.01} position={[0, 0.08, 0.09]} receiveShadow>
        <meshPhysicalMaterial color="#ddd6c8" roughness={0.48} metalness={0} />
      </RoundedBox>
    </EntityRoot>
  )
}

function LeftWall() {
  const geometry = useMemo(
    () =>
      createWallGeometry(5.02, 2.68, 0.14, [
        { kind: 'circle', x: 0.38, y: 1.48, r: 0.46 },
      ]),
    [],
  )
  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <EntityRoot id="left-wall">
      <group rotation={[0, Math.PI / 2, 0]}>
        <mesh geometry={geometry} castShadow receiveShadow>
          <Surface entityId="left-wall" />
        </mesh>
        <mesh position={[0.38, 1.48, 0.02]}>
          <ringGeometry args={[0.46, 0.54, 32]} />
          <meshPhysicalMaterial color="#efe8dc" roughness={0.4} metalness={0.05} />
        </mesh>
        <RoundedBox args={[5.0, 0.08, 0.05]} radius={0.01} position={[0, 0.08, 0.09]} receiveShadow>
          <meshPhysicalMaterial color="#ddd6c8" roughness={0.48} metalness={0} />
        </RoundedBox>
      </group>
    </EntityRoot>
  )
}

function Soffit() {
  const group = useRef<Group>(null)
  const fill = useRef<PointLight>(null)

  useFrame((_, dt) => {
    const g = group.current
    if (g) {
      const explode = staggeredAmount(motionRuntime.explode, 0.16)
      const y = explode * 1.55
      const k = 1 - Math.exp(-8 * dt)
      g.position.y += (y - g.position.y) * k
    }
    if (fill.current) {
      fill.current.intensity = 0.08 + lightingRuntime.practical * 0.9
      fill.current.color.copy(lightingRuntime.practicalColor)
    }
  })

  return (
    <group ref={group}>
      <RoundedBox
        args={[2.15, 0.1, 1.55]}
        radius={0.02}
        position={[-1.72, 2.58, -1.62]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial color="#e7e0d4" roughness={0.52} metalness={0} />
      </RoundedBox>
      <mesh position={[-1.72, 2.52, -1.62]}>
        <boxGeometry args={[1.7, 0.02, 1.15]} />
        <meshStandardMaterial
          color="#f2eadc"
          emissive="#ffe6c4"
          emissiveIntensity={0.08}
          roughness={0.7}
        />
      </mesh>
      <pointLight
        ref={fill}
        position={[-1.72, 2.42, -1.62]}
        distance={4.2}
        decay={2}
        intensity={0.2}
      />
    </group>
  )
}
