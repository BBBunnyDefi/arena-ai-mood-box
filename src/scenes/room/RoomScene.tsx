import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { motionRuntime } from '@/engine/motion'
import { useExperience } from '@/engine/state'
import { Architecture } from './Architecture'
import { Furniture } from './Furniture'
import { LightingObjects } from './LightingObjects'
import { NatureDecor } from './NatureDecor'
import { SelectionMarker } from '@/engine/runtime/SelectionMarker'
import { Stage } from './Stage'

export function RoomScene() {
  return (
    <group>
      <ReadyPing />
      <Stage />
      <Architecture />
      <Furniture />
      <LightingObjects />
      <NatureDecor />
      <SelectionMarker />
      <LayerAnnotations />
    </group>
  )
}

function ReadyPing() {
  const once = useRef(false)
  useFrame(() => {
    if (once.current) return
    once.current = true
    useExperience.getState().setSceneReady(true)
  })
  return null
}

function LayerAnnotations() {
  return (
    <group>
      <LayerTag position={[-3.9, 1.15, 0.2]} text="Architecture" />
      <LayerTag position={[3.55, 1.35, 1.1]} text="Furniture" />
      <LayerTag position={[3.4, 2.35, 0.55]} text="Lighting" />
      <LayerTag position={[-3.7, 1.7, -1.7]} text="Nature" />
      <LayerTag position={[-3.6, 2.15, -0.2]} text="Decor" />
    </group>
  )
}

function LayerTag({
  position,
  text,
}: {
  position: [number, number, number]
  text: string
}) {
  const node = useRef<HTMLDivElement>(null)
  useFrame(() => {
    if (node.current) {
      const a = motionRuntime.layer
      node.current.style.opacity = String(Math.max(0, a * 1.15 - 0.08))
    }
  })
  return (
    <Html position={position} center sprite distanceFactor={10} style={{ pointerEvents: 'none' }}>
      <div
        ref={node}
        className="entity-label tracking-[0.28em]"
        style={{ opacity: 0 }}
      >
        {text}
      </div>
    </Html>
  )
}
