import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, generateTimeSeries } from "@/lib/scaleData";
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  ticketsSummaryActivityKpis, ticketsSummaryLifetimeKpis,
  paidServicesKpis, universalRequestsKpis, manualTicketsKpis,
  orderingAppKpis,
  catalogAdoptionKpis, catalogEntrySourceKpis,
  universalRequestAdoptionKpis, topRequestTypes,
  ticketStatusData,
  departmentData,
} from "@/data/mock/tickets";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

/* ── Reusable compact segmented bar ── */
function SegmentedBar({ data }: { data: { name: string; value: number; color?: string }[] }) {
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
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: d.color ?? "hsl(var(--chart-1))",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Ticket type summary block ── */
function TypeBlock({ title, kpis }: { title: string; kpis: ReturnType<typeof scaleKpis> }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-[0_1px_3px_0_hsl(0_0%_0%/0.04)]">
      <h3 className="mb-4 text-sm font-semibold text-foreground">{title}</h3>
      <div className="space-y-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{kpi.label}</span>
            <span className="text-sm font-semibold tabular-nums text-foreground">{kpi.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Department scoreboard row ── */
function DeptRow({ dept, rank }: { dept: typeof departmentData[0]; rank: number }) {
  return (
    <div className="flex items-center gap-4 py-2.5">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-[10px] font-semibold text-muted-foreground">
        {rank}
      </span>
      <span className="flex-1 text-xs font-medium text-foreground">{dept.name}</span>
      <span className="w-16 text-right text-xs tabular-nums text-foreground">{dept.tickets}</span>
      <span className="w-16 text-right text-xs tabular-nums text-muted-foreground">{dept.avgTime}</span>
      <span className="w-16 text-right text-xs tabular-nums text-muted-foreground">{dept.sla}</span>
    </div>
  );
}

export default function TicketsRequestsPage() {
  const range = useDateRange();

  const summaryActivity = scaleKpis(ticketsSummaryActivityKpis, range);
  const ticketsTimeline = generateTimeSeries({ value: 49 }, range);

  const paidScaled = scaleKpis(paidServicesKpis, range);
  const universalScaled = scaleKpis(universalRequestsKpis, range);
  const manualScaled = scaleKpis(manualTicketsKpis, range);

  const orderingScaled = scaleKpis(orderingAppKpis, range);
  const catalogScaled = scaleKpis(catalogAdoptionKpis, range);
  const catalogEntryScaled = scaleKpis(catalogEntrySourceKpis, range);

  const urAdoptionScaled = scaleKpis(universalRequestAdoptionKpis, range);

  return (
    <>
      <PageHeader
        title="Tickets & Requests"
        subtitle="Operational visibility across requests, orders, and ticket execution"
      />

      <div className="space-y-10 animate-fade-in-up">

        {/* ═══ 1. TOP SUMMARY ═══ */}
        <section className="space-y-4">
          <SectionHeader title="Activity" subtitle="Filtered by date range" />
          <KpiRow className="lg:grid-cols-3 xl:grid-cols-3">
            {summaryActivity.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </KpiRow>

          <ChartCard title="Tickets Over Time" subtitle="All ticket types combined">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ticketsTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
          <KpiRow className="sm:grid-cols-1 lg:grid-cols-1 max-w-sm">
            {ticketsSummaryLifetimeKpis.map((kpi) => (
              <KpiCard
                key={kpi.label}
                {...kpi}
                className="bg-gradient-to-br from-card to-secondary/40"
              />
            ))}
          </KpiRow>
        </section>

        {/* ═══ 2. TICKET TYPES ROW ═══ */}
        <section className="space-y-4">
          <SectionHeader title="Ticket Types" subtitle="Performance by ticket origin" />
          <div className="grid gap-4 lg:grid-cols-3">
            <TypeBlock title="Paid Services" kpis={paidScaled} />
            <TypeBlock title="Universal Requests" kpis={universalScaled} />
            <TypeBlock title="Manual Tickets" kpis={manualScaled} />
          </div>
        </section>

        {/* ═══ 3. ORDERING APP ADOPTION ═══ */}
        <section className="space-y-4">
          <SectionHeader title="Ordering App Adoption" subtitle="Guest usage of the digital ordering experience" />
          <KpiRow className="lg:grid-cols-3 xl:grid-cols-3">
            {orderingScaled.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </KpiRow>
        </section>

        {/* ═══ 4. CATALOG ADOPTION & CONVERSION ═══ */}
        <section className="space-y-4">
          <SectionHeader title="Catalog Adoption & Conversion" subtitle="How the online catalog performs from suggestion to purchase" />
          <KpiRow className="lg:grid-cols-3 xl:grid-cols-3">
            {catalogScaled.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </KpiRow>
          <KpiRow className="lg:grid-cols-4">
            {catalogEntryScaled.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </KpiRow>
        </section>

        {/* ═══ 5. UNIVERSAL REQUEST ADOPTION ═══ */}
        <section className="space-y-4">
          <SectionHeader title="Universal Request Adoption" subtitle="How guests use operational requests" />
          <KpiRow className="lg:grid-cols-5">
            {urAdoptionScaled.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </KpiRow>

          <ChartCard title="Top Request Types" subtitle="Most common universal requests">
            <SegmentedBar
              data={topRequestTypes.map((r) => ({ name: r.name, value: r.count }))}
            />
          </ChartCard>
        </section>

        {/* ═══ 6. STATUS OVERVIEW ═══ */}
        <section className="space-y-4">
          <SectionHeader title="Status Overview" subtitle="Current ticket distribution by status" />
          <ChartCard title="Ticket Status" subtitle="All active and resolved tickets">
            <SegmentedBar data={ticketStatusData} />
          </ChartCard>
        </section>

        {/* ═══ 7. DEPARTMENTS OVERVIEW ═══ */}
        <section className="space-y-4">
          <SectionHeader title="Departments" subtitle="Operational load and performance" />
          <div className="rounded-2xl border bg-card p-6 shadow-[0_1px_3px_0_hsl(0_0%_0%/0.04)]">
            {/* Header */}
            <div className="flex items-center gap-4 border-b pb-2.5">
              <span className="w-6" />
              <span className="flex-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Department</span>
              <span className="w-16 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Tickets</span>
              <span className="w-16 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Avg Time</span>
              <span className="w-16 text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground">SLA</span>
            </div>
            <div className="divide-y">
              {departmentData.map((dept, i) => (
                <DeptRow key={dept.name} dept={dept} rank={i + 1} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
