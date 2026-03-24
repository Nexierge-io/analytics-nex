import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ranges = [
  { id: "today", label: "Today" },
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "3m", label: "Last 3 months" },
] as const;

const rangeShortLabels: Record<string, string> = {
  today: "Today",
  "7d": "7d",
  "30d": "30d",
  "3m": "3m",
};

interface InlineDateFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export function InlineDateFilter({ value, onChange }: InlineDateFilterProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl bg-secondary p-1">
      {ranges.map((r) => (
        <button
          key={r.id}
          onClick={() => onChange(r.id)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all duration-150",
            value === r.id
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {rangeShortLabels[r.id]}
        </button>
      ))}
    </div>
  );
}

export type DateRange = (typeof ranges)[number]["id"];

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = ranges.find((r) => r.id === value)!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/20 active:scale-[0.97]"
      >
        <Calendar className="h-3.5 w-3.5 shrink-0" />
        <span>{current.label}</span>
        <ChevronDown className={cn("h-3 w-3 shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1.5 w-44 animate-fade-in rounded-xl border bg-card p-1 shadow-lg">
          {ranges.map((r) => (
            <button
              key={r.id}
              onClick={() => { onChange(r.id); setOpen(false); }}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-left text-xs transition-colors",
                r.id === value
                  ? "bg-secondary font-medium text-foreground"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
