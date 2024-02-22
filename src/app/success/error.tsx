"use client";

import { Button } from "@/ui";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-8 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-destructive sm:text-5xl">
        Something went wrong!
      </h2>
      <p className="text-lg">
        An error occurred while receiving checkout session
      </p>
      <div className="flex items-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
}
