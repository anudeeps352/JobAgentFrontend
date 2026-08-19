import { readAuthSession } from '@/auth/keycloak';
import { redirect } from '@tanstack/react-router';

export function requireAuth() {
  const session = readAuthSession();

  if (!session?.accessToken) {
    throw redirect({
      to: '/login',
    });
  }
}
