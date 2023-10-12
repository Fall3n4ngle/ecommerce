import { ShoppingCart } from "lucide-react";

export default function EmptyCartMessage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-muted-foreground">
      <ShoppingCart className="h-20 w-20" />
      <h3 className="text-2xl">Your cart is empty</h3>
      <p>Add items to your cart to checkout</p>
    </div>
  );
}
