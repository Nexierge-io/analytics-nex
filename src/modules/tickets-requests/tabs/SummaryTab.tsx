import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis } from "@/lib/scaleData";
import { summaryActivityKpis, summaryLifetimeKpis } from "@/data/mock/tickets";

export default function SummaryTab() {
  const range = useDateRange();
  const activityScaled = scaleKpis(summaryActivityKpis, range);

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* ── Activity ── */}
      <section className="space-y-4">
        <SectionHeader title="Activity" subtitle="Affected by selected date range" />
        <KpiRow className="lg:grid-cols-3">
          {activityScaled.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>
      </section>

      {/* ── Lifetime ── */}
      <section className="space-y-4">
        <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
        <KpiRow className="lg:grid-cols-3 xl:grid-cols-5">
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
