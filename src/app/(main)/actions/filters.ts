"use server";

import { groq } from "next-sanity";
import { Filter } from "@/common/types";
import { client } from "../../../../sanity/lib/client";
import { cache } from "react";

const getCategoies = async () => {
  const query = groq`
    *[_type == "category"] {
        "id": _id,
        name,
        "slug": slug.current
    }
    `;

  const categories: Filter[] = await client.fetch(query);

  return {
    title: "Categories",
    value: "category" as const,
    data: categories,
  };
};

const getSizes = async () => {
  const query = groq`
    *[_type == "size"] {
        "id": _id,
        name,
        "slug": slug.current
    }
    `;

  const sizes: Filter[] = await client.fetch(query);

  return {
    title: "Sizes",
    value: "size" as const,
    data: sizes,
  };
};

const getColors = async () => {
  const query = groq`
    *[_type == "color"] {
        "id": _id,
        name,
        "slug": slug.current
    }
    `;

  const colors: Filter[] = await client.fetch(query);

  return {
    title: "Colors",
    value: "color" as const,
    data: colors,
  };
};

export const getAllFilters = cache(async () => {
  const filters = await Promise.all([getCategoies(), getSizes(), getColors()]);
  return filters;
});
