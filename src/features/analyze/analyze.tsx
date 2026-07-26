import { useState } from 'react';

import type { AnalysisResult as Result } from '@/types/analysis';
import JobDescriptionInput from '@/components/analyze/JobDescriptionInput';
import ResumeSelector from '@/components/analyze/ResumeSelector';
import AnalyzeResult from '@/components/analyze/Analyzeresult';
import EmptyAnalysis from '@/components/analyze/EmptyAnalysis';

const resumes = [
  { id: 1, name: 'Senior_Dev_2024.pdf' },
  { id: 2, name: 'PM_Technical_Lead.pdf' },
];

export default function Analyze() {
  const [selectedResume, setSelectedResume] = useState(resumes[0].name);

  const [result] = useState<Result>({
    score: 9,
    gaps: [
      'Missing explicit mention of GraphQL Federation expertise.',
      'Experience with AWS Lambda lacks quantifiable scale.',
    ],
    suggestions: [
      'Highlight your 3+ years of Kubernetes experience.',
      'Add Agile/Scrum to your skills section.',
    ],
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Fit Analysis</h1>

        <p className="mt-2 text-sm text-zinc-500">
          Paste a job description and select a resume to see how well you match.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <JobDescriptionInput />

        <div className="space-y-6">
          <ResumeSelector
            resumes={resumes}
            selected={selectedResume}
            onChange={setSelectedResume}
          />

          <AnalyzeResult result={result} />

          <EmptyAnalysis />
        </div>
      </div>
    </div>
  );
}
