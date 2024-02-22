import { getProducts } from "@/common/actions/products";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts({});

  const productsEntries: MetadataRoute.Sitemap = products.data.map(
    ({ _updatedAt, slug }) => ({
      url: `/product/${slug}`,
      lastModified: _updatedAt,
    }),
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    },
    ...productsEntries,
  ];
}
