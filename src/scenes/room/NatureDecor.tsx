import { RoundedBox } from '@react-three/drei'
import { DoubleSide } from 'three'
import { EntityRoot } from '@/engine/runtime/EntityRoot'
import { Surface } from './Surface'

export function NatureDecor() {
  return (
    <group>
      <Planter />
      <SmallPlant />
      <WallArt />
    </group>
  )
}

function Leaf({
  position,
  rotation,
  radius,
  color,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  radius: number
  color: string
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <circleGeometry args={[radius, 14]} />
      <meshStandardMaterial color={color} roughness={0.84} side={DoubleSide} />
    </mesh>
  )
}

function Planter() {
  return (
    <EntityRoot id="planter">
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.2, 0.32, 20]} />
        <Surface entityId="planter" />
      </mesh>
      <mesh position={[0, 0.33, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 16]} />
        <meshStandardMaterial color="#2a2420" roughness={1} />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.028, 0.75, 8]} />
        <meshStandardMaterial color="#4a3428" roughness={0.7} />
      </mesh>
      <Leaf position={[0.12, 1.05, 0.02]} rotation={[-0.9, 0.4, 0.2]} radius={0.2} color="#3d5c3a" />
      <Leaf position={[-0.1, 1.12, 0.08]} rotation={[-1.1, -0.5, 0.3]} radius={0.22} color="#4a6a42" />
      <Leaf position={[0.04, 1.22, -0.1]} rotation={[-0.6, 0.2, -0.4]} radius={0.18} color="#2f4a30" />
      <Leaf position={[-0.14, 0.92, -0.06]} rotation={[-0.8, -0.2, 0.6]} radius={0.16} color="#355838" />
      <Leaf position={[0.16, 0.88, -0.08]} rotation={[-1.2, 0.7, 0]} radius={0.15} color="#446844" />
      <Leaf position={[0.02, 1.32, 0.06]} rotation={[-0.4, 0.1, 0.15]} radius={0.17} color="#3a5a36" />
    </EntityRoot>
  )
}

function SmallPlant() {
  return (
    <group position={[2.52, 0, -1.55]}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.2, 16]} />
        <meshPhysicalMaterial color="#c5a48c" roughness={0.55} metalness={0} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.05, 0.28, Math.sin(a) * 0.05]}
            rotation={[0.5, a, 0.15]}
            castShadow
          >
            <boxGeometry args={[0.012, 0.28, 0.04]} />
            <meshStandardMaterial color={i % 2 ? '#4d6a48' : '#3b5538'} roughness={0.85} />
          </mesh>
        )
      })}
    </group>
  )
}

function WallArt() {
  return (
    <EntityRoot id="wall-art">
      <RoundedBox args={[0.72, 0.9, 0.03]} radius={0.01} position={[0, 0, 0]} castShadow>
        <Surface entityId="wall-art" />
      </RoundedBox>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.6, 0.76]} />
        <meshStandardMaterial color="#ece6da" roughness={0.7} />
      </mesh>
      <RoundedBox args={[0.28, 0.42, 0.03]} radius={0.006} position={[-0.08, 0.06, 0.04]} castShadow>
        <meshPhysicalMaterial color="#8b9a86" roughness={0.5} metalness={0} />
      </RoundedBox>
      <RoundedBox args={[0.22, 0.22, 0.04]} radius={0.006} position={[0.14, -0.12, 0.045]} castShadow>
        <meshPhysicalMaterial color="#2a3140" roughness={0.45} metalness={0.05} />
      </RoundedBox>
      <RoundedBox args={[0.16, 0.3, 0.025]} radius={0.004} position={[0.12, 0.18, 0.035]} castShadow>
        <meshPhysicalMaterial color="#b08d57" metalness={0.7} roughness={0.35} />
      </RoundedBox>
    </EntityRoot>
  )
}
