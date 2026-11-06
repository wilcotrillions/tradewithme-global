'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError('Please enter your email address and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || data.message || 'Unable to sign in. Please check your details.'
        );
      }

      setPassword('');
      router.replace(data.redirect || '/dashboard');
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-2xl border border-border bg-panel p-7 shadow-2xl sm:p-9">
            <div className="mb-7 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <LockKeyhole size={30} />
              </div>

              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Member Access
              </p>

              <h1 className="text-3xl font-bold tracking-tight">
                Welcome Back
              </h1>

              <p className="mt-3 text-sm leading-6 text-muted">
                Sign in to your TradeWithMe Global account to continue your
                learning journey.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border bg-background py-3.5 pl-12 pr-4 text-foreground outline-none transition placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-border bg-background py-3.5 pl-12 pr-12 text-foreground outline-none transition placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted">SECURE ACCOUNT ACCESS</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-border bg-background p-4">
              <ShieldCheck
                size={22}
                className="mt-0.5 shrink-0 text-primary"
              />

              <p className="text-xs leading-6 text-muted">
                Protect your login details. Never share your password or
                verification codes with anyone.
              </p>
            </div>

            <p className="mt-7 text-center text-sm text-muted">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-muted">
            TradeWithMe Global · Learn. Understand. Make Informed Decisions.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
