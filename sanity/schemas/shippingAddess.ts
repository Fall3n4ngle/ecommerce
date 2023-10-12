import { defineField, defineType } from "sanity";

export const shippingAddressObject = defineType({
  name: "shippingAddress",
  title: "Shipping address",
  type: "object",
  fields: [
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "line1",
      title: "Lin1",
      type: "string",
    }),
    defineField({
      name: "line2",
      title: "Lin2",
      type: "string",
    }),
    defineField({
      name: "postal_code",
      title: "Postal code",
      type: "string",
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
    }),
  ],
});
