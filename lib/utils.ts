export const formatCurrency = (num: number): string => {
  if (num === 0 || num === undefined || num === null) return "$0.00";
  if (num < 0.01) {
    return `$${num.toFixed(6)}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(num);
};

export const generateSparklinePath = (history: number[]): string => {
  if (!history || history.length < 2) return "";
  const max = Math.max(...history);
  const min = Math.min(...history);
  const range = max - min || 1;
  const width = 100;
  const height = 30;

  const points = history.map((value, index) => {
    const x = (index / (history.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  return `M ${points.join(" L ")}`;
};