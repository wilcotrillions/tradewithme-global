import { getCloudflareContext } from '@opennextjs/cloudflare';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'twmg_session';
export const SESSION_DURATION_SECONDS = 7 * 24 * 60 * 60;

const PBKDF2_ITERATIONS = 600000;

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  run<T = unknown>(): Promise<T>;
}

interface D1Database {
  prepare(query: string): D1Statement;
  batch<T = unknown>(statements: D1Statement[]): Promise<T[]>;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

export function getDatabase(): D1Database {
  const { env } = getCloudflareContext();

  const database = (env as unknown as { DB?: D1Database }).DB;

  if (!database) {
    throw new Error('Cloudflare D1 database binding DB is unavailable.');
  }

  return database;
}

function toBase64(bytes: Uint8Array): string {
  let binary = '';

  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);

  return Uint8Array.from(binary, (character) =>
    character.charCodeAt(0)
  );
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    key,
    256
  );

  const hash = new Uint8Array(derivedBits);

  return [
    'pbkdf2',
    'sha256',
    String(PBKDF2_ITERATIONS),
    toBase64(salt),
    toBase64(hash),
  ].join('$');
}

export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  try {
    const parts = storedHash.split('$');

    if (parts.length !== 5) return false;

    const [scheme, algorithm, iterationsText, saltText, hashText] = parts;

    if (
      scheme !== 'pbkdf2' ||
      algorithm !== 'sha256' ||
      Number(iterationsText) !== PBKDF2_ITERATIONS
    ) {
      return false;
    }

    // Copy the decoded bytes into an ArrayBuffer-backed view accepted by Web Crypto.
    const salt = new Uint8Array(fromBase64(saltText));
    const expectedHash = fromBase64(hashText);

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: PBKDF2_ITERATIONS,
        hash: 'SHA-256',
      },
      key,
      256
    );

    const actualHash = new Uint8Array(derivedBits);

    if (actualHash.length !== expectedHash.length) return false;

    let difference = 0;

    for (let i = 0; i < actualHash.length; i++) {
      difference |= actualHash[i] ^ expectedHash[i];
    }

    return difference === 0;
  } catch {
    return false;
  }
}

export function createSessionToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));

  return toBase64(bytes)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export async function hashSessionToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(token)
  );

  return toHex(new Uint8Array(digest));
}

export async function createSession(
  database: D1Database,
  userId: string
): Promise<{ token: string; expiresAt: string }> {
  const token = createSessionToken();
  const hashedToken = await hashSessionToken(token);

  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_SECONDS * 1000
  ).toISOString();

  await database
    .prepare(
      'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)'
    )
    .bind(hashedToken, userId, expiresAt)
    .run();

  return { token, expiresAt };
}

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token || token.length > 200) {
    return null;
  }

  const database = getDatabase();
  const hashedToken = await hashSessionToken(token);
  const now = new Date().toISOString();

  const user = await database
    .prepare(
      `SELECT
        users.id,
        users.email,
        user_profiles.first_name,
        user_profiles.last_name
      FROM sessions
      INNER JOIN users ON users.id = sessions.user_id
      LEFT JOIN user_profiles ON user_profiles.user_id = users.id
      WHERE sessions.id = ?
        AND sessions.expires_at > ?
      LIMIT 1`
    )
    .bind(hashedToken, now)
    .first<AuthenticatedUser>();

  return user;
}

export function setSessionCookie(
  response: Response & {
    cookies: {
      set: (name: string, value: string, options: Record<string, unknown>) => void;
    };
  },
  token: string
): void {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  });
}
