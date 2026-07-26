import { Dashboard } from '@/features/dashboard/Dashboard';
import { AppLayout } from '@/features/layout/AppLayout';
import { Footer } from '@/features/layout/Footer';
import { Header } from '@/features/layout/Header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout header={<Header />} footer={<Footer />}>
      <Dashboard />
    </AppLayout>
  );
}
