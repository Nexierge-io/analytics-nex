import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis } from "@/lib/scaleData";
import {
  ticketsBySourceKpis, ticketStatusData, ticketPerformanceKpis,
  departmentData, topURTypes, topRSItems, ticketLifetimeKpis,
} from "@/data/mock/tickets";

/* Horizontal stacked bar for ticket statuses */
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

/* Department table */
function DepartmentTable({ data }: { data: typeof departmentData }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-[0_1px_3px_0_hsl(0_0%_0%/0.04)]">
      <div className="flex items-center gap-4 border-b pb-2.5">
        <span className="w-6" />
        <span className="flex-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Department</span>
        <span className="w-16 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Tickets</span>
        <span className="w-20 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Completed</span>
        <span className="w-14 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Rate</span>
        <span className="w-16 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Avg Time</span>
        <span className="w-16 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Breaches</span>
      </div>
      <div className="divide-y">
        {data.map((dept, i) => (
          <div key={dept.name} className="flex items-center gap-4 py-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-[10px] font-semibold text-muted-foreground">
              {i + 1}
            </span>
            <span className="flex-1 text-xs font-medium text-foreground">{dept.name}</span>
            <span className="w-16 text-right text-xs tabular-nums text-foreground">{dept.tickets}</span>
            <span className="w-20 text-right text-xs tabular-nums text-foreground">{dept.completed}</span>
            <span className="w-14 text-right text-xs tabular-nums text-muted-foreground">{dept.rate}</span>
            <span className="w-16 text-right text-xs tabular-nums text-muted-foreground">{dept.avgTime}</span>
            <span className="w-16 text-right text-xs tabular-nums text-muted-foreground">{dept.breaches}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Ranked list with bar */
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
      {/* ── Volume ── */}
      <section className="space-y-4">
        <SectionHeader title="Volume" subtitle="Tickets created by source · Affected by date range" />
        <KpiRow className="lg:grid-cols-3">
          {bySource.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>

        <ChartCard title="Tickets by Status" subtitle="Distribution across all statuses">
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
        <SectionHeader title="By Department" subtitle="Operational load and performance per team" />
        <DepartmentTable data={departmentData} />
      </section>

      {/* ── Top Requests ── */}
      <section className="space-y-4">
        <SectionHeader title="Top Requests" subtitle="Most common items by type" />
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartCard title="Top Universal Request Types" subtitle="By volume">
            <RankedList items={topURTypes.map((r) => ({ name: r.name, count: r.count, extra: `${r.rate} done` }))} />
          </ChartCard>
          <ChartCard title="Top Room Service Items" subtitle="By volume">
            <RankedList items={topRSItems.map((r) => ({ name: r.name, count: r.count, extra: r.revenue }))} />
          </ChartCard>
        </div>
      </section>

      {/* ── Lifetime ── */}
      <section className="space-y-4">
        <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
        <KpiRow className="lg:grid-cols-4">
          {ticketLifetimeKpis.map((kpi) => (
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
