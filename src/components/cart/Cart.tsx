"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import { useShoppingCart } from "use-shopping-cart";
import CartItem from "./CartItem";
import { ScrollArea } from "../ui/ScrollArea";
import EmptyCartMessage from "./EmptyCartMessage";
import CartSummary from "./CartSummary";
import { useToast } from "@/lib/hooks/useToast";
import { X } from "lucide-react";
import { safeParse } from "valibot";
import { productDataSchema } from "@/lib/validations/productData";

export default function Cart() {
  const {
    shouldDisplayCart,
    cartCount,
    handleCloseCart,
    cartDetails,
    removeItem,
    incrementItem,
    decrementItem,
    setItemQuantity,
  } = useShoppingCart();

  const { toast } = useToast();

  const isEmpty = cartCount ? cartCount < 1 : true;

  const cartProducts = cartDetails
    ? Object.entries(cartDetails).map(([_, product]) => product)
    : [];

  const handleDelete = (id: string) => {
    removeItem(id);
    toast({
      description: (
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive">
            <X className="h-5 w-5 text-[#f8f8f7]" />
          </div>
          Removed from cart
        </div>
      ),
    });
  };

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
            <ScrollArea className="grow">
              <div className="flex flex-col gap-6">
                {cartProducts.map((product) => {
                  const { product_data, id, name, price, quantity, image } =
                    product;

                  const validatedData = safeParse(
                    productDataSchema,
                    product_data,
                  );

                  if (!validatedData.success) {
                    return null;
                  }

                  return (
                    <CartItem
                      key={id}
                      image={image ?? ""}
                      name={name}
                      price={price}
                      quantity={quantity}
                      onDecrement={() => decrementItem(id)}
                      onDelete={() => handleDelete(id)}
                      onIncrement={() => incrementItem(id)}
                      setItemQuantity={(q) => setItemQuantity(id, q)}
                      productData={validatedData.output}
                    />
                  );
                })}
              </div>
            </ScrollArea>
            <SheetFooter>
              <CartSummary />
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
