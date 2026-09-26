import { CameraControls, CameraControlsImpl } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { PerspectiveCamera } from 'three'
import { motion } from '../motion'
import { getActiveScene, getEntity } from '../scene'
import { useExperience } from '../state'
import type { CameraMode, ViewMode } from '../types'

function composeLookAt(mode: CameraMode, view: ViewMode) {
  const scene = getActiveScene()
  const preset = scene?.cameraPresets.find((item) => item.id === mode) ?? scene?.cameraPresets[0]
  if (!preset) {
    return { position: [6.9, 4.35, 6.8] as const, target: [0.15, 0.55, -0.15] as const, fov: 31 }
  }

  const selectedId = useExperience.getState().selectedEntityId
  const entity = selectedId ? getEntity(selectedId) : undefined

  let px = preset.position[0]
  let py = preset.position[1]
  let pz = preset.position[2]
  let tx = preset.target[0]
  let ty = preset.target[1]
  let tz = preset.target[2]
  const fov = preset.fov

  if (mode === 'detail' && entity) {
    px = entity.focusPosition[0]
    py = entity.focusPosition[1]
    pz = entity.focusPosition[2]
    tx = entity.focusTarget[0]
    ty = entity.focusTarget[1]
    tz = entity.focusTarget[2]
  }

  const pull = view === 'exploded' ? 1.38 : view === 'layer' ? 1.16 : 1
  const extraY = view === 'exploded' ? 0.85 : view === 'layer' ? 0.38 : 0
  const dx = px - tx
  const dy = py - ty
  const dz = pz - tz
  px = tx + dx * pull
  py = ty + dy * pull + extraY
  pz = tz + dz * pull

  return { position: [px, py, pz] as const, target: [tx, ty, tz] as const, fov }
}

export function CameraDirector() {
  const controls = useRef<CameraControlsImpl>(null)
  const intro = useRef(false)
  const lastKey = useRef('')
  const userOrbit = useRef(false)
  const pending = useRef<{ transition: boolean } | null>(null)
  const cameraMode = useExperience((s) => s.cameraMode)
  const viewMode = useExperience((s) => s.viewMode)
  const selectedEntityId = useExperience((s) => s.selectedEntityId)

  useEffect(() => {
    const key = `${cameraMode}|${viewMode}|${selectedEntityId ?? ''}`
    if (lastKey.current === key) return
    lastKey.current = key
    userOrbit.current = false
    pending.current = { transition: intro.current }
  }, [cameraMode, viewMode, selectedEntityId])

  useFrame((state, dt) => {
    const c = controls.current
    if (!c) return

    if (!intro.current) {
      intro.current = true
      c.smoothTime = motion.intro
      void c.setLookAt(4.4, 2.35, 4.6, 0.2, 0.55, 0.05, false)
      pending.current = { transition: true }
      return
    }

    const job = pending.current
    if (job) {
      pending.current = null
      const look = composeLookAt(
        useExperience.getState().cameraMode,
        useExperience.getState().viewMode,
      )
      c.smoothTime = job.transition ? motion.camera : 0.05
      void c.setLookAt(
        look.position[0],
        look.position[1],
        look.position[2],
        look.target[0],
        look.target[1],
        look.target[2],
        job.transition,
      )
      const cam = state.camera
      if (cam instanceof PerspectiveCamera) {
        cam.fov = look.fov
        cam.updateProjectionMatrix()
      }
    }

    if (useExperience.getState().cameraMode === 'cinematic' && !userOrbit.current) {
      void c.rotate(dt * 0.055, 0, true)
    }
  })

  return (
    <CameraControls
      ref={controls}
      makeDefault
      minDistance={4.1}
      maxDistance={16.5}
      minPolarAngle={0.38}
      maxPolarAngle={Math.PI / 2 - 0.16}
      dollyToCursor={false}
      infinityDolly={false}
      draggingSmoothTime={0.12}
      smoothTime={motion.camera}
      azimuthRotateSpeed={0.48}
      polarRotateSpeed={0.42}
      dollySpeed={0.38}
      mouseButtons={{
        left: CameraControlsImpl.ACTION.ROTATE,
        middle: CameraControlsImpl.ACTION.DOLLY,
        right: CameraControlsImpl.ACTION.NONE,
        wheel: CameraControlsImpl.ACTION.DOLLY,
      }}
      onControlStart={() => {
        userOrbit.current = true
      }}
    />
  )
}
