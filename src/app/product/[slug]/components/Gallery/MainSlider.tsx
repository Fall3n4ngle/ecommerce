import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/ui";
import Image from "next/image";
import { Image as TImage } from "sanity";
import { urlForImage } from "../../../../../../sanity/lib/image";
import { shimmer, toBase64 } from "@/common/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  name: string;
  images: TImage[];
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
};

export default function MainSlider({
  images,
  name,
  activeSlide,
  setActiveSlide,
}: Props) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setActiveSlide(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(activeSlide);
  }, [activeSlide, api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent className="flex gap-3">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="relative shrink-0 grow-0 basis-full overflow-hidden pt-[100%]"
          >
            <Image
              src={urlForImage(image).url()}
              alt={name}
              fill
              priority
              className="rounded-md"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(225, 280),
              )}`}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
