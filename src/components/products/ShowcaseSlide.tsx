import { Button } from "@/components/ui";
import { shimmer, toBase64 } from "@/lib/utils/image";
import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  name: string;
  image: string;
  description: string;
};

export default function ShowcaseSlide({
  description,
  image,
  name,
  slug,
}: Props) {
  return (
    <div className="relative shrink-0 grow-0 basis-full overflow-hidden rounded-md px-3 py-4 sm:p-6">
      <Image
        src={image}
        alt={name}
        fill
        className="brightness-50 lg:brightness-[35%]"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(225, 280))}`}
      />
      <div className="flex h-full items-end gap-6 lg:items-center lg:px-16">
        <div className="relative hidden basis-1/3 pt-[37%] lg:block">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-md"
            objectFit="cover"
            placeholder="blur"
            priority
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(225, 280),
            )}`}
          />
        </div>
        <div className="relative z-20 flex basis-full flex-col justify-end text-[#f8f8f7] lg:basis-2/3">
          <h2 className="mb-4 text-xl font-bold sm:text-3xl">{name}</h2>
          <p className="mb-4 text-sm text-[#f8f8f7]/80 sm:text-base">
            {description}
          </p>
          <Link href={`/product/${slug}`} className="test-class">
            <Button className="self-start">View details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
