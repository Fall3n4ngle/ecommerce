import { Button } from "@/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
      <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-5xl">
          404 Not Found
        </h2>
        <h4 className="text-lg">
          Could not find the requested page. Your link might be broken
        </h4>
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
}
