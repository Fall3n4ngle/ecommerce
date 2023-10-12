import { defineField, defineType } from "sanity";

export const showcaseProductsSchema = defineType({
  name: "showcaseProducts",
  title: "Showcase products",
  type: "document",
  fields: [
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }],
    }),
  ],
});
