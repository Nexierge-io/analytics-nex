import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { modules } from "@/lib/config/navigation";
import { ModuleSwitcher } from "./ModuleSwitcher";
import { DateRangeSelector, type DateRange } from "./DateRangeSelector";
import { DateRangeProvider } from "@/lib/DateRangeContext";
import { useTheme } from "@/hooks/use-theme";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const currentModule = modules.find((m) => m.path === location.pathname) ?? modules[0];
  const [dateRange, setDateRange] = useState<DateRange>("7d");
  const { theme, toggleTheme } = useTheme();

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
            <DateRangeSelector value={dateRange} onChange={setDateRange} />
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <ModuleSwitcher current={currentModule} />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-6 py-8">
        <DateRangeProvider value={dateRange}>
          {children}
        </DateRangeProvider>
      </main>
    </div>
  );
}
