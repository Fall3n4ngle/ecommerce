import Gallery from "@/components/product/Gallery";
import ProductForm from "@/components/product/ProductForm";
import { getProductBySlug } from "@/lib/actions/product";
import { Metadata } from "next";
import { urlForImage } from "../../../../sanity/lib/image";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";

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
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div>
          <Gallery name={name} images={images} />
        </div>
        <div className="sm:col-start-2 sm:col-end-4 lg:pt-12">
          <h2 className="mb-2 text-3xl font-bold">{name}</h2>
          <p className="mb-6 text-2xl font-semibold text-primary">
            ${price / 100}
          </p>
          <div className="mb-6">
            <ProductForm
              name={name}
              image={urlForImage(images[0]).url()}
              price={price}
              description={description}
              {...data}
            />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Description:</h3>
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

  if (!product) {
    return notFound();
  }

  const { name, description } = product;

  return {
    title: name,
    description: description.slice(0, 160),
  } as Metadata;
}
