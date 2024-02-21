import { object, string, number, Input } from "valibot";

export const cartItemSchema = object({
  color: string(),
  size: string(),
  countInStock: number(),
});

export type CartItem = Input<typeof cartItemSchema>;
