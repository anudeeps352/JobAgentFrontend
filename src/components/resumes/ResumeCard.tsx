import { FileText, Pencil, Trash2 } from 'lucide-react';
import type { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';

interface Props {
  resume: Resume;
}

const badgeColors = {
  purple: 'bg-violet-500/10 text-violet-400',
  green: 'bg-emerald-500/10 text-emerald-400',
  gray: 'bg-zinc-700 text-zinc-300',
} as const;

export default function ResumeCard({ resume }: Readonly<Props>) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex justify-between">
        <span
          className={cn(
            'rounded-full px-3 py-1 text-[10px] uppercase tracking-widest',
            badgeColors[resume.color],
          )}
        >
          {resume.role}
        </span>

        <div className="flex gap-2">
          <button className="rounded border border-zinc-700 p-2">
            <Pencil size={14} />
          </button>

          <button className="rounded border border-zinc-700 p-2">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="rounded-lg bg-zinc-800 p-3">
          <FileText />
        </div>

        <div>
          <p className="font-medium">{resume.name}</p>

          <p className="text-sm text-zinc-500">{resume.uploaded}</p>
        </div>
      </div>
    </div>
  );
}
