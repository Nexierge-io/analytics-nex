import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { ChartCard } from "@/components/analytics/ChartCard";
import { TabBar } from "@/components/analytics/TabBar";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { EmptyState } from "@/components/analytics/EmptyState";
import { communicationKpis, messageVolumeData, channelDistribution, responseTimeData } from "@/data/mock/analytics";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";

const tabs = [
  { id: "summary", label: "Summary" },
  { id: "inboxes", label: "Inboxes" },
  { id: "contacts", label: "Contacts" },
  { id: "templates", label: "Templates" },
  { id: "automations", label: "Automations" },
];

const inboxSubtabs = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "widget", label: "Widget" },
];

function SummaryTab() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <KpiRow className="lg:grid-cols-4 xl:grid-cols-7">
        {communicationKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </KpiRow>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Message Volume" subtitle="Last 7 days by channel" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={messageVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="whatsapp" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="widget" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Channel Distribution" subtitle="Share of conversations">
          <div className="flex h-64 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} strokeWidth={2} stroke="hsl(var(--card))">
                  {channelDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
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

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Avg Response Time" subtitle="Seconds by hour of day">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
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
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

function InboxesTab() {
  const [subtab, setSubtab] = useState("whatsapp");

  return (
    <div className="space-y-6 animate-fade-in-up">
      <TabBar tabs={inboxSubtabs} active={subtab} onTabChange={setSubtab} variant="secondary" />
      
      <KpiRow>
        <KpiCard label={`${subtab === "whatsapp" ? "WhatsApp" : "Widget"} Conversations`} value={subtab === "whatsapp" ? "218" : "66"} change="+9%" trend="up" />
        <KpiCard label="Avg First Reply" value={subtab === "whatsapp" ? "34s" : "12s"} change="-8s" trend="down" />
        <KpiCard label="Resolution Rate" value={subtab === "whatsapp" ? "94%" : "88%"} change="+2%" trend="up" />
        <KpiCard label="CSAT" value={subtab === "whatsapp" ? "4.6" : "4.3"} change="+0.1" trend="up" />
      </KpiRow>

      <ChartCard title={`${subtab === "whatsapp" ? "WhatsApp" : "Widget"} Conversation Trends`} subtitle="Daily volume this week">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={messageVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey={subtab === "whatsapp" ? "whatsapp" : "widget"} stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

export default function CommunicationHubPage() {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <>
      <PageHeader
        title="Communication Hub"
        subtitle="Centralized communication analytics across guest touchpoints"
      />
      <TabBar tabs={tabs} active={activeTab} onTabChange={setActiveTab} className="mb-8" />

      {activeTab === "summary" && <SummaryTab />}
      {activeTab === "inboxes" && <InboxesTab />}
      {activeTab === "contacts" && (
        <EmptyState title="Contacts Module" description="Contact management and segmentation analytics will be built here." />
      )}
      {activeTab === "templates" && (
        <EmptyState title="Templates Module" description="Message template performance and management coming soon." />
      )}
      {activeTab === "automations" && (
        <EmptyState title="Automations Module" description="Automation workflows and trigger analytics coming soon." />
      )}
    </>
  );
}
