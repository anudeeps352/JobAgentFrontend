import { loginWithCredentials } from '@/auth/keycloak';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      setIsSubmitting(false);
      return;
    }

    try {
      await loginWithCredentials(username, password);
      window.location.assign('/dashboard');
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to sign in with Keycloak.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="username" className="text-muted-foreground text-xs">
          USERNAME
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="your.username"
          autoComplete="username"
          className="bg-background"
        />
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
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          className="bg-background"
        />
      </div>

      {errorMessage ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : null}

      <Button
        type="submit"
        className="w-full flex items-center gap-2 shadow-sm py-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Continue'}
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
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center gap-2 py-5"
      >
        <FcGoogle />
        Continue with Google
      </Button>
    </form>
  );
}
