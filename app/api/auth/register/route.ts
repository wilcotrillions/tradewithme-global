import { NextRequest, NextResponse } from 'next/server';
import { createSession, getDatabase, hashPassword, SESSION_COOKIE, SESSION_DURATION_SECONDS } from '../../../../lib/auth';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    const input = body as Record<string, unknown>;
    const firstName = typeof input.firstName === 'string' ? input.firstName.trim() : '';
    const lastName = typeof input.lastName === 'string' ? input.lastName.trim() : '';
    const email = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
    const password = typeof input.password === 'string' ? input.password : '';

    if (!firstName || firstName.length > 50 || !lastName || lastName.length > 50) return NextResponse.json({ error: 'Enter a first and last name, no longer than 50 characters each.' }, { status: 400 });
    if (email.length > 254 || !EMAIL_PATTERN.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    if (password.length < 12 || password.length > 128 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) return NextResponse.json({ error: 'Use at least 12 characters with uppercase and lowercase letters, a number, and a symbol.' }, { status: 400 });

    const database = getDatabase();
    const existing = await database.prepare('SELECT id FROM users WHERE email = ? LIMIT 1').bind(email).first<{ id: string }>();
    if (existing) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });

    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(password);
    // D1 batch is transactional: a profile insert failure cannot leave a partial user.
    await database.batch([
      database.prepare('INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)').bind(userId, email, passwordHash),
      database.prepare('INSERT INTO user_profiles (user_id, first_name, last_name) VALUES (?, ?, ?)').bind(userId, firstName, lastName),
    ]);
    const session = await createSession(database, userId);
    const response = NextResponse.json({ message: 'Your account has been created successfully.', redirect: '/dashboard' }, { status: 201 });
    response.cookies.set(SESSION_COOKIE, session.token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: SESSION_DURATION_SECONDS });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    if (message.includes('UNIQUE constraint failed')) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Unable to create your account. Please try again.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
  }
}
