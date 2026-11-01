import { NextRequest, NextResponse } from 'next/server';
import {
  getDatabase,
  verifyPassword,
  createSession,
  SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
} from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === 'string'
        ? body.email.trim().toLowerCase()
        : '';

    const password =
      typeof body.password === 'string' ? body.password : '';

    if (!email || !password || email.length > 254 || password.length > 128) {
      return NextResponse.json(
        { error: 'Please enter a valid email address and password.' },
        { status: 400 }
      );
    }

    const database = getDatabase();

    const user = await database
      .prepare(
        `SELECT id, email, password_hash
         FROM users
         WHERE email = ?
         LIMIT 1`
      )
      .bind(email)
      .first<{
        id: string;
        email: string;
        password_hash: string;
      }>();

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const passwordIsValid = await verifyPassword(
      password,
      user.password_hash
    );

    if (!passwordIsValid) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const now = new Date().toISOString();

    await database
      .prepare('DELETE FROM sessions WHERE expires_at <= ?')
      .bind(now)
      .run();

    const session = await createSession(database, user.id);

    const response = NextResponse.json({
      message: 'Login successful.',
      redirect: '/dashboard',
    });

    response.cookies.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);

    return NextResponse.json(
      { error: 'Unable to sign in. Please try again.' },
      { status: 500 }
    );
  }
}
