"use client";

import { Button } from "@/ui";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-full pt-[5%]">
      <div className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-destructive sm:text-5xl">
          Something went wrong!
        </h2>
        <p>An error occurred while loading the products page</p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
