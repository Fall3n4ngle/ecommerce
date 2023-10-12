import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full pt-[5%]">
      <div className="flex flex-col items-center gap-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          404 Not Found
        </h2>
        <p>Could not find requested product. Your link might be broken</p>
        <Link href="/">
          <Link href="/">
            <Button>Go home</Button>
          </Link>
        </Link>
      </div>
    </div>
  );
}
