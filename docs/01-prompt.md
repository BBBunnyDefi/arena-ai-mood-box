# Prompt 01 — Moodbox Studio
## First Vertical Slice of a Reusable Interactive 3D Environment Engine

You are working in the connected GitHub repository:

`arena-ai-mood-box`

Use the highest available reasoning / implementation effort for this task.

This is intended to be a serious Product Candidate, not a quick prototype.

Use the available execution time to:
1. inspect the repository,
2. understand the product intent,
3. make the architecture decisions,
4. implement the complete vertical slice,
5. run it in the browser,
6. interact with it yourself,
7. visually inspect the result,
8. identify weak areas,
9. polish them,
10. validate the project,
11. update the required documentation,
12. commit and push the completed work.

Do not stop when the project merely compiles.

Do not stop after creating the first visually acceptable version.

Iterate until the experience feels coherent, intentional, polished, and genuinely interactive.

---

# 1. Product

Build:

# Moodbox Studio

Moodbox Studio is the first vertical slice of a reusable:

**Interactive 3D Environment Engine**

The first product experience will use an original architectural diorama / room environment.

However, this project must NOT be architected as a one-off room configurator.

The room is only the first scene used to prove a reusable engine capable of supporting future experiences such as:

- rooms and architectural spaces
- floating islands
- landscapes
- product laboratories
- scientific explainers
- market-mechanics simulations
- trading education environments
- financial-system worlds
- repo / collateral simulations
- abstract system visualizations

The long-term idea is:

`one reusable engine -> many interactive worlds`

Do not implement those future worlds now.

Build one excellent vertical slice and establish the correct reusable foundations.

---

# 2. Product Philosophy

We have studied high-quality interactive web experiences such as:

https://sael.net/plane-of-focus/

Do NOT copy that site.

Do not reproduce its:
- layout
- scene
- visual identity
- colors
- typography
- lens concept
- controls
- copywriting
- geometry
- composition
- branding
- interaction arrangement

The reference is important because of its SYSTEM DESIGN principles.

The principles we want to learn from are:

- the 3D world is the primary medium, not decoration
- every important visual object has semantic meaning
- controls manipulate meaningful state
- one state change can simultaneously drive geometry, animation, lighting, UI, labels, and explanation
- interaction is continuous when appropriate
- transitions feel physical and connected
- the camera participates in storytelling
- direct manipulation feels better than disconnected form controls
- assembled / exploded / alternate views reveal system structure
- explanation and interaction reinforce each other
- visual polish and technical behavior are treated as one product
- the experience still works as an explorable object even before reading instructions

Our project must follow these principles while developing its own original visual language.

---

# 3. Core Experience

The user enters a dark, premium interface dominated by a beautiful 3D world.

At the center is an original architectural diorama.

Think of it as a small designed world contained within a spatial stage rather than a normal rectangular website section.

The first environment should be a compact contemporary living studio with multiple readable zones:

- lounge zone
- work zone
- rest zone
- architectural zone
- decor / nature elements

The scene should feel deliberately designed.

It should not resemble a generic Three.js tutorial.

It should not resemble an asset pack randomly placed in a room.

The environment should have its own art direction.

---

# 4. Original Art Direction

Create an original visual identity for Moodbox Studio.

Target qualities:

- cinematic
- calm
- tactile
- sophisticated
- dimensional
- atmospheric
- premium
- contemporary
- slightly experimental
- highly legible

The 3D world should feel like a miniature environment that the user wants to inspect.

Use an intentional relationship between:

- geometry
- negative space
- lighting
- materials
- shadows
- atmosphere
- camera composition
- interface placement

The interface should feel integrated with the world.

Avoid covering the scene with dashboard panels.

UI should appear only where it improves the experience.

The 3D scene is the hero.

---

# 5. Required Technical Foundation

Use:

- React
- TypeScript
- Vite
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- Zustand
- Tailwind CSS

For animation:

Use GSAP where timeline-based choreography provides clear value.

For continuous spatial interpolation, camera damping, lights, materials, and object motion, use whichever technique gives the cleanest and smoothest result:
- GSAP
- Three.js interpolation
- React Three Fiber `useFrame`
- Drei helpers
- reusable custom motion utilities

Do not force GSAP into every animation.

The animation architecture matters more than the specific API.

No backend.

No database.

No external API is required.

Do not depend on paid assets.

Do not depend on fragile external remote assets.

The app must remain functional from the repository itself.

Prefer procedural / code-generated geometry for this first vertical slice.

