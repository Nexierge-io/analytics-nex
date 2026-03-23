import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import {
  communicationKpis, messageVolumeData, channelDistribution,
  responseTimeData, activityByHour,
} from "@/data/mock/analytics";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

export function SummaryTab() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <KpiRow className="lg:grid-cols-4 xl:grid-cols-4">
        {communicationKpis.slice(0, 4).map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </KpiRow>
      <KpiRow className="lg:grid-cols-4 xl:grid-cols-4">
        {communicationKpis.slice(4).map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </KpiRow>

      {/* Main charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Message Volume" subtitle="Last 7 days by channel" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={messageVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="whatsapp" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.12} strokeWidth={2} />
                <Area type="monotone" dataKey="widget" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.12} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Channel Distribution" subtitle="Share of conversations">
          <div className="flex h-52 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={78} strokeWidth={2} stroke="hsl(var(--card))">
                  {channelDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {channelDistribution.map((ch) => (
              <div key={ch.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ch.fill }} />
                {ch.name} · {ch.value}%
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Secondary charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Avg Response Time" subtitle="Seconds by hour of day">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="avg" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="AI vs Human Handling" subtitle="Resolution breakdown this week">
          <div className="space-y-4 py-4">
            {[
              { label: "AI Fully Resolved", value: 71.3, color: "hsl(var(--chart-1))" },
              { label: "AI Assisted → Human", value: 16.2, color: "hsl(var(--chart-2))" },
              { label: "Human Only", value: 12.5, color: "hsl(var(--chart-3))" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium tabular-nums text-foreground">{item.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full transition-all" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Activity heatmap row */}
      <ChartCard title="Activity by Hour" subtitle="Message volume distribution across the day">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityByHour}>
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
