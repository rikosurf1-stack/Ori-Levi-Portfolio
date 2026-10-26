import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MotionReveal from "@/components/MotionReveal";
import { getAllVideos } from "@/lib/videos";
import { isLocale, pick, t, type Locale } from "@/lib/i18n";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : "en";
  return {
    title: locale === "he" ? "סרטונים — Ori Levi" : "Videos — Ori Levi",
  };
}

export default function VideosPage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const videos = getAllVideos();
  const tr = t(locale);

  return (
    <div className="px-6 pb-24 pt-32 md:px-10 md:pb-40 md:pt-44">
      <div className="mx-auto max-w-page">
        <MotionReveal>
          <header className="mb-16 md:mb-28">
            <h1 className="mt-6 font-serif text-5xl font-extralight leading-[1.05] md:text-8xl">
              {locale === "he" ? "סרטונים" : "Videos"}
            </h1>
          </header>
        </MotionReveal>

        {videos.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-16">
            {videos.map((video, i) => (
              <MotionReveal
                key={video.slug}
                delay={i * 0.05}
                className={video.orientation === "horizontal" ? "col-span-2" : ""}
              >
                <div className="group">
                  <div
                    className={`relative w-full overflow-hidden bg-line/20 ${
                      video.orientation === "horizontal" ? "aspect-video" : "aspect-[9/16]"
                    }`}
                  >
                    <iframe
                      src={`https://player.vimeo.com/video/${video.vimeoId}?badge=0&title=0&byline=0&portrait=0&dnt=1`}
                      className="absolute inset-0 h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      title={pick(locale, video.title, video.titleHe)}
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="font-serif text-xl font-light leading-snug text-ink">
                      {pick(locale, video.title, video.titleHe)}
                    </h2>
                    {(video.description || video.descriptionHe) && (
                      <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">
                        {pick(locale, video.description ?? "", video.descriptionHe)}
                      </p>
                    )}
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        ) : (
          <p className="font-serif text-2xl font-light text-muted">
            {tr.category.empty}
          </p>
        )}
      </div>
    </div>
  );
}
