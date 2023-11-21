import { Input } from "@/components/ui";
import { useDebounce, useQueryParams } from "@/lib/hooks";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const { setQueryParams, queryParams } = useQueryParams<{
    search?: string;
  }>();

  const [query, setQuery] = useState(queryParams.get("search") ?? "");
  const debouncedQuery = useDebounce(query);

  const handleScroll = () => {
    document.getElementById('search-view')!.scrollIntoView();
  }

  useEffect(() => {
    setQueryParams({
      search: debouncedQuery
    })
  }, [debouncedQuery, setQueryParams]);

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Filter products by name..."
      className="w-full"
      onClick={handleScroll}
      onFocusCapture={handleScroll}
    />
  );
}
