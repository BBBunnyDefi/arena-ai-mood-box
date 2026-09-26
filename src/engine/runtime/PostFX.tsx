import { Bloom, EffectComposer, SMAA, Vignette } from '@react-three/postprocessing'
import { useExperience } from '../state'

export function PostFX() {
  const quality = useExperience((s) => s.quality)
  const timeOfDay = useExperience((s) => s.timeOfDay)
  const mood = useExperience((s) => s.mood)

  const bloom =
    timeOfDay === 'night' || mood === 'nightfall'
      ? 0.42
      : timeOfDay === 'evening'
        ? 0.22
        : 0.08

  if (quality === 'low') return null

  return (
    <EffectComposer enableNormalPass={false} multisampling={quality === 'high' ? 2 : 0}>
      <Bloom
        luminanceThreshold={0.88}
        intensity={bloom}
        mipmapBlur
        luminanceSmoothing={0.25}
      />
      <Vignette offset={0.32} darkness={0.58} />
      <SMAA />
    </EffectComposer>
  )
}
