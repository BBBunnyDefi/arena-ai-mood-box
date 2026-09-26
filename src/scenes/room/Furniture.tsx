import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { PointLight } from 'three'
import { lightingRuntime } from '@/engine/lighting'
import { EntityRoot } from '@/engine/runtime/EntityRoot'
import { Surface } from './Surface'

function Brass({ roughness = 0.32 }: { roughness?: number }) {
  return <meshPhysicalMaterial color="#b08d57" metalness={0.88} roughness={roughness} />
}

function Graphite() {
  return <meshPhysicalMaterial color="#3c4046" metalness={0.78} roughness={0.42} />
}

export function Furniture() {
  return (
    <group>
      <Rug />
      <Sofa />
      <CoffeeTable />
      <Desk />
      <Chair />
      <Daybed />
      <Shelf />
    </group>
  )
}

function Rug() {
  return (
    <EntityRoot id="rug">
      <RoundedBox
        args={[2.18, 0.025, 1.72]}
        radius={0.28}
        smoothness={4}
        position={[0, 0.02, 0]}
        receiveShadow
      >
        <Surface entityId="rug" />
      </RoundedBox>
    </EntityRoot>
  )
}

function Sofa() {
  const legs: Array<[number, number, number]> = [
    [-0.82, 0.12, -0.32],
    [0.82, 0.12, -0.32],
    [-0.82, 0.12, 0.32],
    [0.82, 0.12, 0.32],
  ]

  return (
    <EntityRoot id="sofa">
      {legs.map((pos) => (
        <mesh key={pos.join(',')} position={pos} castShadow>
          <cylinderGeometry args={[0.026, 0.03, 0.24, 12]} />
          <Brass />
        </mesh>
      ))}
      <RoundedBox args={[1.92, 0.1, 0.84]} radius={0.03} position={[0, 0.28, 0]} castShadow receiveShadow>
        <Surface entityId="sofa" roughness={0.92} />
      </RoundedBox>
      <RoundedBox args={[0.9, 0.12, 0.72]} radius={0.04} position={[-0.44, 0.4, 0.02]} castShadow>
        <Surface entityId="sofa" />
      </RoundedBox>
      <RoundedBox args={[0.9, 0.12, 0.72]} radius={0.04} position={[0.44, 0.4, 0.02]} castShadow>
        <Surface entityId="sofa" />
      </RoundedBox>
      <RoundedBox args={[1.88, 0.42, 0.16]} radius={0.05} position={[0, 0.58, -0.34]} castShadow>
        <Surface entityId="sofa" />
      </RoundedBox>
      <RoundedBox args={[0.88, 0.28, 0.14]} radius={0.04} position={[-0.44, 0.72, -0.32]} castShadow>
        <Surface entityId="sofa" />
      </RoundedBox>
      <RoundedBox args={[0.88, 0.28, 0.14]} radius={0.04} position={[0.44, 0.72, -0.32]} castShadow>
        <Surface entityId="sofa" />
      </RoundedBox>
      <RoundedBox args={[0.14, 0.42, 0.84]} radius={0.04} position={[-0.92, 0.5, 0]} castShadow>
        <Surface entityId="sofa" />
      </RoundedBox>
      <RoundedBox args={[0.14, 0.42, 0.84]} radius={0.04} position={[0.92, 0.5, 0]} castShadow>
        <Surface entityId="sofa" />
      </RoundedBox>
    </EntityRoot>
  )
}

