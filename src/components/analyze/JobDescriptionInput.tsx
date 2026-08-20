import { Globe } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onScanClick?: () => void;
}

function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
}

export default function JobDescriptionInput({
  value,
  onChange,
  onScanClick,
}: Props) {
  const wordCount = countWords(value);
  const charCount = value.length;

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onScanClick}
        className="flex h-12 w-full items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 hover:border-violet-500"
      >
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
        <Textarea
          rows={18}
          placeholder="Paste the full job description here..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-[18rem] resize-none border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0"
        />

        <div className="mt-4 text-right text-xs text-zinc-500">
          WORDS: {wordCount} &nbsp; CHARS: {charCount}
        </div>
      </div>
    </div>
  );
}
