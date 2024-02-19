"use server";

import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";

type GetShowcaseProductsReturnType = {
  products: {
    id: string;
    name: string;
    description: string;
    image: string;
    slug: string;
  }[];
}[];

export const getShowcaseProducts = async () => {
  try {
    const query = groq`
  *[_type == "showcaseProducts"] {
      "products": products[]-> {
          "id": _id,
          name,
          description,
          "image": images[0].asset->url,
          "slug": slug.current
      }
  }
  `;

    const [{ products }]: GetShowcaseProductsReturnType =
      await client.fetch(query);
    return products;
  } catch (error) {
    throw new Error("Failed to get showcase products");
  }
};
