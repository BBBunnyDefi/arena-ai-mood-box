import { type ReactNode } from 'react'
import { getEntity } from '../scene'
import { useExperience } from '../state'

export function Selectable({ id, children }: { id: string; children: ReactNode }) {
  const entity = getEntity(id)
  const hover = useExperience((s) => s.hover)
  const select = useExperience((s) => s.select)

  if (!entity?.selectable) return <>{children}</>

  return (
    <group
      onPointerOver={(event) => {
        event.stopPropagation()
        hover(id)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        const current = useExperience.getState().hoveredEntityId
        if (current === id) hover(null)
      }}
      onClick={(event) => {
        event.stopPropagation()
        if (event.delta > 6) return
        select(id)
      }}
    >
      {children}
    </group>
  )
}
