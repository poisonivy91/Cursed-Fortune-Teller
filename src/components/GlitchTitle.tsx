import React from 'react'
interface GlitchTitleProps {
  text: string;
  className?: string;
}

export default function GlitchTitle(props: GlitchTitleProps) {
  return (
    <h1 className={`relative text-5xl md:text-7xl font-extrabold tracking-tight font-display glow ${props.className ?? ''}`}>
      <span className="relative z-10">{props.text}</span>
      <span aria-hidden className="absolute inset-0 text-fuchsia-500 blur-sm animate-glitch">{props.text}</span>
      <span aria-hidden className="absolute inset-0 translate-x-1 text-blue-400 blur-sm opacity-70 animate-glitch">{props.text}</span>
    </h1>
  )
}
