export const delay = (seconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
};

export const capitalize = (value: string): string => {
  if (!value) return '';

  return value
    .split(' ')
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLocaleLowerCase())
    .join(' ')
    .trim();
};

export const numberToCurrency = (currency: string) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
