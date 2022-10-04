export const extractStoreNameFromProduct = (name: string): string => {
  return name.replace("Medusa ", "");
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR", // TODO: currency should be read/set from store options
  }).format(amount / 100);
};

type Option = {
  value: string;
  label: string;
};

export function filterUnique(arr: Option[]) {
  return arr.filter(
    (val: Option, id: number, self: Option[]) =>
      id === self.findIndex((t: Option) => t.label === val.label)
  );
}
