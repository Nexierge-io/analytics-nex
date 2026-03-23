// ── Communication Hub Summary ──
export const communicationKpis = [
  { label: "Conversations", value: "1,284", change: "+12%", trend: "up" as const },
  { label: "Messages", value: "8,471", change: "+8.3%", trend: "up" as const },
  { label: "New Contacts", value: "163", change: "+24%", trend: "up" as const },
  { label: "WhatsApp Verified %", value: "94.2%", change: "+1.8%", trend: "up" as const },
  { label: "AI Handled %", value: "71.3%", change: "+5.2%", trend: "up" as const },
  { label: "Human Handled %", value: "28.7%", change: "-5.2%", trend: "down" as const },
  { label: "Handoffs Requested", value: "38", change: "-14%", trend: "down" as const },
  { label: "Widget Conversion %", value: "18.7%", change: "+3.1%", trend: "up" as const },
];

export const messageVolumeData = [
  { date: "Mon", whatsapp: 320, widget: 85 },
  { date: "Tue", whatsapp: 380, widget: 102 },
  { date: "Wed", whatsapp: 410, widget: 94 },
  { date: "Thu", whatsapp: 365, widget: 110 },
  { date: "Fri", whatsapp: 440, widget: 128 },
  { date: "Sat", whatsapp: 520, widget: 145 },
  { date: "Sun", whatsapp: 490, widget: 132 },
];

export const channelDistribution = [
  { name: "WhatsApp", value: 62, fill: "hsl(var(--chart-1))" },
  { name: "Widget", value: 23, fill: "hsl(var(--chart-2))" },
  { name: "Email", value: 10, fill: "hsl(var(--chart-3))" },
  { name: "SMS", value: 5, fill: "hsl(var(--chart-4))" },
];

export const responseTimeData = [
  { hour: "6am", avg: 45 },
  { hour: "8am", avg: 32 },
  { hour: "10am", avg: 28 },
  { hour: "12pm", avg: 55 },
  { hour: "2pm", avg: 42 },
  { hour: "4pm", avg: 38 },
  { hour: "6pm", avg: 65 },
  { hour: "8pm", avg: 48 },
  { hour: "10pm", avg: 72 },
];

export const activityByHour = [
  { hour: "00", count: 12 }, { hour: "02", count: 5 }, { hour: "04", count: 3 },
  { hour: "06", count: 18 }, { hour: "08", count: 65 }, { hour: "10", count: 124 },
  { hour: "12", count: 98 }, { hour: "14", count: 142 }, { hour: "16", count: 118 },
  { hour: "18", count: 87 }, { hour: "20", count: 54 }, { hour: "22", count: 28 },
];

// ── WhatsApp subtab ──
export const whatsappKpis = [
  { label: "Conversations", value: "862", change: "+9%", trend: "up" as const },
  { label: "Messages", value: "5,218", change: "+11%", trend: "up" as const },
  { label: "AI Handled %", value: "74.1%", change: "+3.8%", trend: "up" as const },
  { label: "Human Handled %", value: "25.9%", change: "-3.8%", trend: "down" as const },
  { label: "Handoffs Requested", value: "24", change: "-6", trend: "down" as const },
  { label: "New Contacts", value: "97", change: "+18%", trend: "up" as const },
  { label: "WhatsApp Verified", value: "812", change: "+42", trend: "up" as const },
];

export const whatsappConvoData = [
  { date: "Mon", value: 98 }, { date: "Tue", value: 124 },
  { date: "Wed", value: 131 }, { date: "Thu", value: 108 },
  { date: "Fri", value: 142 }, { date: "Sat", value: 168 },
  { date: "Sun", value: 152 },
];

export const whatsappMessagesData = [
  { date: "Mon", value: 620 }, { date: "Tue", value: 780 },
  { date: "Wed", value: 845 }, { date: "Thu", value: 710 },
  { date: "Fri", value: 890 }, { date: "Sat", value: 1040 },
  { date: "Sun", value: 960 },
];

export const aiVsHumanPie = [
  { name: "AI Handled", value: 74.1, fill: "hsl(var(--chart-1))" },
  { name: "Human Handled", value: 25.9, fill: "hsl(var(--chart-3))" },
];

// ── Widget subtab ──
export const widgetKpis = [
  { label: "Sessions Started", value: "2,847", change: "+16%", trend: "up" as const },
  { label: "Gate Reached %", value: "68.3%", change: "+4.2%", trend: "up" as const },
  { label: "Identity Collected %", value: "42.1%", change: "+2.8%", trend: "up" as const },
  { label: "WhatsApp Clicked %", value: "31.4%", change: "+5.1%", trend: "up" as const },
  { label: "WA Msg Received %", value: "24.8%", change: "+3.2%", trend: "up" as const },
  { label: "Contacts Created", value: "163", change: "+24", trend: "up" as const },
  { label: "Conversations Created", value: "422", change: "+18%", trend: "up" as const },
  { label: "Widget Conversion %", value: "18.7%", change: "+3.1%", trend: "up" as const },
  { label: "Drop-off %", value: "57.9%", change: "-4.2%", trend: "down" as const },
];

