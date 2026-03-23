import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { automationsActivityKpis, automationsLifetimeKpis } from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, generateTimeSeries } from "@/lib/scaleData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

export function AutomationsTab() {
  const range = useDateRange();
  const activityKpis = scaleKpis(automationsActivityKpis, range);
  const timeData = generateTimeSeries({ value: 78 }, range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <SectionHeader title="Activity" subtitle="Filtered by date range" />
      <div className="max-w-xs">
        <KpiRow className="sm:grid-cols-1 lg:grid-cols-1">
          {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
        </KpiRow>
      </div>

      <ChartCard title="Automations Over Time" subtitle="Trigger volume">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeData}>
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
      <div className="max-w-xs">
        <KpiRow className="sm:grid-cols-1 lg:grid-cols-1">
          {automationsLifetimeKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
        </KpiRow>
      </div>
    </div>
  );
}
