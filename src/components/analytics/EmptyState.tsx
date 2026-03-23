import { cn } from "@/lib/utils";
import { Construction } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, className, icon }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 px-8 py-16 text-center",
        className
      )}
    >
      <div className="mb-4 rounded-xl bg-secondary p-3">
        {icon ?? <Construction className="h-5 w-5 text-muted-foreground" />}
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
