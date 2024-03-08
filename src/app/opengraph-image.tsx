import { ImageResponse } from "next/og";

export const alt = "Ecommerce";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full relative overflow-hidden">
        <h1 tw="font-semibold text-5xl">Ecommerce</h1>
      </div>
    ),
    {
      ...size,
    },
  );
}
