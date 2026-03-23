import { LayoutDashboard, MessageSquare, TicketCheck, BedDouble } from "lucide-react";

export interface ModuleConfig {
  id: string;
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  description: string;
}

export const modules: ModuleConfig[] = [
  {
    id: "main-dashboard",
    label: "Main Dashboard",
    path: "/",
    icon: LayoutDashboard,
    description: "Overview & key metrics",
  },
  {
    id: "communication-hub",
    label: "Communication Hub",
    path: "/communication-hub",
    icon: MessageSquare,
    description: "Guest messaging & channels",
  },
  {
    id: "tickets-requests",
    label: "Tickets & Requests",
    path: "/tickets-requests",
    icon: TicketCheck,
    description: "Service requests & tasks",
  },
  {
    id: "rooms-guests",
    label: "Rooms & Guests",
    path: "/rooms-guests",
    icon: BedDouble,
    description: "Room management & profiles",
  },
];
