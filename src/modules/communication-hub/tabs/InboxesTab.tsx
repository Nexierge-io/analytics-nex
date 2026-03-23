import { useState } from "react";
import { TabBar } from "@/components/analytics/TabBar";
import { WhatsAppSubTab } from "./WhatsAppSubTab";
import { WidgetSubTab } from "./WidgetSubTab";

const subtabs = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "widget", label: "Widget" },
];

export function InboxesTab() {
  const [subtab, setSubtab] = useState("whatsapp");

  return (
    <div className="space-y-6 animate-fade-in-up">
      <TabBar tabs={subtabs} active={subtab} onTabChange={setSubtab} variant="secondary" />
      {subtab === "whatsapp" && <WhatsAppSubTab />}
      {subtab === "widget" && <WidgetSubTab />}
    </div>
  );
}
