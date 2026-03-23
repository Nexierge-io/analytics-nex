import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis } from "@/lib/scaleData";
import { cn } from "@/lib/utils";
import {
  ticketsBySourceKpis, ticketStatusData, ticketPerformanceKpis,
  departmentData, topURTypes, topRSItems, ticketLifetimeKpis,
} from "@/data/mock/tickets";

const sourceColors: Record<string, string> = {
  "Paid Service Order": "border-l-chart-3",
  "Universal Request": "border-l-chart-2",
  "Staff Manual": "border-l-muted-foreground",
};

/* ── Status bar ── */
function StatusBar({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="space-y-3">
      <div className="flex h-4 overflow-hidden rounded-full">
        {data.map((d) => (
          <div key={d.name} className="transition-all"
            style={{ width: `${(d.value / total) * 100}%`, backgroundColor: d.color }}
            title={`${d.name}: ${d.value}`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-[11px] text-muted-foreground">{d.name}</span>
            <span className="text-[11px] font-semibold tabular-nums text-foreground">{d.value}</span>
            <span className="text-[10px] text-muted-foreground">({((d.value / total) * 100).toFixed(1)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Department table ── */
function DepartmentTable({ data }: { data: typeof departmentData }) {
  const worstRate = Math.min(...data.map((d) => parseFloat(d.rate)));
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-[0_1px_3px_0_hsl(0_0%_0%/0.04)] overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b">
            {["Department", "Received", "Completed", "Rate", "Avg Time", "Breaches"].map((h) => (
              <th key={h} className={cn("pb-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
                h === "Department" ? "text-left" : "text-right")}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((dept) => {
            const isWorst = parseFloat(dept.rate) === worstRate;
            return (
              <tr key={dept.name} className={cn(isWorst && "bg-chart-3/5")}>
                <td className={cn("py-2.5 text-xs font-medium", isWorst ? "text-chart-3" : "text-foreground")}>
                  {dept.name}{isWorst && <span className="ml-1.5 text-[10px] text-chart-3">▲ lowest</span>}
                </td>
                <td className="py-2.5 text-right text-xs tabular-nums text-foreground">{dept.tickets}</td>
                <td className="py-2.5 text-right text-xs tabular-nums text-foreground">{dept.completed}</td>
                <td className="py-2.5 text-right text-xs tabular-nums text-muted-foreground">{dept.rate}</td>
                <td className="py-2.5 text-right text-xs tabular-nums text-muted-foreground">{dept.avgTime}</td>
                <td className="py-2.5 text-right text-xs tabular-nums text-muted-foreground">{dept.breaches}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Ranked list ── */
function RankedList({ items }: { items: { name: string; count: number; extra: string }[] }) {
  const max = Math.max(...items.map((i) => i.count));
  return (
    <div className="space-y-2.5 py-1">
      {items.map((item) => (
        <div key={item.name}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground">{item.extra}</span>
              <span className="font-medium tabular-nums text-foreground">{item.count}</span>
            </div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full transition-all"
              style={{ width: `${(item.count / max) * 100}%`, backgroundColor: "hsl(var(--chart-1))" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TicketsTab() {
  const range = useDateRange();
  const bySource = scaleKpis(ticketsBySourceKpis, range);
  const performance = scaleKpis(ticketPerformanceKpis, range);

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* ── Activity ── */}
      <section className="space-y-4">
        <SectionHeader title="Activity" subtitle="Affected by selected date range" />
      </section>

      {/* Volume by Source */}
      <section className="space-y-4">
        <SectionHeader title="Volume by Source" />
        <KpiRow className="lg:grid-cols-3">
          {bySource.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} className={cn("border-l-2", sourceColors[kpi.label] || "")} />
          ))}
        </KpiRow>
      </section>

      {/* Performance */}
      <section className="space-y-4">
        <SectionHeader title="Performance" />
        <KpiRow className="lg:grid-cols-3 xl:grid-cols-5">
          {performance.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>
      </section>

      {/* Department */}
      <section className="space-y-4">
        <SectionHeader title="By Department" subtitle="Worst performer highlighted" />
        <DepartmentTable data={departmentData} />
      </section>

      {/* Top Requests */}
      <section className="space-y-4">
        <SectionHeader title="Top Requests" subtitle="This period" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Universal Request Types" subtitle="emoji + count + completion %">
            <RankedList items={topURTypes.map((r) => ({ name: r.name, count: r.count, extra: `${r.rate} done` }))} />
          </ChartCard>
          <ChartCard title="Room Service Items" subtitle="count + revenue">
            <RankedList items={topRSItems.map((r) => ({ name: r.name, count: r.count, extra: r.revenue }))} />
          </ChartCard>
        </div>
      </section>

      {/* ── Lifetime ── */}
      <section className="space-y-4">
        <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
        <KpiRow className="lg:grid-cols-3">
          {ticketLifetimeKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} className="bg-gradient-to-br from-card to-secondary/40" />
          ))}
        </KpiRow>
      </section>
    </div>
  );
}
