import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { EmptyState } from "@/components/analytics/EmptyState";
import { ticketsKpis } from "@/data/mock/analytics";

export default function TicketsRequestsPage() {
  return (
    <>
      <PageHeader title="Tickets & Requests" subtitle="Service request tracking and resolution analytics" />

      <div className="space-y-8 animate-fade-in-up">
        <KpiRow className="lg:grid-cols-3">
          {ticketsKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>

        <div className="grid gap-4 lg:grid-cols-2">
          <EmptyState title="Ticket Queue" description="Live ticket queue and priority breakdown coming soon." />
          <EmptyState title="Resolution Analytics" description="Average resolution time trends and SLA tracking." />
        </div>

        <EmptyState title="Ticket Categories" description="Breakdown by request type, department, and urgency." />
      </div>
    </>
  );
}
