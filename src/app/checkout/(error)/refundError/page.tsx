import { Button } from "@/ui";
import { Metadata } from "next";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 text-center">
      <h2 className="text-2xl font-bold tracking-tight text-destructive sm:text-5xl">
        Something went wrong!
      </h2>
      <p className="text-lg">
        An error occurred while creating an order and refunding your money.
        Please contact us to solve this problem
      </p>
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Refund error",
};
