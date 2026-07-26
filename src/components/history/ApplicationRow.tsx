import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Building2,
  Circle,
  CheckCircle2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import type { Application } from '@/types/history';

interface Props {
  application: Application;
}

export default function ApplicationRow({ application }: Props) {
  const [expanded, setExpanded] = useState(application.expanded);

  return (
    <>
      {/* Row */}
      <div className="grid grid-cols-[2fr_120px_180px_150px_140px_60px] items-center border-b border-zinc-800 px-6 py-5">
        {/* Company */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
            <Building2 className="h-6 w-6 text-zinc-400" />
          </div>

          <div>
            <p className="font-semibold">{application.company}</p>

            <p className="text-sm text-zinc-500">{application.role}</p>
          </div>
        </div>

        {/* Match Score */}
        <Badge className="w-fit bg-emerald-500/15 text-emerald-400">
          {application.score}%
        </Badge>

        {/* Resume */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <FileText className="h-4 w-4" />
          {application.resume}
        </div>

        {/* Status */}
        <Badge
          className={cn(
            'w-fit',
            application.status === 'Interviewing' &&
              'bg-blue-500/15 text-blue-400',

            application.status === 'Offer' &&
              'bg-emerald-500/15 text-emerald-400',

            application.status === 'Rejected' && 'bg-red-500/15 text-red-400',

            application.status === 'Applied' &&
              'bg-violet-500/15 text-violet-400',

            application.status === 'OA' && 'bg-amber-500/15 text-amber-400',

            application.status === 'Ghosted' && 'bg-zinc-700 text-zinc-300',
          )}
        >
          {application.status}
        </Badge>

        {/* Date */}
        <p className="text-sm text-zinc-400">{application.applied}</p>

        {/* Expand */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-8 py-8">
          <div className="grid gap-10 xl:grid-cols-2">
            {/* Left */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 font-semibold text-red-400">
                  Critical Gaps
                </h3>

                <ul className="space-y-3">
                  {application.gaps.map((gap) => (
                    <li key={gap} className="text-sm text-zinc-400">
                      • {gap}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-amber-400">
                  Recommendations
                </h3>

                <ul className="space-y-3">
                  {application.recommendations.map((item) => (
                    <li key={item} className="text-sm text-zinc-400">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Notes</h3>

                <Textarea
                  rows={4}
                  placeholder="Add private notes..."
                  defaultValue={application.notes}
                />
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="mb-6 font-semibold">Timeline</h3>

              <div className="space-y-6">
                {application.timeline.map((step) => (
                  <div key={step.title} className="flex gap-4">
                    {step.completed ? (
                      <CheckCircle2 className="mt-1 h-5 w-5 text-emerald-400" />
                    ) : (
                      <Circle className="mt-1 h-5 w-5 text-zinc-600" />
                    )}

                    <div>
                      <p className="font-medium">{step.title}</p>

                      <p className="text-sm text-zinc-500">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
