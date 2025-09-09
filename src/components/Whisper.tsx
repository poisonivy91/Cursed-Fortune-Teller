import React, { useEffect, useRef } from 'react'
export default function Whisper({ src, triggerKey }: { src: string, triggerKey: number }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => { audioRef.current?.play().catch(()=>{}) }, [triggerKey])
  return <audio ref={audioRef} src={src} preload="auto" />
}
