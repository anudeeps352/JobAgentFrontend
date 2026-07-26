import type { Application } from '@/types/history';
import ApplicationRow from './ApplicationRow';

interface Props {
  applications: Application[];
}

export default function ApplicationTable({ applications }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="grid grid-cols-[2fr_120px_180px_150px_140px_60px] border-b border-zinc-800 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
        <span>Company</span>
        <span>Match</span>
        <span>Resume</span>
        <span>Status</span>
        <span>Applied</span>
        <span />
      </div>

      {applications.map((application) => (
        <ApplicationRow key={application.id} application={application} />
      ))}
    </div>
  );
}
