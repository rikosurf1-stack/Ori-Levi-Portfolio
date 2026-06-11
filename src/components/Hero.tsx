"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  tagline: string;
  images: string[];
};

const INTERVAL = 5200;

export default function Hero({ name, tagline, images }: Props) {
  const [index, setIndex] = useState(0);
  const slides = images.length > 0 ? images : [];

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* Rotating imagery with a slow Ken Burns drift and cross-fade. */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: INTERVAL / 1000 + 2, ease: "linear" },
          }}
        >
          {slides[index] && (
            <Image
              src={slides[index]}
              alt=""
              fill
              priority={index === 0}
              quality={88}
              sizes="100vw"
              className="object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Tonal overlay so the type always reads. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/50" />

      {/* Centered wordmark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-paper">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-extralight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-sans text-[11px] uppercase tracking-label text-paper/90 sm:text-xs"
        >
          {tagline}
        </motion.p>
      </div>

      {/* Discreet entry point to the work */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.1 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <Link
          href="/work"
          className="label link-underline text-paper/85 hover:text-paper"
        >
          View Work
        </Link>
      </motion.div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 right-8 hidden items-center gap-2 md:flex">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`h-px transition-all duration-500 ${
                i === index ? "w-8 bg-paper" : "w-4 bg-paper/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
