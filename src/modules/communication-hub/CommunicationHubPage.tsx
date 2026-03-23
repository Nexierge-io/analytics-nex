import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { TabBar } from "@/components/analytics/TabBar";
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

  return (
    <>
      <PageHeader
        title="Communication Hub"
        subtitle="Centralized communication analytics across all guest channels"
      />
      <TabBar tabs={tabs} active={activeTab} onTabChange={setActiveTab} className="mb-8" />

      {activeTab === "summary" && <SummaryTab />}
      {activeTab === "inboxes" && <InboxesTab />}
      {activeTab === "contacts" && <ContactsTab />}
      {activeTab === "templates" && <TemplatesTab />}
      {activeTab === "automations" && <AutomationsTab />}
    </>
  );
}
