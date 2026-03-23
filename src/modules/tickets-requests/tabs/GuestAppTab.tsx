import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis } from "@/lib/scaleData";
import {
  guestAppSessionKpis, guestAppConversionKpis, guestAppURKpis,
  guestAppTopItems, guestAppSessionSourceData, guestAppLifetimeKpis,
} from "@/data/mock/tickets";

/* Donut chart for session sources */
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

/* Top items list */
function TopItemsList({ items }: { items: { name: string; count: number; rate: string }[] }) {
  const max = Math.max(...items.map((i) => i.count));
  return (
    <div className="space-y-2.5 py-1">
      {items.map((item) => (
        <div key={item.name}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground">{item.rate} done</span>
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

export default function GuestAppTab() {
  const range = useDateRange();
  const sessions = scaleKpis(guestAppSessionKpis, range);
  const conversion = scaleKpis(guestAppConversionKpis, range);
  const ur = scaleKpis(guestAppURKpis, range);

  return (
    <div className="space-y-10 animate-fade-in-up">
      {/* ── Session & Access ── */}
      <section className="space-y-4">
        <SectionHeader title="Session & Access" subtitle="Affected by selected date range" />
        <KpiRow className="lg:grid-cols-3 xl:grid-cols-5">
          {sessions.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>
        <ChartCard title="Session Source" subtitle="WhatsApp link vs QR / room login">
          <SessionSourceDonut data={guestAppSessionSourceData} />
        </ChartCard>
      </section>

      {/* ── Conversion ── */}
      <section className="space-y-4">
        <SectionHeader title="Conversion" subtitle="From session to completed order" />
        <KpiRow className="lg:grid-cols-3">
          {conversion.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>
      </section>

      {/* ── Universal Requests ── */}
      <section className="space-y-4">
        <SectionHeader title="Universal Requests" subtitle="Requests submitted via the guest app" />
        <KpiRow className="lg:grid-cols-4">
          {ur.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>
        <ChartCard title="Most Requested Items" subtitle="Top 5 universal request types">
          <TopItemsList items={guestAppTopItems} />
        </ChartCard>
      </section>

      {/* ── Lifetime ── */}
      <section className="space-y-4">
        <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
        <KpiRow className="lg:grid-cols-4">
          {guestAppLifetimeKpis.map((kpi) => (
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
