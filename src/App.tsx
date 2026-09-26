import { useEffect, useState } from 'react'
import { CanvasRoot } from '@/engine/runtime/CanvasRoot'
import { useHotkeys } from '@/engine/keyboard'
import { detectQuality } from '@/engine/quality'
import { useExperience } from '@/engine/state'
import { hasWebGL } from '@/engine/webgl'
import { registerRoomScene } from '@/scenes/room/definition'
import { HUD } from '@/ui/HUD'
import { LoadingScreen } from '@/ui/LoadingScreen'
import { WebGLFallback } from '@/ui/WebGLFallback'

registerRoomScene()

export function App() {
  const [webgl] = useState(() => hasWebGL())
  useHotkeys()

  useEffect(() => {
    useExperience.getState().setQuality(detectQuality())
  }, [])

  if (!webgl) return <WebGLFallback />

  return (
    <div className="relative h-full w-full bg-void">
      <CanvasRoot />
      <HUD />
      <LoadingScreen />
    </div>
  )
}
