"use client";

import { Button } from "@/ui";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <h2 className="text-3xl font-bold tracking-tight text-destructive sm:text-5xl">
        Something went wrong!
      </h2>
      <p>An error occurred while loading products</p>
      <div className="flex items-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
}
