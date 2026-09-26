import { Color } from 'three'
import type { Mood, TimeOfDay } from './types'

export interface EnvironmentFrame {
  keyAzimuth: number
  keyElevation: number
  keyColor: Color
  keyIntensity: number
  fillSky: Color
  fillGround: Color
  fillIntensity: number
  ambientColor: Color
  ambientIntensity: number
  fogColor: Color
  fogNear: number
  fogFar: number
  backgroundTop: Color
  backgroundHorizon: Color
  backgroundBottom: Color
  exposure: number
  windowEmissive: number
  windowColor: Color
  practical: number
  practicalColor: Color
  shadowSoftness: number
  rimIntensity: number
  rimColor: Color
  bloom: number
  voidDisc: Color
}

const TIME: Record<
  TimeOfDay,
  Omit<
    EnvironmentFrame,
    | 'keyColor'
    | 'fillSky'
    | 'fillGround'
    | 'ambientColor'
    | 'fogColor'
    | 'backgroundTop'
    | 'backgroundHorizon'
    | 'backgroundBottom'
    | 'windowColor'
    | 'practicalColor'
    | 'rimColor'
    | 'voidDisc'
  > & {
    keyColor: string
    fillSky: string
    fillGround: string
    ambientColor: string
    fogColor: string
    backgroundTop: string
    backgroundHorizon: string
    backgroundBottom: string
    windowColor: string
    practicalColor: string
    rimColor: string
    voidDisc: string
  }
> = {
  morning: {
    keyAzimuth: -0.52,
    keyElevation: 0.3,
    keyColor: '#ffd2a6',
    keyIntensity: 2.55,
    fillSky: '#c7d5e4',
    fillGround: '#cbb8a0',
    fillIntensity: 0.62,
    ambientColor: '#2a241c',
    ambientIntensity: 0.16,
    fogColor: '#161310',
    fogNear: 14,
    fogFar: 42,
    backgroundTop: '#1a222c',
    backgroundHorizon: '#2a241c',
    backgroundBottom: '#0c0b0a',
    exposure: 1.08,
    windowEmissive: 0.55,
    windowColor: '#ffe4c2',
    practical: 0.12,
    practicalColor: '#ffd4a0',
    shadowSoftness: 2.4,
    rimIntensity: 0.45,
    rimColor: '#d7e2ee',
    bloom: 0.12,
    voidDisc: '#0b0b0c',
  },
  midday: {
    keyAzimuth: 0.08,
    keyElevation: 1.05,
    keyColor: '#fff4e4',
    keyIntensity: 3.35,
    fillSky: '#d5e0ea',
    fillGround: '#cfc4b4',
    fillIntensity: 0.82,
    ambientColor: '#2c2a26',
    ambientIntensity: 0.22,
    fogColor: '#1a1816',
    fogNear: 16,
    fogFar: 46,
    backgroundTop: '#243040',
    backgroundHorizon: '#3a3530',
    backgroundBottom: '#0e0d0c',
    exposure: 1.14,
    windowEmissive: 0.7,
    windowColor: '#fff1dc',
    practical: 0.04,
    practicalColor: '#ffe0b8',
    shadowSoftness: 1.1,
    rimIntensity: 0.28,
    rimColor: '#eef3f8',
    bloom: 0.08,
    voidDisc: '#0c0c0d',
  },
  evening: {
    keyAzimuth: 0.68,
    keyElevation: 0.22,
    keyColor: '#ff9a5a',
    keyIntensity: 2.15,
    fillSky: '#3c4a68',
    fillGround: '#3a2a20',
    fillIntensity: 0.42,
    ambientColor: '#1c1614',
    ambientIntensity: 0.12,
    fogColor: '#100e0e',
    fogNear: 12,
    fogFar: 36,
    backgroundTop: '#151822',
    backgroundHorizon: '#2a1c16',
    backgroundBottom: '#09090b',
    exposure: 1.02,
    windowEmissive: 0.48,
    windowColor: '#ffb07a',
    practical: 0.55,
    practicalColor: '#ffb070',
    shadowSoftness: 2.8,
    rimIntensity: 0.55,
    rimColor: '#ffb388',
    bloom: 0.26,
    voidDisc: '#0a0909',
  },
  night: {
    keyAzimuth: 0.28,
    keyElevation: 0.18,
    keyColor: '#8aa0c8',
    keyIntensity: 0.28,
    fillSky: '#151828',
    fillGround: '#121018',
    fillIntensity: 0.22,
    ambientColor: '#101018',
    ambientIntensity: 0.08,
    fogColor: '#08080c',
    fogNear: 10,
    fogFar: 32,
    backgroundTop: '#0c1018',
    backgroundHorizon: '#12141c',
    backgroundBottom: '#070708',
    exposure: 0.92,
    windowEmissive: 0.18,
    windowColor: '#9bb0d0',
    practical: 1,
    practicalColor: '#ffb078',
    shadowSoftness: 3.4,
    rimIntensity: 0.22,
    rimColor: '#7f90b8',
    bloom: 0.52,
    voidDisc: '#07070a',
  },
}

