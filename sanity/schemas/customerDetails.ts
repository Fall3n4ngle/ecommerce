import { defineField, defineType } from "sanity";

export const customerDetailsObject = defineType({
  name: "customerDetails",
  title: "Customer details",
  type: "object",
  fields: [
    defineField({
      name: "address",
      title: "Address",
      type: "shippingAddress",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
  ],
});
