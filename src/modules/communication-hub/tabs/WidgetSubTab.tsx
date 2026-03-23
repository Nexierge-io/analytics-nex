import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { widgetKpis, widgetSessionsData, widgetFunnelData, widgetConversionsData } from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, scaleTimeSeries } from "@/lib/scaleData";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

export function WidgetSubTab() {
  const range = useDateRange();
  const kpis = scaleKpis(widgetKpis, range);
  const sessData = scaleTimeSeries(widgetSessionsData, ["value"], range);
  const funnelData = scaleTimeSeries(widgetFunnelData, ["value"], range);
  const convData = scaleTimeSeries(widgetConversionsData, ["conversions", "sessions"], range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <KpiRow className="lg:grid-cols-3 xl:grid-cols-3">
        {kpis.slice(0, 3).map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>
      <KpiRow className="lg:grid-cols-3 xl:grid-cols-3">
        {kpis.slice(3, 6).map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>
      <KpiRow className="sm:grid-cols-3 lg:grid-cols-3">
        {kpis.slice(6).map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Sessions Over Time" subtitle="Daily widget sessions">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Conversion Funnel" subtitle="Widget visitor journey">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="stage" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={110} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Conversions Over Time" subtitle="Sessions vs conversions">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={convData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="sessions" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="conversions" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 mt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-chart-2" />Sessions
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-chart-1" />Conversions
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
