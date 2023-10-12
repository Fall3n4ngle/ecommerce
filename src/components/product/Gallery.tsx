"use client";

import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Image as TImage } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import { shimmer, toBase64 } from "@/lib/utils/image";
import { cn } from "@/lib/utils/cn";

type Props = {
  images: TImage[];
  name: string;
  options?: EmblaOptionsType;
};

export default function Gallery({ images, name, options }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden" ref={emblaMainRef}>
        <div className="backface-hidden flex touch-pan-y gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative min-w-full pt-[100%]">
              <Image
                src={`${urlForImage(image).url()}`}
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
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex gap-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative min-w-[25%] cursor-pointer rounded-md pt-[23%]"
              onClick={() => onThumbClick(index)}
            >
              <Image
                src={urlForImage(image).url()}
                alt={`${name} image #${index + 1}`}
                fill
                className={cn("rounded-md", {
                  "border-2 border-primary": index === selectedIndex,
                })}
                objectFit="cover"
                onClick={() => setSelectedIndex(index)}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(225, 280),
                )}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
