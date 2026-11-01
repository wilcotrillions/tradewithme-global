function clearLegacyCredentials() {
  try {
    if (typeof globalThis !== 'undefined' &&
        typeof globalThis.localStorage !== 'undefined') {
      globalThis.localStorage.removeItem('tradewithme_user');
    }
  } catch {
    // Ignore unavailable browser storage.
  }
}

function redirectToLogin() {
  if (
    typeof globalThis !== 'undefined' &&
    typeof globalThis.location !== 'undefined'
  ) {
    globalThis.location.replace('/login');
  }
}

export function initAuth() {
  clearLegacyCredentials();
  redirectToLogin();
}

export function requireLogin() {
  redirectToLogin();
  return null;
}

export async function logout() {
  if (
    typeof globalThis === 'undefined' ||
    typeof globalThis.location === 'undefined'
  ) {
    return;
  }

  try {
    await globalThis.fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'same-origin'
    });
  } finally {
    globalThis.location.replace('/login');
  }
}
