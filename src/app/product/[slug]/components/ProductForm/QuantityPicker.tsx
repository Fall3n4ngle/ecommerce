import { Button, FormControl, FormField, FormItem, Input, Label } from "@/ui";
import { useFormContext } from "react-hook-form";
import { ProductFormFields } from "../../types/ProductFormFields";

type Props = {
  countInStock: number;
  cartQuantity: number;
};

export default function QuantityChanger({ countInStock, cartQuantity }: Props) {
  const { setValue, control, watch } = useFormContext<ProductFormFields>();
  const quantity = watch("quantity");

  const handleIncrement = () => {
    setValue("quantity", quantity + 1);
  };

  const handleDecrement = () => {
    setValue("quantity", quantity - 1);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="quantity" className="text-lg font-semibold">
        Quantity:
      </Label>
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={cartQuantity + quantity >= countInStock}
          type="button"
        >
          +
        </Button>
        <FormField
          control={control}
          name="quantity"
          rules={{
            min: 1,
            max: countInStock - cartQuantity,
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  id="quantity"
                  className="hide-controls w-12 appearance-none text-center focus-visible:ring-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={quantity === 1}
          type="button"
        >
          -
        </Button>
      </div>
    </div>
  );
}
