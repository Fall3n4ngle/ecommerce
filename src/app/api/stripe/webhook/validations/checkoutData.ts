import { email, nullable, number, object, string } from "valibot";

const shippindAddressSchema = object({
  city: string(),
  country: string(),
  line1: string(),
  line2: nullable(string()),
  postal_code: string(),
  state: string(),
});

const customerDetailsSchema = object({
  email: string([email()]),
  name: string(),
  address: shippindAddressSchema,
});

export const checkoutDataSchema = object({
  itemsPrice: number(),
  shippingPrice: number(),
  totalPrice: number(),
  customerDetails: customerDetailsSchema,
  paymentStatus: string(),
});

export const productDataSchema = object({
  name: string(),
  metadata: object({
    size: string(),
    color: string(),
  }),
});
