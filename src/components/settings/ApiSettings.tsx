import { useState } from 'react';
import { Eye, EyeOff, KeyRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ApiSettings() {
  const [openAiVisible, setOpenAiVisible] = useState(false);
  const [uxPilotVisible, setUxPilotVisible] = useState(false);

  return (
    <Card className="border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-lg bg-violet-500/10 p-3">
          <KeyRound className="h-5 w-5 text-violet-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">API Key Management</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Connect your preferred LLM providers for analysis.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* OpenAI */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-widest text-zinc-500">
            OpenAI API Key
          </Label>

          <div className="relative">
            <Input
              type={openAiVisible ? 'text' : 'password'}
              defaultValue="sk-proj-********************************"
              className="border-zinc-800 bg-black pr-12"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setOpenAiVisible(!openAiVisible)}
            >
              {openAiVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* UX Pilot */}
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-widest text-zinc-500">
            UX Pilot AI API Key
          </Label>

          <div className="relative">
            <Input
              type={uxPilotVisible ? 'text' : 'password'}
              placeholder="Enter your UX Pilot AI key"
              className="border-zinc-800 bg-black pr-12"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setUxPilotVisible(!uxPilotVisible)}
            >
              {uxPilotVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
