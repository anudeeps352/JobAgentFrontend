import Analyze from '@/features/analyze/analyze';
import { AppLayout } from '@/features/layout/AppLayout';
import { Footer } from '@/features/layout/Footer';
import { Header } from '@/features/layout/Header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/analyze')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout header={<Header />} footer={<Footer />}>
      <Analyze />
    </AppLayout>
  );
}
