import { useEffect } from 'react'
import { useExperience } from './state'

export function useHotkeys() {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return

      const store = useExperience.getState()
      const key = event.key.toLowerCase()

      if (key === 'escape') {
        store.select(null)
        return
      }
      if (key === '1') store.setTimeOfDay('morning')
      if (key === '2') store.setTimeOfDay('midday')
      if (key === '3') store.setTimeOfDay('evening')
      if (key === '4') store.setTimeOfDay('night')
      if (key === 'q') store.setMood('calm')
      if (key === 'w') store.setMood('warm')
      if (key === 'f') store.setMood('focus')
      if (key === 'g') store.setMood('nightfall')
      if (key === 'n') store.setViewMode('normal')
      if (key === 'x') store.setViewMode('exploded')
      if (key === 'y') store.setViewMode('layer')
      if (key === 'l') store.toggleLabels()
      if (key === 'c') store.cycleCamera()
      if (key === 'h' || key === 'u') store.toggleUi()
      if (key === '?' || (event.shiftKey && key === '/')) store.toggleShortcuts()
      if (key === 'r' && !event.metaKey && !event.ctrlKey) store.reset()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