function CoffeeTable() {
  return (
    <EntityRoot id="coffee-table">
      <RoundedBox args={[1.08, 0.045, 0.58]} radius={0.03} position={[0, 0.33, 0]} castShadow receiveShadow>
        <Surface entityId="coffee-table" />
      </RoundedBox>
      <mesh position={[-0.38, 0.16, -0.18]} castShadow>
        <cylinderGeometry args={[0.028, 0.032, 0.32, 12]} />
        <Brass roughness={0.28} />
      </mesh>
      <mesh position={[0.38, 0.16, -0.18]} castShadow>
        <cylinderGeometry args={[0.028, 0.032, 0.32, 12]} />
        <Brass roughness={0.28} />
      </mesh>
      <mesh position={[-0.38, 0.16, 0.18]} castShadow>
        <cylinderGeometry args={[0.028, 0.032, 0.32, 12]} />
        <Brass roughness={0.28} />
      </mesh>
      <mesh position={[0.38, 0.16, 0.18]} castShadow>
        <cylinderGeometry args={[0.028, 0.032, 0.32, 12]} />
        <Brass roughness={0.28} />
      </mesh>
      <RoundedBox args={[0.22, 0.04, 0.16]} radius={0.012} position={[0.28, 0.36, 0.08]} castShadow>
        <meshPhysicalMaterial color="#5a3828" roughness={0.5} metalness={0.02} />
      </RoundedBox>
      <mesh position={[-0.32, 0.385, 0.06]}>
        <cylinderGeometry args={[0.055, 0.05, 0.07, 20]} />
        <meshPhysicalMaterial color="#d8cfc2" roughness={0.35} metalness={0} />
      </mesh>
    </EntityRoot>
  )
}

function Desk() {
  return (
    <EntityRoot id="desk">
      <RoundedBox args={[1.42, 0.04, 0.62]} radius={0.012} position={[0, 0.74, 0]} castShadow receiveShadow>
        <Surface entityId="desk" />
      </RoundedBox>
      <RoundedBox args={[1.28, 0.03, 0.48]} radius={0.006} position={[0, 0.22, 0]} castShadow>
        <Graphite />
      </RoundedBox>
      <mesh position={[-0.58, 0.47, 0.22]} castShadow>
        <boxGeometry args={[0.03, 0.5, 0.03]} />
        <Graphite />
      </mesh>
      <mesh position={[0.58, 0.47, 0.22]} castShadow>
        <boxGeometry args={[0.03, 0.5, 0.03]} />
        <Graphite />
      </mesh>
      <mesh position={[-0.58, 0.47, -0.22]} castShadow>
        <boxGeometry args={[0.03, 0.5, 0.03]} />
        <Graphite />
      </mesh>
      <mesh position={[0.58, 0.47, -0.22]} castShadow>
        <boxGeometry args={[0.03, 0.5, 0.03]} />
        <Graphite />
      </mesh>
      <RoundedBox args={[0.38, 0.12, 0.5]} radius={0.01} position={[0.42, 0.64, 0]} castShadow>
        <Surface entityId="desk" />
      </RoundedBox>
      <DeskLamp />
      <mesh position={[-0.38, 0.775, -0.08]} rotation={[-0.08, 0.2, 0]} castShadow>
        <boxGeometry args={[0.22, 0.01, 0.28]} />
        <meshStandardMaterial color="#ece7de" roughness={0.7} />
      </mesh>
    </EntityRoot>
  )
}

function DeskLamp() {
  const bulb = useRef<PointLight>(null)
  useFrame(() => {
    if (bulb.current) {
      bulb.current.intensity = 0.08 + lightingRuntime.practical * 1.15
      bulb.current.color.copy(lightingRuntime.practicalColor)
    }
  })
  return (
    <group position={[0.52, 0.76, -0.16]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.02, 16]} />
        <Graphite />
      </mesh>
      <mesh position={[0, 0.18, 0]} rotation={[0.15, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.36, 8]} />
        <Graphite />
      </mesh>
      <pointLight ref={bulb} position={[0.08, 0.3, 0.08]} distance={3.2} decay={2} intensity={0.2} />
      <mesh position={[0.08, 0.34, 0.04]} rotation={[1.05, 0, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.08, 16]} />
        <meshPhysicalMaterial color="#e8dcc8" roughness={0.55} metalness={0.05} />
      </mesh>
    </group>
  )
}

