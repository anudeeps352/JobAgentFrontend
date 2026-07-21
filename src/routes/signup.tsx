import { AuthLayout } from '@/features/auth/AuthLayout';
import { SignupForm } from '@/features/auth/SignupForm';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout
      title="HireTrack"
      subtitle="Create your account"
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthLayout>
  );
}
