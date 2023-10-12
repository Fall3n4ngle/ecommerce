import { defineType, defineField } from "sanity";

export const sizeSchema = defineType({
  name: "size",
  title: "Size",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 50,
      },
    }),
  ],
});
