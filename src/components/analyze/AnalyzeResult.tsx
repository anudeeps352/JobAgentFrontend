import type { AnalysisResult } from '@/types/analysis';
import CriticalGaps from './CriticalGaps';
import Suggestions from './Suggestions';

interface Props {
  result: AnalysisResult;
}

export default function AnalyzeResult({ result }: Props) {
  return (
    <div className="rounded-xl border border-violet-500/30 bg-zinc-900 p-6">
      <span className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-400">
        STRONG MATCH
      </span>

      <h2 className="mt-4 text-5xl font-bold">
        {result.score}
        <span className="text-2xl text-zinc-500">/10</span>
      </h2>

      <CriticalGaps gaps={result.gaps} />

      <Suggestions suggestions={result.suggestions} />

      <button className="mt-6 w-full rounded-lg border border-zinc-700 py-3">
        Save to History
      </button>
    </div>
  );
}
