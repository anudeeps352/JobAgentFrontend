import ApiSettings from '@/components/settings/ApiSettings';
import DangerZone from '@/components/settings/DangerZone';
import DefaultResumeCard from '@/components/settings/DefaultResumeCard';
import NotificationSettings from '@/components/settings/NotificationSettings';
import TrackingCard from '@/components/settings/TrackingCard';
import type { NotificationSetting, ResumeOption } from '@/types/settings';

const resumes: ResumeOption[] = [
  {
    id: 1,
    name: 'Senior_Dev_2024.pdf',
  },
  {
    id: 2,
    name: 'PM_Technical_Lead.pdf',
  },
];

const notifications: NotificationSetting[] = [
  {
    id: 'email',
    title: 'Email Notifications',
    description: 'Get weekly digests of your application progress.',
    enabled: true,
  },
  {
    id: 'browser',
    title: 'Browser Notifications',
    description: 'Immediate alerts when status changes or OAs arrive.',
    enabled: false,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>

        <p className="mt-2 text-sm text-zinc-500">
          Configure your workspace preferences and platform integrations.
        </p>
      </div>

      <ApiSettings />

      <div className="grid gap-6 lg:grid-cols-2">
        <DefaultResumeCard resumes={resumes} />

        <TrackingCard />
      </div>

      <NotificationSettings settings={notifications} />

      <DangerZone />
    </div>
  );
}
