import { Color } from 'three'
import { cloneFrame, createEnvironmentFrame } from './environment'

const initial = cloneFrame(createEnvironmentFrame('evening', 'warm'))

export const lightingRuntime = {
  practical: initial.practical,
  practicalColor: initial.practicalColor.clone(),
  windowEmissive: initial.windowEmissive,
  windowColor: initial.windowColor.clone(),
  bloom: initial.bloom,
  exposure: initial.exposure,
  voidTop: initial.backgroundTop.clone(),
  voidHorizon: initial.backgroundHorizon.clone(),
  voidBottom: initial.backgroundBottom.clone(),
  voidDisc: initial.voidDisc.clone(),
  fogColor: initial.fogColor.clone(),
}

export function writeLightingRuntime(frame: {
  practical: number
  practicalColor: Color
  windowEmissive: number
  windowColor: Color
  bloom: number
  exposure: number
  backgroundTop: Color
  backgroundHorizon: Color
  backgroundBottom: Color
  voidDisc: Color
  fogColor: Color
}) {
  lightingRuntime.practical = frame.practical
  lightingRuntime.practicalColor.copy(frame.practicalColor)
  lightingRuntime.windowEmissive = frame.windowEmissive
  lightingRuntime.windowColor.copy(frame.windowColor)
  lightingRuntime.bloom = frame.bloom
  lightingRuntime.exposure = frame.exposure
  lightingRuntime.voidTop.copy(frame.backgroundTop)
  lightingRuntime.voidHorizon.copy(frame.backgroundHorizon)
  lightingRuntime.voidBottom.copy(frame.backgroundBottom)
  lightingRuntime.voidDisc.copy(frame.voidDisc)
  lightingRuntime.fogColor.copy(frame.fogColor)
}
