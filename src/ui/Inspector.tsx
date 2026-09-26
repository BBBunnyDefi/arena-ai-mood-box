import { cx } from '@/engine/cx'
import { categoryCopy, entityCopy } from '@/engine/explanation'
import { getMaterial, materialsIn } from '@/engine/materials'
import { getEntity } from '@/engine/scene'
import { useExperience } from '@/engine/state'

export function Inspector() {
  const selectedId = useExperience((s) => s.selectedEntityId)
  const overrides = useExperience((s) => s.materialOverrides)
  const setMaterial = useExperience((s) => s.setMaterial)
  const setCameraMode = useExperience((s) => s.setCameraMode)
  const entity = selectedId ? getEntity(selectedId) : undefined

  return (
    <aside
      className={cx(
        'hud-glass pointer-events-auto absolute right-5 top-1/2 z-20 w-[300px] -translate-y-1/2 rounded-2xl p-5 transition-all duration-500 max-[980px]:bottom-28 max-[980px]:right-4 max-[980px]:top-auto max-[980px]:w-[min(420px,calc(100%-2rem))] max-[980px]:translate-y-0',
        entity
          ? 'translate-x-0 opacity-100'
          : 'pointer-events-none translate-x-4 opacity-0 max-[980px]:translate-x-0 max-[980px]:translate-y-3',
      )}
      aria-hidden={!entity}
    >
      {entity ? (
        <>
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
            {entity.category} · {entity.semanticRole}
          </div>
          <h2 className="font-display mt-2 text-[28px] leading-none text-mist">{entity.label}</h2>
          <p className="mt-3 text-[12.5px] leading-relaxed text-white/58">{entityCopy(entity)}</p>
          <p className="mt-2 text-[11px] leading-relaxed text-white/35">
            {categoryCopy[entity.category]}
          </p>

          {entity.materialCategory ? (
            <div className="mt-5">
              <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-white/40">
                Material
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {materialsIn(entity.materialCategory).map((material) => {
                  const current =
                    overrides[entity.id] ?? entity.defaultMaterialId ?? material.id
                  const active = current === material.id
                  return (
                    <button
                      key={material.id}
                      type="button"
                      aria-pressed={active}
                      aria-label={`Apply ${material.name}`}
                      onClick={() => setMaterial(entity.id, material.id)}
                      className={cx(
                        'flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition',
                        active
                          ? 'border-brass/50 bg-white/8'
                          : 'border-white/8 bg-white/3 hover:border-white/16 hover:bg-white/6',
                      )}
                    >
                      <span
                        className="h-4 w-4 shrink-0 rounded-full border border-white/15"
                        style={{ background: getMaterial(material.id).color }}
                      />
                      <span className="text-[12px] text-white/80">{material.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setCameraMode('detail')}
            className="mt-4 w-full rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-white/70 transition hover:border-brass/40 hover:text-mist"
          >
            Frame this object
          </button>
        </>
      ) : null}
    </aside>
  )
}
