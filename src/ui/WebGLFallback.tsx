export function WebGLFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-void px-8 text-center">
      <div className="font-display text-4xl italic text-mist">Moodbox</div>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
        This experience needs WebGL, which this browser or device cannot provide. Try a current
        desktop browser with hardware acceleration enabled.
      </p>
    </div>
  )
}
