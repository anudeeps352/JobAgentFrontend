import { Search } from 'lucide-react';

export default function EmptyAnalysis() {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
        Empty State Reference
      </p>

      <div className="flex h-56 flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
        <Search className="mb-4 h-10 w-10 text-zinc-600" />

        <p className="text-zinc-500">
          Your fit analysis will appear here after scanning.
        </p>
      </div>
    </div>
  );
}
