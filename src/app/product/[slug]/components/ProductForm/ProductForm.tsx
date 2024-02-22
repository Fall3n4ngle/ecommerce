"use client";

import { Product } from "@/common/types";
import { useForm } from "react-hook-form";
import { ProductFormFields } from "../../types/ProductFormFields";
import { Button, Form } from "@/ui";
import FiltersGroup from "./FiltersGroup";
import QuantityChanger from "./QuantityPicker";
import { useShoppingCart } from "use-shopping-cart";
import { safeParse } from "valibot";
import { cartItemSchema } from "@/common/validations/cartItem";
import { useToast } from "@/common/hooks";
import { ToastMessage } from "@/components";

type Props = Omit<Product, "images"> & {
  image: string;
};

export default function ProductForm({
  colors,
  sizes,
  countInStock,
  ...data
}: Props) {
  const { toast } = useToast();
  const { cartDetails, addItem, setItemQuantity } = useShoppingCart();

  const form = useForm<ProductFormFields>({
    defaultValues: {
      size: sizes[0].slug,
      color: colors[0].slug,
      quantity: 1,
    },
  });

  if (!cartDetails) return null;

  const cartQuantity = Object.keys(cartDetails!).reduce((acc, curr) => {
    if (curr.includes(data.id)) {
      acc += cartDetails![curr].quantity;
    }

    return acc;
  }, 0);

  const toastSuccess = () =>
    toast({
      description: <ToastMessage variant="success" messages="Added to cart" />,
    });

  const onSubmit = ({ color, quantity, size }: ProductFormFields) => {
    const id = `${data.id}-${color}-${size}`;
    const cartItem = cartDetails[id];

    const newItem = {
      ...data,
      id,
      product_data: {
        size,
        color,
        countInStock,
        slug: data.slug,
      },
    };

    const itemToAdd = {
      count: quantity,
      product_metadata: {
        size,
        color,
      },
    };

    if (!cartItem) {
      addItem(newItem, itemToAdd);
      toastSuccess();
      return;
    }

    const validatedData = safeParse(cartItemSchema, cartItem.product_data);

    if (!validatedData.success) {
      toast({
        description: (
          <ToastMessage variant="success" messages="Added to cart" />
        ),
      });

      return;
    }

    if (
      validatedData.output.color !== color ||
      validatedData.output.size !== size
    ) {
      addItem(newItem, itemToAdd);
    } else {
      setItemQuantity(id, cartItem.quantity + quantity);
    }

    toastSuccess();
  };

  const quantity = form.watch("quantity");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {sizes.length > 0 && (
          <div className="mb-5">
            <FiltersGroup name="size" filters={sizes} label="Size:" />
          </div>
        )}
        {colors.length > 0 && (
          <div className="mb-5">
            <FiltersGroup name="color" filters={colors} label="Color:" />
          </div>
        )}
        <div className="flex items-end gap-5">
          <QuantityChanger
            countInStock={countInStock}
            cartQuantity={cartQuantity}
          />
          <Button disabled={cartQuantity + quantity > countInStock}>
            {countInStock === 0 ? "Out of stock" : "Add to cart"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
