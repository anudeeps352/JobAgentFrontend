interface AppLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function AppLayout({ header, children, footer }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {header}
      <main className="flex-1 w-full max-w-300 mx-auto px-6 py-4">
        {children}
      </main>
      {footer}
    </div>
  );
}
