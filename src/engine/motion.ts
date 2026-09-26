import gsap from 'gsap'
import type { ViewMode } from './types'

const proxy = { explode: 0, layer: 0 }
let tween: gsap.core.Tween | null = null

export const motionRuntime = {
  explode: 0,
  layer: 0,
}

export function animateViewMode(mode: ViewMode) {
  tween?.kill()
  tween = gsap.to(proxy, {
    explode: mode === 'exploded' ? 1 : 0,
    layer: mode === 'layer' ? 1 : 0,
    duration: 1.58,
    ease: 'power2.inOut',
    overwrite: true,
    onUpdate: () => {
      motionRuntime.explode = proxy.explode
      motionRuntime.layer = proxy.layer
    },
  })
}

export function resetMotion(mode: ViewMode = 'normal') {
  tween?.kill()
  proxy.explode = mode === 'exploded' ? 1 : 0
  proxy.layer = mode === 'layer' ? 1 : 0
  motionRuntime.explode = proxy.explode
  motionRuntime.layer = proxy.layer
}

export function staggeredAmount(global: number, stagger: number): number {
  const lag = stagger * 0.34
  const span = Math.max(0.001, 1 - lag)
  const t = (global - lag) / span
  if (t <= 0) return 0
  if (t >= 1) return 1
  return t * t * (3 - 2 * t)
}

export const motion = {
  camera: 0.78,
  intro: 1.35,
  environment: 2.15,
  marker: 8,
  entity: 7.2,
} as const
