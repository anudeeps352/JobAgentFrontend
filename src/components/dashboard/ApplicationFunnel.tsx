import { FunnelBar, type FunnelStage } from './FunnelBar';

interface ApplicationFunnelProps {
  stages: FunnelStage[];
}

export function ApplicationFunnel({ stages }: ApplicationFunnelProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 h-full">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        Application Funnel
      </span>
      <div className="space-y-5">
        {stages.map((stage) => (
          <FunnelBar key={stage.label} stage={stage}></FunnelBar>
        ))}
      </div>
    </div>
  );
}
