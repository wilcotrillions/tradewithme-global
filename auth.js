/**
 * TraderWithMeGlobal Authentication
 * Compatible with Deno lint and Cloudflare Workers.
 * Authentication must be validated server-side.
 */

const isBrowser =
  typeof globalThis !== "undefined" &&
  typeof globalThis.location !== "undefined";

const LOGIN_PATH = "/login";
const SESSION_ENDPOINT = "/api/auth/session";
const LOGOUT_ENDPOINT = "/api/auth/logout";

/**
 * Remove obsolete legacy credentials.
 */
export function clearLegacyCredentials() {
  if (!isBrowser) return;

  try {
    globalThis.localStorage.removeItem("tradewithme_user");
  } catch (error) {
    console.error("Legacy credential cleanup failed:", error);
  }
}

/**
 * Safely redirect to a same-origin page.
 */
export function redirectToLogin(path = LOGIN_PATH) {
  if (!isBrowser) return;

  try {
    const origin = globalThis.location.origin;
    const destination = new URL(path, origin);

    if (destination.origin !== origin) {
      globalThis.location.replace(LOGIN_PATH);
      return;
    }

    globalThis.location.replace(
      destination.pathname +
      destination.search +
      destination.hash
    );
  } catch {
    globalThis.location.replace(LOGIN_PATH);
  }
}

/**
 * Initialize authentication utilities.
 */
export function initAuth() {
  clearLegacyCredentials();
}

/**
 * Retrieve the server-validated authentication session.
 */
export async function getAuthSession() {
  if (!isBrowser) return null;

  try {
    const response = await fetch(SESSION_ENDPOINT, {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) return null;

    const session = await response.json();

    if (session.authenticated !== true) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
}

/**
 * Require an authenticated session.
 */
export async function requireLogin() {
  const session = await getAuthSession();

  if (!session) {
    redirectToLogin();
    return null;
  }

  return session;
}

/**
 * Log out through the Cloudflare backend.
 */
export async function logout() {
  if (!isBrowser) return false;

  try {
    const response = await fetch(LOGOUT_ENDPOINT, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Server logout failed: ${response.status}`
      );
    }

    clearLegacyCredentials();
    redirectToLogin();

    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}

