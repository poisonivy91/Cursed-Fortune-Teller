import { useState } from "react";
import clsx from "clsx";

export default function TarotArt({
  slug,
  className,
}: { slug: string; className?: string }) {
  const exts = ["svg", "png", "webp", "jpg", "jpeg"] as const;
  const [i, setI] = useState(0);
  const src = `/cards/${slug}.${exts[i]}`;

  return (
    <div
      className={clsx(
        "relative w-[260px] h-[420px] rounded-3xl overflow-hidden bg-[#0f0a2a]",
        className
      )}
    >
      {/* the image fills + slight zoom to hide any built-in white border */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-[1.10] select-none pointer-events-none [image-rendering:crisp-edges]"
        onError={() => setI((x) => (x + 1 < exts.length ? x + 1 : x))}
        draggable={false}
      />
      {/* subtle edge vignette to erase any stubborn corners */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,.35)_100%)]" />
    </div>
  );
}
