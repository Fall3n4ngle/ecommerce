import { type SchemaTypeDefinition } from "sanity";
import { categorySchema } from "./schemas/category";
import { sizeSchema } from "./schemas/size";
import { colorSchema } from "./schemas/color";
import { productSchema } from "./schemas/product";
import { showcaseProductsSchema } from "./schemas/showcaseProducts";
import { shippingAddressObject } from "./schemas/shippingAddess";
import { orderItemObject } from "./schemas/orderItem";
import { customerDetailsObject } from "./schemas/customerDetails";
import { orderSchema } from "./schemas/order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categorySchema,
    sizeSchema,
    colorSchema,
    productSchema,
    showcaseProductsSchema,
    orderSchema,
    shippingAddressObject,
    orderItemObject,
    customerDetailsObject,
  ],
};
