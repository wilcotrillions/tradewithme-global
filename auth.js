/*
 * Legacy browser authentication disabled.
 * Authentication is now handled by secure server-side API routes.
 */

export function initAuth() {
  if (typeof window !== 'undefined') {
    window.location.replace('/login');
  }
}

export function requireLogin() {
  if (typeof window !== 'undefined') {
    window.location.replace('/login');
  }

  return null;
}

export async function logout() {
  if (typeof window === 'undefined') return;

  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'same-origin',
    });
  } finally {
    window.location.replace('/login');
  }
}
