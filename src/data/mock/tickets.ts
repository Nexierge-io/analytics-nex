// ═══════════════════════════════════════════════
// TAB 1 — SUMMARY
// ═══════════════════════════════════════════════

export const summaryRevenueHero = {
  periodRevenue: "$12,450",
  allTimeRevenue: "$89,230",
  breakdown: "Room Service",
  change: "+18%",
  trend: "up" as const,
};

export const summaryPaidServicesKpis = [
  { label: "Orders Placed", value: "124", change: "+21%", trend: "up" as const, allTime: "2,847" },
  { label: "Orders Completed", value: "118", change: "+19%", trend: "up" as const, detail: "95.2% of placed", allTime: "2,714" },
  { label: "Orders Cancelled", value: "6", change: "-2", trend: "down" as const, detail: "4.8% of placed", allTime: "133" },
  { label: "Avg Order Value", value: "$28.40", change: "+$2.10", trend: "up" as const },
  { label: "Conversion Rate", value: "9.8%", change: "+1.2%", trend: "up" as const, detail: "124 of 1,264 sessions" },
];

export const summaryUniversalRequestsKpis = [
  { label: "Requests Submitted", value: "184", change: "+14%", trend: "up" as const, allTime: "4,687" },
  { label: "Requests Completed", value: "168", change: "+12%", trend: "up" as const, detail: "91.3% of submitted", allTime: "4,312" },
  { label: "Requests Cancelled", value: "7", change: "-1", trend: "down" as const, detail: "3.8% of submitted", allTime: "198" },
  { label: "Avg Completion Time", value: "14min", change: "-3min", trend: "down" as const },
];

export const summaryOperationalKpis = [
  { label: "Total Tickets Created", value: "347", change: "+18%", trend: "up" as const, allTime: "4,218" },
  { label: "Completion Rate", value: "91.4%", change: "+2.3%", trend: "up" as const, detail: "317 of 347 tickets" },
  { label: "Avg Response Time", value: "18min", change: "-4min", trend: "down" as const },
  { label: "SLA Breaches", value: "11", change: "-3", trend: "down" as const, allTime: "187" },
];

// ═══════════════════════════════════════════════
// TAB 2 — GUEST APP
// ═══════════════════════════════════════════════

export const guestAppSessionKpis = [
  { label: "Total Sessions", value: "1,264", change: "+28%", trend: "up" as const, allTime: "18,420" },
  { label: "Via WhatsApp Link", value: "876", change: "+32%", trend: "up" as const, detail: "69.3% of sessions", allTime: "12,840" },
  { label: "Via QR / Room Login", value: "388", change: "+19%", trend: "up" as const, detail: "30.7% of sessions", allTime: "5,580" },
  { label: "Identity Verified", value: "1,100", change: "+26%", trend: "up" as const, detail: "87.0% of sessions", allTime: "16,014" },
  { label: "Bounce Rate", value: "8.4%", change: "-1.2%", trend: "down" as const, detail: "106 of 1,264 sessions" },
];

export const guestAppSessionSourceData = [
  { name: "WhatsApp Link", value: 876, color: "hsl(var(--chart-1))" },
  { name: "QR / Room Login", value: 388, color: "hsl(var(--chart-2))" },
];

// Paid Services funnel (Room Service)
export const guestAppPaidFunnel = [
  { step: "Opened Catalog", value: 412, allTime: 6240 },
  { step: "Added to Cart", value: 218, allTime: 3680 },
  { step: "Completed Order", value: 124, allTime: 2847 },
];

export const guestAppPaidRevenueKpi = {
  label: "Revenue",
  value: "$8,640",
  change: "+$1,120",
  trend: "up" as const,
  allTime: "$89,230",
};

export const guestAppTopOrderedItems = [
  { name: "🥪 Club Sandwich", count: 34, revenue: "$612" },
  { name: "🍔 Wagyu Burger", count: 28, revenue: "$840" },
  { name: "🥗 Caesar Salad", count: 24, revenue: "$360" },
  { name: "🍝 Truffle Pasta", count: 19, revenue: "$570" },
  { name: "☕ Espresso", count: 17, revenue: "$68" },
];

// Universal Requests funnel (Free)
export const guestAppURFunnel = [
  { step: "Opened Requests", value: 328, allTime: 5120 },
  { step: "Submitted Request", value: 184, allTime: 4687 },
];

