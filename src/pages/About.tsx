import React from 'react'
import { Link } from 'react-router-dom'
export default function About() {
  return (
    <main className="max-w-3xl mx-auto p-6 md:p-10 text-center space-y-6">
      <h2 className="text-4xl font-bold glow">The Veil Thins...</h2>
      <p className="leading-relaxed text-purple-200/90">
        Beneath the flicker of candlelight and the hush of midnight, the Cursed Fortune Teller awaits. Each card drawn is a key—unlocking secrets, shadows, and whispers from the other side.<br /><br />
        What you seek may find you. What you fear may follow. The deck is haunted, the whispers are real, and fate is never quite what it seems.<br /><br />
        Dare to ask, and the ether will answer. But beware: not all fortunes are meant to be known.
        <br /><br />
        <span className="text-purple-300/80">Built with React, Vite, Tailwind, and Appwrite. But the magic is older than code.</span>
      </p>
      <Link to="/" className="inline-block px-6 py-3 rounded-full border border-purple-300/40 hover:bg-purple-300/10 transition">Return to the Crystal</Link>
      <img src="/room.png" alt="" className="w-full h-full object-cover" />
    </main>
  )
}
