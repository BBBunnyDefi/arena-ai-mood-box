import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color, Mesh, MeshBasicMaterial } from 'three'
import { motion } from '../motion'
import { entityRefs, getEntity } from '../scene'
import { useExperience } from '../state'
import { moodAccent } from '../environment'

export function SelectionMarker() {
  const mesh = useRef<Mesh>(null)
  const color = useRef(new Color('#c4a574'))
  const targetColor = useRef(new Color('#c4a574'))

  useFrame((_, dt) => {
    const marker = mesh.current
    if (!marker) return
    const { selectedEntityId, hoveredEntityId, mood } = useExperience.getState()
    const id = selectedEntityId ?? hoveredEntityId
    const entity = id ? getEntity(id) : undefined
    const object = id ? entityRefs.get(id) : undefined
    const active = Boolean(entity)
    const k = 1 - Math.exp(-motion.marker * dt)
    const selected = Boolean(selectedEntityId)

    const tx = object?.position.x ?? 0
    const tz = object?.position.z ?? 0
    const ty = (object?.position.y ?? 0) + 0.025
    const radius = entity?.markerRadius ?? 0.4
    const scale = active ? (selected ? 1 : 0.86) : 0.001
    const opacity = active ? (selected ? 0.9 : 0.4) : 0

    marker.position.x += (tx - marker.position.x) * k
    marker.position.y += (ty - marker.position.y) * k
    marker.position.z += (tz - marker.position.z) * k
    marker.scale.x += (scale * radius - marker.scale.x) * k
    marker.scale.y += (scale * radius - marker.scale.y) * k
    marker.scale.z += (scale * radius - marker.scale.z) * k

    targetColor.current.set(moodAccent[mood])
    color.current.lerp(targetColor.current, k)
    const mat = marker.material as MeshBasicMaterial
    mat.color.copy(color.current)
    mat.opacity += (opacity - mat.opacity) * k
    marker.visible = mat.opacity > 0.02
  })

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
      <ringGeometry args={[0.92, 1, 64]} />
      <meshBasicMaterial color="#c4a574" transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}
