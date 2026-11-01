import { NextRequest, NextResponse } from 'next/server';
import {
  getDatabase,
  hashPassword,
  createSession,
  SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
} from '../../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email =
      typeof body.email === 'string'
        ? body.email.trim().toLowerCase()
        : '';
    const password =
      typeof body.password === 'string' ? body.password : '';

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Please enter a valid full name.' },
        { status: 400 }
      );
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (password.length < 8 || password.length > 128) {
      return NextResponse.json(
        { error: 'Password must contain between 8 and 128 characters.' },
        { status: 400 }
      );
    }

    const database = getDatabase();

    const existingUser = await database
      .prepare('SELECT id FROM users WHERE email = ? LIMIT 1')
      .bind(email)
      .first<{ id: string }>();

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    const nameParts = name.split(/\s+/);
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ') || null;

    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(password);

    await database.batch([
      database
        .prepare(
          `INSERT INTO users (id, email, password_hash)
           VALUES (?, ?, ?)`
        )
        .bind(userId, email, passwordHash),

      database
        .prepare(
          `INSERT INTO user_profiles (user_id, first_name, last_name)
           VALUES (?, ?, ?)`
        )
        .bind(userId, firstName, lastName),
    ]);

    const session = await createSession(database, userId);

    const response = NextResponse.json(
      {
        message: 'Your account has been created successfully.',
        redirect: '/dashboard',
      },
      { status: 201 }
    );

    response.cookies.set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '';

    if (message.includes('UNIQUE constraint failed')) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    console.error('Registration error:', error);

    return NextResponse.json(
      { error: 'Unable to create your account. Please try again.' },
      { status: 500 }
    );
  }
}
