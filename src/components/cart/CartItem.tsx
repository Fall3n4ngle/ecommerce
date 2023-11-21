import Image from "next/image";
import { Trash } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { ChangeEvent } from "react";
import { ProductData } from "@/lib/validations";

type Props = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
  setItemQuantity: (quantity: number) => void;
  productData: ProductData;
};

export default function CartItem({
  image,
  name,
  price,
  quantity,
  onDecrement,
  onDelete,
  onIncrement,
  setItemQuantity,
  productData: { color, countInStock, size },
}: Props) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setItemQuantity(+value);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative h-16 w-16">
        <Image
          src={image}
          alt={name}
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="grow">
        <h2 className="mb-1 text-sm font-medium">
          {name}{" "}
          <span className="text-xs">
            ({size}, {color})
          </span>
        </h2>
        <p className="text-xs text-muted-foreground">
          {`$${price / 100} x ${quantity} = $${(
            (price / 100) *
            quantity
          ).toFixed(2)}`}
        </p>
      </div>
      <div className="cart-item__controls">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={onIncrement}
            disabled={quantity >= countInStock}
          >
            +
          </Button>
          <Input
            type="number"
            id="quantity"
            className="hide-controls h-9 w-12 appearance-none text-center focus-visible:ring-0"
            min={1}
            max={countInStock}
            value={quantity}
            onChange={onChange}
          />
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={onDecrement}
            disabled={quantity <= 1}
          >
            -
          </Button>
        </div>
        <Button variant="secondary" size="sm" type="button" onClick={onDelete}>
          <Trash className="h-[1rem] w-[1rem]" />
        </Button>
      </div>
    </div>
  );
}
