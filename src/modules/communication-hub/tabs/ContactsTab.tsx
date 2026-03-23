import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import {
  contactsLifetimeKpis, contactsActivityKpis,
  contactsByCategory, contactsByStage, contactsByOrigin,
  contactCreationTrendData,
} from "@/data/mock/analytics";
import { useDateRange } from "@/lib/DateRangeContext";
import { scaleKpis, scaleTimeSeries } from "@/lib/scaleData";
import {
  BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

function HorizontalBarChart({ data, color }: { data: { name: string; value: number }[]; color: string }) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical">
          <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={90} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ContactsTab() {
  const range = useDateRange();
  const activityKpis = scaleKpis(contactsActivityKpis, range);
  const creationTrend = scaleTimeSeries(contactCreationTrendData, ["whatsapp", "widget", "manual", "staff"], range);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* ── Database (Lifetime) ── */}
      <SectionHeader title="Database" subtitle="Cumulative contact state — not affected by date filter" />
      <KpiRow className="lg:grid-cols-3">
        {contactsLifetimeKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="By Category" subtitle="Contact classification">
          <HorizontalBarChart data={contactsByCategory} color="hsl(var(--chart-1))" />
        </ChartCard>
        <ChartCard title="By Stage" subtitle="Guest journey stage">
          <HorizontalBarChart data={contactsByStage} color="hsl(var(--chart-2))" />
        </ChartCard>
      </div>

      {/* ── Activity (Filtered) ── */}
      <SectionHeader title="Activity" subtitle="Contact creation during selected period" />
      <KpiRow className="lg:grid-cols-5">
        {activityKpis.map((kpi) => <KpiCard key={kpi.label} {...kpi} />)}
      </KpiRow>

      <ChartCard title="Contact Creation by Source" subtitle="Daily new contacts by origin">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={creationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="whatsapp" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="widget" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="manual" stackId="1" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="staff" stackId="1" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-5 mt-2">
          {["WhatsApp", "Widget", "Manual", "Staff"].map((label, i) => (
            <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(var(--chart-${i + 1}))` }} />
              {label}
            </div>
          ))}
        </div>
      </ChartCard>

      {/* ── Origin (Lifetime) ── */}
      <SectionHeader title="Origin" subtitle="Cumulative contact source distribution" />
      <ChartCard title="Contact Source Distribution" subtitle="Total contacts by origin">
        <HorizontalBarChart data={contactsByOrigin} color="hsl(var(--chart-3))" />
      </ChartCard>
    </div>
  );
}
