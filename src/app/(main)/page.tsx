import {
  FiltersCard,
  ProductCard,
  Sort,
  ShowcaseSlider,
  Pagination,
  FiltersDialog,
} from "./components";
import { getProducts } from "@/common/actions/products";
import Link from "next/link";
import {
  formatOptionsFilter,
  formatOrder,
  formatPriceFilter,
} from "./utils/filterFormaters";

type Props = {
  searchParams: {
    search?: string;
    sort_by?: string;
    category?: string;
    size?: string;
    color?: string;
    range?: string;
    page?: string;
  };
};

const perPage = 9;

export default async function Home({
  searchParams: { search, sort_by, category, color, size, range, page },
}: Props) {
  const order = formatOrder(sort_by);
  const searchFilter = search ? `&& name match "*${search}*"` : "";
  const priceFilter = formatPriceFilter(range);
  const categoryFilter = formatOptionsFilter("category", category);
  const sizeFilter = formatOptionsFilter("size", size);
  const colorFilter = formatOptionsFilter("color", color);

  const filters = `${priceFilter} ${searchFilter} ${categoryFilter} ${sizeFilter} ${colorFilter}`;

  const currentPage = page ? +page - 1 : 0;

  const { data: products, totalResults } = await getProducts({
    order,
    filters,
    start: currentPage * perPage,
    end: (currentPage + 1) * perPage,
  });

  const totalPages = Math.ceil(totalResults / perPage);

  return (
    <>
      <div className="mb-8">
        <ShowcaseSlider />
      </div>
      <div
        id="search-view"
        className="mb-4 flex scroll-mt-20 items-center justify-between border-b-[1px]  border-input bg-background pb-4"
      >
        <h3 className="text-xl font-semibold text-muted-foreground">
          {totalResults} Results
        </h3>
        <div className="hidden md:block">
          <Sort />
        </div>
        <div className="md:hidden">
          <FiltersDialog />
        </div>
      </div>
      <div className="flex items-start gap-4 lg:gap-10">
        <div className="hidden md:block">
          <FiltersCard />
        </div>
        <div className="w-full">
          <div className="mb-10 grid  grid-cols-1 gap-4 min-[510px]:grid-cols-2 min-[1010px]:grid-cols-3">
            {products.map(({ slug, id, ...props }) => {
              return (
                <Link key={id} href={`/product/${slug}`}>
                  <ProductCard {...props} />
                </Link>
              );
            })}
          </div>
          {totalPages > 1 ? <Pagination totalPages={totalPages} /> : null}
        </div>
      </div>
    </>
  );
}
