import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { summaryActivityKpis, summaryLifetimeKpis, channelDistribution } from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, generateTimeSeries } from "@/lib/scaleData";
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
  const range = useDateRange();
  const activityKpis = scaleKpis(summaryActivityKpis, range);
  const volumeData = generateTimeSeries({ whatsapp: 380, widget: 105 }, range);
  const handoffData = generateTimeSeries({ handoffs: 5, ai: 42 }, range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* ── Activity ── */}
      <SectionHeader title="Activity" subtitle="Filtered by date range" />
      <KpiRow className="lg:grid-cols-3 xl:grid-cols-3">
        {activityKpis.slice(0, 3).map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </KpiRow>
      <KpiRow className="lg:grid-cols-3 xl:grid-cols-3">
        {activityKpis.slice(3).map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </KpiRow>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Message Volume" subtitle="By channel" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
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

        <ChartCard title="AI vs Handoffs" subtitle="Resolution trend">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={handoffData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="ai" fill="hsl(var(--chart-1))" radius={[3, 3, 0, 0]} />
                <Bar dataKey="handoffs" fill="hsl(var(--chart-3))" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-5 mt-2">
            {[{ label: "AI Handled", color: "--chart-1" }, { label: "Handoffs", color: "--chart-3" }].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(var(${item.color}))` }} />
                {item.label}
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* ── Lifetime ── */}
      <SectionHeader title="Lifetime" subtitle="Not affected by date filter" />
      <div className="grid gap-4 lg:grid-cols-3">
        <KpiRow className="sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
          {summaryLifetimeKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>

        <ChartCard title="Channel Distribution" subtitle="Share of conversations">
          <div className="flex h-44 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={65} strokeWidth={2} stroke="hsl(var(--card))">
                  {channelDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-1.5">
            {channelDistribution.map((ch) => (
              <div key={ch.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ch.fill }} />
                {ch.name} · {ch.value}%
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
