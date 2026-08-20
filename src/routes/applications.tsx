import { requireAuth } from '@/auth/requireAuth';
import ApplicationsPage from '@/features/applications/ApplicationsPage';
import { AppLayout } from '@/features/layout/AppLayout';
import { Footer } from '@/features/layout/Footer';
import { Header } from '@/features/layout/Header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/applications')({
  beforeLoad: requireAuth,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout header={<Header />} footer={<Footer />}>
      <ApplicationsPage />
    </AppLayout>
  );
}
