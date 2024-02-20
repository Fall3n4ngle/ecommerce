import { Filter } from "@/common/types";

export type FormFilter = {
  value: "category" | "size" | "color";
  title: string;
  data: Filter[];
};
