import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import FiltersForm from "./FiltersForm";
import { Sort } from "./Sort";
import { getAllFilters } from "@/lib/actions/filters";

export default async function FiltersDialog() {
  const filters = await getAllFilters();

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-5 w-5" />
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Narrow your search using filters below
        </DialogDescription>
        <div className="flex flex-col gap-4">
          <FiltersForm filters={filters} />
          <Sort />
        </div>
      </DialogContent>
    </Dialog>
  );
}
