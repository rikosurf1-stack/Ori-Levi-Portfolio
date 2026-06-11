import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="label text-muted">404</p>
      <h1 className="mt-5 font-serif text-4xl font-extralight md:text-5xl">
        This page wandered off.
      </h1>
      <Link href="/" className="label link-underline mt-8 text-ink">
        Back Home
      </Link>
    </div>
  );
}
