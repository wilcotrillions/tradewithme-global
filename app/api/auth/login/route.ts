import { NextRequest, NextResponse } from 'next/server';
import { createSession, getDatabase, verifyPassword, SESSION_COOKIE, SESSION_DURATION_SECONDS } from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Please enter your email address and password.' }, { status: 400 });
    const input = body as Record<string, unknown>;
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
    const password = typeof input.password === 'string' ? input.password : '';
    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length > 128) return NextResponse.json({ error: 'Please enter a valid email address and password.' }, { status: 400 });

    const database = getDatabase();
    const user = await database.prepare('SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1').bind(email).first<{ id: string; email: string; password_hash: string }>();
    if (!user || !(await verifyPassword(password, user.password_hash))) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });

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
