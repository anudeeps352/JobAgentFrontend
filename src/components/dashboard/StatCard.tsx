import { cn } from '@/lib/utils';
import { Sparkline } from './Sparkline';

interface StatCardProps {
  label: string;
  value: string | number;
  delta: { value: string; direction: 'up' | 'down' };
  sparklineData: number[];
  color: 'purple' | 'green' | 'red';
}

export function StatCard({
  label,
  value,
  delta,
  sparklineData,
  color,
}: Readonly<StatCardProps>) {
  const isUp = delta.direction === 'up';
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span
          className={cn(
            'text-xs font-medium flex items-center gap-0.5',
            isUp ? 'text-green-500' : 'text-red-500',
          )}
        >
          {isUp ? '↑' : '↓'} {delta.value}
        </span>
      </div>
      <div className="text-2xl font-semibold mb-3">{value}</div>
      <Sparkline data={sparklineData} color={color} />
    </div>
  );
}
