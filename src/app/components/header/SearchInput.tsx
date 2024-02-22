import { Input } from "@/ui";
import { useDebounce, useQueryParams } from "@/common/hooks";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const { setQueryParams, queryParams } = useQueryParams();

  const [query, setQuery] = useState(queryParams.get("search") ?? "");
  const debouncedQuery = useDebounce(query);

  const handleScroll = () => {
    const element = document.getElementById("search-view");
    if (!element) return;
    element.scrollIntoView();
  };

  useEffect(() => {
    setQueryParams({
      search: debouncedQuery,
    });
  }, [debouncedQuery, setQueryParams]);

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products ..."
      className="w-full"
      onClick={handleScroll}
      onFocusCapture={handleScroll}
    />
  );
}
