import { defineField, defineType } from "sanity";

export const orderSchema = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "itemsPrice",
      title: "Items price",
      type: "number",
    }),
    defineField({
      name: "shippingPrice",
      title: "Shipping price",
      type: "number",
    }),
    defineField({
      name: "totalPrice",
      title: "Total price",
      type: "number",
    }),
    defineField({
      name: "customerDetails",
      title: "Customer details",
      type: "customerDetails",
    }),
    defineField({
      name: "orderItems",
      title: "Order items",
      type: "array",
      of: [
        {
          title: "Order item",
          type: "orderItem",
        },
      ],
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment status",
      type: "string",
    }),
    defineField({
      name: "paymentDate",
      title: "Payment date",
      type: "datetime",
    }),
    defineField({
      name: "deliveryStatus",
      title: "Devlivery status",
      type: "string",
    }),
    defineField({
      name: "deliveryDate",
      title: "Devlivery date",
      type: "datetime",
    }),
  ],
});
