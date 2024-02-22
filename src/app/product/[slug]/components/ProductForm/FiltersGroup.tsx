import { Filter } from "@/common/types";
import { ProductFormFields } from "../../types/ProductFormFields";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
  buttonVariants,
} from "@/ui";
import { cn } from "@/common/utils";

type Props = {
  label: string;
  filters: Filter[];
  name: keyof ProductFormFields;
};

export default function FiltersGroup({ filters, label, name }: Props) {
  const { control, getValues } = useFormContext<ProductFormFields>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel className="text-lg font-semibold">{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value as string}
              className="flex items-center space-x-0 gap-3"
            >
              {filters.map((filter) => {
                const currentValue = getValues(name);
                const isActive = filter.slug === currentValue;

                return (
                  <FormItem key={filter.id}>
                    <FormControl>
                      <RadioGroupItem value={filter.slug} className="sr-only" />
                    </FormControl>
                    <FormLabel
                      className={cn(
                        buttonVariants({
                          variant: isActive ? "default" : "secondary",
                        }),
                        "cursor-pointer",
                      )}
                    >
                      {filter.name}
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
