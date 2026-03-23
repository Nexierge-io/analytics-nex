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

export default function SummaryTab() {
  const range = useDateRange();
  const activity = scaleKpis(summaryActivityKpis, range);
  const periodRevenue = scaleValue(summaryRevenueHero.periodRevenue, range, 99);

  return (
    <div className="space-y-10 animate-fade-in-up">
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
