import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { automationsActivityKpis, automationsLifetimeKpis } from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis } from "@/lib/scaleData";

export function AutomationsTab() {
  const range = useDateRange();
  const activityKpis = scaleKpis(automationsActivityKpis, range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <SectionHeader title="Activity" subtitle="Filtered by date range" />
      <div className="max-w-xs">
        <KpiRow className="sm:grid-cols-1 lg:grid-cols-1">
          {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
        </KpiRow>
      </div>

      <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
      <div className="max-w-xs">
        <KpiRow className="sm:grid-cols-1 lg:grid-cols-1">
          {automationsLifetimeKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
        </KpiRow>
      </div>
    </div>
  );
}
