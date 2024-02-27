import { useDebounce, useQueryParams } from "@/common/hooks";
import { Input } from "@/ui";
import { useEffect, useState } from "react";

export default function PriceRange() {
  const { queryParams, setQueryParams } = useQueryParams();

  const [priceRange, setPriceRange] = useState(() => {
    const range = queryParams.get("range");

    if (!range) {
      return {
        min: 0,
        max: 100,
      };
    }

    const [min, max] = range.split("-");

    return { min: +min, max: +max };
  });

  const debouncedPriceRange = useDebounce(priceRange);

  useEffect(() => {
    const range = `${debouncedPriceRange.min}-${debouncedPriceRange.max}`;
    setQueryParams({ range });
  }, [debouncedPriceRange, setQueryParams]);

  return (
    <div className="flex w-full items-center gap-8 md:gap-2">
      <label htmlFor="min" className="sr-only">
        Min value
      </label>
      <Input
        id="min"
        type="number"
        className="w-20"
        value={priceRange.min}
        min={0}
        max={priceRange.max - 1}
        onChange={(e) => {
          setPriceRange((prev) => ({ ...prev, min: +e.target.value }));
        }}
      />
      <span>-</span>
      <label htmlFor="max" className="sr-only">
        Max value
      </label>
      <Input
        id="max"
        type="number"
        className="w-20"
        value={priceRange.max}
        min={priceRange.min + 1}
        onChange={(e) => {
          setPriceRange((prev) => ({ ...prev, max: +e.target.value }));
        }}
      />
    </div>
  );
}
