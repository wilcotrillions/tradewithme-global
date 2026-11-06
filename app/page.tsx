import Link from 'next/link';
import { redirect } from 'next/navigation';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getCurrentUser } from '../lib/auth';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Dashboard | TradeWithMe Global',
  description: 'Your secure TradeWithMe Global member dashboard.',
};

const dashboardCards = [
  {
    title: 'Trading Hub',
    description: 'Explore financial market education and trading resources.',
    href: '/trading',
  },
  {
    title: 'Investment Education',
    description: 'Learn about investment planning and risk management.',
    href: '/investments',
  },
  {
    title: 'Trading Academy',
    description: 'Continue learning about financial markets and trading.',
    href: '/academy',
  },
  {
    title: 'Account',
    description: 'Manage your member account and personal information.',
    href: '/account',
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const fullName = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Member Dashboard
              </p>

              <h1 className="text-3xl font-bold sm:text-4xl">
                Welcome back{fullName ? `, ${fullName}` : ''}
              </h1>

              <p className="mt-3 text-sm text-muted">
                You are signed in as {user.email}
              </p>
            </div>

            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="rounded-lg border border-border px-5 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                Sign Out
              </button>
            </form>
          </div>

          <div className="mb-8 rounded-xl border border-border bg-panel p-6">
            <h2 className="text-xl font-bold">Your account is active</h2>

            <p className="mt-2 text-sm leading-7 text-muted">
              Welcome to TradeWithMe Global. Explore the learning resources
              and financial market education available on the platform.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="rounded-xl border border-border bg-panel p-6 transition hover:-translate-y-1 hover:border-primary/50"
              >
                <h2 className="text-lg font-bold">{card.title}</h2>

                <p className="mt-3 text-sm leading-7 text-muted">
                  {card.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-primary">
                  Explore →
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-xs leading-6 text-muted">
            Trading forex, cryptocurrencies, and other financial instruments
            involves risk. Educational content on this platform is not
            personalized financial advice.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
