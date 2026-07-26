import HistoryPage from '@/features/history/HistoryPaGE';
import { AppLayout } from '@/features/layout/AppLayout';
import { Footer } from '@/features/layout/Footer';
import { Header } from '@/features/layout/Header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/history')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout header={<Header />} footer={<Footer />}>
      <HistoryPage />
    </AppLayout>
  );
}
