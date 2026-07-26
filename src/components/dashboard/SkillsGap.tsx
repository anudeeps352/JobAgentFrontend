export interface SkillGap {
  skill: string;
  matchesMissing: number;
}

interface SkillsGapProps {
  gaps: SkillGap[];
  insight: React.ReactNode;
}

export function SkillsGap({ gaps, insight }: SkillsGapProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <span className="text-xs uppercase tracking-wide text-muted-foreground mb-4 block">
        Top Skills Gap
      </span>
      <div className="space-y-3 mb-4">
        {gaps.map((gap) => (
          <div key={gap.skill} className="flex items-center justify-between">
            <span className="text-sm">{gap.skill}</span>
            <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
              {gap.matchesMissing} matches missing
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
        {insight}
      </p>
    </div>
  );
}
