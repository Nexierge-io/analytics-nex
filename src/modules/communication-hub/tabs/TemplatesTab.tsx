import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { templatesActivityKpis, templatesLifetimeKpis, mostUsedTemplates } from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis } from "@/lib/scaleData";

export function TemplatesTab() {
  const range = useDateRange();
  const activityKpis = scaleKpis(templatesActivityKpis, range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <SectionHeader title="Activity" subtitle="Filtered by date range" />
      <div className="max-w-xs">
        <KpiRow className="sm:grid-cols-1 lg:grid-cols-1">
          {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
        </KpiRow>
      </div>

      <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="max-w-xs">
          <KpiRow className="sm:grid-cols-1 lg:grid-cols-1">
            {templatesLifetimeKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
          </KpiRow>
        </div>

        <ChartCard title="Most Used Templates" subtitle="Top 5 by send count" className="lg:col-span-4">
          <div className="space-y-3 py-2">
            {mostUsedTemplates.map((t, i) => (
              <div key={t.name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    <span className="mr-1.5 text-[10px] font-medium text-foreground/40">{i + 1}</span>
                    {t.name}
                  </span>
                  <span className="font-medium tabular-nums text-foreground">{t.count.toLocaleString()}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-chart-1 transition-all" style={{ width: `${(t.count / mostUsedTemplates[0].count) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
