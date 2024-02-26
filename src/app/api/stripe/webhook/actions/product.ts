import { groq } from "next-sanity";
import { client } from "../../../../../../sanity/lib/client";

type Props = {
  id: string;
  value: number;
};

type Product = {
  countInStock: number;
};

export const updateProductCountInStock = async ({ id, value }: Props) => {
  try {
    const query = groq`
      *[_type == "product" && _id == $id][0] {
            countInStock
        }
    `;

    const product: Product | null = await client.fetch(query, { id });

    if (!product) {
      throw new Error(`Product ${id} not found`);
    }

    if (product.countInStock < value) {
      throw new Error(
        `Product's ${id} countInStock field is value is smaller then passed value`,
      );
    }

    return await client.patch(id).dec({ countInStock: value }).commit({
      token: process.env.NEXT_PUBLIC_SANITY_READ_WRITE_TOKEN,
      autoGenerateArrayKeys: true,
    });
  } catch (error) {
    const message =
      (error as Error).message ??
      `Failed to update product ${id} countInStock value`;
    throw new Error(message);
  }
};
