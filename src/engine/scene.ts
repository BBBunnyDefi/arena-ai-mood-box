import type { Object3D } from 'three'
import type { EntityDefinition, SceneDefinition } from './types'
import { useExperience } from './state'

const scenes = new Map<string, SceneDefinition>()

export function registerScene(definition: SceneDefinition) {
  scenes.set(definition.id, definition)
}

export function getScene(id: string): SceneDefinition | undefined {
  return scenes.get(id)
}

export function getActiveScene(): SceneDefinition | undefined {
  return getScene(useExperience.getState().activeSceneId)
}

export function getEntity(id: string): EntityDefinition | undefined {
  return getActiveScene()?.entities.find((entity) => entity.id === id)
}

export function requireEntity(id: string): EntityDefinition {
  const entity = getEntity(id)
  if (!entity) {
    throw new Error(`Unknown entity: ${id}`)
  }
  return entity
}

export const entityRefs = new Map<string, Object3D>()
