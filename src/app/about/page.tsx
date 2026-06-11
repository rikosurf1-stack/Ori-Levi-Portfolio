import type { Metadata } from "next";
import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import SmoothImage from "@/components/SmoothImage";
import { getAbout } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Ori Levi",
  description:
    "Ori Levi is a commercial lifestyle photographer creating visual stories for hospitality, wellness and lifestyle brands.",
};

const DISCIPLINES = [
  "Hospitality",
  "Wellness",
  "Food & Beverage",
  "Fashion",
  "Lifestyle",
  "Events",
];

export default function AboutPage() {
  const about = getAbout();

  return (
    <div className="px-6 pb-24 pt-32 md:px-10 md:pb-36 md:pt-44">
      <div className="mx-auto max-w-page">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Portrait */}
          <div className="md:col-span-5">
            <MotionReveal>
              <SmoothImage
                src={about.portrait}
                alt="Portrait of Ori Levi"
                aspectClassName="aspect-[4/5]"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </MotionReveal>
          </div>

          {/* Copy */}
          <div className="md:col-span-7 md:pl-8">
            <MotionReveal>
              <p className="label text-muted">About</p>
              <h1 className="mt-5 max-w-2xl font-serif text-3xl font-extralight leading-[1.25] md:text-5xl md:leading-[1.2]">
                {about.headline}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <div className="mt-10 max-w-xl space-y-6 font-sans text-base leading-relaxed text-ink/75 md:mt-12">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <div className="mt-12 border-t border-line pt-8">
                <p className="label text-muted">Working across</p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {DISCIPLINES.map((d) => (
                    <li key={d} className="font-serif text-lg font-light">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="mt-12">
                <Link
                  href="/contact"
                  className="label link-underline text-ink"
                >
                  Start a Project
                </Link>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
