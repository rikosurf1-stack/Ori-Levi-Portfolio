"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export type Slide = {
  src: string;
  alt: string;
  title: string;
  meta: string;
  href: string;
};

const INTERVAL = 4200;

/**
 * A Yotam-Shwartz-style home slideshow: a single moderately-sized frame, centred
 * in lots of white space, with a small caption. Gentle cross-fade only — no zoom,
 * no movement. The frame links into the project.
 */
export default function HomeCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[index];

  return (
    <div className="flex flex-col items-center">
      {/* Image frame — moderate size, centred */}
      <Link
        href={slide.href}
        className="group relative block h-[64vw] w-[51.2vw] overflow-hidden bg-line/40 sm:h-[58vw] sm:w-[46.4vw] md:h-[58vh] md:w-[46.4vh]"
        aria-label={slide.title}
      >
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              quality={88}
              sizes="(max-width: 768px) 64vw, 46vh"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </Link>

      {/* Caption */}
      <div className="relative mt-6 flex h-12 w-full items-start justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              href={slide.href}
              className="link-underline font-serif text-lg font-light"
            >
              {slide.title}
            </Link>
            <p className="mt-1 label text-muted">{slide.meta}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="mt-5 flex items-center gap-2">
          {slides.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => setIndex(k)}
              aria-label={`Slide ${k + 1}`}
              className={`h-px transition-all duration-500 ${
                k === index ? "w-7 bg-ink" : "w-4 bg-line hover:bg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