function hexFrame(time: TimeOfDay): EnvironmentFrame {
  const t = TIME[time]
  return {
    ...t,
    keyColor: new Color(t.keyColor),
    fillSky: new Color(t.fillSky),
    fillGround: new Color(t.fillGround),
    ambientColor: new Color(t.ambientColor),
    fogColor: new Color(t.fogColor),
    backgroundTop: new Color(t.backgroundTop),
    backgroundHorizon: new Color(t.backgroundHorizon),
    backgroundBottom: new Color(t.backgroundBottom),
    windowColor: new Color(t.windowColor),
    practicalColor: new Color(t.practicalColor),
    rimColor: new Color(t.rimColor),
    voidDisc: new Color(t.voidDisc),
  }
}

function applyMood(frame: EnvironmentFrame, mood: Mood): EnvironmentFrame {
  switch (mood) {
    case 'calm':
      frame.keyIntensity *= 0.86
      frame.fillIntensity *= 1.16
      frame.practical *= 0.82
      frame.keyColor.lerp(new Color('#eadcc8'), 0.16)
      frame.fillSky.lerp(new Color('#cfd8e0'), 0.22)
      frame.exposure *= 0.98
      frame.bloom *= 0.85
      break
    case 'warm':
      frame.keyColor.lerp(new Color('#ffb068'), 0.28)
      frame.fillGround.lerp(new Color('#c9a078'), 0.22)
      frame.practical *= 1.18
      frame.practicalColor.lerp(new Color('#ffb070'), 0.3)
      frame.rimColor.lerp(new Color('#ffc090'), 0.25)
      frame.backgroundHorizon.lerp(new Color('#3a2418'), 0.18)
      break
    case 'focus':
      frame.keyIntensity *= 1.14
      frame.fillIntensity *= 0.78
      frame.practical *= 0.72
      frame.keyColor.lerp(new Color('#f4f1ea'), 0.2)
      frame.fillSky.lerp(new Color('#9aa8b8'), 0.18)
      frame.exposure *= 1.04
      frame.shadowSoftness *= 0.78
      break
    case 'nightfall':
      frame.keyIntensity *= 0.58
      frame.fillSky.lerp(new Color('#2a3358'), 0.42)
      frame.backgroundTop.lerp(new Color('#0b1020'), 0.35)
      frame.practical *= 1.28
      frame.bloom += 0.1
      frame.ambientColor.lerp(new Color('#141428'), 0.3)
      frame.fogColor.lerp(new Color('#070712'), 0.25)
      break
  }
  return frame
}

const frameCache = new Map<string, EnvironmentFrame>()

export function getEnvironmentFrame(time: TimeOfDay, mood: Mood): EnvironmentFrame {
  const key = `${time}:${mood}`
  const cached = frameCache.get(key)
  if (cached) return cached
  const next = applyMood(hexFrame(time), mood)
  frameCache.set(key, next)
  return next
}

