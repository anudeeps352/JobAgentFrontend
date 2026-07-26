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
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
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
                className="text-muted-foreground pb-4 -mb-4 border-b-2 border-transparent"
                activeProps={{
                  className: 'text-foreground border-primary',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>AVATAR ICON</div>
      </div>
    </header>
  );
}
