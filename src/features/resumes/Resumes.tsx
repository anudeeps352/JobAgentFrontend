import ResumeUpload from '@/components/resumes/ResumeUpload';
import ResumeGrid from '@/components/resumes/ResumeGrid';
import EmptyResumeState from '@/components/resumes/EmptyResumeState';
import type { Resume } from '@/types/resume';

const resumes: Resume[] = [
  {
    id: 1,
    name: 'Senior_Dev_2024.pdf',
    role: 'Software Engineer',
    uploaded: 'Uploaded Nov 12, 2023',
    color: 'purple',
  },
  {
    id: 2,
    name: 'PM_Technical_Lead.pdf',
    role: 'Product Manager',
    uploaded: 'Uploaded Oct 28, 2023',
    color: 'gray',
  },
  {
    id: 3,
    name: 'Architect_Resume_V2.pdf',
    role: 'Cloud Architect',
    uploaded: 'Uploaded Sep 15, 2023',
    color: 'green',
  },
];

export default function ResumesPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">Resumes</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage and tailor your professional documents for different roles.
          </p>
        </div>

        <button className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium hover:bg-violet-500">
          + Upload Resume
        </button>
      </div>

      <ResumeUpload />

      <ResumeGrid resumes={resumes} />

      <EmptyResumeState />
    </div>
  );
}
