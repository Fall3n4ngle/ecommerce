"use client";

import { Button } from "@/ui";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold tracking-tight text-destructive sm:text-5xl">
        Something went wrong!
      </h2>
      <p>An error occurred while loading the products page</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
