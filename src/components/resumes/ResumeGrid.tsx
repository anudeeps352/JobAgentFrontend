import ResumeCard from './ResumeCard';
import type { Resume } from '@/types/resume';

interface ResumeGridProps {
  resumes: Resume[];
}

export default function ResumeGrid({ resumes }: Readonly<ResumeGridProps>) {
  return (
    <div>
      <p className="mb-5 text-xs uppercase tracking-[0.3em] text-zinc-500">
        Your Documents ({resumes.length})
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </div>
  );
}
