import type { QualityTier } from './types'

export function detectQuality(): QualityTier {
  if (typeof navigator === 'undefined') return 'high'

  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const cores = navigator.hardwareConcurrency ?? 8
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData

  if (saveData) return 'medium'
  if (mem !== undefined && mem <= 4) return 'medium'
  if (cores <= 4) return 'medium'
  return 'high'
}
