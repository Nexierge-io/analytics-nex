export const communicationKpis = [
  { label: "Conversations Today", value: "284", change: "+12%", trend: "up" as const },
  { label: "Messages Today", value: "1,847", change: "+8%", trend: "up" as const },
  { label: "New Contacts This Week", value: "63", change: "+24%", trend: "up" as const },
  { label: "WhatsApp Verified %", value: "94.2%", change: "+1.8%", trend: "up" as const },
  { label: "AI Handled %", value: "71.3%", change: "+5.2%", trend: "up" as const },
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
