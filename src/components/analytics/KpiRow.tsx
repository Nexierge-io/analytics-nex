import { cn } from "@/lib/utils";

interface KpiRowProps {
  children: React.ReactNode;
  className?: string;
}

export function KpiRow({ children, className }: KpiRowProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
}
