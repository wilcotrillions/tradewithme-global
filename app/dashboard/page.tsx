import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../lib/auth';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dashboard | TradeWithMe Global', description: 'Your secure TradeWithMe Global member dashboard.' };

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ');
  return <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><header className="mb-10 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-[.2em] text-primary">Member dashboard</p><h1 className="mt-3 text-3xl font-bold">Welcome back{fullName ? `, ${fullName}` : ''}</h1><p className="mt-3 text-sm text-muted">Signed in as {user.email}</p></div><form action="/api/auth/logout" method="POST"><button className="rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:border-primary hover:text-primary">Sign out</button></form></header><section className="rounded-xl border border-border bg-panel p-6"><h2 className="text-xl font-bold">Your account is active</h2><p className="mt-2 text-sm leading-7 text-muted">Your registration profile has been loaded securely from your authenticated D1 session. Explore educational resources and market information.</p></section><nav aria-label="Member resources" className="mt-6 grid gap-4 sm:grid-cols-2"><Link href="/trading" className="rounded-xl border border-border bg-panel p-5 hover:border-primary/50">Trading education →</Link><Link href="/investments" className="rounded-xl border border-border bg-panel p-5 hover:border-primary/50">Investment education →</Link><Link href="/academy" className="rounded-xl border border-border bg-panel p-5 hover:border-primary/50">Trading academy →</Link><Link href="/contact" className="rounded-xl border border-border bg-panel p-5 hover:border-primary/50">Account support →</Link></nav></div></main>;
}
