import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { modules, type ModuleConfig } from "@/lib/config/navigation";
import { ChevronDown, Check } from "lucide-react";

interface ModuleSwitcherProps {
  current: ModuleConfig;
}

export function ModuleSwitcher({ current }: ModuleSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
        className="flex items-center gap-2 rounded-lg border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
      >
        <current.icon className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 animate-fade-in rounded-xl border bg-card p-1.5 shadow-lg">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                navigate(mod.path);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary"
            >
              <mod.icon className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="font-medium text-foreground">{mod.label}</div>
                <div className="text-xs text-muted-foreground">{mod.description}</div>
              </div>
              {mod.id === current.id && (
                <Check className="h-4 w-4 text-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
