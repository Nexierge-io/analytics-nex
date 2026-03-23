import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { templatesActivityKpis, templatesLifetimeKpis, templatesOverTime, mostUsedTemplates } from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, scaleTimeSeries } from "@/lib/scaleData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

export function TemplatesTab() {
  const range = useDateRange();
  const activityKpis = scaleKpis(templatesActivityKpis, range);
  const timeData = scaleTimeSeries(templatesOverTime, ["value"], range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <SectionHeader title="Activity" subtitle="Filtered by date range" />
      <KpiRow className="sm:grid-cols-1 lg:grid-cols-1" style={{ maxWidth: 320 }}>
        {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
      <KpiRow className="sm:grid-cols-1 lg:grid-cols-1" style={{ maxWidth: 320 }}>
        {templatesLifetimeKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      <div className="grid gap-4 lg:grid-cols-5">
        <ChartCard title="Templates Over Time" subtitle="Weekly send volume" className="lg:col-span-3">
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

        <ChartCard title="Most Used Templates" subtitle="Top 5 by send count" className="lg:col-span-2">
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
