import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { useDateRangeContext } from "@/lib/DateRangeContext";
import { InlineDateFilter } from "@/components/layout/DateRangeSelector";
import { scaleKpis } from "@/lib/scaleData";

// ── Mock data (activity) ──
const automationsActivityKpis = [
  { label: "Automations Triggered", value: "2,164", change: "+22%", trend: "up" as const },
  { label: "Most Triggered Type", value: "Welcome Flow", change: "684 triggers", trend: "up" as const },
];

const automationRanking = [
  { name: "Welcome Flow", triggers: 684, pct: 31.6 },
  { name: "Check-in Reminder", triggers: 412, pct: 19.0 },
  { name: "Post-Stay Survey", triggers: 328, pct: 15.2 },
  { name: "Booking Confirmation", triggers: 276, pct: 12.8 },
  { name: "Upsell Offer", triggers: 184, pct: 8.5 },
  { name: "Late Checkout Prompt", triggers: 124, pct: 5.7 },
  { name: "Loyalty Reward", triggers: 98, pct: 4.5 },
  { name: "Feedback Request", triggers: 58, pct: 2.7 },
];

// ── Mock data (lifetime) ──
const automationsLifetimeKpis = [
  { label: "Total Automations Triggered", value: "14,847", change: "+2,164", trend: "up" as const },
  { label: "Automation Types Configured", value: "12", change: "+1", trend: "up" as const },
  { label: "All-Time Most Used", value: "Welcome Flow", change: "4,218 triggers", trend: "up" as const },
];

export function AutomationsTab() {
  const { range, setRange } = useDateRangeContext();
  const activityKpis = scaleKpis(automationsActivityKpis, range);
  const maxTriggers = automationRanking[0].triggers;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* ── Activity ── */}
      <SectionHeader title="Activity" action={<InlineDateFilter value={range} onChange={setRange} />} />
      <KpiRow className="lg:grid-cols-2">
        {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      {/* ── Ranking ── */}
      <ChartCard title="Automation Types" subtitle="Ranked by triggers in selected period">
        <div className="space-y-0 divide-y">
          {automationRanking.map((item, i) => (
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
                      width: `${(item.triggers / maxTriggers) * 100}%`,
                      backgroundColor: "hsl(var(--chart-1))",
                    }}
                  />
                </div>
              </div>
              <span className="w-14 text-right text-xs tabular-nums text-foreground">
                {item.triggers.toLocaleString()}
              </span>
              <span className="w-12 text-right text-[11px] tabular-nums text-muted-foreground">
                {item.pct}%
              </span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* ── Lifetime ── */}
      <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
      <KpiRow className="lg:grid-cols-3">
        {automationsLifetimeKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>
    </div>
  );
}
