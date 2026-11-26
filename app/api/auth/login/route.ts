import { NextRequest, NextResponse } from 'next/server';
import { createSession, getDatabase, verifyPassword, SESSION_COOKIE, SESSION_DURATION_SECONDS } from '../../../../lib/auth';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Please enter a valid email address and password.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Please enter a valid email address and password.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  const input = body as Record<string, unknown>;
  const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  const password = typeof input.password === 'string' ? input.password : '';
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email) || !password || password.length > 128) {
    return NextResponse.json({ error: 'Please enter a valid email address and password.' }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const database = getDatabase();
    const user = await database.prepare('SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1').bind(email).first<{ id: string; email: string; password_hash: string }>();
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
    }

    const now = new Date().toISOString();
    await database.prepare('DELETE FROM sessions WHERE expires_at <= ?').bind(now).run();
    const session = await createSession(database, user.id);
    const response = NextResponse.json({ message: 'Login successful.', redirect: '/dashboard' });
    response.cookies.set(SESSION_COOKIE, session.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: SESSION_DURATION_SECONDS });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Unable to sign in. Please try again.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
