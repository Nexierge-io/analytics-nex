import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import {
  contactsLifetimeKpis, contactsActivityKpis,
  contactsByCategory, contactsByStage, contactsByOrigin,
} from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis } from "@/lib/scaleData";

/** Compact segmented bar — no recharts needed */
function SegmentedBar({ data, color }: { data: { name: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="space-y-2.5 py-1">
      {data.map((d) => (
        <div key={d.name}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{d.name}</span>
            <span className="font-medium tabular-nums text-foreground">{d.value.toLocaleString()}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContactsTab() {
  const range = useDateRange();
  const activityKpis = scaleKpis(contactsActivityKpis, range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* ── Activity ── */}
      <SectionHeader title="Activity" subtitle="Filtered by date range" />
      <KpiRow className="lg:grid-cols-5">
        {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      {/* ── Lifetime ── */}
      <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
      <KpiRow className="lg:grid-cols-3">
        {contactsLifetimeKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="By Category" subtitle="Contact classification">
          <SegmentedBar data={contactsByCategory} color="hsl(var(--chart-1))" />
        </ChartCard>
        <ChartCard title="By Stage" subtitle="Guest journey stage">
          <SegmentedBar data={contactsByStage} color="hsl(var(--chart-2))" />
        </ChartCard>
        <ChartCard title="By Origin" subtitle="Contact source">
          <SegmentedBar data={contactsByOrigin} color="hsl(var(--chart-3))" />
        </ChartCard>
      </div>
    </div>
  );
}
