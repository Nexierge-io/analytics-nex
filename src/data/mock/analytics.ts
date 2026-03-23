// ── Communication Hub Summary ──
export const summaryActivityKpis = [
  { label: "Conversations", value: "1,284", change: "+12%", trend: "up" as const },
  { label: "Messages", value: "8,471", change: "+8.3%", trend: "up" as const },
  { label: "New Contacts", value: "163", change: "+24%", trend: "up" as const },
  { label: "AI Handled %", value: "71.3%", change: "+5.2%", trend: "up" as const, detail: "916 of 1,284 conversations" },
  { label: "Handoffs", value: "38", change: "-14%", trend: "down" as const },
  { label: "Widget Conversion %", value: "18.7%", change: "+3.1%", trend: "up" as const, detail: "240 of 1,284 conversations" },
];

export const summaryLifetimeKpis = [
  { label: "Total Contacts", value: "4,218", change: "+163", trend: "up" as const },
  { label: "WhatsApp Verified %", value: "94.2%", change: "+1.8%", trend: "up" as const, detail: "3,973 of 4,218 contacts" },
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
export const whatsappActivityKpis = [
  { label: "Conversations", value: "862", change: "+9%", trend: "up" as const },
  { label: "Messages", value: "5,218", change: "+11%", trend: "up" as const },
  { label: "AI Handled %", value: "74.1%", change: "+3.8%", trend: "up" as const, detail: "639 of 862 conversations" },
  { label: "Handoffs", value: "24", change: "-6", trend: "down" as const },
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
export const widgetActivityKpis = [
  { label: "Sessions Started", value: "2,847", change: "+16%", trend: "up" as const },
  { label: "Conversations", value: "1,422", change: "+12%", trend: "up" as const },
  { label: "Messages", value: "4,218", change: "+14%", trend: "up" as const },
  { label: "Gate Reached %", value: "62.4%", change: "+3.1%", trend: "up" as const, detail: "1,777 of 2,847 sessions" },
  { label: "Identity Collected %", value: "38.7%", change: "+2.8%", trend: "up" as const, detail: "1,102 of 2,847 sessions" },
  { label: "WA Message Received %", value: "24.1%", change: "+1.9%", trend: "up" as const, detail: "686 of 2,847 sessions" },
  { label: "Widget Conversion %", value: "24.1%", change: "+1.9%", trend: "up" as const, detail: "686 of 2,847 sessions" },
];

export const widgetFunnelSteps = [
  { label: "Sessions Started", value: 2847, pct: 100 },
  { label: "Gate Reached", value: 1777, pct: 62.4 },
  { label: "Identity Collected", value: 1102, pct: 38.7 },
  { label: "WA Message Received", value: 686, pct: 24.1 },
];

export const widgetCloseReasons = [
  { label: "Migrated to WhatsApp", value: 686, pct: 24.1, color: "hsl(var(--chart-1))" },
  { label: "Dropped Off", value: 2014, pct: 70.7, color: "hsl(var(--chart-3))" },
  { label: "Spam / Bot", value: 147, pct: 5.2, color: "hsl(var(--chart-4))" },
];

export const widgetLifetimeKpis = [
  { label: "Total Sessions", value: "48,312" },
  { label: "Total Identities Collected", value: "18,694" },
  { label: "Total WA Conversions", value: "11,647" },
  { label: "Total Dropped Off", value: "34,122" },
];

// ── Contacts tab ──
export const contactsLifetimeKpis = [
  { label: "Total Contacts", value: "4,218", change: "+163", trend: "up" as const },
  { label: "WhatsApp Verified %", value: "94.2%", change: "+1.8%", trend: "up" as const, detail: "3,973 of 4,218 contacts" },
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

export const contactsActivityKpis = [
  { label: "New Contacts", value: "163", change: "+24%", trend: "up" as const },
  { label: "From WhatsApp", value: "97", change: "+18%", trend: "up" as const },
  { label: "From Widget", value: "42", change: "+31%", trend: "up" as const },
  { label: "Manual", value: "14", change: "+2", trend: "up" as const },
  
];

export const contactCreationTrendData = [
  { date: "Mon", whatsapp: 12, widget: 5, manual: 2, staff: 1 },
  { date: "Tue", whatsapp: 15, widget: 7, manual: 2, staff: 2 },
  { date: "Wed", whatsapp: 14, widget: 6, manual: 3, staff: 1 },
  { date: "Thu", whatsapp: 13, widget: 8, manual: 1, staff: 2 },
  { date: "Fri", whatsapp: 16, widget: 6, manual: 2, staff: 1 },
  { date: "Sat", whatsapp: 15, widget: 5, manual: 2, staff: 2 },
  { date: "Sun", whatsapp: 12, widget: 5, manual: 2, staff: 1 },
];

export const contactsByOrigin = [
  { name: "WhatsApp", value: 2108 },
  { name: "Widget", value: 1264 },
  { name: "Manual", value: 524 },
  { name: "Staff", value: 322 },
];

// ── Other module KPIs ──
export const mainDashboardKpis = [
  { label: "Occupancy Rate", value: "87.4%", change: "+2.1%", trend: "up" as const, detail: "187 of 214 rooms" },
  { label: "RevPAR", value: "$142", change: "+6.8%", trend: "up" as const },
  { label: "Guest Satisfaction", value: "4.7/5", change: "+0.2", trend: "up" as const },
  { label: "Open Tickets", value: "23", change: "-8%", trend: "down" as const },
];

export const ticketsKpis = [
  { label: "Open Tickets", value: "23", change: "-3", trend: "down" as const },
  { label: "Avg Resolution", value: "2.4h", change: "-18min", trend: "down" as const },
  { label: "SLA Compliance", value: "96.1%", change: "+1.2%", trend: "up" as const, detail: "296 of 308 tickets" },
];

export const roomsKpis = [
  { label: "Occupied Rooms", value: "187/214", change: "+4", trend: "up" as const },
  { label: "Check-ins Today", value: "34", change: "+12", trend: "up" as const },
  { label: "Check-outs Today", value: "28", change: "-2", trend: "down" as const },
];
