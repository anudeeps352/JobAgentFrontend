import { Briefcase, TrendingUp, Trophy } from 'lucide-react';

interface Props {
  applications: Array<{ status: string }>;
}

export default function StatsBar({ applications }: Props) {
  const offers = applications.filter((item) => item.status.toLowerCase() === 'offer').length;
  const responses = applications.filter((item) => ['oa', 'interviewing', 'offer', 'rejected'].includes(item.status.toLowerCase())).length;
  const responseRate = applications.length ? Math.round((responses / applications.length) * 100) : 0;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-violet-500/10 p-2">
            <Briefcase className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <p className="text-2xl font-bold">{applications.length}</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Applications
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/10 p-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>

          <div>
            <p className="text-2xl font-bold">{responseRate}%</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Response Rate
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-500/10 p-2">
            <Trophy className="h-5 w-5 text-amber-400" />
          </div>

          <div>
            <p className="text-2xl font-bold">{offers}</p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Offers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
