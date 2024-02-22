import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/ui";
import { urlForImage } from "../../../../../../sanity/lib/image";
import { Image as TImage } from "sanity";
import Image from "next/image";
import { cn, shimmer, toBase64 } from "@/common/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  name: string;
  images: TImage[];
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
};

export default function ThumbsSlider({
  images,
  name,
  activeSlide,
  setActiveSlide,
}: Props) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;
    api.scrollTo(activeSlide);
  }, [api, activeSlide]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        containScroll: "keepSnaps",
        dragFree: true,
      }}
    >
      <CarouselContent className="flex gap-3">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "relative shrink-0 grow-0 basis-1/4 cursor-pointer rounded-md pt-[23%]",
            )}
            onClick={() => setActiveSlide(index)}
          >
            <Image
              src={urlForImage(image).url()}
              alt={`${name} image #${index + 1}`}
              fill
              className={cn("rounded-md object-cover", {
                "border-2 border-primary": index === activeSlide,
              })}
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
