// components/dashboard/QuickActions.tsx — ONLY the component, no data
import { Button } from '@/components/ui/button';

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  variant?: 'default' | 'outline';
  onClick?: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: Readonly<QuickActionsProps>) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <span className="text-xs uppercase tracking-wide text-muted-foreground mb-4 block">
        Quick Actions
      </span>
      <div className="space-y-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant ?? 'outline'}
            className="w-full justify-start gap-2"
            onClick={action.onClick}
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