The engine must nevertheless be designed so future scenes can use GLTF / GLB assets without redesigning the architecture.

---

# 6. Critical Engineering Principle

Do not build:

`UI -> random visual effect`

Build:

`State -> Engine Systems -> Scene + Motion + Camera + UI + Explanation`

State is the source of truth.

A meaningful state change should be capable of affecting multiple dimensions of the experience.

Example:

`time = evening`

may drive:

- sun position
- directional light intensity
- light temperature
- window illumination
- emissive practical lights
- shadow softness
- environmental color
- atmospheric tone
- material perception
- UI status
- explanation copy

This interconnected behavior is a core requirement.

---

# 7. Engine Architecture

Do not put the application into a giant `App.tsx`.

Do not hard-code the entire product into one room component.

Establish clear reusable boundaries.

The exact folder structure is your decision.

Do not create architecture merely to satisfy a folder checklist.

However, the implementation must clearly separate the following conceptual layers.

## Layer A — Application Shell

Responsible for:
- page composition
- main canvas
- interface shell
- global experience state
- loading / initialization

## Layer B — Scene Runtime

Responsible for:
- registering a scene
- loading / mounting a scene
- scene metadata
- scene bounds
- environment configuration
- available camera views
- scene-level capabilities

The architecture should make it realistic for a future developer to register:

`room`
or
`island`
or
`market-lab`

without rewriting the application shell.

Only `room` needs to exist in Prompt 01.

## Layer C — Scene Entities

Important scene objects should have structured identity and metadata.

Examples:

- architecture
- furniture
- lighting
- vegetation
- decoration

An entity should be able to describe concepts such as:

- id
- label
- category
- layer
- semantic role
- selectable
- material compatibility
- base transform
- exploded transform
- interaction behavior

Avoid coupling entity identity to a specific React component implementation when possible.

## Layer D — Environment System

Own environmental state such as:

- time of day
- lighting profile
- mood
- atmosphere
- environmental colors
- practical lights
- background / world tone

The scene should react coherently to environment changes.

## Layer E — Material System

Materials should be reusable definitions rather than isolated values scattered across JSX.

Material definitions may include:

- id
- display name
- category
- color
- roughness
- metalness
- emissive properties when relevant
- semantic traits

Different entities must define compatible material categories.

## Layer F — Interaction System

Handle:

- hover
- selection
- deselection
- direct manipulation where appropriate
- pointer feedback
- labels
- interaction mode

UI panels and the 3D scene must share the same state.

Selecting an object in 3D should update UI.

Changing state in UI should update the 3D world.

## Layer G — Motion System

Create reusable motion behavior for:

- object transitions
- selection response
- camera transitions
- exploded views
- lighting transitions
- interface transitions

Do not scatter unrelated magic-duration animations throughout components.

Use coherent motion timing and easing.

## Layer H — Camera Director

Camera behavior is part of the product.

Provide a reusable camera-director concept supporting at least:

- overview
- selected-object focus
- environment / lighting composition
- cinematic composition

Transitions between camera views must animate smoothly.

Users should still retain controlled exploration where appropriate.

## Layer I — UI / HUD Layer

UI communicates scene state and exposes meaningful controls.

Keep it subordinate to the 3D world.

Do not turn the product into a conventional analytics dashboard.

---

# 8. Scene Contract

Design a lightweight scene definition / manifest concept.

Do not over-engineer a plugin platform.

The goal is simply to create an obvious boundary so another scene can be added later.

A scene definition should be able to expose concepts similar to:

- id
- name
- description
- scene component
- default environment
- default camera
- camera presets
- capabilities
- entities or entity registry
- available environment states

The exact TypeScript API is your decision.

Optimize for:
- clarity
- reuse
- maintainability
- future scene substitution

Not for theoretical abstraction.

---

# 9. First Scene — The Moodbox Room

Create an original compact architectural diorama.

It should contain enough visual variety to test the engine.

Suggested elements:

- architectural platform / base
- floor
- partial walls
- architectural opening or window
- lounge seating
- coffee table
- desk
- work chair
- rest / daybed element
- shelving
- floor or table lamp
- plants
- wall art
- books / small decor
- one or two architectural details that give the scene identity

Do not make every small decoration selectable.

Important semantic objects should be interactive.

Repeated decorative geometry may be instanced if useful.

---

# 10. Diorama / Spatial Stage

The scene must feel intentionally contained in 3D space.

Create an original solution such as:

- architectural cutaway
- floating foundation
- sculpted platform
- spatial frame
- layered environment shell

