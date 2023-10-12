import { Input } from "@/components/ui/Input";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useQueryParams } from "@/lib/hooks/useQueryParams";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const { setQueryParams, queryParams } = useQueryParams<{
    search?: string;
  }>();

  const [query, setQuery] = useState(queryParams.get("search") ?? "");
  const debouncedQuery = useDebounce(query);

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
    />
  );
}
