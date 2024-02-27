"use server";

import { groq } from "next-sanity";
import { Filter } from "@/common/types";
import { client } from "../../../../sanity/lib/client";
import { cache } from "react";
import { FormFilter } from "../types";
import { tags } from "@/common/const";

const getCategoies = async () => {
  const query = groq`
    *[_type == "category"] {
        "id": _id,
        name,
        "slug": slug.current
    }
    `;

  const categories: Filter[] = await client.fetch(
    query,
    {},
    {
      cache: "force-cache",
      next: { tags: [tags.category] },
    },
  );

  return {
    title: "Categories",
    value: "category",
    data: categories,
  } as FormFilter;
};

const getSizes = async () => {
  const query = groq`
    *[_type == "size"] {
        "id": _id,
        name,
        "slug": slug.current
    }
    `;

  const sizes: Filter[] = await client.fetch(
    query,
    {},
    {
      cache: "force-cache",
      next: { tags: [tags.size] },
    },
  );

  return {
    title: "Sizes",
    value: "size",
    data: sizes,
  } as FormFilter;
};

const getColors = async () => {
  const query = groq`
    *[_type == "color"] {
        "id": _id,
        name,
        "slug": slug.current
    }
    `;

  const colors: Filter[] = await client.fetch(
    query,
    {},
    {
      cache: "force-cache",
      next: { tags: [tags.color] },
    },
  );

  return {
    title: "Colors",
    value: "color",
    data: colors,
  } as FormFilter;
};

export const getAllFilters = cache(async () => {
  try {
    const filters = await Promise.all([
      getCategoies(),
      getSizes(),
      getColors(),
    ]);

    return filters;
  } catch (error) {
    throw new Error("Failed to get filters");
  }
});