Do not simply put a room inside a visible cube because the reference did.

The container is part of the Moodbox identity.

It should make future environments plausible.

For example, a future scene could contain an island instead of a room while still belonging to the same product family.

---

# 11. Core State Model

At minimum, provide shared state for:

- selected entity
- hovered entity
- current environment / mood
- current time of day
- entity material selections
- labels visibility
- current view mode
- current camera mode
- UI visibility

Use Zustand appropriately.

Avoid unnecessary global state.

Local rendering implementation details should remain local.

---

# 12. Primary Interaction Loop

The vertical slice should have one clear loop:

1. explore the environment
2. notice an object
3. hover it
4. select it
5. inspect what it is
6. change an appropriate material or property
7. change the atmosphere / time
8. observe the same environment transform coherently
9. switch structural view
10. move into a cinematic camera composition
11. hide UI and appreciate the resulting world

Everything should reinforce this loop.

---

# 13. Object Selection

Important objects must support clear interaction states.

## Default

Object belongs naturally to the scene.

## Hover

Use a refined visual cue.

Possible techniques:
- subtle outline
- slight emissive lift
- localized glow
- label reveal
- material response

Avoid loud game-style highlighting.

## Selected

Selection should feel deliberate.

The selected object should:
- remain visually identifiable
- expose its name / semantic role
- expose compatible materials or properties
- optionally trigger a subtle camera adjustment
- update the interface

Selection must not break orbit / camera behavior.

---

# 14. Materials

Create a compact but convincing material system.

Useful categories could include:

- wood
- stone
- fabric
- painted surfaces
- metal / accent

Do not create dozens of meaningless swatches.

Quality is more important than quantity.

Each material should produce a visibly meaningful difference in the scene.

Materials should use physically plausible Three.js properties where appropriate:

- color
- roughness
- metalness
- emissive
- opacity only when justified

Avoid excessive texture dependencies.

Procedural / shader-light approaches are welcome where they genuinely improve quality.

---

# 15. Time of Day System

Support at least:

- Morning
- Midday
- Evening
- Night

This must NOT be implemented as changing the background color only.

Time of day should coherently influence multiple systems.

Examples:

### Morning
- low warm key light
- soft atmospheric fill
- longer shadows
- fresh ambient tone

### Midday
- stronger neutral illumination
- shorter / clearer shadows
- highest overall brightness

### Evening
- warm directional light
- deeper cool fill
- increased cinematic contrast
- practical lights beginning to matter

### Night
- low exterior illumination
- practical interior lights
- selective emissive sources
- strong depth and atmospheric contrast

Transitions should interpolate rather than snap where technically reasonable.

---

# 16. Mood System

Provide several distinct experiential presets.

Suggested starting set:

- Calm
- Warm
- Focus
- Nightfall

You may improve the names if your art direction suggests stronger terminology.

Mood is NOT just a UI accent color.

Mood may affect:

- lighting ratios
- environmental hue
- practical lighting
- atmosphere
- subtle material perception
- interface accent
- explanatory text

Time and mood should coexist predictably.

Do not let them fight unpredictably.

---

# 17. Structural Views

Implement multiple ways to understand the environment.

## Normal View

The designed world.

## Layer View

Reveal the scene as meaningful groups.

Potential layers:

- architecture
- furniture
- lighting
- nature
- decor

The layer representation can use:
- spatial separation
- controlled tint
- emphasis / dimming
- labels

Choose the approach that produces the most polished result.

## Exploded View

Create a carefully choreographed exploded transformation.

This is important.

The scene should visibly reveal how it is constructed.

Requirements:

- major elements move to meaningful offsets
- hierarchy remains understandable
- motion is staggered or choreographed
- camera accommodates the expanded composition
- labels can assist comprehension
- returning to normal restores everything accurately

Do not make objects fly randomly outward.

This should feel like a designed technical illustration.

---

# 18. Camera Director

Create at least three intentional camera compositions.

For example:

## Overview
Shows the entire diorama beautifully.

## Material Detail
Moves closer to an appropriate selected or hero object.

## Environment View
Shows how light and atmosphere interact with architecture.

Optionally create an additional slow cinematic mode if it genuinely improves the experience.

Camera transitions must:

- interpolate
- use good easing
- maintain useful framing
- avoid clipping through geometry
- avoid disorienting users

Controlled orbit should remain available in normal exploration.

Do not give users unlimited controls that allow the scene to become visually broken.

---

# 19. Interface Design

