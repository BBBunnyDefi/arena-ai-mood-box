# Tech stack — Moodbox Studio (Prompt 01)

Written against the implementation, not the brief.

## Runtime versions

| Package | Role |
| --- | --- |
| `react` / `react-dom` ^19.3 | Application shell |
| `vite` ^8.3 + `@vitejs/plugin-react` | Dev server and production bundler |
| `typescript` ^6 | Strict app checking (`tsc --noEmit`) |
| `tailwindcss` ^4 + `@tailwindcss/vite` | HUD styling via `@theme` tokens |
| `three` ^0.186 | Renderer, lights, extruded architecture |
| `@react-three/fiber` ^9.8 | React renderer for three |
| `@react-three/drei` ^10.7 | `CameraControls`, `RoundedBox`, `Html`, `ContactShadows`, `SoftShadows` |
| `camera-controls` ^3.1 | Camera director interpolation (`setLookAt`, cinematic rotate) |
| `@react-three/postprocessing` ^3.1 + `postprocessing` ^6.39 | Bloom, vignette, SMAA |
| `zustand` ^5 | Experience store |
| `gsap` ^3.15 | View-mode explode/layer choreography |
| `@fontsource/outfit` + `@fontsource/instrument-serif` | Bundled fonts (no runtime font CDN) |

## State

`src/engine/state.ts` is the source of truth:

- `selectedEntityId`, `hoveredEntityId`
- `timeOfDay`, `mood`
- `materialOverrides`
- `labelsVisible`, `viewMode`, `cameraMode`, `uiVisible`
- `activeSceneId`, `quality`, `sceneReady`

UI subscribes. The 3D environment rig and motion runtime **do not** re-render the scene graph on time/mood ticks — they read `getState()` inside `useFrame` and damp toward profiles.

## Animation

- **GSAP** tweens `{ explode, layer }` on a module-level `motionRuntime` when view mode changes. Entities sample staggered amounts in `useFrame` so React is not in the per-frame path.
- **CameraControls.smoothTime + setLookAt** for camera transitions and intro pull-back.
- **Exponential damping** (`mixFrame`) for lights, fog, exposure, practicals, window emissive.
- CSS transitions for HUD panels.

GSAP is not used for lights or camera; those stay continuous and interruptible.

## Styling

Tailwind v4 with `@theme` tokens (`font-display`, `font-ui`, `void`, `mist`, `brass`). HUD glass is a small CSS class (`hud-glass`) so blur/border stay consistent. 3D labels use a screenspace `.entity-label` chip via drei `Html`.

## Scene runtime

`registerScene(definition)` in `src/engine/scene.ts`.

A `SceneDefinition` exposes: id, name, description, React component, default environment, camera presets, capabilities, entity list, available times/moods.

`SceneRuntime` mounts `definition.component` for `activeSceneId`. Prompt 01 registers one scene: `src/scenes/room/definition.ts` (`room` / Atelier No. 1).

## Entity model

`EntityDefinition` is data: id, label, category, semantic role, material slot, transforms (base / exploded / layer), stagger, focus camera, marker radius.

`EntityRoot` registers a Three object in `entityRefs`, applies motion, wraps `Selectable`, and hosts the label. Meshes stay scene-specific; identity is not the React component name.

## Environment system

`src/engine/environment.ts` stores time profiles and mood modifiers. `EnvironmentRig` damps a cloned frame toward the active pair and writes `lightingRuntime` (practicals, window, void gradient uniforms, fog).

Time moves the key light on a spherical path aimed through the aperture. Mood retunes intensities, hues, practicals, and bloom — it is not a UI accent swap.

## Material system

`src/engine/materials.ts` is a catalog of wood / stone / fabric / paint / metal definitions (`MeshPhysicalMaterial` props). `usePrimaryMaterial(entityId)` resolves override vs default. Only the dominant surface of an object is bound; legs, frames, and foliage stay structural.

## Interaction

`Selectable` uses R3F pointer events with a drag delta guard. Selection and hover live in Zustand so the inspector, marker ring, and labels stay in sync. Empty-space click deselects. `SelectionMarker` follows `entityRefs` in `useFrame`.

## Camera

`CameraDirector` maps `(cameraMode, viewMode, selectedEntityId)` to a look-at. Exploded/layer modes pull the camera back. Detail mode uses the entity’s authored focus rig. Cinematic mode slowly rotates until the user takes over.

Orbit is constrained (polar, distance). Pan is disabled. Right mouse is inert so composition cannot be trucked into a broken frame.

## Performance

- DPR cap 1.7 (high) / 1.25 (medium)
- One shadow-casting directional + optional lamp shadow on high
- Shared catalog materials, modest RoundedBox smoothness
- Motion via refs, not Zustand subscriptions, for explode/layer
- Quality detection never drops to a shadowless “low” unless explicitly set — constrained devices get medium
- SoftShadows only on high; post is bloom/vignette/SMAA (no N8AO in this slice)
- Geometries with holes are extruded once and disposed on unmount
- No HDRI / remote textures

## Source structure

```
src/
  App.tsx                 shell, WebGL gate, scene registration
  engine/                 reusable runtime
    state.ts              zustand store
    scene.ts              registry + entity lookup
    environment.ts        time/mood profiles
    materials.ts          catalog
    motion.ts             explode/layer runtime
    lighting.ts           per-frame lighting bus
    runtime/              canvas, camera, environment, FX, selection
  scenes/room/            first scene (Atelier No. 1)
  ui/                     HUD, inspector, docks, loading, fallback
```

## Adding a second scene

1. Create `src/scenes/<id>/definition.ts` with a `SceneDefinition` (component, entities, camera presets, defaults).
2. Call `registerScene(...)`.
3. Import the register function from `App.tsx` (or a future `src/scenes/index.ts`).
4. Set `activeSceneId` in the store.

The shell, HUD, environment rig, materials, motion, and camera director do not need to be rewritten. Scene-specific work is: entity table, geometry component, and camera/explode authoring.

Do not put the new world inside `RoomScene.tsx`.

## Technical debt

- Camera FOV is snapped when a preset applies; position/target interpolate.
- Layer view is spatial offset + labels, not a false-color technical shader.
- Exploded offsets are hand-authored, not derived from a hierarchy.
- `ContactShadows` sit on the void disc and will lag slightly during explode.
- Production bundle is ~1.5 MB minified because Three + postprocessing are not code-split. Acceptable for this slice; split if a second heavy scene lands.
- `createEnvironmentFrame` caches by `time:mood`. Interpolation clones the starting frame so the cache is not mutated.
- No GLTF loader wired yet. The scene component slot is the insertion point.
- Playwright/Chromium could not be installed in this sandbox (TLS to browser CDNs blocked), so visual QA was done against a running Vite server plus composition review rather than automated screenshots.
