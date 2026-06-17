import type { GalleryImage } from "@/lib/types";
import MotionReveal from "./MotionReveal";
import SmoothImage from "./SmoothImage";

type Row =
  | { type: "full"; items: GalleryImage[] }
  | { type: "pair"; items: GalleryImage[] };

/**
 * Turns a flat list of images into an editorial rhythm of full-width frames and
 * two-up pairs — so the photographer only has to upload images, never lay them out.
 */
function buildRows(images: GalleryImage[]): Row[] {
  const rows: Row[] = [];
  // Repeating cadence: a wide moment, then two-up, two-up, then breathe...
  const cadence = ["full", "pair", "pair", "full", "pair"] as const;
  let i = 0;
  let c = 0;

  while (i < images.length) {
    const step = cadence[c % cadence.length];
    if (step === "pair" && i + 1 < images.length) {
      rows.push({ type: "pair", items: [images[i], images[i + 1]] });
      i += 2;
    } else {
      rows.push({ type: "full", items: [images[i]] });
      i += 1;
    }
    c += 1;
  }
  return rows;
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) return null;
  const rows = buildRows(images);

  return (
    <div className="space-y-6 md:space-y-10">
      {rows.map((row, idx) => {
        if (row.type === "full") {
          const img = row.items[0];
          return (
            <MotionReveal key={idx}>
              <SmoothImage
                src={img.src}
                alt={img.alt ?? ""}
                natural
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="mx-auto max-w-4xl"
              />
            </MotionReveal>
          );
        }

        return (
          <div
            key={idx}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10"
          >
            {row.items.map((img, j) => (
              <MotionReveal key={j} delay={j * 0.08}>
                <SmoothImage
                  src={img.src}
                  alt={img.alt ?? ""}
                  natural
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </MotionReveal>
            ))}
          </div>
        );
      })}
    </div>
  );
}
