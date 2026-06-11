import Hero from "@/components/Hero";
import { getHome } from "@/lib/site";

export default function HomePage() {
  const home = getHome();
  return (
    <Hero name={home.name} tagline={home.tagline} images={home.heroImages} />
  );
}
