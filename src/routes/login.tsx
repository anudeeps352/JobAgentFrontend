import { AuthLayout } from '@/features/auth/AuthLayout';
import { LoginForm } from '@/features/auth/LoginForm';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout
      title="HireTrack"
      subtitle="Sign in to your dashboard"
      footer={
        <>
          <p className="text-sm text-muted-foreground">
            Track smarter. Apply better.
          </p>
          <p className="text-sm text-muted-foreground">
            Dont have an account?{' '}
            <Link to="/signup" className="text-foreground hover:underline">
              Sign up for free
            </Link>
          </p>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