function Chair() {
  const legs: Array<[number, number, number]> = [
    [-0.18, 0.21, -0.18],
    [0.18, 0.21, -0.18],
    [-0.18, 0.21, 0.18],
    [0.18, 0.21, 0.18],
  ]
  return (
    <EntityRoot id="chair">
      {legs.map((pos) => (
        <mesh key={pos.join(',')} position={pos} castShadow>
          <cylinderGeometry args={[0.016, 0.018, 0.42, 10]} />
          <Graphite />
        </mesh>
      ))}
      <RoundedBox args={[0.42, 0.04, 0.42]} radius={0.02} position={[0, 0.44, 0]} castShadow>
        <Surface entityId="chair" />
      </RoundedBox>
      <RoundedBox args={[0.42, 0.46, 0.05]} radius={0.02} position={[0, 0.7, -0.18]} castShadow>
        <Surface entityId="chair" />
      </RoundedBox>
      <mesh position={[-0.16, 0.32, 0]} rotation={[0, 0, 0.18]} castShadow>
        <boxGeometry args={[0.018, 0.02, 0.34]} />
        <Graphite />
      </mesh>
    </EntityRoot>
  )
}

function Daybed() {
  return (
    <EntityRoot id="daybed">
      <RoundedBox args={[1.78, 0.1, 0.78]} radius={0.04} position={[0, 0.18, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color="#4a3428" roughness={0.5} metalness={0.04} />
      </RoundedBox>
      <RoundedBox args={[1.72, 0.14, 0.72]} radius={0.05} position={[0, 0.3, 0]} castShadow>
        <Surface entityId="daybed" />
      </RoundedBox>
      <RoundedBox args={[0.22, 0.18, 0.7]} radius={0.06} position={[-0.68, 0.44, 0]} castShadow>
        <Surface entityId="daybed" />
      </RoundedBox>
      <RoundedBox args={[0.36, 0.08, 0.36]} radius={0.04} position={[0.42, 0.4, 0.04]} castShadow>
        <Surface entityId="daybed" roughness={0.92} />
      </RoundedBox>
      <mesh position={[-0.7, 0.08, -0.28]} castShadow>
        <boxGeometry args={[0.28, 0.08, 0.08]} />
        <Brass />
      </mesh>
      <mesh position={[0.7, 0.08, 0.28]} castShadow>
        <boxGeometry args={[0.28, 0.08, 0.08]} />
        <Brass />
      </mesh>
    </EntityRoot>
  )
}

function Shelf() {
  const books = [
    { x: -0.32, h: 0.22, c: '#5a3a2a', w: 0.04 },
    { x: -0.27, h: 0.26, c: '#2c3344', w: 0.035 },
    { x: -0.22, h: 0.2, c: '#7a5a3a', w: 0.04 },
    { x: -0.17, h: 0.24, c: '#3e4a3a', w: 0.038 },
    { x: 0.22, h: 0.18, c: '#4a3040', w: 0.05 },
    { x: 0.28, h: 0.21, c: '#243044', w: 0.04 },
  ]

  return (
    <EntityRoot id="shelf">
      <mesh position={[-0.48, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 1.55, 10]} />
        <Brass roughness={0.28} />
      </mesh>
      <mesh position={[0.48, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 1.55, 10]} />
        <Brass roughness={0.28} />
      </mesh>
      <RoundedBox args={[1.12, 0.035, 0.24]} radius={0.008} position={[0, 0.92, 0.02]} castShadow receiveShadow>
        <Surface entityId="shelf" />
      </RoundedBox>
      <RoundedBox args={[1.12, 0.035, 0.24]} radius={0.008} position={[0, 1.38, 0.02]} castShadow receiveShadow>
        <Surface entityId="shelf" />
      </RoundedBox>
      {books.map((book) => (
        <mesh key={book.x} position={[book.x, 0.92 + 0.018 + book.h / 2, 0.02]} castShadow>
          <boxGeometry args={[book.w, book.h, 0.16]} />
          <meshStandardMaterial color={book.c} roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[0.08, 1.42, 0.02]}>
        <cylinderGeometry args={[0.045, 0.05, 0.08, 16]} />
        <meshPhysicalMaterial color="#cfc4b4" roughness={0.4} metalness={0} />
      </mesh>
    </EntityRoot>
  )
}
