import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import type { Resume } from '@/types/resume';

interface Props {
  resumes: Resume[];
  selected: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  analyzing?: boolean;
  disabled?: boolean;
}

export default function ResumeSelector({
  resumes,
  selected,
  onChange,
  onAnalyze,
  analyzing = false,
  disabled = false,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-5">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
        Selected Resume
      </p>

      <Select value={selected} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {resumes.map((resume) => (
            <SelectItem key={resume.id} value={resume.id}>
              {resume.label || resume.filename}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        type="button"
        onClick={onAnalyze}
        disabled={disabled || analyzing || !selected}
        className="w-full bg-violet-600 hover:bg-violet-500"
      >
        {analyzing ? 'Analyzing...' : 'Analyze Fit'}
      </Button>
    </div>
  );
}
