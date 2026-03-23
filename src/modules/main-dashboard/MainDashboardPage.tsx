import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { EmptyState } from "@/components/analytics/EmptyState";
import { mainDashboardKpis } from "@/data/mock/analytics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: "Mon", revenue: 12400 },
  { day: "Tue", revenue: 14200 },
  { day: "Wed", revenue: 13800 },
  { day: "Thu", revenue: 15600 },
  { day: "Fri", revenue: 18200 },
  { day: "Sat", revenue: 21400 },
  { day: "Sun", revenue: 19800 },
];

export default function MainDashboardPage() {
  return (
    <>
      <PageHeader title="Main Dashboard" subtitle="Hotel operations overview and key performance indicators" />

      <div className="space-y-8 animate-fade-in-up">
        <KpiRow>
          {mainDashboardKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>

        <div className="grid gap-4 lg:grid-cols-3">
          <ChartCard title="Weekly Revenue" subtitle="Room revenue by day" className="lg:col-span-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <EmptyState title="Activity Feed" description="Recent hotel activity and alerts will appear here." />
        </div>
      </div>
    </>
  );
}
