// ── Top Summary ──
export const ticketsSummaryActivityKpis = [
  { label: "Total Tickets", value: "347", change: "+18%", trend: "up" as const },
  { label: "Active Tickets", value: "42", change: "-6", trend: "down" as const },
  { label: "Avg Resolution Time", value: "1.8h", change: "-22min", trend: "down" as const },
  { label: "SLA Compliance", value: "94.7%", change: "+1.4%", trend: "up" as const, detail: "329 of 347 tickets" },
  { label: "Escalations", value: "11", change: "-3", trend: "down" as const },
  { label: "Reopened Tickets", value: "7", change: "-2", trend: "down" as const },
];

export const ticketsSummaryLifetimeKpis = [
  { label: "Total Paid Services Revenue", value: "$28,470", change: "+$3,240", trend: "up" as const },
];

// ── Ticket Types ──
export const paidServicesKpis = [
  { label: "Tickets Created", value: "124", change: "+21%", trend: "up" as const },
  { label: "Revenue Generated", value: "$8,640", change: "+$1,120", trend: "up" as const },
  { label: "Avg Fulfillment Time", value: "28min", change: "-4min", trend: "down" as const },
  { label: "Delivered Orders", value: "118", change: "+19", trend: "up" as const },
  { label: "Cancelled Orders", value: "6", change: "-1", trend: "down" as const },
];

export const universalRequestsKpis = [
  { label: "Requests Created", value: "184", change: "+14%", trend: "up" as const },
  { label: "Avg Resolution Time", value: "1.4h", change: "-18min", trend: "down" as const },
  { label: "SLA Compliance", value: "96.2%", change: "+0.8%", trend: "up" as const, detail: "177 of 184 requests" },
  { label: "Escalations", value: "7", change: "-2", trend: "down" as const },
];

export const manualTicketsKpis = [
  { label: "Tickets Created", value: "39", change: "+4", trend: "up" as const },
  { label: "Avg Resolution Time", value: "3.2h", change: "+12min", trend: "up" as const },
  { label: "SLA Compliance", value: "89.7%", change: "-1.2%", trend: "down" as const, detail: "35 of 39 tickets" },
  { label: "Reopened Tickets", value: "4", change: "+1", trend: "up" as const },
];

// ── Ordering App Adoption ──
export const orderingAppKpis = [
  { label: "App Opens", value: "1,247", change: "+28%", trend: "up" as const },
  { label: "Unique Guests", value: "412", change: "+22%", trend: "up" as const },
  { label: "Usage Rate", value: "54.3%", change: "+6.1%", trend: "up" as const, detail: "412 of 759 eligible guests" },
  { label: "Orders / Requests Created", value: "308", change: "+17%", trend: "up" as const },
  { label: "Guests with ≥1 Order", value: "247", change: "+31", trend: "up" as const },
  { label: "Conversion %", value: "59.9%", change: "+4.2%", trend: "up" as const, detail: "247 of 412 guests" },
];

// ── Catalog Adoption & Conversion ──
export const catalogAdoptionKpis = [
  { label: "AI Suggested Catalog", value: "864", change: "+32%", trend: "up" as const },
  { label: "Catalog Link Opened", value: "542", change: "+24%", trend: "up" as const },
  { label: "Catalog Open Rate", value: "62.7%", change: "+3.8%", trend: "up" as const, detail: "542 of 864 suggestions" },
  { label: "Guests Entered Catalog", value: "487", change: "+18%", trend: "up" as const },
  { label: "Guests Purchased", value: "118", change: "+14%", trend: "up" as const },
  { label: "Catalog Conversion %", value: "24.2%", change: "+2.1%", trend: "up" as const, detail: "118 of 487 guests" },
];

export const catalogEntrySourceKpis = [
  { label: "From WhatsApp Link", value: "398", change: "+21%", trend: "up" as const },
  { label: "From QR", value: "144", change: "+34%", trend: "up" as const },
  { label: "Orders from WhatsApp", value: "84", change: "+12%", trend: "up" as const },
  { label: "Orders from QR", value: "34", change: "+28%", trend: "up" as const },
];

// ── Universal Request Adoption ──
export const universalRequestAdoptionKpis = [
  { label: "From Ordering App", value: "128", change: "+19%", trend: "up" as const },
  { label: "From WhatsApp", value: "42", change: "+8%", trend: "up" as const },
  { label: "Manual by Staff", value: "14", change: "-2", trend: "down" as const },
  { label: "Guests Who Used", value: "164", change: "+24", trend: "up" as const },
  { label: "Usage Rate", value: "21.6%", change: "+2.8%", trend: "up" as const, detail: "164 of 759 eligible guests" },
];

export const topRequestTypes = [
  { name: "Extra Towels", count: 47 },
  { name: "Extra Pillows", count: 38 },
  { name: "Water Bottles", count: 34 },
  { name: "Room Cleaning", count: 28 },
  { name: "Maintenance", count: 22 },
  { name: "Late Checkout", count: 15 },
];

// ── Status Overview ──
export const ticketStatusData = [
  { name: "Pending", value: 8, color: "hsl(var(--chart-4))" },
  { name: "Accepted", value: 12, color: "hsl(var(--chart-2))" },
  { name: "In Progress", value: 14, color: "hsl(var(--chart-1))" },
  { name: "Done / Delivered", value: 298, color: "hsl(var(--kpi-positive))" },
  { name: "Cancelled", value: 8, color: "hsl(var(--muted-foreground))" },
  { name: "Escalated", value: 4, color: "hsl(var(--chart-5))" },
  { name: "Reopened", value: 3, color: "hsl(var(--kpi-negative))" },
];

// ── Departments Overview ──
export const departmentData = [
  { name: "Housekeeping", tickets: 124, avgTime: "1.2h", sla: "97.4%" },
  { name: "F&B", tickets: 98, avgTime: "32min", sla: "95.8%" },
  { name: "Front Desk", tickets: 62, avgTime: "2.1h", sla: "93.2%" },
  { name: "Maintenance", tickets: 41, avgTime: "3.8h", sla: "88.4%" },
  { name: "Concierge", tickets: 22, avgTime: "1.6h", sla: "96.1%" },
];
