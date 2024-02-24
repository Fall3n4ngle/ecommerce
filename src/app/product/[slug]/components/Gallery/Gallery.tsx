"use client";

import { Image as TImage } from "sanity";
import MainSlider from "./MainSlider";
import ThumbsSlider from "./ThumbsSlider";
import { useState } from "react";

type Props = {
  images: TImage[];
  name: string;
};

export default function Gallery({ images, name }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse lg:flex-col">
      <div className="basis-3/4">
        <MainSlider
          name={name}
          images={images}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
      </div>
      <div className="basis-1/4">
        <ThumbsSlider
          name={name}
          images={images}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />
      </div>
    </div>
  );
}
