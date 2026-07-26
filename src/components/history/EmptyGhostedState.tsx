import { Ghost } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function EmptyGhostedState() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800">
          <Ghost className="h-10 w-10 text-zinc-500" />
        </div>

        <h2 className="text-2xl font-semibold">No Ghosted Applications</h2>

        <p className="mt-3 max-w-lg text-sm text-zinc-500">
          Great news! You don't currently have any applications that appear to
          have been ghosted. Keep tracking your applications and follow up when
          appropriate.
        </p>

        <Button
          variant="outline"
          className="mt-8 border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
        >
          View All Applications
        </Button>
      </div>
    </div>
  );
}
