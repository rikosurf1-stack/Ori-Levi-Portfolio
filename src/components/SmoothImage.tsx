"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/5]". */
  aspectClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
};

/**
 * A next/image wrapper that fades and settles the image as it loads,
 * over a soft placeholder tone. Keeps the gallery feeling calm.
 */
export default function SmoothImage({
  src,
  alt,
  aspectClassName = "aspect-[4/5]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  quality = 86,
  className = "",
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-line/50 ${aspectClassName} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-all duration-[1400ms] ease-editorial ${
          loaded ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
        }`}
      />
    </div>
  );
}
