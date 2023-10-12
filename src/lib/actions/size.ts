import { groq } from "next-sanity";
import { client } from "../../../sanity/lib/client";
import { Size } from "@/types";

export const getSizes = async () => {
  const query = groq`
    *[_type == "size"] {
        "id": _id,
        name,
        "slug": slug.current
    }
    `;

  const sizes: Size[] = await client.fetch(query);

  return {
    title: "Sizes",
    value: "size" as const,
    data: sizes,
  };
};
