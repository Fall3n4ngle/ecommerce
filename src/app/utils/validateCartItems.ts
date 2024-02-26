import { CartDetails, Product } from "use-shopping-cart/core";
import { ValidatedItem } from "use-shopping-cart/utilities";
import { safeParse } from "valibot";
import { productDataSchema } from "@/common/validations";

export const validateCartItems = (
  inventory: Product[],
  cartDetails: CartDetails,
): ValidatedItem[] => {
  const validatedItems: ValidatedItem[] = [];

  for (const id in cartDetails) {
    const productData = safeParse(
      productDataSchema,
      cartDetails[id].product_data,
    );

    if (!productData.success) {
      throw new Error(productData.issues.toString());
    }

    const inventoryItem = inventory.find((item) => {
      if (!("slug" in item)) {
        return false;
      }

      return item.slug === cartDetails[id].slug;
    });

    if (inventoryItem === undefined) {
      throw new Error(
        `Invalid Cart: product with id "${id}" is not in your inventory.`,
      );
    }

    const item: ValidatedItem = {
      price_data: {
        currency: inventoryItem.currency,
        unit_amount: inventoryItem.price,
        product_data: {
          name: inventoryItem.name,
          description: inventoryItem.description,
          images: [cartDetails[id].image],
          metadata: {
            id: inventoryItem.id,
            size: productData.output.size,
            color: productData.output.color,
          },
        },
      },
      quantity: cartDetails[id].quantity,
    };

    validatedItems.push(item);
  }

  return validatedItems;
};
