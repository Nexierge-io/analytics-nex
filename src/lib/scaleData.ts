import type { DateRange } from "@/components/layout/DateRangeSelector";

// Multipliers to simulate different date ranges
const multipliers: Record<DateRange, number> = {
  "1h": 0.04,
  today: 0.15,
  "7d": 1,
  "30d": 4.2,
  "3m": 12.5,
};

// Seeded pseudo-random for deterministic jitter per key
function jitter(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return (x - Math.floor(x)) * 0.4 + 0.8; // 0.8–1.2
}

export function scaleValue(raw: string, range: DateRange, seed = 0): string {
  const num = parseFloat(raw.replace(/[,%$]/g, "").replace(/,/g, ""));
  if (isNaN(num)) return raw;

  const m = multipliers[range] * jitter(seed + num);
  const isPercent = raw.includes("%");
  const isDollar = raw.includes("$");
  const hasFraction = raw.includes("/");

  if (hasFraction) {
    const [a, b] = raw.split("/");
    const scaledA = Math.round(parseFloat(a.replace(/,/g, "")) * m);
    return `${scaledA.toLocaleString()}/${b}`;
  }

  let result = num * m;

  if (isPercent) {
    result = Math.min(result, 99.8);
    result = Math.max(result, 0.1);
    return `${result.toFixed(1)}%`;
  }

  if (isDollar) return `$${Math.round(result).toLocaleString()}`;

  if (result >= 1000) return Math.round(result).toLocaleString();
  if (result >= 100) return Math.round(result).toString();
  if (Number.isInteger(num)) return Math.round(result).toString();
  return result.toFixed(1);
}

export function scaleTimeSeries<T extends Record<string, unknown>>(
  data: T[],
  keys: string[],
  range: DateRange,
): T[] {
  const m = multipliers[range];
  return data.map((d, i) =>
    keys.reduce(
      (acc, k) => {
        const v = d[k];
        if (typeof v === "number") {
          (acc as Record<string, unknown>)[k] = Math.round(v * m * jitter(i + k.length));
        }
        return acc;
      },
      { ...d },
    ),
  );
}

export function scaleKpis(
  kpis: { label: string; value: string; change: string; trend: "up" | "down" | "neutral" }[],
  range: DateRange,
) {
  return kpis.map((kpi, i) => ({
    ...kpi,
    value: scaleValue(kpi.value, range, i * 7),
  }));
}
