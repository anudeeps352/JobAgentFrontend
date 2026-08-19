import Keycloak from 'keycloak-js';

const keycloakUrl = import.meta.env.VITE_KEYCLOAK_URL;
const keycloakRealm = import.meta.env.VITE_KEYCLOAK_REALM;
const keycloakClientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;

if (!keycloakUrl || !keycloakRealm || !keycloakClientId) {
  throw new Error(
    'Missing Keycloak environment variables. Set VITE_KEYCLOAK_URL, VITE_KEYCLOAK_REALM, and VITE_KEYCLOAK_CLIENT_ID.',
  );
}

export const keycloak = new Keycloak({
  url: keycloakUrl,
  realm: keycloakRealm,
  clientId: keycloakClientId,
});

const authStorageKey = 'jobhunt_auth';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  idToken?: string;
  expiresIn: number;
  refreshExpiresIn: number;
  tokenType: string;
  scope?: string;
  sessionState?: string;
  acquiredAt: number;
}

const sessionSkewMs = 30_000;

export function readAuthSession(): AuthSession | null {
  const rawSession = window.localStorage.getItem(authStorageKey);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch {
    window.localStorage.removeItem(authStorageKey);
    return null;
  }
}

function persistAuthSession(session: AuthSession) {
  window.localStorage.setItem(authStorageKey, JSON.stringify(session));
}

function clearAuthSession() {
  window.localStorage.removeItem(authStorageKey);
}

function isSessionExpiringSoon(session: AuthSession) {
  const expiresAt = session.acquiredAt + session.expiresIn * 1000;

  return expiresAt <= Date.now() + sessionSkewMs;
}

export async function loginWithCredentials(username: string, password: string) {
  const response = await fetch(
    `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: keycloakClientId,
        grant_type: 'password',
        username,
        password,
      }),
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { error?: string; error_description?: string }
      | null;

    throw new Error(
      errorBody?.error_description ??
        errorBody?.error ??
        'Keycloak rejected the provided credentials.',
    );
  }

  const tokenResponse = (await response.json()) as {
    access_token: string;
    refresh_token: string;
    id_token?: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    scope?: string;
    session_state?: string;
  };

  persistAuthSession({
    accessToken: tokenResponse.access_token,
    refreshToken: tokenResponse.refresh_token,
    idToken: tokenResponse.id_token,
    expiresIn: tokenResponse.expires_in,
    refreshExpiresIn: tokenResponse.refresh_expires_in,
    tokenType: tokenResponse.token_type,
    scope: tokenResponse.scope,
    sessionState: tokenResponse.session_state,
    acquiredAt: Date.now(),
  });
}

export async function refreshAuthSession() {
  const session = readAuthSession();

  if (!session?.refreshToken) {
    return null;
  }

  const response = await fetch(
    `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: keycloakClientId,
        grant_type: 'refresh_token',
        refresh_token: session.refreshToken,
      }),
    },
  );

  if (!response.ok) {
    clearAuthSession();
    return null;
  }

  const tokenResponse = (await response.json()) as {
    access_token: string;
    refresh_token: string;
    id_token?: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    scope?: string;
    session_state?: string;
  };

  const refreshedSession: AuthSession = {
    accessToken: tokenResponse.access_token,
    refreshToken: tokenResponse.refresh_token,
    idToken: tokenResponse.id_token,
    expiresIn: tokenResponse.expires_in,
    refreshExpiresIn: tokenResponse.refresh_expires_in,
    tokenType: tokenResponse.token_type,
    scope: tokenResponse.scope,
    sessionState: tokenResponse.session_state,
    acquiredAt: Date.now(),
  };

  persistAuthSession(refreshedSession);

  return refreshedSession;
}

export async function getAccessToken(forceRefresh = false) {
  const session = readAuthSession();

  if (!session) {
    return null;
  }

  if (forceRefresh || isSessionExpiringSoon(session)) {
    const refreshedSession = await refreshAuthSession();
    return refreshedSession?.accessToken ?? null;
  }

  return session.accessToken;
}

export async function logout() {
  const session = readAuthSession();

  if (session?.refreshToken) {
    await fetch(
      `${keycloakUrl}/realms/${keycloakRealm}/protocol/openid-connect/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: keycloakClientId,
          refresh_token: session.refreshToken,
        }),
      },
    ).catch(() => null);
  }

  clearAuthSession();
  window.location.replace('/login');
}
