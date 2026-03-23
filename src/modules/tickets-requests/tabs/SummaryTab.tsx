import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, scaleValue } from "@/lib/scaleData";
import {
  summaryRevenueHero,
  summaryActivityKpis,
  summaryLifetimeKpis,
} from "@/data/mock/tickets";

/* ── Live Status Card ── */
const liveStatuses = [
  { label: "NEW", emoji: "🟡", base: 8 },
  { label: "ACCEPTED", emoji: "🔵", base: 12 },
  { label: "IN PROGRESS", emoji: "🔵", base: 14 },
  { label: "ON HOLD", emoji: "🟠", base: 5 },
];

function useLiveTickets() {
  const [values, setValues] = useState(liveStatuses.map((s) => s.base));

  useEffect(() => {
    const id = setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
          return Math.max(0, v + delta);
        })
      );
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  return values;
}

function LiveSystemStatus() {
  const values = useLiveTickets();

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">Live System Status</h2>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kpi-positive opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-kpi-positive" />
        </span>
        <span className="text-[11px] text-muted-foreground">Updates in real time</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {liveStatuses.map((status, i) => (
          <div
            key={status.label}
            className="relative overflow-hidden rounded-2xl border border-accent/15 bg-card p-5 shadow-[0_1px_3px_0_hsl(0_0%_0%/0.04)]"
          >
            {/* Animated glow border */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/10 animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="text-base">{status.emoji}</span>
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {status.label}
              </p>
            </div>
            <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">
              {values[i]}
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {status.label === "NEW" && "Waiting to be accepted"}
              {status.label === "ACCEPTED" && "Accepted, not yet started"}
              {status.label === "IN PROGRESS" && "Being executed right now"}
              {status.label === "ON HOLD" && "Paused"}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-b border-border/60 pt-4" />
    </section>
  );
}

export default function SummaryTab() {
  const range = useDateRange();
  const activity = scaleKpis(summaryActivityKpis, range);
  const periodRevenue = scaleValue(summaryRevenueHero.periodRevenue, range, 99);

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* ── Live System Status ── */}
      <LiveSystemStatus />

      {/* ── Activity ── */}
      <section className="space-y-4">
        <SectionHeader title="Activity" subtitle="Affected by selected date range" />

        {/* Revenue Hero */}
        <div className="rounded-2xl border border-kpi-positive/20 bg-card p-6 shadow-[0_0_24px_-6px_hsl(var(--kpi-positive)/0.12)]">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {summaryRevenueHero.breakdown} Revenue
          </p>
          <p className="mt-2 text-4xl font-bold tabular-nums text-foreground">{periodRevenue}</p>
          <p className="mt-1 text-[11px] tabular-nums text-muted-foreground/70">
            All time: {summaryRevenueHero.allTimeRevenue}
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            {summaryRevenueHero.trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-kpi-positive" />
            ) : (
              <TrendingDown className="h-4 w-4 text-kpi-negative" />
            )}
            <span className="text-sm font-medium tabular-nums text-kpi-positive">
              {summaryRevenueHero.change}
            </span>
            <span className="text-[11px] text-muted-foreground">vs previous period</span>
          </div>
        </div>

        {/* 5 KPI cards */}
        <KpiRow className="lg:grid-cols-3 xl:grid-cols-5">
          {activity.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>
      </section>

      {/* ── Lifetime ── */}
      <section className="space-y-4">
        <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
        <KpiRow className="lg:grid-cols-4">
          {summaryLifetimeKpis.map((kpi) => (
            <KpiCard
              key={kpi.label}
              {...kpi}
              className="bg-gradient-to-br from-card to-secondary/40"
            />
          ))}
        </KpiRow>
      </section>
    </div>
  );
}
