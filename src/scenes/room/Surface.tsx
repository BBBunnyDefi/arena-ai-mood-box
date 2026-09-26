import { physicalProps, usePrimaryMaterial } from '@/engine/materials'

export function Surface({
  entityId,
  roughness,
  metalness,
}: {
  entityId: string
  roughness?: number
  metalness?: number
}) {
  const mat = usePrimaryMaterial(entityId)
  const props = physicalProps(mat)
  return (
    <meshPhysicalMaterial
      {...props}
      roughness={roughness ?? props.roughness}
      metalness={metalness ?? props.metalness}
    />
  )
}
