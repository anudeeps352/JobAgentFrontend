import { Globe } from 'lucide-react';

export default function JobDescriptionInput() {
  return (
    <div className="space-y-5">
      <button className="flex h-12 w-full items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 hover:border-violet-500">
        <Globe className="mr-2 h-4 w-4" />
        Scan from page
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-zinc-800" />

        <span className="text-[10px] tracking-[0.3em] text-zinc-500">
          OR PASTE MANUALLY
        </span>

        <div className="h-px flex-1 bg-zinc-800" />
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <textarea
          rows={18}
          placeholder="Paste the full job description here..."
          className="w-full resize-none bg-transparent outline-none"
        />

        <div className="mt-4 text-right text-xs text-zinc-500">
          WORDS: 0 &nbsp; CHARS: 0
        </div>
      </div>
    </div>
  );
}
