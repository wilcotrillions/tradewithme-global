/**
 * Safe check for globalThis availability (handles SSR, Node.js, and browser environments).
 */
const isBrowser = typeof globalThis !== 'undefined';

/**
 * Safely removes legacy credentials from localStorage if available.
 */
export function clearLegacyCredentials(): void {
  try {
    if (isBrowser && typeof globalThis.localStorage !== 'undefined') {
      globalThis.localStorage.removeItem('tradewithme_user');
    }
  } catch {
    // Ignore unavailable browser storage (e.g., restricted iframe, private mode errors).
  }
}

/**
 * Redirects the current window location to the login page.
 * @param path Optional custom login path (defaults to '/login').
 */
export function redirectToLogin(path: string = '/login'): void {
  if (isBrowser && typeof globalThis.location !== 'undefined') {
    globalThis.location.replace(path);
  }
}

/**
 * Initializes authentication state by clearing legacy items and redirecting to login.
 */
export function initAuth(): void {
  clearLegacyCredentials();
  redirectToLogin();
}

/**
 * Enforces login by redirecting immediately.
 * Returns null to satisfy conditional rendering or guard returns.
 */
export function requireLogin(): null {
  redirectToLogin();
  return null;
}

/**
 * Performs a secure logout by calling the backend API and redirecting.
 * Ensures local redirection happens even if the network request fails.
 */
export async function logout(): Promise<void> {
  if (!isBrowser || typeof globalThis.location === 'undefined') {
    return;
  }

  try {
    if (typeof globalThis.fetch === 'function') {
      await globalThis.fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error) {
    console.error('Logout request failed, proceeding with local cleanup:', error);
  } finally {
    clearLegacyCredentials();
    globalThis.location.replace('/login');
  }
}
