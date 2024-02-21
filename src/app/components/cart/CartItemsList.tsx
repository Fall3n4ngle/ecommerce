import { useShoppingCart } from "use-shopping-cart";
import { ScrollArea } from "@/ui";
import CartItem from "./CartItem";
import { safeParse } from "valibot";
import { productDataSchema } from "@/common/validations";

export default function CartItemsList() {
  const { cartDetails } = useShoppingCart();

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
              id={id}
              image={image ?? ""}
              name={name}
              price={price}
              quantity={quantity}
              productData={validatedData.output}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
}
