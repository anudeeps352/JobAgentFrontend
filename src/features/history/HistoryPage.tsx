import ApplicationTable from '@/components/history/ApplicationTable';
import EmptyGhostedState from '@/components/history/EmptyGhostedState';
import FilterTabs from '@/components/history/FilterTabs';
import SearchBar from '@/components/history/SearchBar';
import StatsBar from '@/components/history/StatsBar';
import type { Application } from '@/types/history';

const applications: Application[] = [
  {
    id: 1,
    company: 'Stripe',
    role: 'Product Engineer',
    score: 92,
    resume: 'Senior_Dev_2024.pdf',
    status: 'Interviewing',
    applied: 'Oct 24, 2024',
    expanded: true,

    gaps: [
      'Lacks direct FinTech compliance experience (AML/KYC).',
      'Ruby on Rails is listed as preferred.',
    ],

    recommendations: [
      'Mention API design scale (Stripe deals with high volume).',
      'Focus on Developer Experience projects.',
    ],

    notes: '',

    timeline: [
      {
        title: 'Application Submitted',
        date: 'Oct 24, 10:30 AM',
        completed: true,
      },
      {
        title: 'Screening Passed',
        date: 'Oct 26, 02:15 PM',
        completed: true,
      },
      {
        title: 'First Round Scheduled',
        date: 'Pending...',
        completed: false,
      },
    ],
  },
  {
    id: 2,
    company: 'Vercel',
    role: 'Frontend Infrastructure',
    score: 86,
    resume: 'OSS_Focused_CV.pdf',
    status: 'Offer',
    applied: 'Oct 20, 2024',
    expanded: false,
    gaps: [],
    recommendations: [],
    notes: '',
    timeline: [],
  },
  {
    id: 3,
    company: 'UX Pilot AI',
    role: 'Research Engineer',
    score: 64,
    resume: 'Senior_Dev_2024.pdf',
    status: 'Rejected',
    applied: 'Oct 18, 2024',
    expanded: false,
    gaps: [],
    recommendations: [],
    notes: '',
    timeline: [],
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Application History</h1>

        <p className="mt-2 text-sm text-zinc-500">
          Keep track of every application, feedback, and match score.
        </p>
      </div>

      <SearchBar />

      <FilterTabs />

      <StatsBar />

      <ApplicationTable applications={applications} />

      <EmptyGhostedState />
    </div>
  );
}
