// src/components/TarotCard.tsx
import React from 'react';
import clsx from 'clsx';
import TarotArt from './TarotArt';

export default function TarotCard({
  title,
  subtitle,
  image,
  reversed = false,
}: { title: string; subtitle?: string; image?: string; reversed?: boolean }) {
  // Slugify the title for TarotArt
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  const slug = slugify(title);
  return (
    <div
      className={clsx(
        "group relative w-[260px] h-[420px] rounded-2xl border-none",
        "bg-[#14072b] shadow-[0_0_40px_rgba(168,85,247,.25)]",
        "overflow-hidden transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-1deg]"
      )}
      style={{ transform: reversed ? 'rotate(180deg)' as any : undefined }}
      aria-label={`${title}${reversed ? ' (reversed)' : ''}`}
    >
      {/* glow emblem */}
      <div className="absolute inset-0 grid place-items-center">
        {/* Removed circle background */}
        <div className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(ellipse_at_center,rgba(183,138,255,.25),transparent_60%)]" />
      </div>

  {/* smart fill card art */}
  <TarotArt slug={slug} className={clsx("absolute inset-0", reversed && "rotate-180", "shadow-[0_0_80px_rgba(168,85,247,.25)]")} />

      {/* title/subtitle (upright orientation) */}
      <div className={clsx("absolute bottom-0 left-0 right-0 p-4 text-center", reversed && "rotate-180")}>
        <div className="font-semibold tracking-wide text-purple-50">{title}</div>
        {subtitle && <div className="text-sm text-purple-200/80">{subtitle}</div>}
      </div>

      {/* decorative corners */}
      <div className="absolute top-3 left-3 w-2 h-2 bg-purple-200 rounded-full" />
      <div className="absolute top-3 right-3 w-2 h-2 bg-purple-200 rounded-full" />
      <div className="absolute bottom-3 left-3 w-2 h-2 bg-purple-200 rounded-full" />
      <div className="absolute bottom-3 right-3 w-2 h-2 bg-purple-200 rounded-full" />
    </div>
  )
}
