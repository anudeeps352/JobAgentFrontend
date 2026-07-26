import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const filters = [
  { name: 'All', count: 32, active: true },
  { name: 'Applied', count: 12 },
  { name: 'OA', count: 8 },
  { name: 'Interviewing', count: 5 },
  { name: 'Offer', count: 3 },
  { name: 'Rejected', count: 4 },
  { name: 'Ghosted', count: 0 },
];

export default function FilterTabs() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter) => (
        <button
          key={filter.name}
          className={cn(
            'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors',
            filter.active
              ? 'border-violet-500 bg-violet-500/10 text-violet-400'
              : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700',
          )}
        >
          <span>{filter.name}</span>

          <Badge
            className={cn(
              'rounded-full',
              filter.active
                ? 'bg-violet-500 text-white'
                : 'bg-zinc-700 text-zinc-300',
            )}
          >
            {filter.count}
          </Badge>
        </button>
      ))}
    </div>
  );
}
