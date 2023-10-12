import { useShoppingCart } from "use-shopping-cart";
import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const { handleCartHover, cartCount } = useShoppingCart();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleCartHover}
      className="w-auto px-2"
    >
      <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
      <span className="ml-2">{cartCount}</span>
    </Button>
  );
}
