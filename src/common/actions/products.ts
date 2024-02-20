"use server";

import { Product } from "@/common/types";
import { groq } from "next-sanity";
import { client } from "../../../sanity/lib/client";
import { cache } from "react";

type ResultProduct = {
  image: string;
} & Pick<
  Product,
  "categories" | "name" | "id" | "slug" | "price" | "sku" | "currency"
>;

type GetProductsReturnType = {
  data: ResultProduct[];
  totalResults: number;
};

type Props = {
  order?: string;
  filters?: string;
  start?: number;
  end?: number;
};

export const getProducts = cache(
  async ({ order = "", filters = "", end = 9, start = 0 }: Props) => {
    try {
      const query = groq`{
        "data": *[_type == "product" ${filters}] ${order} [${start}...${end}] {
          "id": _id,
          name,
          price,
          "slug": slug.current,
          "image": images[0].asset->url,
          "categories": categories[]->{  
            "id": _id,
            name,
            "slug": slug.current
          },
          sku,
          currency
        },
        "totalResults": count(*[_type == "product" ${filters}] ${order})
      }`;

      const results: GetProductsReturnType = await client.fetch(query);

      return results;
    } catch (error) {
      throw new Error("Failed to get products");
    }
  },
);
