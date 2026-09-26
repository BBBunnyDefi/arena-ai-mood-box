import { useEffect, useState } from 'react'
import { cx } from '@/engine/cx'
import { useExperience } from '@/engine/state'

export function LoadingScreen() {
  const ready = useExperience((s) => s.sceneReady)
  const [minElapsed, setMinElapsed] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setMinElapsed(true), 1100)
    return () => window.clearTimeout(t)
  }, [])

  const hide = ready && minElapsed

  useEffect(() => {
    if (!hide) return
    const t = window.setTimeout(() => setGone(true), 780)
    return () => window.clearTimeout(t)
  }, [hide])

  if (gone) return null

  return (
    <div
      className={cx(
        'pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center bg-void transition-opacity duration-700',
        hide ? 'opacity-0' : 'opacity-100',
      )}
    >
      <div className="font-display text-5xl italic tracking-tight text-mist">Moodbox</div>
      <div className="mt-3 text-[10px] font-medium uppercase tracking-[0.46em] text-white/45">
        Studio
      </div>
      <div className="mt-10 h-px w-44 overflow-hidden bg-white/10">
        <div className="load-bar h-full w-1/2 bg-brass" />
      </div>
      <p className="mt-5 text-[11px] tracking-[0.22em] text-white/35 uppercase">
        Preparing the room
      </p>
    </div>
  )
}
