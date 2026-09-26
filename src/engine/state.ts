import { create } from 'zustand'
import { animateViewMode, resetMotion } from './motion'
import { detectQuality } from './quality'
import type {
  CameraMode,
  Mood,
  QualityTier,
  TimeOfDay,
  ViewMode,
} from './types'

const CAMERA_CYCLE: CameraMode[] = ['overview', 'detail', 'environment', 'cinematic']

const initialMaterials: Record<string, string> = {}

export interface ExperienceState {
  activeSceneId: string
  selectedEntityId: string | null
  hoveredEntityId: string | null
  timeOfDay: TimeOfDay
  mood: Mood
  materialOverrides: Record<string, string>
  labelsVisible: boolean
  viewMode: ViewMode
  cameraMode: CameraMode
  uiVisible: boolean
  sceneReady: boolean
  quality: QualityTier
  shortcutsVisible: boolean
  select: (id: string | null) => void
  hover: (id: string | null) => void
  setTimeOfDay: (time: TimeOfDay) => void
  setMood: (mood: Mood) => void
  setMaterial: (entityId: string, materialId: string) => void
  toggleLabels: () => void
  setViewMode: (mode: ViewMode) => void
  setCameraMode: (mode: CameraMode) => void
  cycleCamera: () => void
  toggleUi: () => void
  toggleShortcuts: () => void
  setSceneReady: (ready: boolean) => void
  setQuality: (quality: QualityTier) => void
  reset: () => void
}

const defaults = {
  activeSceneId: 'room',
  selectedEntityId: null as string | null,
  hoveredEntityId: null as string | null,
  timeOfDay: 'evening' as TimeOfDay,
  mood: 'warm' as Mood,
  materialOverrides: initialMaterials,
  labelsVisible: false,
  viewMode: 'normal' as ViewMode,
  cameraMode: 'overview' as CameraMode,
  uiVisible: true,
  sceneReady: false,
  shortcutsVisible: false,
}

export const useExperience = create<ExperienceState>((set, get) => ({
  ...defaults,
  quality: detectQuality(),
  select: (id) => set({ selectedEntityId: id }),
  hover: (id) => set({ hoveredEntityId: id }),
  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),
  setMood: (mood) => set({ mood }),
  setMaterial: (entityId, materialId) =>
    set((state) => ({
      materialOverrides: { ...state.materialOverrides, [entityId]: materialId },
    })),
  toggleLabels: () => set((state) => ({ labelsVisible: !state.labelsVisible })),
  setViewMode: (viewMode) => {
    set({ viewMode })
    animateViewMode(viewMode)
  },
  setCameraMode: (cameraMode) => set({ cameraMode }),
  cycleCamera: () => {
    const current = get().cameraMode
    const next = CAMERA_CYCLE[(CAMERA_CYCLE.indexOf(current) + 1) % CAMERA_CYCLE.length]
    set({ cameraMode: next })
  },
  toggleUi: () => set((state) => ({ uiVisible: !state.uiVisible })),
  toggleShortcuts: () => set((state) => ({ shortcutsVisible: !state.shortcutsVisible })),
  setSceneReady: (sceneReady) => set({ sceneReady }),
  setQuality: (quality) => set({ quality }),
  reset: () => {
    resetMotion('normal')
    set({
      ...defaults,
      quality: get().quality,
      sceneReady: true,
      materialOverrides: {},
    })
  },
}))
