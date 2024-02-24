import { Input } from "@/ui";
import { useDebounce, useQueryParams } from "@/common/hooks";
import { useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const { setQueryParams, queryParams } = useQueryParams();
  const initialRender = useRef(true);

  const [query, setQuery] = useState(queryParams.get("search") ?? "");
  const debouncedQuery = useDebounce(query);

  const handleScroll = () => {
    const element = document.getElementById("search-view");
    if (!element) return;
    element.scrollIntoView();
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setQueryParams({
      search: debouncedQuery,
      page: 1,
    });
  }, [debouncedQuery, setQueryParams]);

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products..."
      className="w-full"
      onClick={handleScroll}
      onFocusCapture={handleScroll}
    />
  );
}
