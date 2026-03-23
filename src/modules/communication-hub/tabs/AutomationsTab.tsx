import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { automationsKpis, automationsByType, automationsOverTime, mostTriggeredAutomation } from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, scaleTimeSeries } from "@/lib/scaleData";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

export function AutomationsTab() {
  const range = useDateRange();
  const kpis = scaleKpis(automationsKpis, range);
  const timeData = scaleTimeSeries(automationsOverTime, ["value"], range);
  const typeData = scaleTimeSeries(automationsByType, ["value"], range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <KpiRow className="lg:grid-cols-4">
        {kpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Automations Over Time" subtitle="Weekly trigger volume" className="lg:col-span-2">
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

        <ChartCard title="Most Triggered" subtitle="Top automation">
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-3xl font-semibold tabular-nums text-foreground">{mostTriggeredAutomation.count}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{mostTriggeredAutomation.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{mostTriggeredAutomation.pct}% of all triggers</p>
          </div>
        </ChartCard>
      </div>

      <SectionHeader title="Breakdown by Type" subtitle="Automation categories" />

      <ChartCard title="By Type" subtitle="Trigger count per automation type">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={typeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
