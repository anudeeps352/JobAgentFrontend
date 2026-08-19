import { requireAuth } from '@/auth/requireAuth';
import { AppLayout } from '@/features/layout/AppLayout';
import { Footer } from '@/features/layout/Footer';
import { Header } from '@/features/layout/Header';
import ResumesPage from '@/features/resumes/Resumes';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resumes')({
  beforeLoad: requireAuth,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppLayout header={<Header />} footer={<Footer />}>
      <ResumesPage />
    </AppLayout>
  );
}
