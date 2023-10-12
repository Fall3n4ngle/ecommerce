import { getShowcaseProducts } from "@/lib/actions/showcaseProducts";
import BasicSlider from "./BasicSlider";
import ShowcaseSlide from "./ShowcaseSlide";

export default async function ShowcaseSlider() {
  const showcaseProducts = await getShowcaseProducts();

  return (
    <BasicSlider>
      {showcaseProducts.map((product) => (
        <ShowcaseSlide key={product.id} {...product} />
      ))}
    </BasicSlider>
  );
}