Design the interface specifically for Moodbox Studio.

Do not copy the reference screenshots.

The UI should feel like a high-end spatial instrument.

Potential UI regions:

- minimal product identity / context
- compact environment controls
- selected-object inspector
- material choices
- view / camera controls

You have freedom to determine the exact composition.

Important:

Do not surround all four edges with large panels merely because controls exist.

Preserve the scene.

Prefer:
- progressive disclosure
- floating contextual controls
- compact HUD
- intelligent panel appearance
- spatial hierarchy

over:
- permanent dashboard chrome

---

# 20. Direct Manipulation

Whenever practical, favor direct interaction.

Examples:

- clicking an object instead of selecting it from a dropdown
- selecting a material and immediately seeing the surface transform
- clicking a time state and watching light move
- entering exploded mode and watching structural layers separate
- clicking a camera mode and physically moving into the new viewpoint

The experience should teach itself through response.

---

# 21. Semantic Animation

Animation must communicate state.

Do not add motion only because animation looks impressive.

Every major animation should answer one of these questions:

- what changed?
- what was selected?
- where did this object come from?
- what is related?
- what layer does this belong to?
- how did the environment transform?
- where should the user look next?

This is one of the most important product principles.

---

# 22. Motion Quality

Establish a coherent motion language.

Aim for:

- smooth
- deliberate
- weighted
- quiet
- premium

Avoid:

- bouncy default UI animation
- excessive spring motion
- objects constantly floating for no reason
- gratuitous rotations
- abrupt state changes
- simultaneous animations competing for attention

Different transition types can have different durations, but they should feel like one system.

---

# 23. Lighting Quality

Lighting is a first-class system.

Spend real effort here.

The room should not look like primitive geometry under a default hemisphere light.

Use a thoughtful combination of appropriate techniques such as:

- directional lighting
- ambient / hemisphere fill
- practical lights
- emissive materials
- shadows
- contact shadows if beneficial
- environment tone
- controlled fog / atmosphere if beneficial

Use post-processing only when it genuinely improves the result.

If adding bloom, vignette, tone mapping, AO, or similar effects:
- keep them subtle
- consider performance
- avoid hiding weak geometry behind effects

---

# 24. Geometry Quality

Procedural geometry does not mean primitive-looking.

Use composition and proportion carefully.

Combine primitives to produce believable objects.

Details that matter include:

- bevel / rounded edges where appropriate
- thickness
- legs / supports
- frames
- cushions
- shelves
- planters
- lampshades
- believable proportions

Prioritize silhouette and composition before microscopic detail.

---

# 25. Responsive Strategy

Primary target:

Desktop browser.

Secondary target:

Tablet-width browser.

Mobile phone optimization is not required for Prompt 01.

However:
- the app must not catastrophically break at smaller widths
- UI should collapse intelligently
- the canvas should remain usable

---

# 26. Performance Engineering

Treat performance as part of the engine.

Aim for a smooth desktop experience.

Use appropriate techniques such as:

- sensible geometry complexity
- memoization where beneficial
- instancing for repeated meshes
- shared geometries / materials
- controlled DPR
- limited shadow cost
- reasonable light count
- avoiding unnecessary React re-renders
- disposing resources correctly
- avoiding unnecessary `useFrame` work

Do not prematurely optimize everything.

But do not build an architecture that obviously scales badly.

If useful, implement a simple quality strategy for lower-performance devices.

---

# 27. Accessibility / Usability

This is primarily a visual 3D experience, but normal interface controls should still:

- have readable labels
- expose meaningful button names
- have visible focus states where appropriate
- avoid extremely low contrast
- use buttons for actionable UI
- not depend solely on color for state

Keyboard shortcuts are welcome if they add value.

If shortcuts are added, expose them somewhere unobtrusively.

---

# 28. Loading / Error Experience

Do not leave the canvas as a blank rectangle while initializing.

Provide a minimal branded loading state if needed.

If WebGL initialization fails, show a graceful message rather than a broken page.

---

# 29. What NOT to Build

Do NOT build:

- authentication
- backend
- database
- account system
- cloud saving
- marketplace
- full interior-design application
- dozens of scenes
- asset-management platform
- large settings area
- complex undo history unless trivial to add
- giant analytics dashboard
- mobile-first experience
- realistic physics simulation
- multiplayer
- AI integration

Prompt 01 exists to produce one outstanding engine vertical slice.

---

# 30. Do Not Over-Document

Do not interrupt implementation to produce planning documents.

