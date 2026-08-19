import { logout } from '@/auth/keycloak';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { BriefcaseBusiness } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/resumes', label: 'Resumes' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' },
];

export function Header() {
  return (
    <header className="w-full border-b border-border ">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary">
              <BriefcaseBusiness className="size-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">HireTrack</span>
          </div>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="border-b-2 border-transparent pb-4 -mb-4 text-muted-foreground"
                activeProps={{
                  className: 'border-primary text-foreground',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Button type="button" variant="outline" onClick={() => void logout()}>
          Logout
        </Button>
      </div>
    </header>
  );
}
