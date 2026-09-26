import { cx } from '@/engine/cx'
import { moodAccent, moodLabels, timeLabels } from '@/engine/environment'
import { environmentBody, environmentCaption } from '@/engine/explanation'
import { useExperience } from '@/engine/state'
import type { CameraMode, Mood, TimeOfDay, ViewMode } from '@/engine/types'

const TIMES: TimeOfDay[] = ['morning', 'midday', 'evening', 'night']
const MOODS: Mood[] = ['calm', 'warm', 'focus', 'nightfall']
const VIEWS: { id: ViewMode; label: string }[] = [
  { id: 'normal', label: 'Assembled' },
  { id: 'layer', label: 'Layers' },
  { id: 'exploded', label: 'Exploded' },
]
const CAMERAS: { id: CameraMode; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'detail', label: 'Detail' },
  { id: 'environment', label: 'Light' },
  { id: 'cinematic', label: 'Cinema' },
]

export function EnvironmentDock() {
  const timeOfDay = useExperience((s) => s.timeOfDay)
  const mood = useExperience((s) => s.mood)
  const setTimeOfDay = useExperience((s) => s.setTimeOfDay)
  const setMood = useExperience((s) => s.setMood)

  return (
    <div className="hud-glass pointer-events-auto max-w-[560px] rounded-2xl px-4 py-3 max-[720px]:max-w-[calc(100vw-2rem)]">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">Atmosphere</div>
        <div className="truncate text-[11px] text-white/50">{environmentCaption(timeOfDay, mood)}</div>
      </div>
      <div className="flex rounded-full bg-black/25 p-1" role="radiogroup" aria-label="Time of day">
        {TIMES.map((time) => (
          <button
            key={time}
            type="button"
            role="radio"
            aria-checked={timeOfDay === time}
            onClick={() => setTimeOfDay(time)}
            className={cx(
              'flex-1 rounded-full px-3 py-1.5 text-[11px] tracking-wide transition max-[720px]:px-2',
              timeOfDay === time ? 'bg-white/12 text-mist' : 'text-white/45 hover:text-white/75',
            )}
          >
            {timeLabels[time]}
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5" role="radiogroup" aria-label="Mood">
        {MOODS.map((item) => (
          <button
            key={item}
            type="button"
            role="radio"
            aria-checked={mood === item}
            onClick={() => setMood(item)}
            className={cx(
              'flex flex-1 items-center justify-center gap-1.5 rounded-full border px-2 py-1.5 text-[11px] transition',
              mood === item
                ? 'border-white/20 bg-white/10 text-mist'
                : 'border-white/6 text-white/45 hover:text-white/75',
            )}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: moodAccent[item] }}
            />
            {moodLabels[item]}
          </button>
        ))}
      </div>
      <p className="mt-2 hidden text-[11px] leading-relaxed text-white/38 sm:block">
        {environmentBody(timeOfDay, mood)}
      </p>
    </div>
  )
}

export function ViewDock() {
  const viewMode = useExperience((s) => s.viewMode)
  const cameraMode = useExperience((s) => s.cameraMode)
  const setViewMode = useExperience((s) => s.setViewMode)
  const setCameraMode = useExperience((s) => s.setCameraMode)

  return (
    <div className="hud-glass pointer-events-auto rounded-2xl px-3 py-3">
      <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">View</div>
      <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Structural view">
        {VIEWS.map((view) => (
          <button
            key={view.id}
            type="button"
            role="radio"
            aria-checked={viewMode === view.id}
            onClick={() => setViewMode(view.id)}
            className={cx(
              'rounded-full px-2.5 py-1.5 text-[11px] transition',
              viewMode === view.id ? 'bg-white/12 text-mist' : 'text-white/45 hover:text-white/75',
            )}
          >
            {view.label}
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Camera composition">
        {CAMERAS.map((cam) => (
          <button
            key={cam.id}
            type="button"
            role="radio"
            aria-checked={cameraMode === cam.id}
            onClick={() => setCameraMode(cam.id)}
            className={cx(
              'rounded-full px-2.5 py-1.5 text-[11px] transition',
              cameraMode === cam.id ? 'bg-white/12 text-mist' : 'text-white/45 hover:text-white/75',
            )}
          >
            {cam.label}
          </button>
        ))}
      </div>
    </div>
  )
}
