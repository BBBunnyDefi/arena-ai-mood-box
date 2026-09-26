import { ContactShadows, SoftShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping } from 'three'
import { useExperience } from '../state'
import { CameraDirector } from './CameraDirector'
import { EnvironmentRig } from './EnvironmentRig'
import { PostFX } from './PostFX'
import { SceneRuntime } from './SceneRuntime'

export function CanvasRoot() {
  const quality = useExperience((s) => s.quality)
  const sceneId = useExperience((s) => s.activeSceneId)
  const dpr: [number, number] =
    quality === 'high' ? [1, 1.7] : quality === 'medium' ? [1, 1.25] : [1, 1]

  return (
    <Canvas
      className="h-full w-full touch-none"
      dpr={dpr}
      shadows={quality !== 'low'}
      camera={{ position: [6.9, 4.35, 6.8], fov: 31, near: 0.08, far: 90 }}
      gl={{
        antialias: quality !== 'low',
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.02,
        powerPreference: 'high-performance',
        stencil: false,
      }}
      onPointerMissed={(event) => {
        if (event.type === 'click') useExperience.getState().select(null)
      }}
    >
      <color attach="background" args={['#09090b']} />
      {quality === 'high' ? <SoftShadows size={18} samples={8} focus={0.42} /> : null}
      <EnvironmentRig />
      <CameraDirector />
      <SceneRuntime sceneId={sceneId} />
      {quality !== 'low' ? (
        <ContactShadows
          position={[0, -1.405, 0]}
          opacity={0.48}
          scale={16}
          blur={2.6}
          far={3.2}
          color="#000000"
        />
      ) : null}
      <PostFX />
    </Canvas>
  )
}
