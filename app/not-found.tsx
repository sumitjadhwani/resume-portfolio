import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center pt-24">
      <Container className="text-center">
        <p className="text-accent-strong font-mono text-sm">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="text-muted mx-auto mt-4 max-w-md text-base">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="bg-accent hover:bg-accent-strong mt-8 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </Container>
    </div>
  );
}
