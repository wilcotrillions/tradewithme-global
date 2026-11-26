'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = { title: 'Forgot Password | TradeWithMe Global', description: 'Password recovery information for TradeWithMe Global.' };

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    try {
      const response = await fetch('/api/auth/forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Password recovery is not available.');
      setSubmitted(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Password recovery is not available.'); }
    finally { setLoading(false); }
  }
  return <><Navbar/><main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6"><section className="mx-auto max-w-md rounded-2xl border border-border bg-panel p-8 shadow-xl"><p className="mb-4 text-sm font-semibold uppercase tracking-[.2em] text-primary">Account help</p><h1 className="text-3xl font-bold">Forgot password</h1><p className="mt-3 text-sm leading-6 text-muted">Enter your account email to request a password reset.</p>{submitted ? <p role="status" className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">If that account exists, password reset instructions will be sent when email delivery is configured.</p> : <form onSubmit={submit} className="mt-8 space-y-5"><label htmlFor="reset-email" className="block text-sm font-medium">Email address</label><input id="reset-email" type="email" value={email} onChange={(event)=>setEmail(event.target.value)} autoComplete="email" maxLength={254} required className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary"/>{error&&<p role="alert" className="text-sm text-red-400">{error}</p>}<button disabled={loading} className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-background disabled:opacity-60">{loading?'Checking…':'Request reset instructions'}</button></form>}<p className="mt-6 text-sm text-muted"><Link href="/login" className="font-medium text-primary hover:underline">Back to login</Link></p></section></main><Footer/></>;
}