Do not create:
- architecture proposal docs
- design proposal docs
- roadmap docs
- requirement docs
- decision-record folders
- generated project-management files

The code is the implementation.

Documentation is written after the vertical slice exists.

---

# 31. Required Existing / Generated Documentation

At the beginning, the repository intentionally contains minimal documentation.

After completing Prompt 01, there should be:

`README.md`

`techstack.md`

`docs/01-prompt.md`

`docs/01-worklogs.md`

Do not create a large documentation set.

---

# 32. README.md

Update the existing `README.md`.

It should remain useful and concise.

Include:

- project name
- product description
- current state
- major implemented capabilities
- how to install
- how to run
- how to build
- important controls
- known limitations
- next logical development direction

Document what actually exists.

Do not document imaginary future features as implemented.

---

# 33. techstack.md

Create:

`techstack.md`

This document must describe the system that was ACTUALLY implemented.

Do not merely repeat this prompt.

Include:

- actual framework versions where useful
- Three.js / React Three Fiber stack
- state-management approach
- animation approach
- styling approach
- scene runtime architecture
- entity model
- environment system
- material system
- interaction system
- camera system
- important performance decisions
- actual source structure
- how a future second scene would plug into the system
- limitations / technical debt discovered during implementation

Keep this technical and useful to the next agent.

---

# 34. Worklog Convention

Every numbered prompt in this project must have a matching numbered worklog.

Pattern:

`docs/01-prompt.md`
-> `docs/01-worklogs.md`

Future:

`docs/02-prompt.md`
-> `docs/02-worklogs.md`

`docs/03-prompt.md`
-> `docs/03-worklogs.md`

Never overwrite previous prompt/worklog history.

For this run create:

`docs/01-worklogs.md`

Include:

# Work Log — Prompt 01

## Goal

What this run was intended to accomplish.

## Result

What was actually delivered.

## Major Implementation

Meaningful systems and features created.

## Engine Foundation

Reusable systems established.

## 3D / Visual Work

Scene, lighting, geometry, materials, animation, camera, and polish.

## Interaction Work

What users can actually do.

## Important Files

Only meaningful files / directories, not an exhaustive dump.

## Validation

Commands and checks actually performed.

## Visual Review

Describe what you inspected in the running product and what you improved after inspection.

## Known Issues

Real remaining limitations.

## Architecture Notes for the Next Agent

Important context that would otherwise require reverse-engineering the code.

## Recommended Next Prompt

Suggest the most valuable next iteration, but do not implement it unless needed to complete Prompt 01.

---

# 35. Execution Strategy

Work autonomously.

Do not ask the user routine implementation questions.

Make strong product and engineering decisions yourself within this brief.

Recommended internal workflow:

## Phase 1 — Inspect

Inspect:
- repository
- existing files
- package state
- `docs/01-prompt.md`

Understand the task before changing code.

Do not create a planning document.

## Phase 2 — Foundation

Establish:
- application
- 3D runtime
- shared state
- scene boundary
- core scene
- lighting
- camera
- interaction

Get the main vertical slice working early.

## Phase 3 — Product Interaction

Implement:
- object selection
- material changes
- environment states
- time-of-day behavior
- structural views
- camera modes
- UI integration

## Phase 4 — Visual Pass

Spend meaningful time improving:
- scene composition
- geometry
- lighting
- shadows
- materials
- proportions
- camera framing
- interface balance

Do not accept the first result.

## Phase 5 — Motion Pass

Review:
- camera transitions
- environment transitions
- exploded view
- material changes
- hover / selection
- UI state changes

Make motion feel coherent.

## Phase 6 — Browser QA

Run the real app.

Interact with every important control.

Review multiple states such as:

- Morning
- Evening
- Night
- multiple moods
- multiple material selections
- Normal View
- Layer View
- Exploded View
- camera presets
- UI hidden / visible

Check browser console.

Look for:
- errors
- warnings
- bad camera angles
- clipping
- unreadable UI
- dead controls
- visual overflow
- awkward animation
- state desynchronization
- broken reset behavior

Fix meaningful issues.

## Phase 7 — Responsive QA

Inspect at least:
- desktop
- narrower desktop / tablet width

Fix obvious layout problems.

## Phase 8 — Technical Validation

Run appropriate checks such as:

`npm install`

`npm run build`

`npm run typecheck`

`npm run lint`

Add sensible scripts if necessary.

Do not claim checks passed unless you ran them.

## Phase 9 — Documentation

Only after implementation is stable:

