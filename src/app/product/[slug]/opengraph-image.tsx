import { ImageResponse } from "next/og";
import { getProductBySlug } from "./actions/product";
import { notFound } from "next/navigation";
import { urlForImage } from "../../../../sanity/lib/image";

export const alt = "Ecommerce";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: {
    slug: string;
  };
};

export default async function OGImage({ params: { slug } }: Props) {
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full relative overflow-hidden">
        <img
          src={urlForImage(product.images[0]).url()}
          alt="Ecommerce"
          tw="absolute top-0 left-0 w-full h-full object-cover brightness-50"
        />
        <h1 tw="font-semibold text-5xl">{product.name}</h1>
      </div>
    ),
    {
      ...size,
    },
  );
}
