import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/layout/AppShell";
import MainDashboardPage from "@/modules/main-dashboard/MainDashboardPage";
import CommunicationHubPage from "@/modules/communication-hub/CommunicationHubPage";
import TicketsRequestsPage from "@/modules/tickets-requests/TicketsRequestsPage";
import RoomsGuestsPage from "@/modules/rooms-guests/RoomsGuestsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/analytics-nex">
        <AppShell>
          <Routes>
            <Route path="/" element={<MainDashboardPage />} />
            <Route path="/communication-hub" element={<CommunicationHubPage />} />
            <Route path="/tickets-requests" element={<TicketsRequestsPage />} />
            <Route path="/rooms-guests" element={<RoomsGuestsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
