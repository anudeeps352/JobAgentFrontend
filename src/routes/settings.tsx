import { AppLayout } from '@/features/layout/AppLayout';
import { Footer } from '@/features/layout/Footer';
import { Header } from '@/features/layout/Header';
import SettingsPage from '@/features/settings/SettingsPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout header={<Header />} footer={<Footer />}>
      <SettingsPage />
    </AppLayout>
  );
}
