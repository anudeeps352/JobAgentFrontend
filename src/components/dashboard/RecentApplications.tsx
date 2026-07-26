import { MatchScoreBadge } from '@/components/common/MatchScoreBadge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/ui/button';

export interface Application {
  company: string;
  companyInitials: string;
  role: string;
  matchScore: number;
  status: 'INTERVIEWING' | 'OA SENT' | 'APPLIED' | 'OFFER' | 'REJECTED';
  date: string;
}

interface RecentApplicationsProps {
  applications: Application[];
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Recent Applications
        </span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          Filter by:
          <Button variant="outline" size="sm">
            All Statuses
          </Button>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
            <th className="text-left font-normal pb-3">Company</th>
            <th className="text-left font-normal pb-3">Role</th>
            <th className="text-left font-normal pb-3">Match Score</th>
            <th className="text-left font-normal pb-3">Status</th>
            <th className="text-left font-normal pb-3">Date</th>
            <th className="text-right font-normal pb-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app.company}
              className="border-b border-border last:border-0"
            >
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <span className="size-6 flex items-center justify-center rounded bg-muted text-xs shrink-0">
                    {app.companyInitials}
                  </span>
                  {app.company}
                </div>
              </td>
              <td className="py-3 text-muted-foreground">{app.role}</td>
              <td className="py-3">
                <MatchScoreBadge score={app.matchScore} />
              </td>
              <td className="py-3">
                <StatusBadge status={app.status} />
              </td>
              <td className="py-3 text-muted-foreground">{app.date}</td>
              <td className="py-3 text-right">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
