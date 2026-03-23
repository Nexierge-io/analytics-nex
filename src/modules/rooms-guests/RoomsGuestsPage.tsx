import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/analytics/KpiCard";
import { KpiRow } from "@/components/analytics/KpiRow";
import { EmptyState } from "@/components/analytics/EmptyState";
import { roomsKpis } from "@/data/mock/analytics";

export default function RoomsGuestsPage() {
  return (
    <>
      <PageHeader title="Rooms & Guests" subtitle="Room inventory and guest profile management" />

      <div className="space-y-8 animate-fade-in-up">
        <KpiRow className="lg:grid-cols-3">
          {roomsKpis.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </KpiRow>

        <div className="grid gap-4 lg:grid-cols-2">
          <EmptyState title="Room Status Map" description="Visual room grid with real-time status indicators." />
          <EmptyState title="Guest Profiles" description="Guest search, history, and preference management." />
        </div>

        <EmptyState title="Housekeeping Queue" description="Room cleaning schedule and task assignments." />
      </div>
    </>
  );
}
