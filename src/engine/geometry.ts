import { ExtrudeGeometry, Path, Shape } from 'three'

export type WallHole =
  | { kind: 'rect'; x: number; y: number; w: number; h: number }
  | { kind: 'circle'; x: number; y: number; r: number }

export function createWallGeometry(
  width: number,
  height: number,
  thickness: number,
  holes: WallHole[],
) {
  const shape = new Shape()
  const hw = width / 2
  shape.moveTo(-hw, 0)
  shape.lineTo(hw, 0)
  shape.lineTo(hw, height)
  shape.lineTo(-hw, height)
  shape.closePath()

  for (const hole of holes) {
    const path = new Path()
    if (hole.kind === 'rect') {
      const x0 = hole.x - hole.w / 2
      const y0 = hole.y - hole.h / 2
      path.moveTo(x0, y0)
      path.lineTo(x0, y0 + hole.h)
      path.lineTo(x0 + hole.w, y0 + hole.h)
      path.lineTo(x0 + hole.w, y0)
      path.closePath()
    } else {
      path.absarc(hole.x, hole.y, hole.r, 0, Math.PI * 2, true)
    }
    shape.holes.push(path)
  }

  const geometry = new ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 1,
    curveSegments: 28,
  })
  geometry.translate(0, 0, -thickness / 2)
  geometry.computeVertexNormals()
  return geometry
}
