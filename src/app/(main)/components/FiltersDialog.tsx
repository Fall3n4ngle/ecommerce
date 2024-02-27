import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Button,
} from "@/ui";
import { SlidersHorizontal } from "lucide-react";
import { FiltersForm } from "./FiltersForm";
import { getAllFilters } from "../actions/filters";
import Sort from "./Sort";

export default async function FiltersDialog() {
  const filters = await getAllFilters();

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" asChild>
          <span>
            <SlidersHorizontal className="mr-2 h-5 w-5" />
            Settings
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg">Settings</DialogTitle>
          <DialogDescription>
            Narrow your search using settings below
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <span className="block py-4 text-base font-medium leading-none">
            Sort by:
          </span>
          <Sort />
        </div>
        <FiltersForm filters={filters} />
      </DialogContent>
    </Dialog>
  );
}
