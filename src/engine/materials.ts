import { useMemo } from 'react'
import type { MaterialCategory, MaterialDefinition } from './types'
import { useExperience } from './state'
import { getEntity } from './scene'

export const materials: MaterialDefinition[] = [
  {
    id: 'wood-walnut',
    name: 'Walnut',
    category: 'wood',
    color: '#5a3828',
    roughness: 0.48,
    metalness: 0.02,
    clearcoat: 0.12,
    clearcoatRoughness: 0.45,
  },
  {
    id: 'wood-ash',
    name: 'Ash',
    category: 'wood',
    color: '#d2c0a4',
    roughness: 0.52,
    metalness: 0,
    clearcoat: 0.08,
    clearcoatRoughness: 0.5,
  },
  {
    id: 'wood-ebonized',
    name: 'Ebonized',
    category: 'wood',
    color: '#1a1512',
    roughness: 0.38,
    metalness: 0.04,
    clearcoat: 0.16,
    clearcoatRoughness: 0.4,
  },
  {
    id: 'stone-travertine',
    name: 'Travertine',
    category: 'stone',
    color: '#d5c6b0',
    roughness: 0.78,
    metalness: 0,
    clearcoat: 0.08,
    clearcoatRoughness: 0.55,
  },
  {
    id: 'stone-slate',
    name: 'Slate',
    category: 'stone',
    color: '#4a5058',
    roughness: 0.7,
    metalness: 0.04,
    clearcoat: 0.06,
    clearcoatRoughness: 0.6,
  },
  {
    id: 'stone-basalt',
    name: 'Basalt',
    category: 'stone',
    color: '#2a2c30',
    roughness: 0.84,
    metalness: 0.02,
  },
  {
    id: 'fabric-linen',
    name: 'Linen',
    category: 'fabric',
    color: '#d9d1c4',
    roughness: 0.9,
    metalness: 0,
    sheen: 0.72,
    sheenRoughness: 0.55,
    sheenColor: '#f0eae0',
  },
  {
    id: 'fabric-barley',
    name: 'Barley',
    category: 'fabric',
    color: '#c2b39a',
    roughness: 0.88,
    metalness: 0,
    sheen: 0.5,
    sheenRoughness: 0.62,
    sheenColor: '#e2d4bc',
  },
  {
    id: 'fabric-moss',
    name: 'Moss',
    category: 'fabric',
    color: '#5c6a56',
    roughness: 0.88,
    metalness: 0,
    sheen: 0.55,
    sheenRoughness: 0.62,
    sheenColor: '#8a9a80',
  },
  {
    id: 'fabric-ink',
    name: 'Ink',
    category: 'fabric',
    color: '#2a3140',
    roughness: 0.84,
    metalness: 0,
    sheen: 0.45,
    sheenColor: '#4a5570',
  },
  {
    id: 'paint-chalk',
    name: 'Chalk',
    category: 'paint',
    color: '#e7e0d4',
    roughness: 0.55,
    metalness: 0,
  },
  {
    id: 'paint-sage',
    name: 'Sage',
    category: 'paint',
    color: '#8b9a86',
    roughness: 0.52,
    metalness: 0,
  },
  {
    id: 'paint-clay',
    name: 'Clay',
    category: 'paint',
    color: '#c5a48c',
    roughness: 0.58,
    metalness: 0,
  },
  {
    id: 'paint-ink',
    name: 'Graphite Wash',
    category: 'paint',
    color: '#3a3f48',
    roughness: 0.48,
    metalness: 0,
  },
  {
    id: 'metal-brass',
    name: 'Brass',
    category: 'metal',
    color: '#b08d57',
    roughness: 0.3,
    metalness: 0.9,
    clearcoat: 0.2,
    clearcoatRoughness: 0.35,
  },
  {
    id: 'metal-graphite',
    name: 'Graphite',
    category: 'metal',
    color: '#3c4046',
    roughness: 0.42,
    metalness: 0.78,
  },
  {
    id: 'metal-pewter',
    name: 'Pewter',
    category: 'metal',
    color: '#8b8e93',
    roughness: 0.36,
    metalness: 0.82,
  },
]

const byId: Record<string, MaterialDefinition> = Object.fromEntries(
  materials.map((material) => [material.id, material]),
)

export function getMaterial(id: string): MaterialDefinition {
  return byId[id] ?? byId['paint-chalk']
}

export function materialsIn(category: MaterialCategory): MaterialDefinition[] {
  return materials.filter((material) => material.category === category)
}

export function physicalProps(mat: MaterialDefinition) {
  return {
    color: mat.color,
    roughness: mat.roughness,
    metalness: mat.metalness,
    emissive: mat.emissive ?? '#000000',
    emissiveIntensity: mat.emissiveIntensity ?? 0,
    clearcoat: mat.clearcoat ?? 0,
    clearcoatRoughness: mat.clearcoatRoughness ?? 0.45,
    sheen: mat.sheen ?? 0,
    sheenRoughness: mat.sheenRoughness ?? 0.5,
    sheenColor: mat.sheenColor ?? mat.color,
    envMapIntensity: 0.4,
  }
}

export function usePrimaryMaterial(entityId: string): MaterialDefinition {
  const override = useExperience((s) => s.materialOverrides[entityId])
  const entity = getEntity(entityId)
  const id = override ?? entity?.defaultMaterialId ?? 'paint-chalk'
  return useMemo(() => getMaterial(id), [id])
}
