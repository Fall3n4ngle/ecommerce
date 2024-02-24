import { ProductForm, Gallery } from "./components";
import { getProductBySlug } from "./actions/product";
import { Metadata } from "next";
import { urlForImage } from "../../../../sanity/lib/image";
import { notFound } from "next/navigation";
import { shortenString } from "@/common/utils";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Product({ params: { slug } }: Props) {
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const { name, images, price, description, ...data } = product;

  return (
    <>
      <div className="grid grid-cols-1 gap-9 lg:grid-cols-3">
        <div className="">
          <Gallery name={name} images={images} />
        </div>
        <div className="lg:col-start-2 lg:col-end-4 lg:pt-12">
          <h2 className="mb-3 text-3xl font-bold">{name}</h2>
          <p className="mb-8 text-2xl font-semibold leading-none text-primary">
            ${price / 100}
          </p>
          <div className="mb-8">
            <ProductForm
              name={name}
              image={urlForImage(images[0]).url()}
              price={price}
              description={description}
              {...data}
            />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Description:</h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata({ params: { slug } }: Props) {
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const { name, description } = product;

  return {
    title: name,
    description: shortenString({ string: description, maxLength: 157 }),
    alternates: {
      canonical: `/product/${slug}`,
    },
    keywords: product.categories.map((c) => c.name),
  } as Metadata;
}
