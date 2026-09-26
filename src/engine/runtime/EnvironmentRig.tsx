import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { AmbientLight, DirectionalLight, Fog, HemisphereLight } from 'three'
import { cloneFrame, createEnvironmentFrame, mixFrame, sunPosition } from '../environment'
import { writeLightingRuntime } from '../lighting'
import { useExperience } from '../state'
import { VoidBackdrop } from './VoidBackdrop'

export function EnvironmentRig() {
  const frameRef = useRef(cloneFrame(createEnvironmentFrame('evening', 'warm')))
  const fogRef = useRef(new Fog('#100e0e', 12, 36))
  const keyRef = useRef<DirectionalLight>(null)
  const rimRef = useRef<DirectionalLight>(null)
  const hemiRef = useRef<HemisphereLight>(null)
  const ambRef = useRef<AmbientLight>(null)

  useFrame((state, dt) => {
    const { timeOfDay, mood } = useExperience.getState()
    const frame = frameRef.current
    const target = createEnvironmentFrame(timeOfDay, mood)
    mixFrame(frame, target, dt)
    writeLightingRuntime(frame)

    const [sx, sy, sz] = sunPosition(frame.keyAzimuth, frame.keyElevation)
    const key = keyRef.current
    if (key) {
      key.position.set(sx, sy, sz)
      key.color.copy(frame.keyColor)
      key.intensity = frame.keyIntensity
      key.shadow.radius = frame.shadowSoftness
      key.target.position.set(0.15, 0.2, -0.2)
      if (!key.target.parent) state.scene.add(key.target)
      key.target.updateMatrixWorld()
    }

    const rim = rimRef.current
    if (rim) {
      rim.position.set(-6.5, 3.2, 5.5)
      rim.color.copy(frame.rimColor)
      rim.intensity = frame.rimIntensity
    }

    const hemi = hemiRef.current
    if (hemi) {
      hemi.color.copy(frame.fillSky)
      hemi.groundColor.copy(frame.fillGround)
      hemi.intensity = frame.fillIntensity
    }

    const amb = ambRef.current
    if (amb) {
      amb.color.copy(frame.ambientColor)
      amb.intensity = frame.ambientIntensity
    }

    const fog = fogRef.current
    fog.color.copy(frame.fogColor)
    fog.near = frame.fogNear
    fog.far = frame.fogFar
    state.scene.fog = fog
    state.scene.background = frame.fogColor
    state.gl.toneMappingExposure = frame.exposure
  })

  return (
    <>
      <ambientLight ref={ambRef} intensity={0.12} />
      <hemisphereLight ref={hemiRef} intensity={0.4} />
      <directionalLight
        ref={keyRef}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={2}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.00018}
        shadow-normalBias={0.035}
      />
      <directionalLight ref={rimRef} intensity={0.4} />
      <VoidBackdrop />
    </>
  )
}
