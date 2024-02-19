import { groq } from "next-sanity";
import { Product } from "@/common/types";
import { cache } from "react";
import { client } from "../../../../../sanity/lib/client";

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | undefined> => {
    const query = groq`
    *[_type == "product" && slug.current == $slug][0] {
      "id": _id,
      name,
      images,
      "categories": categories[]->{name, "id":_id, "slug": slug.current},
      "sizes": sizes[]->{name, "id": _id, "slug": slug.current},
      "colors": colors[]->{name, "id": _id, "slug": slug.current},
      description,
      price,
      countInStock,
      "slug": slug.current
    }
  `;

    const params = { slug };
    const product = await client.fetch(query, params);

    return product;
  },
);
