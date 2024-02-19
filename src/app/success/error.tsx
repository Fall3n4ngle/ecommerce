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
    <div className="h-full pt-[5%]">
      <div className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-destructive sm:text-5xl">
          Something went wrong!
        </h2>
        <p>An error occurred while receiving checkout session</p>
        <div className="flex items-center gap-3">
          <Button onClick={() => reset()}>Try again</Button>
          <Link href="/">
            <Button>Go home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
