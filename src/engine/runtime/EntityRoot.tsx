import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Group } from 'three'
import { motion, motionRuntime, staggeredAmount } from '../motion'
import { entityRefs, requireEntity } from '../scene'
import { useExperience } from '../state'
import { Selectable } from './Selectable'

export function EntityRoot({ id, children }: { id: string; children: ReactNode }) {
  const def = requireEntity(id)
  const group = useRef<Group>(null)

  useLayoutEffect(() => {
    if (group.current) entityRefs.set(id, group.current)
    return () => {
      entityRefs.delete(id)
    }
  }, [id])

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const explode = staggeredAmount(motionRuntime.explode, def.stagger)
    const layer = staggeredAmount(motionRuntime.layer, def.stagger * 0.7)
    const tx = def.basePosition[0] + def.explodedOffset[0] * explode + def.layerOffset[0] * layer
    const ty = def.basePosition[1] + def.explodedOffset[1] * explode + def.layerOffset[1] * layer
    const tz = def.basePosition[2] + def.explodedOffset[2] * explode + def.layerOffset[2] * layer
    const k = 1 - Math.exp(-motion.entity * dt)
    g.position.x += (tx - g.position.x) * k
    g.position.y += (ty - g.position.y) * k
    g.position.z += (tz - g.position.z) * k
  })

  return (
    <group ref={group} position={def.basePosition} rotation={def.baseRotation}>
      <Selectable id={id}>{children}</Selectable>
      <EntityLabel id={id} height={def.labelHeight} text={def.label} />
    </group>
  )
}

function EntityLabel({ id, height, text }: { id: string; height: number; text: string }) {
  const visible = useExperience(
    (s) => s.labelsVisible || s.hoveredEntityId === id || s.selectedEntityId === id,
  )
  const selected = useExperience((s) => s.selectedEntityId === id)
  if (!visible) return null

  return (
    <Html
      position={[0, height, 0]}
      center
      sprite
      distanceFactor={9}
      zIndexRange={[8, 0]}
      style={{ pointerEvents: 'none' }}
    >
      <div className={`entity-label ${selected ? 'border-brass/50' : ''}`}>{text}</div>
    </Html>
  )
}
