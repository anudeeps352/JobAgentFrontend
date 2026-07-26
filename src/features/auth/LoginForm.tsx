import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';

export function LoginForm() {
  return (
    <form className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-muted-foreground text-xs">
          EMAIL ADDRESS
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="name@company.com"
          className="bg-background"
        ></Input>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-muted-foreground text-xs">
            PASSWORD
          </Label>
          <button
            type="button"
            className="text-xs text-primary hover:underline"
          >
            FORGOT?
          </button>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="bg-background"
        ></Input>
      </div>
      <Button className="w-full flex items-center gap-2 shadow-sm py-6">
        Continue
      </Button>
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
      <Button variant="outline" className="w-full flex items-center gap-2 py-5">
        <FcGoogle />
        Continue with Google
      </Button>
    </form>
  );
}
