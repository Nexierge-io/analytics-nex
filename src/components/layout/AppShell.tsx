import { useLocation, useNavigate } from "react-router-dom";
import { modules } from "@/lib/config/navigation";
import { ModuleSwitcher } from "./ModuleSwitcher";
import { Calendar } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const currentModule = modules.find((m) => m.path === location.pathname) ?? modules[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              Nexierge
            </span>
            <div className="hidden h-5 w-px bg-border sm:block" />
            <span className="hidden text-sm text-muted-foreground sm:block">
              {currentModule.label}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Last 7 days</span>
            </button>
            <ModuleSwitcher current={currentModule} />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-6 py-8">
        {children}
      </main>
    </div>
  );
}
