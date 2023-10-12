import { object, string, number, Input } from "valibot";

export const productDataSchema = object({
  color: string(),
  size: string(),
  countInStock: number(),
});

export type ProductData = Input<typeof productDataSchema>;
