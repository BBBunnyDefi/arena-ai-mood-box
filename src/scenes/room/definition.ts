import { registerScene } from '@/engine/scene'
import type { SceneDefinition } from '@/engine/types'
import { roomEntities } from './entities'
import { RoomScene } from './RoomScene'

export const roomScene: SceneDefinition = {
  id: 'room',
  name: 'Atelier No. 1',
  description:
    'A compact contemporary living atelier contained on a floating stone plinth — the first world on the Moodbox engine.',
  component: RoomScene,
  defaultEnvironment: { timeOfDay: 'evening', mood: 'warm' },
  defaultCamera: 'overview',
  cameraPresets: [
    {
      id: 'overview',
      label: 'Overview',
      description: 'The full cutaway, composed from the open corner.',
      position: [6.95, 4.32, 6.85],
      target: [0.12, 0.58, -0.12],
      fov: 31,
    },
    {
      id: 'detail',
      label: 'Detail',
      description: 'A closer reading of the selected object, or the lounge if none is chosen.',
      position: [3.35, 1.62, 3.25],
      target: [1.12, 0.48, 0.55],
      fov: 28,
    },
    {
      id: 'environment',
      label: 'Light',
      description: 'How the aperture writes light across architecture and material.',
      position: [3.05, 1.48, 3.55],
      target: [0.35, 1.28, -2.15],
      fov: 30,
    },
    {
      id: 'cinematic',
      label: 'Cinema',
      description: 'A lower, slower orbit along the open edge of the plinth.',
      position: [7.35, 2.08, 5.15],
      target: [0.18, 0.72, -0.12],
      fov: 35,
    },
  ],
  capabilities: {
    timeOfDay: true,
    mood: true,
    materials: true,
    exploded: true,
    layers: true,
  },
  entities: roomEntities,
  environmentStates: {
    times: ['morning', 'midday', 'evening', 'night'],
    moods: ['calm', 'warm', 'focus', 'nightfall'],
  },
}

export function registerRoomScene() {
  registerScene(roomScene)
}
