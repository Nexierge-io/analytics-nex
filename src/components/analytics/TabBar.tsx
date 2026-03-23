import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: TabItem[];
  active: string;
  onTabChange: (id: string) => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function TabBar({ tabs, active, onTabChange, variant = "primary", className }: TabBarProps) {
  return (
    <div
      className={cn(
        "flex gap-1",
        variant === "primary" && "border-b",
        variant === "secondary" && "rounded-lg bg-secondary p-1",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors",
            variant === "primary" && [
              "border-b-2 -mb-px",
              active === tab.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            ],
            variant === "secondary" && [
              "rounded-md",
              active === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            ]
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
