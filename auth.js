function clearLegacyCredentials() {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('tradewithme_user');
    }
  } catch {
    // Ignore unavailable browser storage.
  }
}

export function initAuth() {
  clearLegacyCredentials();

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
      credentials: 'same-origin'
    });
  } finally {
    window.location.replace('/login');
  }
}