"use client";

import Autoplay from "embla-carousel-autoplay";
import { PropsWithChildren } from "react";
import { Carousel, CarouselContent } from "@/ui";

export default function SliderClient({ children }: PropsWithChildren) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          stopOnMouseEnter: true,
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent className="h-[75vh] max-h-[600px] sm:h-[85vh]">
        {children}
      </CarouselContent>
    </Carousel>
  );
}
