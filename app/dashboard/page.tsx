import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Dashboard | TradeWithMe Global',
  description: 'Draft member dashboard placeholder for the TradeWithMe Global application.',
};

const dashboardCards = [
  { title: 'Overview', description: 'A secure summary of your learning progress and recent activity.' },
  { title: 'Trading Journal', description: 'Track notes, chart ideas, and strategy concepts during the learning process.' },
  { title: 'Watchlist', description: 'A place to monitor financial instruments that matter to your research.' },
  { title: 'Account', description: 'Draft account settings and profile controls for a future authenticated experience.' },
];

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Member dashboard</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Welcome back</h1>
            <p className="mt-4 max-w-2xl text-muted">
              This dashboard is a route placeholder for the future authenticated experience. It is intentionally draft-only for this phase.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dashboardCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-border bg-panel p-6">
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
