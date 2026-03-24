import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRangeContext } from "@/lib/DateRangeContext";
import { InlineDateFilter } from "@/components/layout/DateRangeSelector";
import { scaleKpis } from "@/lib/scaleData";
import {
  guestAppSessionKpis,
  guestAppPaidFunnel, guestAppPaidKpis, guestAppTopOrderedItems,
  guestAppURKpis, guestAppTopRequestedItems, guestAppLifetimeKpis,
} from "@/data/mock/tickets";

/* ── Simple funnel ── */
function Funnel({ steps }: { steps: { step: string; value: number }[] }) {
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
                {dropOff && <span className="text-[10px] text-kpi-negative">↓{dropOff}%</span>}
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full transition-all"
                style={{ width: `${(s.value / max) * 100}%`, backgroundColor: "hsl(var(--chart-1))" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Ranked list ── */
function RankedList({ items, barColor }: { items: { name: string; count: number; extra: string }[]; barColor?: string }) {
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
              style={{ width: `${(item.count / max) * 100}%`, backgroundColor: barColor || "hsl(var(--chart-1))" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GuestAppTab() {
  const { range, setRange } = useDateRangeContext();
  const sessions = scaleKpis(guestAppSessionKpis, range);
  const paid = scaleKpis(guestAppPaidKpis, range);
  const ur = scaleKpis(guestAppURKpis, range);

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* ── Activity ── */}
      <section className="space-y-4">
        <SectionHeader title="Activity" action={<InlineDateFilter value={range} onChange={setRange} />} />
      </section>

      {/* Access */}
      <section className="space-y-4">
        <SectionHeader title="Access & Sessions" />
        <KpiRow className="lg:grid-cols-4">
          {sessions.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>

      </section>

      {/* Two columns: Paid vs Universal */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Paid Services */}
        <section className="space-y-4">
          <SectionHeader title="Room Service" subtitle="Paid orders" />
          <ChartCard title="Ordering Funnel" subtitle="Session → catalog → cart → order">
            <Funnel steps={guestAppPaidFunnel} />
          </ChartCard>
          <div className="grid gap-4 sm:grid-cols-2">
            {paid.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </div>
          <ChartCard title="Top 5 Ordered Items" subtitle="By volume this period">
            <RankedList
              barColor="hsl(var(--chart-3))"
              items={guestAppTopOrderedItems.map((r) => ({ name: r.name, count: r.count, extra: r.revenue }))}
            />
          </ChartCard>
        </section>

        {/* Universal Requests */}
        <section className="space-y-4 rounded-2xl border border-chart-2/10 bg-chart-2/[0.02] p-4">
          <SectionHeader title="Universal Requests — Free" subtitle="No revenue in this block" />
          <div className="grid gap-4 sm:grid-cols-2">
            {ur.map((kpi) => (
              <KpiCard key={kpi.label} {...kpi} />
            ))}
          </div>
          <ChartCard title="Top 5 Requested Items" subtitle="By volume this period">
            <RankedList
              barColor="hsl(var(--chart-2))"
              items={guestAppTopRequestedItems.map((r) => ({ name: r.name, count: r.count, extra: "" }))}
            />
          </ChartCard>
        </section>
      </div>

      {/* ── Lifetime ── */}
      <section className="space-y-4">
        <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
        <KpiRow className="lg:grid-cols-4">
          {guestAppLifetimeKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} className="bg-gradient-to-br from-card to-secondary/40" />
          ))}
        </KpiRow>
      </section>
    </div>
  );
}
