type StatusType = 'INTERVIEWING' | 'OA SENT' | 'APPLIED' | 'OFFER' | 'REJECTED';

interface StatusBadgeProps {
  status: StatusType;
}

const statusStyles: Record<StatusType, string> = {
  INTERVIEWING: 'bg-primary/20 text-primary',
  'OA SENT': 'bg-amber-500/20 text-amber-500',
  APPLIED: 'bg-muted text-muted-foreground',
  OFFER: 'bg-green-500/20 text-green-500',
  REJECTED: 'bg-red-500/20 text-red-500',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
