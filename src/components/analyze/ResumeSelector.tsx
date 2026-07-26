import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface Props {
  resumes: { id: number; name: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export default function ResumeSelector({ resumes, selected, onChange }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-5">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
        Selected Resume
      </p>

      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {resumes.map((resume) => (
            <SelectItem key={resume.id} value={resume.name}>
              {resume.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="w-full bg-violet-600 hover:bg-violet-500">
        Analyze Fit
      </Button>
    </div>
  );
}
