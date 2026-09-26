import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { BackSide, Color, MeshStandardMaterial, ShaderMaterial } from 'three'
import { lightingRuntime } from '../lighting'

const vert = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const frag = /* glsl */ `
  precision highp float;
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uBottom;
  varying vec3 vDir;
  void main() {
    float h = normalize(vDir).y;
    vec3 col = mix(uBottom, uHorizon, smoothstep(-0.6, 0.04, h));
    col = mix(col, uTop, smoothstep(0.04, 0.78, h));
    gl_FragColor = vec4(col, 1.0);
  }
`

export function VoidBackdrop() {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: {
          uTop: { value: new Color('#151822') },
          uHorizon: { value: new Color('#2a1c16') },
          uBottom: { value: new Color('#09090b') },
        },
        side: BackSide,
        depthWrite: false,
        toneMapped: true,
      }),
    [],
  )
  const discMat = useRef<MeshStandardMaterial>(null)

  useFrame(() => {
    material.uniforms.uTop.value.copy(lightingRuntime.voidTop)
    material.uniforms.uHorizon.value.copy(lightingRuntime.voidHorizon)
    material.uniforms.uBottom.value.copy(lightingRuntime.voidBottom)
    if (discMat.current) {
      discMat.current.color.copy(lightingRuntime.voidDisc)
    }
  })

  return (
    <>
      <mesh renderOrder={-20} frustumCulled={false} material={material}>
        <sphereGeometry args={[48, 32, 24]} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.42, 0]}
        receiveShadow
        renderOrder={-10}
      >
        <circleGeometry args={[20, 72]} />
        <meshStandardMaterial ref={discMat} color="#0a0a0c" roughness={1} metalness={0} />
      </mesh>
    </>
  )
}
