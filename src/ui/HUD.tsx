import { cx } from '@/engine/cx'
import { getScene } from '@/engine/scene'
import { useExperience } from '@/engine/state'
import { EnvironmentDock, ViewDock } from './Docks'
import { Inspector } from './Inspector'

export function HUD() {
  const uiVisible = useExperience((s) => s.uiVisible)
  const toggleUi = useExperience((s) => s.toggleUi)
  const toggleLabels = useExperience((s) => s.toggleLabels)
  const labelsVisible = useExperience((s) => s.labelsVisible)
  const reset = useExperience((s) => s.reset)
  const shortcutsVisible = useExperience((s) => s.shortcutsVisible)
  const toggleShortcuts = useExperience((s) => s.toggleShortcuts)
  const sceneId = useExperience((s) => s.activeSceneId)
  const scene = getScene(sceneId)

  return (
    <>
      <div
        className={cx(
          'pointer-events-none absolute inset-0 z-20 transition-opacity duration-500',
          uiVisible ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden={!uiVisible}
      >
        <div className="pointer-events-auto absolute left-6 top-6 max-[720px]:left-4 max-[720px]:top-4">
          <div className="font-display text-[34px] leading-none italic text-mist">Moodbox</div>
          <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-white/40">
            <span>Studio</span>
            <span className="h-px w-6 bg-white/20" />
            <span>{scene?.name ?? 'Atelier No. 1'}</span>
          </div>
        </div>

        <div className="pointer-events-auto absolute right-6 top-6 flex items-center gap-1.5 max-[720px]:right-4">
          <IconButton
            pressed={labelsVisible}
            onClick={toggleLabels}
            label={labelsVisible ? 'Hide labels' : 'Show labels'}
          >
            Labels
          </IconButton>
          <IconButton onClick={toggleShortcuts} pressed={shortcutsVisible} label="Keyboard shortcuts">
            Keys
          </IconButton>
          <IconButton onClick={reset} label="Reset experience">
            Reset
          </IconButton>
          <IconButton onClick={toggleUi} label="Hide interface">
            Hide
          </IconButton>
        </div>

        <div className="absolute bottom-6 left-1/2 flex w-[min(1100px,calc(100%-2rem))] -translate-x-1/2 flex-col items-center gap-3 max-[980px]:bottom-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="hidden lg:block lg:w-[180px]" />
          <EnvironmentDock />
          <ViewDock />
        </div>

        <Inspector />

        {shortcutsVisible ? <ShortcutCard /> : null}
      </div>

      {!uiVisible ? (
        <button
          type="button"
          onClick={toggleUi}
          className="hud-glass pointer-events-auto absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/70"
        >
          Show controls
        </button>
      ) : null}
    </>
  )
}

function IconButton({
  children,
  onClick,
  label,
  pressed,
}: {
  children: string
  onClick: () => void
  label: string
  pressed?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={cx(
        'hud-glass rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/65 transition hover:text-mist',
        pressed && 'text-mist',
      )}
    >
      {children}
    </button>
  )
}

function ShortcutCard() {
  const rows = [
    ['1–4', 'Time of day'],
    ['Q W F G', 'Mood'],
    ['N / Y / X', 'Assembled, layers, exploded'],
    ['C', 'Cycle camera'],
    ['L', 'Labels'],
    ['H', 'Hide UI'],
    ['R', 'Reset'],
    ['Esc', 'Deselect'],
    ['?', 'This list'],
  ]
  return (
    <div className="hud-glass pointer-events-auto absolute left-6 top-24 w-64 rounded-2xl p-4 text-[12px] max-[720px]:left-4">
      <div className="mb-2 text-[10px] uppercase tracking-[0.24em] text-white/40">Shortcuts</div>
      <dl className="space-y-1.5">
        {rows.map(([key, meaning]) => (
          <div key={key} className="flex justify-between gap-3">
            <dt className="text-brass/90">{key}</dt>
            <dd className="text-right text-white/50">{meaning}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
