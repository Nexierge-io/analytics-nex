import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { TabBar } from "@/components/analytics/TabBar";
import { DateRangeSelector } from "@/components/layout/DateRangeSelector";
import { useDateRangeContext } from "@/lib/DateRangeContext";
import { SummaryTab } from "./tabs/SummaryTab";
import { InboxesTab } from "./tabs/InboxesTab";
import { ContactsTab } from "./tabs/ContactsTab";
import { TemplatesTab } from "./tabs/TemplatesTab";
import { AutomationsTab } from "./tabs/AutomationsTab";

const tabs = [
  { id: "summary", label: "Summary" },
  { id: "inboxes", label: "Inboxes" },
  { id: "contacts", label: "Contacts" },
  { id: "templates", label: "Templates" },
  { id: "automations", label: "Automations" },
];

export default function CommunicationHubPage() {
  const [activeTab, setActiveTab] = useState("summary");
  const { range, setRange } = useDateRangeContext();

  return (
    <>
      <PageHeader
        title="Communication Hub"
        subtitle="Centralized communication analytics across all guest channels"
      />
      <div className="mb-8 flex items-center justify-between">
        <TabBar tabs={tabs} active={activeTab} onTabChange={setActiveTab} />
        <DateRangeSelector value={range} onChange={setRange} />
      </div>

      {activeTab === "summary" && <SummaryTab />}
      {activeTab === "inboxes" && <InboxesTab />}
      {activeTab === "contacts" && <ContactsTab />}
      {activeTab === "templates" && <TemplatesTab />}
      {activeTab === "automations" && <AutomationsTab />}
    </>
  );
}
