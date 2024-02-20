import { getShowcaseProducts } from "../../actions/showcaseProducts";
import SliderClient from "./SliderClient";
import ShowcaseSlide from "./ShowcaseSlide";
import { unstable_noStore as noStore } from "next/cache";

export default async function SliderServer() {
  noStore();
  const showcaseProducts = await getShowcaseProducts();

  return (
    <SliderClient>
      {showcaseProducts.map((product) => (
        <ShowcaseSlide key={product.id} {...product} />
      ))}
    </SliderClient>
  );
}
