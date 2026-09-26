import type { ComponentType } from 'react'

export type TimeOfDay = 'morning' | 'midday' | 'evening' | 'night'
export type Mood = 'calm' | 'warm' | 'focus' | 'nightfall'
export type ViewMode = 'normal' | 'layer' | 'exploded'
export type CameraMode = 'overview' | 'detail' | 'environment' | 'cinematic'
export type QualityTier = 'low' | 'medium' | 'high'
export type EntityCategory = 'architecture' | 'furniture' | 'lighting' | 'nature' | 'decor'
export type MaterialCategory = 'wood' | 'stone' | 'fabric' | 'paint' | 'metal'

export type Vec3 = [number, number, number]

export interface CameraPreset {
  id: CameraMode
  label: string
  description: string
  position: Vec3
  target: Vec3
  fov: number
}

export interface EntityDefinition {
  id: string
  label: string
  category: EntityCategory
  semanticRole: string
  selectable: boolean
  materialCategory: MaterialCategory | null
  defaultMaterialId: string | null
  description: string
  basePosition: Vec3
  baseRotation: Vec3
  explodedOffset: Vec3
  layerOffset: Vec3
  stagger: number
  labelHeight: number
  markerRadius: number
  focusPosition: Vec3
  focusTarget: Vec3
}

export interface MaterialDefinition {
  id: string
  name: string
  category: MaterialCategory
  color: string
  roughness: number
  metalness: number
  emissive?: string
  emissiveIntensity?: number
  clearcoat?: number
  clearcoatRoughness?: number
  sheen?: number
  sheenRoughness?: number
  sheenColor?: string
}

export interface SceneCapabilities {
  timeOfDay: boolean
  mood: boolean
  materials: boolean
  exploded: boolean
  layers: boolean
}

export interface SceneDefinition {
  id: string
  name: string
  description: string
  component: ComponentType
  defaultEnvironment: { timeOfDay: TimeOfDay; mood: Mood }
  defaultCamera: CameraMode
  cameraPresets: CameraPreset[]
  capabilities: SceneCapabilities
  entities: EntityDefinition[]
  environmentStates: { times: TimeOfDay[]; moods: Mood[] }
}
