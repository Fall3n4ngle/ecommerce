import { groq } from "next-sanity";
import { client } from "../../../sanity/lib/client";
import { Category } from "@/types";

export const getCategoies = async () => {
  const query = groq`
    *[_type == "category"] {
        "id": _id,
        name,
        "slug": slug.current
    }
    `;

  const categories: Category[] = await client.fetch(query);
  
  return {
    title: "Categories",
    value: "category" as const,
    data: categories,
  };
};
