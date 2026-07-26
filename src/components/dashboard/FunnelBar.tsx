import { cn } from '@/lib/utils';

export interface FunnelStage {
  label: string;
  value: number;
  widthPercent: number;
  dropPercent?: string;
}

export function FunnelBar({ stage }: { stage: Readonly<FunnelStage> }) {
  const hasIndent = Boolean(stage.dropPercent);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        {stage.dropPercent && (
          <span className="text-xs text-red-500 w-8 shrink-0">
            {stage.dropPercent}
          </span>
        )}
        <span className="text-sm">{stage.label}</span>
        <span className="text-sm ml-auto">{stage.value}</span>
      </div>
      <div
        className={cn(
          'h-2 rounded-full bg-muted overflow-hidden',
          hasIndent ? 'ml-10' : 'w-full',
        )}
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${stage.widthPercent}%` }}
        />
      </div>
    </div>
  );
}
