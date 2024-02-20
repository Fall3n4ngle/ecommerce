import { getProducts } from "@/common/actions/products";
import { productsPerPage } from "../../const/perPage";
import Link from "next/link";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { unstable_noStore as noStore } from "next/cache";

type Props = {
  filters: string;
  currentPage: number;
  order: string;
};

export default async function ProductsList({
  currentPage,
  filters,
  order,
}: Props) {
  noStore();

  const { data: products, totalResults } = await getProducts({
    order,
    filters,
    start: currentPage * productsPerPage,
    end: (currentPage + 1) * productsPerPage,
  });

  const totalPages = Math.ceil(totalResults / productsPerPage);

  return (
    <>
      <div className="mb-10 grid grid-cols-1 gap-4 min-[510px]:grid-cols-2 min-[1010px]:grid-cols-3">
        {products.map(({ slug, id, ...props }) => {
          return (
            <Link key={id} href={`/product/${slug}`}>
              <ProductCard {...props} />
            </Link>
          );
        })}
      </div>
      {totalPages > 1 ? <Pagination totalPages={totalPages} /> : null}
    </>
  );
}
