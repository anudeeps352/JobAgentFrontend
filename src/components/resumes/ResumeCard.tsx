import { FileText, Pencil, Trash2 } from 'lucide-react';
import type { Resume } from '@/types/resume';
import { cn } from '@/lib/utils';

interface Props {
  resume: Resume;
}

const badgeColors = {
  default: 'bg-violet-500/10 text-violet-300 ring-1 ring-inset ring-violet-500/20',
  archive: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/20',
  fallback: 'bg-zinc-800 text-zinc-300 ring-1 ring-inset ring-zinc-700',
} as const;

function formatUploadedAt(uploadedAt: string) {
  const date = new Date(uploadedAt);

  if (Number.isNaN(date.getTime())) {
    return uploadedAt;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function ResumeCard({ resume }: Readonly<Props>) {
  const badgeClass =
    resume.label.toLowerCase() === 'default'
      ? badgeColors.default
      : resume.label.toLowerCase() === 'archive'
        ? badgeColors.archive
        : badgeColors.fallback;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-colors hover:border-zinc-700">
      <div className="flex justify-between">
        <span
          className={cn(
            'rounded-full px-3 py-1 text-[10px] uppercase tracking-widest',
            badgeClass,
          )}
        >
          {resume.label}
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded border border-zinc-700 p-2 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            <Pencil size={14} />
          </button>

          <button
            type="button"
            className="rounded border border-zinc-700 p-2 text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="rounded-lg bg-zinc-800 p-3">
          <FileText />
        </div>

        <div>
          <p className="font-medium">{resume.filename}</p>

          <p className="text-sm text-zinc-500">
            Uploaded {formatUploadedAt(resume.uploaded_at)}
          </p>
        </div>
      </div>
    </div>
  );
}
