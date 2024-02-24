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
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-8">
      <h2 className="text-2xl font-bold tracking-tight text-destructive sm:text-5xl">
        Something went wrong!
      </h2>
      <p className="text-lg">
        An error occurred while loading the product page
      </p>
      <div className="flex items-center gap-4">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
}
