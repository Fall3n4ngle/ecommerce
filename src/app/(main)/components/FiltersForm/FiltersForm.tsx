"use client";

import PriceRange from "./PriceRange";
import FiltersAccordion from "./FiltersAccordion";
import { FormFilter } from "../../types/FormFilter";

type Props = {
  filters: FormFilter[];
};

export default function FiltersForm({ filters }: Props) {
  return (
    <>
      <FiltersAccordion filters={filters} />
      <div>
        <span className="block py-4 text-base leading-none font-medium">
          Price (min-max)
        </span>
        <PriceRange />
      </div>
    </>
  );
}
