import { getScene } from '../scene'

export function SceneRuntime({ sceneId }: { sceneId: string }) {
  const scene = getScene(sceneId)
  if (!scene) return null
  const Component = scene.component
  return <Component />
}
