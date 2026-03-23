import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { whatsappActivityKpis, whatsappLifetimeKpis, whatsappConvoData, whatsappMessagesData, aiVsHumanPie } from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, scaleTimeSeries } from "@/lib/scaleData";
import {
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

export function WhatsAppSubTab() {
  const range = useDateRange();
  const activityKpis = scaleKpis(whatsappActivityKpis, range);
  const convoData = scaleTimeSeries(whatsappConvoData, ["value"], range);
  const msgData = scaleTimeSeries(whatsappMessagesData, ["value"], range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <KpiRow className="lg:grid-cols-5 xl:grid-cols-5">
        {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
      <div className="max-w-xs">
        <KpiRow className="sm:grid-cols-1 lg:grid-cols-1">
          {whatsappLifetimeKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
        </KpiRow>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Conversations Over Time" subtitle="Daily WhatsApp conversations">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={convoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Messages Over Time" subtitle="Daily message volume">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={msgData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="AI vs Human Handling" subtitle="Resolution split">
        <div className="flex h-56 items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={aiVsHumanPie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={78} strokeWidth={2} stroke="hsl(var(--card))">
                {aiVsHumanPie.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          {aiVsHumanPie.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
              {item.name} · {item.value}%
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
