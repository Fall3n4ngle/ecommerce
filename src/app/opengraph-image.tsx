// @ts-nocheck

import { ImageResponse } from "next/og";

export const alt = "Ecommerce";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // const imageData = await fetch(new URL("../assets/site-image.png")).then(
  //   (res) => res.arrayBuffer(),
  // );

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full relative overflow-hidden">
        {/* <img
          src={imageData}
          alt="Ecommerce"
          tw="absolute top-0 left-0 w-full h-full object-cover brightness-50"
        /> */}
        <h1 tw="font-semibold text-5xl">Ecommerce</h1>
      </div>
    ),
    {
      ...size,
    },
  );
}
