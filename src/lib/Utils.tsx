export const range = (start: number, end: number, interval: number = 1) => {
  return Array.from(
    { length: (end - start) / interval + 1 },
    (_, i) => start + i * interval,
  );
};

export const camelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const snakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (g) => `_${g.toLowerCase()}`);
};