export function createEnvironmentFrame(time: TimeOfDay, mood: Mood): EnvironmentFrame {
  return getEnvironmentFrame(time, mood)
}

export function cloneFrame(src: EnvironmentFrame): EnvironmentFrame {
  return {
    ...src,
    keyColor: src.keyColor.clone(),
    fillSky: src.fillSky.clone(),
    fillGround: src.fillGround.clone(),
    ambientColor: src.ambientColor.clone(),
    fogColor: src.fogColor.clone(),
    backgroundTop: src.backgroundTop.clone(),
    backgroundHorizon: src.backgroundHorizon.clone(),
    backgroundBottom: src.backgroundBottom.clone(),
    windowColor: src.windowColor.clone(),
    practicalColor: src.practicalColor.clone(),
    rimColor: src.rimColor.clone(),
    voidDisc: src.voidDisc.clone(),
  }
}

export function dampScalar(current: number, target: number, dt: number, lambda = 2.15): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt))
}

export function mixFrame(current: EnvironmentFrame, target: EnvironmentFrame, dt: number, lambda = 2.15) {
  const a = 1 - Math.exp(-lambda * dt)
  current.keyAzimuth = dampScalar(current.keyAzimuth, target.keyAzimuth, dt, lambda)
  current.keyElevation = dampScalar(current.keyElevation, target.keyElevation, dt, lambda)
  current.keyIntensity = dampScalar(current.keyIntensity, target.keyIntensity, dt, lambda)
  current.fillIntensity = dampScalar(current.fillIntensity, target.fillIntensity, dt, lambda)
  current.ambientIntensity = dampScalar(current.ambientIntensity, target.ambientIntensity, dt, lambda)
  current.fogNear = dampScalar(current.fogNear, target.fogNear, dt, lambda)
  current.fogFar = dampScalar(current.fogFar, target.fogFar, dt, lambda)
  current.exposure = dampScalar(current.exposure, target.exposure, dt, lambda)
  current.windowEmissive = dampScalar(current.windowEmissive, target.windowEmissive, dt, lambda)
  current.practical = dampScalar(current.practical, target.practical, dt, lambda)
  current.shadowSoftness = dampScalar(current.shadowSoftness, target.shadowSoftness, dt, lambda)
  current.rimIntensity = dampScalar(current.rimIntensity, target.rimIntensity, dt, lambda)
  current.bloom = dampScalar(current.bloom, target.bloom, dt, lambda)
  current.keyColor.lerp(target.keyColor, a)
  current.fillSky.lerp(target.fillSky, a)
  current.fillGround.lerp(target.fillGround, a)
  current.ambientColor.lerp(target.ambientColor, a)
  current.fogColor.lerp(target.fogColor, a)
  current.backgroundTop.lerp(target.backgroundTop, a)
  current.backgroundHorizon.lerp(target.backgroundHorizon, a)
  current.backgroundBottom.lerp(target.backgroundBottom, a)
  current.windowColor.lerp(target.windowColor, a)
  current.practicalColor.lerp(target.practicalColor, a)
  current.rimColor.lerp(target.rimColor, a)
  current.voidDisc.lerp(target.voidDisc, a)
}

export function sunPosition(azimuth: number, elevation: number, radius = 14): [number, number, number] {
  const x = Math.sin(azimuth) * Math.cos(elevation) * radius
  const y = Math.sin(elevation) * radius
  const z = -Math.cos(azimuth) * Math.cos(elevation) * radius
  return [x, y, z]
}

export const moodAccent: Record<Mood, string> = {
  calm: '#8ba4a8',
  warm: '#c4a574',
  focus: '#7d8fa3',
  nightfall: '#6b7cb0',
}

export const timeLabels: Record<TimeOfDay, string> = {
  morning: 'Morning',
  midday: 'Midday',
  evening: 'Evening',
  night: 'Night',
}

export const moodLabels: Record<Mood, string> = {
  calm: 'Calm',
  warm: 'Warm',
  focus: 'Focus',
  nightfall: 'Nightfall',
}
