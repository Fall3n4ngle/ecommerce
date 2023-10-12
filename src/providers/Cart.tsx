import { PropsWithChildren } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? "";

export function CartProvider({ children }: PropsWithChildren) {
  return (
    <USCProvider
      cartMode="checkout-session"
      stripe={stripeKey}
      currency={"USD"}
      shouldPersist
    >
      {children}
    </USCProvider>
  );
}
