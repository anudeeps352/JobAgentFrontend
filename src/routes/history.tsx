import { requireAuth } from '@/auth/requireAuth';
import HistoryPage from '@/features/history/HistoryPage';
import { AppLayout } from '@/features/layout/AppLayout';
import { Footer } from '@/features/layout/Footer';
import { Header } from '@/features/layout/Header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/history')({
  beforeLoad: requireAuth,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout header={<Header />} footer={<Footer />}>
      <HistoryPage />
    </AppLayout>
  );
}
