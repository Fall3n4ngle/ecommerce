import Image from "next/image";
import { Trash } from "lucide-react";
import { Button, Input } from "@/ui";
import { ChangeEvent } from "react";
import { ProductData } from "@/common/validations";
import { useShoppingCart } from "use-shopping-cart";
import { useToast } from "@/common/hooks";
import { ToastMessage } from "@/components";

type Props = {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  productData: ProductData;
};

export default function CartItem({
  id,
  image,
  name,
  price,
  quantity,
  productData: { color, countInStock, size },
}: Props) {
  const { toast } = useToast();
  const { removeItem, incrementItem, decrementItem, setItemQuantity } =
    useShoppingCart();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setItemQuantity(id, +value);
  };

  const handleDelete = () => {
    removeItem(id);

    toast({
      description: (
        <ToastMessage variant="success" messages="Removed from cart" />
      ),
    });
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
            onClick={() => incrementItem(id)}
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
            onChange={handleChange}
          />
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => decrementItem(id)}
            disabled={quantity <= 1}
          >
            -
          </Button>
        </div>
        <Button
          variant="secondary"
          className="hover:bg-destructive"
          size="sm"
          type="button"
          onClick={handleDelete}
        >
          <Trash className="h-[1rem] w-[1rem]" />
        </Button>
      </div>
    </div>
  );
}
