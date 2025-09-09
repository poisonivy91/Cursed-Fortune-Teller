// src/components/CrystalBall.tsx
import React, { useRef } from 'react'

export default function CrystalBall({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    const rx = (-y / r.height) * 10
    const ry = (x / r.width) * 10
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
  }
  function resetTilt() {
    const el = ref.current
    if (el) el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      onClick={onClick}
      className="group relative w-72 h-72 md:w-80 md:h-80 rounded-full transition-transform duration-200"
      aria-label="Summon a fortune"
    >
      {/* base orb */}
      <div className="absolute inset-0 rounded-full bg-[#0b0714] ring-1 ring-purple-300/40 shadow-[0_0_90px_rgba(168,85,247,.35)]" />

      {/* starfield / texture (use your ball image if present) */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* image layer (optional but looks great) */}
        <img
          src="/ball.png" // drop your crystal texture into /public as ball.png
          alt=""
          className="w-full h-full object-cover opacity-85 mix-blend-screen"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
        />
        {/* animated inner nebula as fallback/enhancer */}
        <div className="absolute inset-0 rounded-full opacity-80 mix-blend-screen
                        bg-[radial-gradient(circle_at_40%_35%,rgba(180,130,255,.25),transparent_50%),radial-gradient(circle_at_60%_65%,rgba(120,200,255,.2),transparent_50%)] animate-[drift_18s_linear_infinite]" />
      </div>

      {/* specular highlights */}
      <div className="pointer-events-none absolute inset-0 rounded-full">
        <div className="absolute -top-2 left-6 w-28 h-28 rounded-full bg-white/20 blur-2xl opacity-70" />
        <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-white/60 blur-md opacity-70" />
      </div>

      {/* rim light */}
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-purple-200/40" />

      {/* glow ring */}
      <div className="pointer-events-none absolute -inset-4 rounded-full blur-2xl bg-purple-500/20" />

      {/* pedestal shadow */}
      <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-14 rounded-[28px] bg-black/60 blur-lg" />

      {/* sweep highlight on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-white/10 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[sweep_1.4s_ease-in-out]" />
      </div>
    </button>
  )
}
