import { getProducts } from "@/common/actions/products";
import { productsPerPage } from "../const/perPage";
import { unstable_noStore as noStore } from "next/cache";

type Props = {
  filters: string;
  currentPage: number;
  order: string;
};

export default async function TotalResults({
  currentPage,
  filters,
  order,
}: Props) {
  noStore();

  const { totalResults } = await getProducts({
    order,
    filters,
    start: currentPage * productsPerPage,
    end: (currentPage + 1) * productsPerPage,
  });

  return (
    <p className="text-xl font-semibold text-muted-foreground">
      {totalResults} Results
    </p>
  );
}
