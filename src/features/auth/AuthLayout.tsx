import { BriefcaseBusiness } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: Readonly<AuthLayoutProps>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex w-full max-w-sm flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-2 ">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary">
            <BriefcaseBusiness className="size-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="w-full rounded-xl border border-border bg-card p-6 shadow-sm">
          {children}
        </div>
        {footer && (
          <div className="flex flex-col items-center gap-1 text-center">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
