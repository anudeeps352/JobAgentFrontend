import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  applications: Array<{ status: string }>;
  selected: string;
  onChange: (status: string) => void;
}

const statuses = ['All', 'Planned', 'Applied', 'OA', 'Interviewing', 'Offer', 'Rejected', 'Ghosted', 'Withdrawn'];

export default function FilterTabs({ applications, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {statuses.map((name) => {
        const count = name === 'All'
          ? applications.length
          : applications.filter((application) => application.status.toLowerCase() === name.toLowerCase()).length;
        return (
        <button
          key={name}
          onClick={() => onChange(name)}
          className={cn(
            'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors',
            selected === name
              ? 'border-violet-500 bg-violet-500/10 text-violet-400'
              : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700',
          )}
        >
          <span>{name}</span>

          <Badge
            className={cn(
              'rounded-full',
              selected === name
                ? 'bg-violet-500 text-white'
                : 'bg-zinc-700 text-zinc-300',
            )}
          >
            {count}
          </Badge>
        </button>
        );
      })}
    </div>
  );
}
