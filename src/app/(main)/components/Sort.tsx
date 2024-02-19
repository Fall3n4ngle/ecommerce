"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
import { useQueryParams } from "@/common/hooks";

const sortOptions = [
  {
    label: "Newest",
    value: "_createdAt.desc",
  },
  {
    label: "Highest price",
    value: "price.desc",
  },
  {
    label: "Lowest price",
    value: "price.asc",
  },
];

export default function Sort() {
  const { setQueryParams, queryParams } = useQueryParams<{
    sort_by?: string;
  }>();

  const handleValueChange = (value: string) => {
    setQueryParams({ sort_by: value });
  };

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={queryParams.get("sort_by") ?? ""}
    >
      <SelectTrigger className="w-[180px]" aria-label="sort by">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
