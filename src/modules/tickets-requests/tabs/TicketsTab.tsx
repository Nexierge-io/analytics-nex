import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis } from "@/lib/scaleData";
import { cn } from "@/lib/utils";
import {
  ticketsBySourceKpis, ticketStatusData, ticketPerformanceKpis,
  departmentData, topURTypes, topRSItems,
} from "@/data/mock/tickets";

/* ── Source card colors ── */
const sourceColors: Record<string, string> = {
  "Paid Service Order": "border-chart-3/30",
  "Universal Request": "border-chart-2/30",
  "Staff Manual": "border-muted-foreground/20",
};

/* ── Horizontal stacked bar ── */
function StatusBar({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="space-y-3">
      <div className="flex h-4 overflow-hidden rounded-full">
        {data.map((d) => (
          <div
            key={d.name}
            className="transition-all"
            style={{ width: `${(d.value / total) * 100}%`, backgroundColor: d.color }}
            title={`${d.name}: ${d.value}`}
          />
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

/* ── Department table with all-time values ── */
function DepartmentTable({ data }: { data: typeof departmentData }) {
  // find worst completion rate
  const worstRate = Math.min(...data.map((d) => parseFloat(d.rate)));

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-[0_1px_3px_0_hsl(0_0%_0%/0.04)] overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="border-b">
            <th className="pb-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground">#</th>
            <th className="pb-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Department</th>
            <th className="pb-2.5 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Tickets</th>
            <th className="pb-2.5 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Completed</th>
            <th className="pb-2.5 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Rate</th>
            <th className="pb-2.5 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Avg Time</th>
            <th className="pb-2.5 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Breaches</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((dept, i) => {
            const isWorst = parseFloat(dept.rate) === worstRate;
            return (
              <tr key={dept.name} className={cn(isWorst && "bg-chart-3/5")}>
                <td className="py-2.5 text-xs font-semibold text-muted-foreground">{i + 1}</td>
                <td className={cn("py-2.5 text-xs font-medium", isWorst ? "text-chart-3" : "text-foreground")}>
                  {dept.name}
                  {isWorst && <span className="ml-1.5 text-[10px] text-chart-3">▲ lowest</span>}
                </td>
                <td className="py-2.5 text-right">
                  <span className="text-xs tabular-nums text-foreground">{dept.tickets}</span>
                  <p className="text-[10px] tabular-nums text-muted-foreground/60">{dept.allTimeTickets.toLocaleString()}</p>
                </td>
                <td className="py-2.5 text-right">
                  <span className="text-xs tabular-nums text-foreground">{dept.completed}</span>
                  <p className="text-[10px] tabular-nums text-muted-foreground/60">{dept.allTimeCompleted.toLocaleString()}</p>
                </td>
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
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(item.count / max) * 100}%`, backgroundColor: "hsl(var(--chart-1))" }}
            />
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
      {/* ── Volume by Source ── */}
      <section className="space-y-4">
        <SectionHeader title="Volume by Source" subtitle="Tickets created · Affected by date range" />
        <KpiRow className="lg:grid-cols-3">
          {bySource.map((kpi) => (
            <KpiCard
              key={kpi.label}
              {...kpi}
              className={cn("border-l-2", sourceColors[kpi.label] || "")}
            />
          ))}
        </KpiRow>

        <ChartCard title="Tickets by Status" subtitle="Distribution across all statuses this period">
          <StatusBar data={ticketStatusData} />
        </ChartCard>
      </section>

      {/* ── Performance ── */}
      <section className="space-y-4">
        <SectionHeader title="Performance" subtitle="Resolution speed and SLA compliance" />
        <KpiRow className="lg:grid-cols-3 xl:grid-cols-5">
          {performance.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>
      </section>

      {/* ── By Department ── */}
      <section className="space-y-4">
        <SectionHeader title="By Department" subtitle="Operational load per team · Period values with all-time below" />
        <DepartmentTable data={departmentData} />
      </section>

      {/* ── Top Requests ── */}
      <section className="space-y-4">
        <SectionHeader title="Top Requests" subtitle="Most common items this period" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Top Universal Request Types" subtitle="By volume">
            <RankedList items={topURTypes.map((r) => ({ name: r.name, count: r.count, extra: `${r.rate} done` }))} />
          </ChartCard>
          <ChartCard title="Top Room Service Items" subtitle="By volume + revenue">
            <RankedList items={topRSItems.map((r) => ({ name: r.name, count: r.count, extra: r.revenue }))} />
          </ChartCard>
        </div>
      </section>
    </div>
  );
}
