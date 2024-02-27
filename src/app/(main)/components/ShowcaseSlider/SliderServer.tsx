import { getShowcaseProducts } from "../../actions/showcaseProducts";
import SliderClient from "./SliderClient";
import ShowcaseSlide from "./ShowcaseSlide";

export default async function SliderServer() {
  const showcaseProducts = await getShowcaseProducts();

  return (
    <SliderClient>
      {showcaseProducts.map((product) => (
        <ShowcaseSlide key={product.id} {...product} />
      ))}
    </SliderClient>
  );
}
