import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  detail?: string;
  allTime?: string;
  className?: string;
}

export function KpiCard({ label, value, change, trend = "neutral", detail, allTime, className }: KpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 shadow-[0_1px_3px_0_hsl(0_0%_0%/0.04)] transition-shadow hover:shadow-[0_2px_8px_0_hsl(0_0%_0%/0.06)]",
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      {detail && (
        <p className="mt-1 text-[11px] tabular-nums text-muted-foreground">{detail}</p>
      )}
      {allTime && (
        <p className="mt-1 text-[10px] tabular-nums text-muted-foreground/70">All time: {allTime}</p>
      )}
      {change && (
        <div className="mt-2 flex items-center gap-1">
          {trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-kpi-positive" />}
          {trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-kpi-negative" />}
          {trend === "neutral" && <Minus className="h-3.5 w-3.5 text-kpi-neutral" />}
          <span
            className={cn(
              "text-xs font-medium tabular-nums",
              trend === "up" && "text-kpi-positive",
              trend === "down" && "text-kpi-negative",
              trend === "neutral" && "text-kpi-neutral"
            )}
          >
            {change}
          </span>
        </div>
      )}
    </div>
  );
}
