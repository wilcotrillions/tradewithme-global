import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, hashSessionToken, SESSION_COOKIE } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (token && token.length === 43 && /^[A-Za-z0-9_-]+$/.test(token)) {
      await getDatabase().prepare('DELETE FROM sessions WHERE id = ?').bind(await hashSessionToken(token)).run();
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
  const response = NextResponse.redirect(new URL('/login', request.url), 303);
  response.cookies.set(SESSION_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