export const widgetSessionsData = [
  { date: "Mon", value: 340 }, { date: "Tue", value: 412 },
  { date: "Wed", value: 388 }, { date: "Thu", value: 445 },
  { date: "Fri", value: 478 }, { date: "Sat", value: 510 },
  { date: "Sun", value: 468 },
];

export const widgetFunnelData = [
  { stage: "Sessions", value: 2847 },
  { stage: "Gate Reached", value: 1945 },
  { stage: "Identity Collected", value: 1199 },
  { stage: "WA Clicked", value: 894 },
  { stage: "WA Msg Received", value: 706 },
  { stage: "Contacts Created", value: 163 },
];

export const widgetConversionsData = [
  { date: "Mon", conversions: 48, sessions: 340 },
  { date: "Tue", conversions: 62, sessions: 412 },
  { date: "Wed", conversions: 55, sessions: 388 },
  { date: "Thu", conversions: 71, sessions: 445 },
  { date: "Fri", conversions: 78, sessions: 478 },
  { date: "Sat", conversions: 84, sessions: 510 },
  { date: "Sun", conversions: 76, sessions: 468 },
];

// ── Contacts tab ──
export const contactsKpis = [
  { label: "Total Contacts", value: "4,218", change: "+163", trend: "up" as const },
  { label: "New Contacts", value: "163", change: "+24%", trend: "up" as const },
  { label: "WhatsApp Verified %", value: "94.2%", change: "+1.8%", trend: "up" as const },
  { label: "Returning Guests", value: "1,847", change: "+12%", trend: "up" as const },
];

export const contactsByCategory = [
  { name: "Unknown", value: 842 },
  { name: "Lead", value: 1264 },
  { name: "Guest", value: 1548 },
  { name: "Past Guest", value: 564 },
];

export const contactsByStage = [
  { name: "Pre-arrival", value: 1124 },
  { name: "In-stay", value: 1548 },
  { name: "Post-stay", value: 1546 },
];

export const contactsByOrigin = [
  { name: "WhatsApp", value: 2108 },
  { name: "Widget", value: 1264 },
  { name: "Manual", value: 524 },
  { name: "Staff", value: 322 },
];

// ── Templates tab ──
export const templatesKpis = [
  { label: "Templates Sent", value: "3,847", change: "+14%", trend: "up" as const },
  { label: "Templates Today", value: "142", change: "+8%", trend: "up" as const },
  { label: "Templates This Week", value: "847", change: "+11%", trend: "up" as const },
  { label: "Templates This Month", value: "3,847", change: "+14%", trend: "up" as const },
];

export const templatesOverTime = [
  { date: "Week 1", value: 820 }, { date: "Week 2", value: 945 },
  { date: "Week 3", value: 1012 }, { date: "Week 4", value: 1070 },
];

export const mostUsedTemplates = [
  { name: "Check-in Reminder", count: 847, pct: 22 },
  { name: "Booking Confirmation", count: 724, pct: 18.8 },
  { name: "Welcome Message", count: 612, pct: 15.9 },
  { name: "Post-Stay Survey", count: 498, pct: 12.9 },
  { name: "Special Offer", count: 382, pct: 9.9 },
];

// ── Automations tab ──
export const automationsKpis = [
  { label: "Automations Triggered", value: "2,164", change: "+22%", trend: "up" as const },
  { label: "Automations Today", value: "87", change: "+12%", trend: "up" as const },
  { label: "Automations This Week", value: "542", change: "+18%", trend: "up" as const },
  { label: "Automations This Month", value: "2,164", change: "+22%", trend: "up" as const },
];

export const automationsByType = [
  { name: "Welcome Flow", value: 684 },
  { name: "Pre-arrival", value: 542 },
  { name: "In-stay Check", value: 412 },
  { name: "Post-stay Follow-up", value: 326 },
  { name: "Re-engagement", value: 200 },
];

export const automationsOverTime = [
  { date: "Week 1", value: 480 }, { date: "Week 2", value: 512 },
  { date: "Week 3", value: 564 }, { date: "Week 4", value: 608 },
];

export const mostTriggeredAutomation = {
  name: "Welcome Flow",
  count: 684,
  pct: 31.6,
};

// ── Other module KPIs ──
export const mainDashboardKpis = [
  { label: "Occupancy Rate", value: "87.4%", change: "+2.1%", trend: "up" as const },
  { label: "RevPAR", value: "$142", change: "+6.8%", trend: "up" as const },
  { label: "Guest Satisfaction", value: "4.7/5", change: "+0.2", trend: "up" as const },
  { label: "Open Tickets", value: "23", change: "-8%", trend: "down" as const },
];

export const ticketsKpis = [
  { label: "Open Tickets", value: "23", change: "-3", trend: "down" as const },
  { label: "Avg Resolution", value: "2.4h", change: "-18min", trend: "down" as const },
  { label: "SLA Compliance", value: "96.1%", change: "+1.2%", trend: "up" as const },
];

export const roomsKpis = [
  { label: "Occupied Rooms", value: "187/214", change: "+4", trend: "up" as const },
  { label: "Check-ins Today", value: "34", change: "+12", trend: "up" as const },
  { label: "Check-outs Today", value: "28", change: "-2", trend: "down" as const },
];
