import { useQueryParams } from "@/common/hooks";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Label,
} from "@/ui";
import { CheckedState } from "@radix-ui/react-checkbox";
import { FormFilter } from "../../types/formFilter";

type Props = {
  filters: FormFilter[];
};

export default function FiltersAccordion({ filters }: Props) {
  const { queryParams, setQueryParams } = useQueryParams();

  const [state, setState] = useState<Record<string, string[]>>(() => {
    return {
      category: queryParams.get("category")?.split(".") ?? [],
      size: queryParams.get("size")?.split(".") ?? [],
      color: queryParams.get("color")?.split(".") ?? [],
    };
  });

  const isChecked = (section: string, slug: string) => {
    return state[section].includes(slug);
  };

  const handleCheckedChange = (
    value: CheckedState,
    sectionValue: string,
    optionSlug: string,
  ) => {
    if (value) {
      setState((prev) => ({
        ...prev,
        [sectionValue]: [...state[sectionValue], optionSlug],
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [sectionValue]: state[sectionValue].filter((v) => v !== optionSlug),
      }));
    }
  };

  useEffect(() => {
    const category = state.category.length
      ? state.category.join(".")
      : undefined;
    const size = state.size.length ? state.size.join(".") : undefined;
    const color = state.color.length ? state.color.join(".") : undefined;

    setQueryParams({ category, size, color });
  }, [state, setQueryParams]);

  return (
    <Accordion type="multiple">
      {filters.map((section, index) => (
        <AccordionItem key={index} value={section.title}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2.5">
              {section.data.map((option) => (
                <div key={option.slug} className="flex items-center gap-3">
                  <Checkbox
                    id={option.slug}
                    checked={isChecked(section.value, option.slug)}
                    onCheckedChange={(value) =>
                      handleCheckedChange(value, section.value, option.slug)
                    }
                    className="border-[1.5px]"
                  />
                  <Label htmlFor={option.slug} className="cursor-pointer">
                    {option.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
