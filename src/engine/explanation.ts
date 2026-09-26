import type { EntityDefinition, Mood, TimeOfDay } from './types'

export const timeCopy: Record<TimeOfDay, { title: string; body: string }> = {
  morning: {
    title: 'Morning',
    body: 'Low sun, long shadows, a cooler fill. Surfaces wake in sequence along the aperture.',
  },
  midday: {
    title: 'Midday',
    body: 'High key, short shadows. Materials read at their most honest, with the least theatrical contrast.',
  },
  evening: {
    title: 'Evening',
    body: 'Warm raking light. Contrast opens across the cutaway, and practicals begin to carry the interior.',
  },
  night: {
    title: 'Night',
    body: 'Exterior falls away. The room is written by lamps, residual sky, and the halo of the plinth.',
  },
}

export const moodCopy: Record<Mood, { title: string; body: string }> = {
  calm: {
    title: 'Calm',
    body: 'Ratios flatten and edges soften. The atelier holds still — a reading more than a statement.',
  },
  warm: {
    title: 'Warm',
    body: 'A honeyed bias. Walnut and linen step forward; brass picks up the last of the sun.',
  },
  focus: {
    title: 'Focus',
    body: 'Directional priority and a cooler fill. The work zone becomes the subject of the frame.',
  },
  nightfall: {
    title: 'Nightfall',
    body: 'Indigo fill, brass highlights. Interior light writes the architecture against the void.',
  },
}

export function environmentCaption(time: TimeOfDay, mood: Mood): string {
  return `${timeCopy[time].title} · ${moodCopy[mood].title}`
}

export function environmentBody(time: TimeOfDay, mood: Mood): string {
  return `${timeCopy[time].body} ${moodCopy[mood].body}`
}

export function entityCopy(entity: EntityDefinition): string {
  return entity.description
}

export const categoryCopy: Record<EntityDefinition['category'], string> = {
  architecture: 'Structure that holds light and bounds the cutaway.',
  furniture: 'Occupied mass — the human scale of the atelier.',
  lighting: 'Practical sources that take over as the exterior fades.',
  nature: 'Soft counterforms against stone, paint, and metal.',
  decor: 'Smaller notes that complete the reading of the room.',
}
