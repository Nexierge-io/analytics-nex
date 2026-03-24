import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRangeContext } from "@/lib/DateRangeContext";
import { InlineDateFilter } from "@/components/layout/DateRangeSelector";
import { scaleKpis } from "@/lib/scaleData";

// ── Mock data (activity) ──
const templatesActivityKpis = [
  { label: "Templates Sent", value: "3,847", change: "+14%", trend: "up" as const },
  { label: "Most Used Category", value: "Operational", change: "1,284 sent", trend: "up" as const },
  { label: "Most Active Stage", value: "Pre-arrival", change: "1,648 sent", trend: "up" as const },
];

const guestCategoryBreakdown = [
  { name: "Unknown", sent: 412, pct: 10.7 },
  { name: "Lead", sent: 876, pct: 22.8 },
  { name: "Guest", sent: 1842, pct: 47.9 },
  { name: "Past Guest", sent: 717, pct: 18.6 },
];

const categoryRanking = [
  { name: "Operational", sent: 1284, pct: 33.4 },
  { name: "Transactional", sent: 924, pct: 24.0 },
  { name: "Marketing", sent: 687, pct: 17.9 },
  { name: "Feedback", sent: 498, pct: 12.9 },
  { name: "Loyalty", sent: 278, pct: 7.2 },
  { name: "Emergency", sent: 176, pct: 4.6 },
];

const stageBreakdown = [
  { name: "Pre-arrival", sent: 1648, pct: 42.8 },
  { name: "In-stay", sent: 1412, pct: 36.7 },
  { name: "Post-stay", sent: 787, pct: 20.5 },
];

// ── Mock data (lifetime) ──
const templatesLifetimeKpis = [
  { label: "Templates Total", value: "24", change: "+2", trend: "up" as const },
  { label: "All-Time Most Used Category", value: "Operational", change: "8,412 sent", trend: "up" as const },
  { label: "All-Time Most Used Stage", value: "Pre-arrival", change: "11,247 sent", trend: "up" as const },
];

function RankedList({ data }: { data: { name: string; sent: number; pct: number }[] }) {
  const max = data[0].sent;
  return (
    <div className="divide-y">
      {data.map((item, i) => (
        <div key={item.name} className="flex items-center gap-4 py-2.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary text-[10px] font-semibold text-muted-foreground">
            {i + 1}
          </span>
          <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
            {item.name}
          </span>
          <div className="hidden w-32 sm:block">
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(item.sent / max) * 100}%`,
                  backgroundColor: "hsl(var(--chart-1))",
                }}
              />
            </div>
          </div>
          <span className="w-14 text-right text-xs tabular-nums text-foreground">
            {item.sent.toLocaleString()}
          </span>
          <span className="w-12 text-right text-[11px] tabular-nums text-muted-foreground">
            {item.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

export function TemplatesTab() {
  const { range, setRange } = useDateRangeContext();
  const activityKpis = scaleKpis(templatesActivityKpis, range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* ── Activity ── */}
      <SectionHeader title="Activity" action={<InlineDateFilter value={range} onChange={setRange} />} />
      <KpiRow className="lg:grid-cols-3">
        {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      {/* ── By Category ── */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="By Category" subtitle="Template usage by category">
          <RankedList data={categoryRanking} />
        </ChartCard>

        <ChartCard title="By Guest Stage" subtitle="Template usage by journey stage">
          <RankedList data={stageBreakdown} />
        </ChartCard>

        <ChartCard title="By Guest Category" subtitle="Template usage by contact type">
          <RankedList data={guestCategoryBreakdown} />
        </ChartCard>
      </div>

      {/* ── Lifetime ── */}
      <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
      <KpiRow className="lg:grid-cols-3">
        {templatesLifetimeKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>
    </div>
  );
}
