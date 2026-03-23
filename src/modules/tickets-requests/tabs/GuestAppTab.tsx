import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, scaleValue } from "@/lib/scaleData";
import {
  guestAppSessionKpis, guestAppSessionSourceData,
  guestAppPaidFunnel, guestAppPaidRevenueKpi, guestAppTopOrderedItems,
  guestAppURFunnel, guestAppURCompletionKpi, guestAppTopRequestedItems,
} from "@/data/mock/tickets";

/* ── Donut chart for session sources ── */
function SessionSourceDonut({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          {data.map((d) => {
            const pct = (d.value / total) * 100;
            const offset = cumulative;
            cumulative += pct;
            return (
              <circle
                key={d.name}
                cx="18" cy="18" r="15.9155"
                fill="none"
                stroke={d.color}
                strokeWidth="3.2"
                strokeDasharray={`${pct} ${100 - pct}`}
                strokeDashoffset={`${-offset}`}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-foreground">{total.toLocaleString()}</span>
          <span className="text-[10px] text-muted-foreground">sessions</span>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-xs text-muted-foreground">{d.name}</span>
            <span className="text-xs font-semibold tabular-nums text-foreground">{d.value.toLocaleString()}</span>
            <span className="text-[10px] text-muted-foreground">({((d.value / total) * 100).toFixed(1)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Simple funnel ── */
function Funnel({ steps }: { steps: { step: string; value: number; allTime: number }[] }) {
  const max = steps[0].value;
  return (
    <div className="space-y-3">
      {steps.map((s, i) => {
        const pct = ((s.value / max) * 100).toFixed(1);
        const dropOff = i > 0 ? (((steps[i - 1].value - s.value) / steps[i - 1].value) * 100).toFixed(1) : null;
        return (
          <div key={s.step}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{s.step}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium tabular-nums text-foreground">{s.value.toLocaleString()}</span>
                <span className="text-[10px] text-muted-foreground">({pct}%)</span>
                {dropOff && (
                  <span className="text-[10px] text-kpi-negative">↓{dropOff}%</span>
                )}
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(s.value / max) * 100}%`,
                  backgroundColor: "hsl(var(--chart-1))",
                }}
              />
            </div>
            <p className="mt-0.5 text-[10px] tabular-nums text-muted-foreground/60">
              All time: {s.allTime.toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ── Ranked list ── */
function RankedList({ items, showRevenue }: { items: { name: string; count: number; extra: string; allTimeExtra?: string }[]; showRevenue?: boolean }) {
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
              style={{ width: `${(item.count / max) * 100}%`, backgroundColor: showRevenue ? "hsl(var(--chart-3))" : "hsl(var(--chart-2))" }}
            />
          </div>
          {item.allTimeExtra && (
            <p className="mt-0.5 text-[10px] text-muted-foreground/60">All time: {item.allTimeExtra}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function GuestAppTab() {
  const range = useDateRange();
  const sessions = scaleKpis(guestAppSessionKpis, range);
  const scaledPaidRevenue = scaleValue(guestAppPaidRevenueKpi.value, range, 42);

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* ── Sessions & Access ── */}
      <section className="space-y-4">
        <SectionHeader title="Access & Sessions" subtitle="Affected by selected date range" />
        <KpiRow className="lg:grid-cols-3 xl:grid-cols-5">
          {sessions.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>
        <ChartCard title="Session Source" subtitle="WhatsApp link vs QR / room login">
          <SessionSourceDonut data={guestAppSessionSourceData} />
        </ChartCard>
      </section>

      {/* ── Two Columns: Paid Services + Universal Requests ── */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Paid Services funnel */}
        <section className="space-y-4">
          <SectionHeader title="Paid Services Funnel" subtitle="Room Service · Session to order" />
          <ChartCard title="Ordering Funnel" subtitle="Drop-off between steps">
            <Funnel steps={guestAppPaidFunnel} />
          </ChartCard>
          <KpiCard
            label="Revenue This Period"
            value={scaledPaidRevenue}
            change={guestAppPaidRevenueKpi.change}
            trend={guestAppPaidRevenueKpi.trend}
            allTime={guestAppPaidRevenueKpi.allTime}
          />
          <ChartCard title="Top 5 Ordered Items" subtitle="By volume this period">
            <RankedList
              showRevenue
              items={guestAppTopOrderedItems.map((r) => ({
                name: r.name,
                count: r.count,
                extra: r.revenue,
              }))}
            />
          </ChartCard>
        </section>

        {/* Universal Requests funnel */}
        <section className="space-y-4">
          <SectionHeader title="Universal Requests Funnel" subtitle="Free requests · No revenue" />
          <ChartCard title="Request Funnel" subtitle="Session to submission">
            <Funnel steps={guestAppURFunnel} />
          </ChartCard>
          <KpiCard
            label={guestAppURCompletionKpi.label}
            value={guestAppURCompletionKpi.value}
            change={guestAppURCompletionKpi.change}
            trend={guestAppURCompletionKpi.trend}
            detail={guestAppURCompletionKpi.detail}
          />
          <ChartCard title="Top 5 Requested Items" subtitle="By volume this period">
            <RankedList
              items={guestAppTopRequestedItems.map((r) => ({
                name: r.name,
                count: r.count,
                extra: `${r.rate} done`,
                allTimeExtra: r.allTime.toLocaleString(),
              }))}
            />
          </ChartCard>
        </section>
      </div>
    </div>
  );
}
