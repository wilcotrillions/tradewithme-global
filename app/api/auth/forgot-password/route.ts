import { NextResponse } from 'next/server';

// No email provider or verified reset-token schema exists in this project yet.
// Do not create a token that cannot be delivered securely; tell callers explicitly.
export async function POST() {
  return NextResponse.json({ error: 'Password recovery is not configured. Contact support@tradewithme.global for assistance.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
}
