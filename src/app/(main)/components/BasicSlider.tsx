"use client";

import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PropsWithChildren } from "react";

type Props = {
  options?: EmblaOptionsType;
} & PropsWithChildren;

export default function BasicSlider({ children, options }: Props) {
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <div className="h-[75vh] sm:h-[85vh]">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="backface-hidden flex h-full touch-pan-y gap-3">
          {children}
        </div>
      </div>
    </div>
  );
}
