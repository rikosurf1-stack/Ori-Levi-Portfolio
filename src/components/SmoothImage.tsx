"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  /** When true, the image renders at its natural aspect ratio — no crop. */
  natural?: boolean;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/5]". Used only when natural=false. */
  aspectClassName?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
};

export default function SmoothImage({
  src,
  alt,
  natural = false,
  aspectClassName = "aspect-[4/5]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  quality = 86,
  className = "",
}: Props) {
  const [loaded, setLoaded] = useState(false);

  if (natural) {
    return (
      <div className={`overflow-hidden bg-line/30 ${className}`}>
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes={sizes}
          priority={priority}
          quality={quality}
          onLoad={() => setLoaded(true)}
          style={{ width: "100%", height: "auto", display: "block" }}
          className={`transition-opacity duration-[1400ms] ease-editorial ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    );
  }

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
