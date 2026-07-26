import { useState } from 'react';
import { FileText } from 'lucide-react';

import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { ResumeOption } from '@/types/settings';

interface Props {
  resumes: ResumeOption[];
}

export default function DefaultResumeCard({ resumes }: Props) {
  const [selectedResume, setSelectedResume] = useState(resumes[0]?.name ?? '');

  return (
    <Card className="border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-lg bg-blue-500/10 p-3">
          <FileText className="h-5 w-5 text-blue-400" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Default Resume</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Select the resume used by default for new analyses.
          </p>
        </div>
      </div>

      <Select value={selectedResume} onValueChange={setSelectedResume}>
        <SelectTrigger className="border-zinc-800 bg-black">
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

      <p className="mt-4 text-xs text-zinc-500">
        This resume will be automatically selected when you analyze a new job
        description.
      </p>
    </Card>
  );
}
