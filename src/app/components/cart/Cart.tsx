"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/ui";
import { useShoppingCart } from "use-shopping-cart";
import EmptyCartMessage from "./EmptyCartMessage";
import CartSummary from "./CartSummary";
import CartItemsList from "./CartItemsList";

export default function Cart() {
  const { shouldDisplayCart, cartCount, handleCloseCart } = useShoppingCart();

  const isEmpty = cartCount ? cartCount < 1 : true;

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={handleCloseCart}>
      <SheetContent className="min-w-full sm:min-w-[512px]">
        <SheetHeader>
          <SheetTitle>Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        {isEmpty ? (
          <EmptyCartMessage />
        ) : (
          <>
            <CartItemsList />
            <SheetFooter>
              <CartSummary />
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
