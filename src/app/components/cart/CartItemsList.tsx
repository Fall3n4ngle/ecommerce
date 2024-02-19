import { useShoppingCart } from "use-shopping-cart";
import { ScrollArea } from "../../../ui";
import { useToast } from "@/common/hooks";
import { X } from "lucide-react";
import CartItem from "./CartItem";
import { safeParse } from "valibot";
import { productDataSchema } from "@/common/validations";

export default function CartItemsList() {
  const {
    cartDetails,
    removeItem,
    incrementItem,
    decrementItem,
    setItemQuantity,
  } = useShoppingCart();

  const { toast } = useToast();

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

  const cartProducts = cartDetails
    ? Object.entries(cartDetails).map(([_, product]) => product)
    : [];

  return (
    <ScrollArea className="grow">
      <div className="flex flex-col gap-6">
        {cartProducts.map((product) => {
          const { product_data, id, name, price, quantity, image } = product;
          const validatedData = safeParse(productDataSchema, product_data);

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
  );
}
