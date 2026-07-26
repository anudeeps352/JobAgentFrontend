import { ApplicationFunnel } from '@/components/dashboard/ApplicationFunnel';
import type { FunnelStage } from '@/components/dashboard/FunnelBar';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { SkillsGap, type SkillGap } from '@/components/dashboard/SkillsGap';
import {
  RecentApplications,
  type Application,
} from '@/components/dashboard/RecentApplications';
import { FileUp, History, Wand2 } from 'lucide-react';

export function Dashboard() {
  const funnelStages: FunnelStage[] = [
    { label: 'Applied', value: 128, widthPercent: 100 },
    {
      label: 'Online Assessment',
      value: 71,
      widthPercent: 55,
      dropPercent: '-45%',
    },
    {
      label: 'Interview Stage',
      value: 28,
      widthPercent: 22,
      dropPercent: '-60%',
    },
    { label: 'Offer Received', value: 2, widthPercent: 2, dropPercent: '-93%' },
  ];

  const skillGaps: SkillGap[] = [
    { skill: 'System Design', matchesMissing: 8 },
    { skill: 'GraphQL', matchesMissing: 6 },
    { skill: 'Terraform', matchesMissing: 4 },
  ];

  const applications: Application[] = [
    {
      company: 'Stripe',
      companyInitials: 'STR',
      role: 'Senior Product Engineer',
      matchScore: 92,
      status: 'INTERVIEWING',
      date: '2023-11-20',
    },
    {
      company: 'Vercel',
      companyInitials: 'VRC',
      role: 'Frontend Infrastructure',
      matchScore: 88,
      status: 'OA SENT',
      date: '2023-11-18',
    },
    {
      company: 'Figma',
      companyInitials: 'FIG',
      role: 'Systems Designer',
      matchScore: 76,
      status: 'APPLIED',
      date: '2023-11-15',
    },
  ];

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
      label: 'View History',
      icon: <History className="size-4" />,
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="TOTAL APPLIED"
          value={128}
          delta={{ value: '12%', direction: 'up' }}
          sparklineData={[10, 15, 12, 20, 18, 25, 22, 30]}
          color="purple"
        />
        <StatCard
          label="RESPONSE RATE"
          value="24.5%"
          delta={{ value: '4%', direction: 'up' }}
          sparklineData={[10, 8, 15, 11, 18, 16, 24, 20, 23]}
          color="green"
        />
        <StatCard
          label="ACTIVE APPS"
          value={14}
          delta={{ value: '2%', direction: 'down' }}
          sparklineData={[12, 16, 9, 7, 10, 8, 9, 9]}
          color="red"
        />
        <StatCard
          label="OFFERS"
          value={2}
          delta={{ value: '1', direction: 'up' }}
          sparklineData={[10, 10, 38, 38, 38, 38, 50, 50]}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 h-full">
          <ApplicationFunnel stages={funnelStages} />
        </div>
        <div className="col-span-5 space-y-4">
          <QuickActions actions={quickActions} />
          <SkillsGap
            gaps={skillGaps}
            insight={
              <>
                Based on recent job descriptions you've analyzed, focusing on{' '}
                <strong className="text-foreground not-italic">
                  System Design
                </strong>{' '}
                would increase your match score by{' '}
                <span className="text-primary not-italic">12%</span> on average.
              </>
            }
          />
        </div>
      </div>

      <RecentApplications applications={applications} />
    </div>
  );
}
