import { getAccessToken } from '@/auth/keycloak';

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error(
    'Missing API environment variables. Set VITE_API_URL for the FastAPI base URL.',
  );
}

function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return new URL(normalizedPath, apiUrl).toString();
}

export async function apiFetch(path: string, init: RequestInit = {}) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error('No active auth session. Please sign in again.');
  }

  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${accessToken}`);

  let response = await fetch(buildApiUrl(path), {
    ...init,
    headers,
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshedToken = await getAccessToken(true);

  if (!refreshedToken || refreshedToken === accessToken) {
    return response;
  }

  headers.set('Authorization', `Bearer ${refreshedToken}`);

  response = await fetch(buildApiUrl(path), {
    ...init,
    headers,
  });

  return response;
}
