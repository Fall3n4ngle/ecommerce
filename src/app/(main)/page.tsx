import { Metadata } from "next";
import {
  FiltersCard,
  Sort,
  ShowcaseSlider,
  FiltersDialog,
  TotalResults,
  ProductsList,
} from "./components";
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

  return (
    <>
      <div className="mb-8">
        <ShowcaseSlider />
      </div>
      <div
        id="search-view"
        className="mb-4 flex scroll-mt-20 items-center justify-between border-b-[1px]  border-input bg-background pb-4"
      >
        <TotalResults
          currentPage={currentPage}
          filters={filters}
          order={order}
        />
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
          <ProductsList
            currentPage={currentPage}
            filters={filters}
            order={order}
          />
        </div>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};
