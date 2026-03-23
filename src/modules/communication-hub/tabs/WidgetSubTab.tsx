import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import {
  widgetActivityKpis,
  widgetFunnelSteps,
  widgetCloseReasons,
  widgetLifetimeKpis,
} from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis } from "@/lib/scaleData";
import { cn } from "@/lib/utils";

export function WidgetSubTab() {
  const range = useDateRange();
  const activityKpis = scaleKpis(widgetActivityKpis, range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* ── Activity ── */}
      <SectionHeader title="Activity" subtitle="Filtered by date range" />
      <KpiRow className="lg:grid-cols-4 xl:grid-cols-4">
        {activityKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </KpiRow>

      {/* ── Funnel ── */}
      <SectionHeader title="Widget Funnel" subtitle="Session → Gate → Identity → WhatsApp" />
      <div className="rounded-2xl border bg-card p-5 shadow-[0_1px_3px_0_hsl(0_0%_0%/0.04)]">
        <div className="space-y-3">
          {widgetFunnelSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4">
              <span className="w-5 text-center text-xs font-bold tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground truncate">
                    {step.label}
                  </span>
                  <div className="flex items-baseline gap-2 ml-3 shrink-0">
                    <span className="text-sm font-semibold tabular-nums text-foreground">
                      {step.value.toLocaleString()}
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {step.pct}%
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[hsl(var(--chart-1))] transition-all duration-500"
                    style={{ width: `${step.pct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Close Reasons ── */}
      <SectionHeader title="Close Reasons" subtitle="Session outcomes" />
      <div className="grid gap-4 sm:grid-cols-3">
        {widgetCloseReasons.map((reason) => (
          <div
            key={reason.label}
            className="rounded-2xl border bg-card p-5 shadow-[0_1px_3px_0_hsl(0_0%_0%/0.04)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: reason.color }}
              />
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground truncate">
                {reason.label}
              </p>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-foreground">
              {reason.value.toLocaleString()}
            </p>
            <p className="mt-1 text-xs tabular-nums text-muted-foreground">
              {reason.pct}% of sessions
            </p>
          </div>
        ))}
      </div>

      {/* ── Lifetime ── */}
      <SectionHeader title="Lifetime" subtitle="All-time totals" />
      <KpiRow className="lg:grid-cols-4 xl:grid-cols-4">
        {widgetLifetimeKpis.map((kpi) => (
          <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} />
        ))}
      </KpiRow>
    </div>
  );
}
