import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { widgetActivityKpis, widgetSessionsData, widgetConversationsData, widgetConversionTrendData } from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, scaleTimeSeries } from "@/lib/scaleData";
import {
  AreaChart, Area,
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
  const activityKpis = scaleKpis(widgetActivityKpis, range);
  const sessData = scaleTimeSeries(widgetSessionsData, ["value"], range);
  const convoData = scaleTimeSeries(widgetConversationsData, ["value"], range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <KpiRow className="lg:grid-cols-4 xl:grid-cols-4">
        {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
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

        <ChartCard title="Conversations Over Time" subtitle="Daily conversations from widget">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={convoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Conversion Rate Trend" subtitle="Widget conversion % over time">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={widgetConversionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
              <Line type="monotone" dataKey="rate" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
