import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

        <Input
          placeholder="Ask anything — which companies ghosted me after an OA?"
          className="h-12 border-zinc-800 bg-zinc-900 pl-11 text-sm placeholder:text-zinc-500"
        />
      </div>

      <Button
        variant="outline"
        className="h-12 border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
      >
        <Sparkles className="mr-2 h-4 w-4 text-violet-400" />
        AI Search
      </Button>
    </div>
  );
}
