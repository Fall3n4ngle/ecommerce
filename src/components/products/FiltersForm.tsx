"use client";

import { Category, Color, Size } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Input,
  Label
} from "@/components/ui";
import { useQueryParams, useDebounce } from "@/lib/hooks";
import { useEffect, useState } from "react";

type Props = {
  filters: {
    value: "category" | "size" | "color";
    title: string;
    data: Size[] | Color[] | Category[];
  }[];
};

export default function FiltersForm({ filters }: Props) {
  const { queryParams, setQueryParams } = useQueryParams<{
    category?: string;
    size?: string;
    color?: string;
    range?: string;
  }>();

  const [state, setState] = useState<Record<string, string[]>>(() => {
    return {
      category: queryParams.get("category")?.split(".") ?? [],
      size: queryParams.get("size")?.split(".") ?? [],
      color: queryParams.get("color")?.split(".") ?? [],
    };
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 100,
  });

  const debouncedPriceRange = useDebounce(priceRange);

  const checked = (section: string, slug: string) => {
    return state[section].includes(slug);
  };

  useEffect(() => {
    const category = state.category.length
      ? state.category.join(".")
      : undefined;
    const size = state.size.length ? state.size.join(".") : undefined;
    const color = state.color.length ? state.color.join(".") : undefined;

    setQueryParams({ category, size, color });
  }, [state, setQueryParams]);

  useEffect(() => {
    const range = `${debouncedPriceRange.min}-${debouncedPriceRange.max}`;
    setQueryParams({ range });
  }, [debouncedPriceRange, setQueryParams]);

  return (
    <div>
      <Accordion type="multiple">
        {filters.map((section, index) => (
          <AccordionItem key={index} value={section.title}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2.5">
                {section.data.map((option) => (
                  <div key={option.slug} className="flex items-center gap-3">
                    <Checkbox
                      id={option.slug}
                      checked={checked(section.value, option.slug)}
                      onCheckedChange={(value) => {
                        if (value) {
                          setState((prev) => ({
                            ...prev,
                            [section.value]: [
                              ...state[section.value],
                              option.slug,
                            ],
                          }));
                        } else {
                          setState((prev) => ({
                            ...prev,
                            [section.value]: state[section.value].filter(
                              (v) => v !== option.slug,
                            ),
                          }));
                        }
                      }}
                      className="border-[1.5px]"
                    />
                    <Label htmlFor={option.slug} className="cursor-pointer">
                      {option.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Label className="block py-4 text-base leading-none">
        Price (min-max)
      </Label>
      <div className="flex w-full items-center justify-between gap-2">
        <Input
          type="number"
          className="w-20"
          defaultValue={0}
          min={0}
          max={priceRange.max - 1}
          onChange={(e) => {
            setPriceRange((prev) => ({ ...prev, min: +e.target.value }));
          }}
        />
        <span>-</span>
        <Input
          type="number"
          className="w-20"
          defaultValue={100}
          min={priceRange.min + 1}
          onChange={(e) => {
            setPriceRange((prev) => ({ ...prev, max: +e.target.value }));
          }}
        />
      </div>
    </div>
  );
}
