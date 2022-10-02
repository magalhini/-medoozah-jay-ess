export const extractStoreNameFromProduct = (name: string): string => {
  return name.replace("Medusa ", "");
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR", // TODO: currency should be read/set from store options
  }).format(amount / 100);
};
