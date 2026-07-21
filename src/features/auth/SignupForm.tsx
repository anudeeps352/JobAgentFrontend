import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';

export function SignupForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" placeholder="name@company.com"></Input>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <button
            type="button"
            className="text-sm text-primary hover:underline"
          >
            Forgot?
          </button>
        </div>
        <Input id="password" type="password" placeholder="••••••••"></Input>
      </div>
      <Button className="w-full flex items-center gap-2">Continue</Button>
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-xs text-muted-foreground">
            OR CONTINUE WITH
          </span>
        </div>
      </div>
      <Button variant="outline" className="w-full flex items-center gap-2">
        <FcGoogle />
        Continue with Google
      </Button>
    </form>
  );
}
