/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // High-quality responsive delivery. We avoid aggressive compression:
    // quality is set per-image in components (default 82–90).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Example/demo imagery (replace with your own uploads via /admin).
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      // Allows pasting Unsplash links directly if you ever want to.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
