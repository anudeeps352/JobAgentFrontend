import { ApplicationFunnel } from '@/components/dashboard/ApplicationFunnel';
import type { FunnelStage } from '@/components/dashboard/FunnelBar';
import { apiFetch } from '@/api/client';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { SkillsGap, type SkillGap } from '@/components/dashboard/SkillsGap';
import {
  RecentApplications,
  type Application,
} from '@/components/dashboard/RecentApplications';
import { FileUp, History, Wand2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type DashboardStat = {
  label: string;
  value: string | number;
  delta_value: string;
  delta_direction: 'up' | 'down';
};

type DashboardSummary = {
  stats: DashboardStat[];
  funnel_stages: Array<{
    label: string;
    value: number;
    width_percent: number;
    drop_percent?: string | null;
  }>;
  skill_gaps: Array<{
    skill: string;
    matches_missing: number;
  }>;
  recent_applications: Array<{
    company: string;
    company_initials: string;
    role: string;
    match_score: number;
    status: string;
    date: string;
  }>;
  insight: string;
};

type ApplicationStatus =
  'INTERVIEWING' | 'OA SENT' | 'APPLIED' | 'OFFER' | 'REJECTED';

const normalizeApplicationStatus = (status: string): ApplicationStatus => {
  switch (status.toUpperCase()) {
    case 'INTERVIEWING':
      return 'INTERVIEWING';
    case 'OA':
    case 'OA SENT':
      return 'OA SENT';
    case 'APPLIED':
      return 'APPLIED';
    case 'OFFER':
      return 'OFFER';
    case 'REJECTED':
      return 'REJECTED';
    default:
      return 'REJECTED';
  }
};

const normalizeMatchScore = (score: number) =>
  score <= 10 ? score * 10 : score;

const statColors = ['purple', 'green', 'red', 'purple'] as const;

const statSparklineData = [
  [10, 15, 12, 20, 18, 25, 22, 30],
  [10, 8, 15, 11, 18, 16, 24, 20, 23],
  [12, 16, 9, 7, 10, 8, 9, 9],
  [10, 10, 38, 38, 38, 38, 50, 50],
];

export function Dashboard() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiFetch('/dashboard/summary');
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json = (await res.json()) as DashboardSummary;
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const quickActions = [
    {
      label: 'Analyze New Job Description',
      icon: <Wand2 className="size-4" />,
      variant: 'default' as const,
    },
    {
      label: 'Upload New Resume',
      icon: <FileUp className="size-4" />,
      variant: 'outline' as const,
    },
    {
      label: 'View Applications',
      icon: <History className="size-4" />,
      variant: 'outline' as const,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-black px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = data?.stats ?? [];

  const funnelStages: FunnelStage[] =
    data?.funnel_stages.map((stage) => ({
      label: stage.label,
      value: stage.value,
      widthPercent: stage.width_percent,
      dropPercent: stage.drop_percent ?? undefined,
    })) ?? [];

  const skillGaps: SkillGap[] =
    data?.skill_gaps.map((gap) => ({
      skill: gap.skill,
      matchesMissing: gap.matches_missing,
    })) ?? [];

  const applications: Application[] =
    data?.recent_applications.map((app) => ({
      company: app.company,
      companyInitials: app.company_initials,
      role: app.role,
      matchScore: normalizeMatchScore(app.match_score),
      status: normalizeApplicationStatus(app.status),
      date: app.date,
    })) ?? [];

  const hasInsight = Boolean(data?.insight?.trim());

  return (
    <div className="space-y-6">
      {stats.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              delta={{
                value: stat.delta_value,
                direction: stat.delta_direction,
              }}
              sparklineData={statSparklineData[index] ?? statSparklineData[0]}
              color={statColors[index] ?? 'purple'}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 text-sm text-muted-foreground">
          No stats available yet. Run a few analyses to populate the dashboard.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          {funnelStages.length > 0 ? (
            <ApplicationFunnel stages={funnelStages} />
          ) : (
            <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 text-sm text-muted-foreground">
              No funnel data yet.
            </div>
          )}
        </div>

        <div className="space-y-4 xl:col-span-5">
          <QuickActions actions={quickActions} />

          <SkillsGap
            gaps={skillGaps}
            insight={
              hasInsight ? (
                data?.insight
              ) : (
                <>
                  Analyze a few job descriptions to surface skill-gap insights.
                </>
              )
            }
          />
        </div>
      </div>

      {applications.length > 0 ? (
        <RecentApplications applications={applications} />
      ) : (
        <div className="rounded-xl border border-dashed border-border/60 bg-muted/20 p-6 text-sm text-muted-foreground">
          No recent applications yet.
        </div>
      )}
    </div>
  );
}
