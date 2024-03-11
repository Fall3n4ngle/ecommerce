"use client";

import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import Link from "next/link";
import { Button } from "@/ui/Button";

type Props = {
  name: string;
  email: string;
};

export default function CheckoutSession({ name, email }: Props) {
  const { clearCart, cartCount } = useShoppingCart();

  useEffect(() => {
    if (cartCount === 0) return;
    clearCart();
  }, [cartCount]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <h2 className="text-3xl font-bold tracking-tight text-green-500 sm:text-5xl">
        Order successful
      </h2>
      <h4 className="text-xl">
        Check your purchase email{" "}
        <strong className="mx-1">{email}</strong> for your
        invoice.
      </h4>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
