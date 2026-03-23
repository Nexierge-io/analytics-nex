import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { contactsKpis, contactsByCategory, contactsByStage, contactsByOrigin } from "@/data/mock/analytics";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
  return (
    <div className="space-y-6 animate-fade-in-up">
      <KpiRow className="lg:grid-cols-4">
        {contactsKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </KpiRow>

      <SectionHeader title="Breakdowns" subtitle="Contact segmentation across dimensions" />

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="By Category" subtitle="Contact classification">
          <HorizontalBarChart data={contactsByCategory} color="hsl(var(--chart-1))" />
        </ChartCard>
        <ChartCard title="By Stage" subtitle="Guest journey stage">
          <HorizontalBarChart data={contactsByStage} color="hsl(var(--chart-2))" />
        </ChartCard>
        <ChartCard title="By Origin" subtitle="Contact source">
          <HorizontalBarChart data={contactsByOrigin} color="hsl(var(--chart-3))" />
        </ChartCard>
      </div>
    </div>
  );
}
