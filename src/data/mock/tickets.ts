// ═══════════════════════════════════════════════
// TAB 1 — SUMMARY
// ═══════════════════════════════════════════════

export const summaryActivityKpis = [
  { label: "Total Tickets Created", value: "347", change: "+18%", trend: "up" as const },
  { label: "Orders Placed (Room Service)", value: "124", change: "+21%", trend: "up" as const },
  { label: "Universal Requests", value: "184", change: "+14%", trend: "up" as const },
  { label: "Completion Rate", value: "91.4%", change: "+2.3%", trend: "up" as const, detail: "317 of 347 tickets" },
  { label: "Avg Response Time", value: "18min", change: "-4min", trend: "down" as const },
  { label: "SLA Breaches", value: "11", change: "-3", trend: "down" as const },
];

export const summaryLifetimeKpis = [
  { label: "Total Tickets All Time", value: "4,218" },
  { label: "Total Room Service Revenue", value: "$128,470" },
  { label: "Most Requested Item (RS)", value: "Club Sandwich" },
  { label: "Most Requested UR Type", value: "Extra Towels" },
  { label: "Top Department by Volume", value: "Housekeeping" },
];

// ═══════════════════════════════════════════════
// TAB 2 — GUEST APP
// ═══════════════════════════════════════════════

export const guestAppSessionKpis = [
  { label: "Total Sessions", value: "1,247", change: "+28%", trend: "up" as const },
  { label: "Via WhatsApp Link", value: "864", change: "+32%", trend: "up" as const, detail: "69.3% of sessions" },
  { label: "Via QR / Room Login", value: "383", change: "+19%", trend: "up" as const, detail: "30.7% of sessions" },
  { label: "Identity Verified", value: "1,084", change: "+26%", trend: "up" as const, detail: "86.9% of sessions" },
  { label: "Bounce Rate", value: "8.4%", change: "-1.2%", trend: "down" as const, detail: "105 of 1,247 sessions" },
];

export const guestAppConversionKpis = [
  { label: "Session → Order Conversion", value: "24.7%", change: "+3.1%", trend: "up" as const, detail: "308 of 1,247 sessions" },
  { label: "Orders Placed", value: "308", change: "+17%", trend: "up" as const },
  { label: "Orders Completed", value: "291", change: "+16%", trend: "up" as const, detail: "94.5% of orders placed" },
  { label: "Orders Cancelled", value: "12", change: "-3", trend: "down" as const, detail: "3.9% of orders placed" },
  { label: "Avg Order Value", value: "$28.40", change: "+$2.10", trend: "up" as const },
  { label: "Revenue Generated", value: "$8,640", change: "+$1,120", trend: "up" as const },
];

export const guestAppURKpis = [
  { label: "Universal Requests Submitted", value: "184", change: "+14%", trend: "up" as const },
  { label: "Completed", value: "168", change: "+12%", trend: "up" as const, detail: "91.3% of submitted" },
  { label: "Pending", value: "9", change: "-2", trend: "down" as const },
  { label: "Cancelled", value: "7", change: "-1", trend: "down" as const },
];

export const guestAppTopItems = [
  { name: "🛏️ Extra Towels", count: 47, rate: "94%" },
  { name: "🛏️ Extra Pillows", count: 38, rate: "97%" },
  { name: "💧 Water Bottles", count: 34, rate: "100%" },
  { name: "🧹 Room Cleaning", count: 28, rate: "89%" },
  { name: "🔧 Maintenance", count: 22, rate: "82%" },
];

export const guestAppSessionSourceData = [
  { name: "WhatsApp Link", value: 864, color: "hsl(var(--chart-1))" },
  { name: "QR / Room Login", value: 383, color: "hsl(var(--chart-2))" },
];

export const guestAppLifetimeKpis = [
  { label: "Unique Guests (All Time)", value: "3,842" },
  { label: "Total Orders (All Time)", value: "6,214" },
  { label: "Total UR (All Time)", value: "4,687" },
  { label: "Total Revenue (All Time)", value: "$176,340" },
];

// ═══════════════════════════════════════════════
// TAB 3 — TICKETS
// ═══════════════════════════════════════════════

export const ticketsBySourceKpis = [
  { label: "Universal Request", value: "184", change: "+14%", trend: "up" as const },
  { label: "Paid Service Order", value: "124", change: "+21%", trend: "up" as const },
  { label: "Staff Manual", value: "39", change: "+4", trend: "up" as const },
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
  { label: "Completion Rate", value: "91.4%", change: "+2.3%", trend: "up" as const, detail: "298 of 326 non-cancelled" },
  { label: "Avg Time to Accept", value: "6min", change: "-2min", trend: "down" as const },
  { label: "Avg Time to Complete", value: "42min", change: "-8min", trend: "down" as const },
  { label: "SLA Breaches", value: "11", change: "-3", trend: "down" as const, detail: "3.2% of 347 tickets" },
  { label: "Escalations", value: "7", change: "-2", trend: "down" as const, detail: "2.0% of 347 tickets" },
];

export const departmentData = [
  { name: "Housekeeping", tickets: 124, completed: 121, rate: "97.6%", avgTime: "18min", breaches: 1 },
  { name: "Room Service", tickets: 98, completed: 94, rate: "95.9%", avgTime: "32min", breaches: 2 },
  { name: "Front Desk", tickets: 62, completed: 56, rate: "90.3%", avgTime: "24min", breaches: 3 },
  { name: "Maintenance", tickets: 41, completed: 34, rate: "82.9%", avgTime: "58min", breaches: 4 },
  { name: "Concierge", tickets: 22, completed: 21, rate: "95.5%", avgTime: "14min", breaches: 1 },
  { name: "F&B", tickets: 18, completed: 17, rate: "94.4%", avgTime: "28min", breaches: 0 },
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

export const ticketLifetimeKpis = [
  { label: "Total Tickets (All Time)", value: "4,218" },
  { label: "Total Completed (All Time)", value: "3,947" },
  { label: "Lifetime Completion Rate", value: "93.6%", detail: "3,947 of 4,218 tickets" },
  { label: "Top Department (All Time)", value: "Housekeeping" },
];