- update `README.md`
- create `techstack.md`
- create `docs/01-worklogs.md`

## Phase 10 — Git

Review the final diff.

Commit the completed Prompt 01 work.

Use a meaningful commit message, for example:

`feat: build moodbox interactive 3d engine vertical slice`

Push the completed work to the connected repository:

`arena-ai-mood-box`

---

# 36. Browser / Visual Review Is Mandatory

A successful build is not sufficient.

This is a visual interactive product.

You must inspect the running application visually.

If your environment provides browser automation, screenshots, or equivalent inspection tools, use them.

At minimum review:

1. initial load
2. default overview
3. selected object state
4. material-change state
5. morning state
6. evening state
7. night state
8. layer view
9. exploded view
10. cinematic camera states
11. hidden-UI state
12. narrower viewport

If screenshots or browser inspection reveal weak visual composition, fix it.

Do not merely record the problem in the worklog if it can reasonably be fixed during this run.

---

# 37. Self-Critique Pass

Before considering the task complete, review the product critically.

Ask:

- Does this feel like an intentional product or a Three.js tutorial?
- Is the scene visually interesting even before interacting?
- Does lighting materially transform the environment?
- Are materials visibly different?
- Is selection obvious without being loud?
- Does the interface respect the 3D scene?
- Does exploded view actually explain structure?
- Are camera compositions attractive?
- Do transitions feel related?
- Is state synchronized?
- Could another scene realistically reuse these systems?
- Is any abstraction obviously fake or unused?
- Are there any visible controls that do nothing?
- Are there areas that look unfinished?

Fix the highest-value problems you discover.

---

# 38. Acceptance Criteria

Prompt 01 is complete only when ALL of these are true.

## Product

- A working interactive 3D Moodbox environment exists.
- The room is original.
- The environment has a deliberate art direction.
- The result does not copy the reference site.

## Scene

- A coherent architectural diorama is visible.
- Major semantic objects are selectable.
- The scene contains enough geometry to feel like a designed environment.

## Materials

- Selected compatible objects can change material.
- Material choices produce visible differences.
- Material definitions are data-driven / reusable.

## Environment

- Multiple time-of-day states exist.
- Lighting changes meaningfully between states.
- Multiple mood / atmosphere states exist.

## Views

- Normal view works.
- Layer view works.
- Exploded view works.
- At least three intentional camera compositions work.

## Interaction

- Hover works.
- Selection works.
- Material interaction works.
- Environment controls work.
- Camera controls work.
- UI visibility control works.
- Reset returns the app to a coherent initial state.

## Motion

- Major state transitions animate smoothly.
- Camera does not abruptly teleport.
- Exploded mode is choreographed.
- Environmental transitions do not feel like simple hard cuts.

## Architecture

- Shared state is coherent.
- Scene-specific code is separated from reusable engine concepts.
- The project is structurally capable of adding a different future scene.
- App logic is not concentrated in one giant file.

## UX/UI

- UI looks intentional.
- 3D remains visually dominant.
- No obvious dead controls exist.
- Important state is understandable.
- Desktop experience is strong.
- Tablet-width experience remains usable.

## Quality

- No obvious console errors.
- No missing dependencies.
- No unavailable required assets.
- TypeScript build succeeds.
- Production build succeeds.

## Documentation

- README is updated.
- `techstack.md` exists and reflects the actual implementation.
- `docs/01-worklogs.md` exists and records the actual work.

## Git

- Changes are committed.
- Completed work is pushed to `arena-ai-mood-box`.

---

# 39. Priority Order

When trade-offs are necessary, prioritize in this order:

1. Product experience
2. 3D scene quality and composition
3. Interaction quality
4. Lighting and environmental transformation
5. Motion quality
6. Camera direction
7. Reusable engine boundaries
8. UI polish
9. Responsive behavior
10. Documentation

Do not sacrifice architecture entirely for visuals.

Do not sacrifice the product experience for theoretical architecture.

The vertical slice must prove both.

---

# 40. Final Principle

The objective is NOT:

"make a webpage containing a 3D room."

The objective is:

"build the first convincing world running on a reusable interactive 3D environment engine."

The room should prove the engine.

The engine should not overwhelm the room.

The UI should support the world.

Animation should explain state.

Lighting should change perception.

Interaction should feel direct.

The camera should guide attention.

The final result should make us confident that this same foundation could later power an island, a scientific visualization, or a financial simulation without rebuilding the product from zero.

Build it, run it, inspect it, improve it, validate it, document it, commit it, and push it.