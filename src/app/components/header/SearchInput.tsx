import { Input } from "@/ui";
import { useDebounce, useQueryParams } from "@/common/hooks";
import { useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const { setQueryParams, queryParams } = useQueryParams();
  const query = queryParams.get("search");

  const [stateQuery, setQuery] = useState(query ?? "");
  const debouncedQuery = useDebounce(stateQuery);

  const handleScroll = () => {
    const element = document.getElementById("search-view");
    if (!element) return;
    element.scrollIntoView();
  };

  useEffect(() => {
    if (query !== debouncedQuery) {
      setQueryParams({
        search: debouncedQuery,
        page: 1,
      });
    }
  }, [debouncedQuery, setQueryParams]);

  return (
    <Input
      id="search"
      value={stateQuery}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products..."
      className="w-full"
      onClick={handleScroll}
      onFocusCapture={handleScroll}
    />
  );
}
