'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function update(event: React.ChangeEvent<HTMLInputElement>) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError('');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) return setError('Your passwords do not match.');
    if (form.password.length < 12 || !/[a-z]/.test(form.password) || !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
      return setError('Use at least 12 characters with uppercase and lowercase letters, a number, and a symbol.');
    }
    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to create your account. Please try again.');
      router.replace(data.redirect || '/dashboard');
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name: 'firstName', label: 'First name', type: 'text', autoComplete: 'given-name' },
    { name: 'lastName', label: 'Last name', type: 'text', autoComplete: 'family-name' },
    { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
    { name: 'confirmPassword', label: 'Confirm password', type: 'password', autoComplete: 'new-password' },
  ] as const;

  return <><Navbar /><main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6"><section className="mx-auto max-w-md rounded-2xl border border-border bg-panel p-7 shadow-xl">
    <p className="text-center text-sm font-bold uppercase tracking-[.2em] text-primary">TradeWithMe Global</p><h1 className="mt-3 text-center text-3xl font-bold">Create your account</h1>
    <p className="mt-3 text-center text-sm text-muted">Create a secure account to access your member dashboard.</p>
    {error && <p role="alert" className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
    <form onSubmit={submit} className="mt-6 space-y-4">{fields.map((field) => <div key={field.name}><label htmlFor={field.name} className="mb-2 block text-sm font-medium">{field.label}</label><input id={field.name} name={field.name} type={field.type} autoComplete={field.autoComplete} value={form[field.name]} onChange={update} required maxLength={field.name === 'email' ? 254 : field.name.includes('Name') ? 50 : 128} minLength={field.name === 'password' ? 12 : undefined} disabled={loading} className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-primary disabled:opacity-60" /></div>)}
      <p className="text-xs text-muted">Password must have at least 12 characters, uppercase and lowercase letters, a number, and a symbol.</p><button disabled={loading} className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-background disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Creating account…' : 'Create account'}</button>
    </form><p className="mt-6 text-center text-sm text-muted">Already registered? <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
  </section></main><Footer /></>;
}
