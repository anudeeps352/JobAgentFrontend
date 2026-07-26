import { Circle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-900">
      <div className="flex h-14 items-center justify-between px-8 text-[10px] uppercase tracking-[0.25em] text-zinc-600">
        <div className="flex items-center gap-4">
          <span>© 2024 HireTrack Engine</span>

          <span className="text-zinc-800">|</span>

          <button className="transition-colors hover:text-zinc-400">
            Privacy Policy
          </button>

          <button className="transition-colors hover:text-zinc-400">
            Terms of Service
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />
            <span>System Operational</span>
          </div>

          <div className="rounded border border-zinc-800 px-2 py-1 tracking-wider">
            v1.2.4
          </div>
        </div>
      </div>
    </footer>
  );
}
