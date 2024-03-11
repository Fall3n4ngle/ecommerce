import { Button, CarouselItem } from "@/ui";
import { shimmer, toBase64 } from "@/common/utils/image";
import Image from "next/image";
import Link from "next/link";
import { ShowcaseProduct } from "../../types";

export default function ShowcaseSlide({
  description,
  image,
  name,
  slug,
}: Omit<ShowcaseProduct, "id">) {
  return (
    <CarouselItem className="relative shrink-0 grow-0 basis-full overflow-hidden rounded-md px-3 py-4 sm:p-6">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover brightness-50 lg:brightness-[35%]"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(225, 280))}`}
      />
      <div className="flex h-full items-end gap-6 lg:items-center lg:px-16">
        <div className="relative hidden basis-1/3 overflow-hidden pt-[37%] lg:block">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-md object-cover"
            placeholder="blur"
            priority
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(225, 280),
            )}`}
          />
        </div>
        <div className="relative z-20 flex basis-full flex-col justify-end text-[#f8f8f7] lg:basis-2/3">
          <h2 className="mb-3 text-xl font-bold sm:text-3xl">{name}</h2>
          <p className="mb-5 text-sm text-[#f8f8f7]/80 sm:text-base">
            {description}
          </p>
          <Link href={`/product/${slug}`} className="test-class">
            <Button className="self-start">View details</Button>
          </Link>
        </div>
      </div>
    </CarouselItem>
  );
}
