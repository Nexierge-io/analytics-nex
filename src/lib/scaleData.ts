import type { DateRange } from "@/components/layout/DateRangeSelector";

// Multipliers to simulate different date ranges
const multipliers: Record<DateRange, number> = {
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

export function scaleKpis(
  kpis: { label: string; value: string; change: string; trend: "up" | "down" | "neutral" }[],
  range: DateRange,
) {
  return kpis.map((kpi, i) => ({
    ...kpi,
    value: scaleValue(kpi.value, range, i * 7),
  }));
}

/** Generate time-series labels appropriate for the selected date range */
function generateTimeLabels(range: DateRange): string[] {
  switch (range) {
    case "today":
      return ["6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"];
    case "7d":
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    case "30d": {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - 29 + i);
        return `${monthNames[d.getMonth()]} ${d.getDate()}`;
      });
    }
    case "3m": {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const weeks: string[] = [];
      for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i * 7);
        weeks.push(`${monthNames[d.getMonth()]} ${d.getDate()}`);
      }
      return weeks;
    }
  }
}

/**
 * Generate a time-series dataset with proper labels for the date range.
 * `baseValues` maps each data key to a base value (the 7d daily average).
 * Values are scaled by the range and given deterministic jitter.
 */
export function generateTimeSeries(
  keys: Record<string, number>,
  range: DateRange,
): Record<string, string | number>[] {
  const labels = generateTimeLabels(range);
  const pointCount = labels.length;

  // Scale factor per point relative to 7d daily
  const perPointScale: Record<DateRange, number> = {
    today: 0.6,   // hourly slots → lower per-slot
    "7d": 1,
    "30d": 1.05,  // daily over 30d → similar per-day
    "3m": 7.2,    // weekly buckets → ~7x daily
  };

  const scale = perPointScale[range];

  return labels.map((label, i) => {
    const row: Record<string, string | number> = { date: label };
    Object.entries(keys).forEach(([key, base]) => {
      row[key] = Math.round(base * scale * jitter(i * 13 + key.length * 7));
    });
    return row;
  });
}
