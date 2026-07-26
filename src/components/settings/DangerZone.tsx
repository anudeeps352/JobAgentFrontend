import { TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function DangerZone() {
  return (
    <Card className="border-red-900/40 bg-zinc-900 p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-red-500/10 p-3">
          <TriangleAlert className="h-5 w-5 text-red-400" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>

          <p className="mt-2 text-sm text-zinc-500">
            Permanently delete all resumes, analyses, and application history.
            This action cannot be undone.
          </p>

          <Button variant="destructive" className="mt-6">
            Clear All Data
          </Button>

          <p className="mt-3 text-xs text-zinc-600">
            You'll be asked to confirm before any data is deleted.
          </p>
        </div>
      </div>
    </Card>
  );
}
