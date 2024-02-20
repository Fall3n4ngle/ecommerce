"use client";

import { Filter, Product } from "@/common/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Label, Input } from "@/ui";
import { useShoppingCart } from "use-shopping-cart";
import { useToast } from "@/common/hooks/useToast";
import { Check } from "lucide-react";
import { safeParse } from "valibot";
import { productDataSchema } from "@/common/validations/productData";

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

  const { addItem, setItemQuantity, cartDetails } = useShoppingCart();

  const [state, setState] = useState({
    color: colors[0].slug,
    size: sizes[0].slug,
    quantity: 1,
  });

  const id = `${data.id}-${state.color}-${state.size}`;

  const cartQuantity = Object.keys(cartDetails!).reduce((acc, curr) => {
    if (curr.includes(data.id)) {
      acc += cartDetails![curr].quantity;
    }

    return acc;
  }, 0);

  const handleDecrement = () => {
    setState((prev) => ({ ...prev, quantity: state.quantity - 1 }));
  };

  const handleIncrement = () => {
    setState((prev) => ({ ...prev, quantity: state.quantity + 1 }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, quantity: +e.target.value }));
  };

  const handleSizeChange = ({ slug }: Filter) => {
    setState((prev) => ({ ...prev, size: slug }));
  };

  const handleColorChange = ({ slug }: Filter) => {
    setState((prev) => ({ ...prev, color: slug }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!cartDetails) return;

    const newItem = {
      ...data,
      id,
      product_data: {
        size: state.size,
        color: state.color,
        countInStock,
        slug: data.slug,
      },
    };

    const cartItem = cartDetails[id];
    const itemQuantity = cartDetails[id]?.quantity ?? 0;

    if (!cartItem) {
      addItem(newItem, {
        count: state.quantity,
        product_metadata: {
          size: state.size,
          color: state.color,
        },
      });
    } else {
      const validatedData = safeParse(productDataSchema, cartItem.product_data);

      if (!validatedData.success) return;

      const { color, size } = validatedData.output;

      if (color !== state.color || size !== state.size) {
        addItem(newItem, {
          count: state.quantity,
          product_metadata: {
            size: state.size,
            color: state.color,
          },
        });
      } else {
        setItemQuantity(id, itemQuantity + state.quantity);
      }
    }

    toast({
      description: (
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <Check className="h-5 w-5 text-[#f8f8f7]" />
          </div>
          Added to cart
        </div>
      ),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {sizes.length > 0 ? (
        <>
          <p className="mb-2 text-lg font-semibold">Size:</p>
          <div className="mb-4 flex items-center gap-3">
            {sizes.map((size) => (
              <Button
                key={size.id}
                onClick={() => handleSizeChange(size)}
                variant={size.slug === state.size ? "default" : "secondary"}
                type="button"
              >
                {size.name}
              </Button>
            ))}
          </div>
        </>
      ) : null}
      {colors.length > 0 ? (
        <>
          <p className="mb-2 text-lg font-semibold">Color:</p>
          <div className="mb-4 flex items-center gap-3">
            {colors.map((color) => (
              <Button
                key={color.id}
                onClick={() => handleColorChange(color)}
                variant={color.slug === state.color ? "default" : "secondary"}
                type="button"
              >
                {color.name}
              </Button>
            ))}
          </div>
        </>
      ) : null}
      <Label htmlFor="quantity" className="text-lg font-semibold">
        Quantity:
      </Label>
      <div className="mt-2 flex items-center gap-5">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            disabled={cartQuantity + state.quantity >= countInStock}
            type="button"
          >
            +
          </Button>
          <Input
            type="number"
            id="quantity"
            className="hide-controls w-12 appearance-none text-center focus-visible:ring-0"
            min={1}
            max={countInStock - cartQuantity}
            value={state.quantity}
            onChange={handleChange}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={state.quantity === 1}
            type="button"
          >
            -
          </Button>
        </div>
        <Button disabled={cartQuantity + state.quantity > countInStock}>
          Add to card
        </Button>
      </div>
    </form>
  );
}
