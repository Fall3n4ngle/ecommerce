import { cache } from "react";
import { getCategoies } from "./category";
import { getColors } from "./color";
import { getSizes } from "./size";

export const getAllFilters = cache(async () => {
  const filters = await Promise.all([getCategoies(), getSizes(), getColors()]);
  return filters;
});