export const guestAppURCompletionKpi = {
  label: "Completion Rate",
  value: "91.3%",
  change: "+2.1%",
  trend: "up" as const,
  detail: "168 of 184 submitted",
};

export const guestAppTopRequestedItems = [
  { name: "🛏️ Extra Towels", count: 47, allTime: 842, rate: "94%" },
  { name: "🛏️ Extra Pillows", count: 38, allTime: 614, rate: "97%" },
  { name: "💧 Water Bottles", count: 34, allTime: 580, rate: "100%" },
  { name: "🧹 Room Cleaning", count: 28, allTime: 492, rate: "89%" },
  { name: "🔧 Maintenance", count: 22, allTime: 378, rate: "82%" },
];

// ═══════════════════════════════════════════════
// TAB 3 — TICKETS
// ═══════════════════════════════════════════════

export const ticketsBySourceKpis = [
  { label: "Paid Service Order", value: "124", change: "+21%", trend: "up" as const, allTime: "2,847" },
  { label: "Universal Request", value: "184", change: "+14%", trend: "up" as const, allTime: "4,687" },
  { label: "Staff Manual", value: "39", change: "+4", trend: "up" as const, allTime: "684" },
];

export const ticketStatusData = [
  { name: "NEW", value: 8, color: "hsl(var(--chart-4))" },
  { name: "ACCEPTED", value: 12, color: "hsl(var(--chart-2))" },
  { name: "IN_PROGRESS", value: 14, color: "hsl(var(--chart-1))" },
  { name: "ON_HOLD", value: 5, color: "hsl(var(--chart-3))" },
  { name: "DONE", value: 298, color: "hsl(var(--kpi-positive))" },
  { name: "CANCELLED", value: 7, color: "hsl(var(--muted-foreground))" },
  { name: "EXPIRED", value: 3, color: "hsl(var(--kpi-negative))" },
];

export const ticketPerformanceKpis = [
  { label: "Completion Rate", value: "91.4%", change: "+2.3%", trend: "up" as const, detail: "298 of 326 non-cancelled", allTime: "93.6%" },
  { label: "Avg Time to Accept", value: "6min", change: "-2min", trend: "down" as const },
  { label: "Avg Time to Complete", value: "42min", change: "-8min", trend: "down" as const },
  { label: "SLA Breaches", value: "11", change: "-3", trend: "down" as const, detail: "3.2% of 347 tickets", allTime: "187" },
  { label: "Escalations", value: "7", change: "-2", trend: "down" as const, detail: "2.0% of 347 tickets", allTime: "124" },
];

export const departmentData = [
  { name: "Housekeeping", tickets: 124, completed: 121, rate: "97.6%", avgTime: "18min", breaches: 1, allTimeTickets: 1842, allTimeCompleted: 1798 },
  { name: "Room Service", tickets: 98, completed: 94, rate: "95.9%", avgTime: "32min", breaches: 2, allTimeTickets: 1420, allTimeCompleted: 1362 },
  { name: "Front Desk", tickets: 62, completed: 56, rate: "90.3%", avgTime: "24min", breaches: 3, allTimeTickets: 894, allTimeCompleted: 807 },
  { name: "Maintenance", tickets: 41, completed: 34, rate: "82.9%", avgTime: "58min", breaches: 4, allTimeTickets: 612, allTimeCompleted: 508 },
  { name: "Concierge", tickets: 22, completed: 21, rate: "95.5%", avgTime: "14min", breaches: 1, allTimeTickets: 318, allTimeCompleted: 304 },
  { name: "F&B", tickets: 18, completed: 17, rate: "94.4%", avgTime: "28min", breaches: 0, allTimeTickets: 264, allTimeCompleted: 249 },
];

export const topURTypes = [
  { name: "🛏️ Extra Towels", count: 47, rate: "94%" },
  { name: "🛏️ Extra Pillows", count: 38, rate: "97%" },
  { name: "💧 Water Bottles", count: 34, rate: "100%" },
  { name: "🧹 Room Cleaning", count: 28, rate: "89%" },
  { name: "🔧 Maintenance Request", count: 22, rate: "82%" },
];

export const topRSItems = [
  { name: "🥪 Club Sandwich", count: 34, revenue: "$612" },
  { name: "🍔 Wagyu Burger", count: 28, revenue: "$840" },
  { name: "🥗 Caesar Salad", count: 24, revenue: "$360" },
  { name: "🍝 Truffle Pasta", count: 19, revenue: "$570" },
  { name: "☕ Espresso", count: 17, revenue: "$68" },
];
