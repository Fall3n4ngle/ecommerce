export const formatPriceFilter = (range?: string) => {
  let min = 0;
  let max = 100;

  if (range) {
    const [newMin, newMax] = range.split("-");

    if (newMin) {
      min = +newMin;
    }

    if (newMax) {
      max = +newMax;
    }
  }

  return `&& price >= ${min * 100} && price <= ${max * 100}`;
};

export const formatOrder = (sort_by?: string) => {
  let order = "";

  if (sort_by) {
    const [key, value] = sort_by.split(".");
    order = `| order(${key} ${value})`;
  }

  return order;
};

export const formatOptionsFilter = (
  type: "size" | "color" | "category",
  filter?: string,
) => {
  if (!filter) {
    return "";
  }

  const formatedFilter = filter.split(".").reduce((acc, curr) => {
    const newItem = `"${curr}", `;
    acc += newItem;
    return acc;
  }, ``);

  return `
  && references(*[_type == "${type}" && slug.current in [${formatedFilter}]]._id)
  `;
};
