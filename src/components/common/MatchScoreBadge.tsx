interface MatchScoreBadgeProps {
  score: number;
}

export function MatchScoreBadge({ score }: MatchScoreBadgeProps) {
  const colorClass =
    score >= 85
      ? 'text-green-500'
      : score >= 70
        ? 'text-amber-500'
        : 'text-red-500';

  return <span className={`text-sm font-medium ${colorClass}`}>{score}%</span>;
}
