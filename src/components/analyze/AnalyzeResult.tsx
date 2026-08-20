import type { AnalysisResult } from '@/types/analysis';
import CriticalGaps from './CriticalGaps';
import Suggestions from './Suggestions';

interface Props {
  result: AnalysisResult;
  onSave: () => void;
  saving?: boolean;
}

export default function AnalyzeResult({ result, onSave, saving = false }: Props) {
  const scoreValue = Number.parseInt(result.score, 10);
  const displayedScore = Number.isNaN(scoreValue) ? result.score : scoreValue;

  return (
    <div className="rounded-xl border border-violet-500/30 bg-zinc-900 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
          {result.match}
        </span>
        <span className="text-xs text-zinc-500">{result.resume_used}</span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-zinc-400">{result.company}</p>
        <h2 className="text-2xl font-semibold text-white">{result.role}</h2>
      </div>

      <h2 className="mt-4 text-5xl font-bold">
        {displayedScore}
        <span className="text-2xl text-zinc-500">/10</span>
      </h2>

      <CriticalGaps gaps={result.gaps} />

      <Suggestions suggestions={result.suggestions} />

      <button onClick={onSave} disabled={saving} className="mt-6 w-full rounded-lg border border-zinc-700 py-3 disabled:opacity-50">
        {saving ? 'Saving...' : 'Add to Applications'}
      </button>
    </div>
  );
}
