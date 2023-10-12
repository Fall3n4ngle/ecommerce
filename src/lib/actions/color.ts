import { groq } from "next-sanity";
import { client } from "../../../sanity/lib/client";
import { Color } from "@/types";

export const getColors = async () => {
  const query = groq`
    *[_type == "color"] {
        "id": _id,
        name,
        "slug": slug.current
    }
    `;

  const colors: Color[] = await client.fetch(query);
  
  return {
    title: "Colors",
    value: "color" as const,
    data: colors,
  };
};
