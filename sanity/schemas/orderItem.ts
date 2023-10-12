import { defineField, defineType } from "sanity";

export const orderItemObject = defineType({
  name: "orderItem",
  title: "Order item",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
    }),
  ],
});
