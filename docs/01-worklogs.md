# Work Log — Prompt 01

## Goal

Build Moodbox Studio as the first vertical slice of a reusable interactive 3D environment engine: one original architectural diorama, engine-level systems (state, scene registry, environment, materials, interaction, motion, camera, HUD), then run, polish, validate, document, commit, and push.

## Result

Delivered a working desktop experience: **Atelier No. 1** on a floating stone plinth, with selectable objects, material edits, interpolated time/mood lighting, assembled/layer/exploded views, four camera compositions, and a compact glass HUD. The room is scene-specific; the shell and systems are not.

## Major Implementation

- Vite + React 19 + TypeScript app with Tailwind v4 HUD
- Zustand experience store as the single product state
- Scene contract + registry (`room` registered, substitution is a new definition)
- Entity table driving selection, materials, explode/layer, focus cameras, labels
- Time-of-day + mood lighting rig with damped interpolation
- Data-driven material catalog (wood / stone / fabric / paint / metal)
- GSAP-choreographed structural views
- Camera director on `camera-controls` (intro, presets, cinematic drift)
- HUD: atmosphere dock, view/camera dock, selection inspector, hide/reset/labels

## Engine Foundation

Reusable layers actually present in code:

- **Shell** — `App.tsx`, `CanvasRoot`, loading, WebGL fallback
- **Scene runtime** — `registerScene`, `SceneRuntime`, `SceneDefinition`
- **Entities** — `EntityDefinition`, `EntityRoot`, `entityRefs`
- **Environment** — profiles + `EnvironmentRig` + `lightingRuntime`
- **Materials** — catalog + `usePrimaryMaterial`
- **Interaction** — `Selectable`, selection marker, shared store
- **Motion** — `motionRuntime` explode/layer with stagger
- **Camera** — `CameraDirector` + scene camera presets
- **HUD** — reads store, does not own scene facts

A future island/lab scene should register; it should not fork `CanvasRoot`.

## 3D / Visual Work

- Original art direction: charcoal void, travertine/walnut/linen/brass, Instrument Serif wordmark
- Spatial stage: terraced stone plinth, emissive halo ring, cyclorama shell — not a display cube
- L-cutaway atelier: extruded aperture wall, oculus wall, gallery floor with brass inlay
- Zones: lounge (sofa, table, rug), work (desk, chair, soffit), rest (daybed), nature, decor
- Lighting: moving key, hemisphere fill, window practical, stem lamp, desk lamp, soffit fill
- Post: ACES tone mapping, subtle bloom/vignette/SMAA, contact shadows, optional soft shadows
- Motion: intro camera, damped environment, staggered explode/layer, selection ring

## Interaction Work

Users can:

1. Orbit the contained world
2. Hover an object (label + ring)
3. Select it (inspector + material swatches)
4. Change a compatible material
5. Step time of day and watch sun, fill, window, and lamps interpolate
6. Step mood and watch the same time re-grade
7. Switch assembled / layers / exploded
8. Switch overview / detail / light / cinema
9. Hide the HUD
10. Reset

Direct manipulation is preferred: click the object, not a dropdown of names.

## Important Files

- `src/engine/state.ts` — experience store
- `src/engine/scene.ts` — scene/entity registry
- `src/engine/environment.ts` — time/mood profiles
- `src/engine/materials.ts` — material catalog
- `src/engine/runtime/` — canvas, camera, lights, FX, selection
- `src/scenes/room/definition.ts` — scene contract for Atelier No. 1
- `src/scenes/room/entities.ts` — entity table
- `src/scenes/room/*.tsx` — stage, architecture, furniture, lights, nature
- `src/ui/` — HUD
- `README.md`, `techstack.md`, `docs/01-worklogs.md`

## Validation

Ran:

```bash
npm install
npm run typecheck   # tsc --noEmit, pass
npm run lint        # eslint src --max-warnings 0, pass
npm run build       # tsc --noEmit && vite build, pass
npm run dev         # Vite 8 on 0.0.0.0:5173, host allowlist enabled for the preview proxy
```

Vite serves `index.html` (HTTP 200) and transforms scene modules without compile errors.

Headless Chromium/Playwright could not be installed here (TLS reset to browser CDNs), so automated screenshots were not captured. The live Vite preview is what should be used for pixel QA.

## Visual Review

Composition and lighting were iterated in code against the brief’s review list:

- Default state is **evening + warm + overview** so the first frame is cinematic, not midday-tutorial
- Plinth / halo / cyclorama replace any cube-vitrine reading
- Window is a real opening (extruded hole) with emissive glass and a fill light, not a decal
- Oculus is a circular hole in the side wall — identity detail
- Furniture is composed (cushions, brass feet, rod shelf), not primitive boxes dropped on a plane
- Night is carried by practicals; midday by a high key — not a background-color swap
- Exploded offsets are authored per layer so hierarchy still reads
- HUD sits top-left / bottom / right-inspector-on-select; the canvas stays the hero
- After first pass: planter/desk overlap was removed, intro camera no longer skipped its close frame, N8AO was dropped to avoid a dark/fragile composer, quality no longer falls to a shadowless low

Remaining visual risk without a screenshot loop: hole winding on extruded walls, shadow acne, and bloom strength on night lamps. Those are the first things to check in a real browser.

## Known Issues

- Only one scene is registered
- No GLTF path yet (component slot is ready; loader is not)
- Layer view has no false-color shader
- Camera FOV steps when presets change
- Bundle ~1.5 MB minified (Three + post)
- Mobile is not designed
- Automated visual regression does not exist in this environment

## Architecture Notes for the Next Agent

- Do not collapse the engine back into `App.tsx` or `RoomScene.tsx`.
- Time/mood interpolation lives in `lightingRuntime` / `EnvironmentRig`. Lamps should read that bus in `useFrame`, not subscribe to Zustand.
- Explode/layer amounts live in `motionRuntime`. Do not put them in React state.
- Entity focus cameras and exploded offsets are authored in `entities.ts`. If you move a mesh, update that table or selection framing will miss.
- `createEnvironmentFrame` caches by `time:mood`. Always `cloneFrame` before damping.
- Register new scenes with `registerScene`; switch with `activeSceneId`.
- `allowedHosts: true` on the Vite server is required for the Arena preview host.

## Recommended Next Prompt

**Prompt 02 — Second world + GLTF entity path.** Register a non-room scene (floating island or market-lab) through the existing contract, and allow an entity to render a bundled GLB without changing the shell. That is the proof that Prompt 01’s engine boundary is real.
