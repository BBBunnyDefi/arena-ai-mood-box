# Moodbox Studio

A contained living world on a reusable interactive 3D environment engine.

The first vertical slice is **Atelier No. 1** — a compact contemporary living studio presented as an architectural cutaway on a floating stone plinth. The room is the proof, not the product boundary: scene registration, environment, materials, interaction, motion, and camera direction are engine-level.

## Current state

Prompt 01 vertical slice is implemented and runnable.

- Original atelier diorama (procedural geometry, no remote assets)
- Time of day, mood, materials, selection, structural views, and camera direction share one state model
- Dark, premium HUD that stays subordinate to the 3D world
- Desktop-first; tablet-width remains usable

## Capabilities

- Explore the cutaway with constrained orbit / dolly
- Hover and select semantic objects (architecture, furniture, lighting, nature, decor)
- Change compatible materials from a data-driven catalog
- Interpolated **Morning / Midday / Evening / Night** lighting
- **Calm / Warm / Focus / Nightfall** mood profiles that retune the same time of day
- **Assembled / Layers / Exploded** structural views with choreographed motion
- Camera compositions: **Overview / Detail / Light / Cinema**
- Hide UI, toggle labels, reset to the initial evening–warm overview
- Keyboard shortcuts (open **Keys** in the HUD, or press `?`)

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Opens at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

Other checks:

```bash
npm run typecheck
npm run lint
```

## Controls

| Input | Action |
| --- | --- |
| Drag | Orbit |
| Scroll | Dolly |
| Click object | Select |
| Click empty space | Deselect |
| `1–4` | Time of day |
| `Q W F G` | Mood |
| `N` / `Y` / `X` | Assembled / layers / exploded |
| `C` | Cycle camera |
| `L` | Labels |
| `H` | Hide UI |
| `R` | Reset |
| `Esc` | Deselect |
| `?` | Shortcut list |

## Known limitations

- One registered scene (`room`). The runtime is built so a second scene can register without rewriting the shell.
- Geometry is procedural / composed primitives — not scanned furniture, not GLTF.
- Mobile phones are not a design target; the UI collapses but is not thumb-optimized.
- No persistence, undo stack, accounts, or backend.
- Quality automatically steps down on constrained devices (shadows / post still prefer medium over a flat look).

## Next direction

The highest-value follow-up is a **second scene** (island, lab, or abstract system) registered through the same contract, plus an optional GLTF entity path. That is the real test that Moodbox is an engine rather than a room.
