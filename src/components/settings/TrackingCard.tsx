import { useState } from 'react';
import { Clock3 } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TrackingCard() {
  const [days, setDays] = useState(14);

  return (
    <Card className="border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-lg bg-amber-500/10 p-3">
          <Clock3 className="h-5 w-5 text-amber-400" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Tracking</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Configure when applications are marked as ghosted.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="ghost-days"
          className="text-xs uppercase tracking-widest text-zinc-500"
        >
          Ghosted Threshold
        </Label>

        <div className="flex items-center gap-3">
          <Input
            id="ghost-days"
            type="number"
            min={1}
            max={365}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-24 border-zinc-800 bg-black"
          />

          <span className="text-sm text-zinc-400">days</span>
        </div>

        <p className="pt-2 text-xs text-zinc-500">
          Applications with no response after this many days will automatically
          be marked as <strong>Ghosted</strong>.
        </p>
      </div>
    </Card>
  );
}
