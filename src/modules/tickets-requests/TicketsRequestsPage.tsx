import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { TabBar } from "@/components/analytics/TabBar";
import SummaryTab from "./tabs/SummaryTab";
import GuestAppTab from "./tabs/GuestAppTab";
import TicketsTab from "./tabs/TicketsTab";

const tabs = [
  { id: "summary", label: "Summary" },
  { id: "guest-app", label: "Guest App" },
  { id: "tickets", label: "Tickets" },
];

export default function TicketsRequestsPage() {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <>
      <PageHeader
        title="Tickets & Guest App"
        subtitle="Operational visibility across requests, orders, and ticket execution"
      />
      <TabBar tabs={tabs} active={activeTab} onTabChange={setActiveTab} className="mb-8" />

      {activeTab === "summary" && <SummaryTab />}
      {activeTab === "guest-app" && <GuestAppTab />}
      {activeTab === "tickets" && <TicketsTab />}
    </>
  );
}
