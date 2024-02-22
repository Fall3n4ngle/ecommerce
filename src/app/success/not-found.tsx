import { Button } from "@/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-8 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
        404 Not Found
      </h2>
      <p>
        Could not find requested checkout session. Your link might be broken
      </p>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
