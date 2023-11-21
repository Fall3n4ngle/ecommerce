import FiltersForm from "./FiltersForm";
import { Card, CardContent, CardFooter } from "@/components/ui";
import SocialIcons from "../SocialIcons";
import { getAllFilters } from "@/lib/actions";

export default async function FiltersCard() {
  const filters = await getAllFilters();

  return (
    <Card className="max-w-[250px] bg-secondary">
      <CardContent>
        <FiltersForm filters={filters} />
      </CardContent>
      <CardFooter>
        <SocialIcons />
      </CardFooter>
    </Card>
  );
}
