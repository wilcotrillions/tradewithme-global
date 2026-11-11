import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata = {
  title: 'TradeWithMe Global | Explore Global Financial Markets',
  description:
    'Explore financial markets, trading education, market information and practical learning resources with TradeWithMe Global.',
};

const markets = [
  {
    name: 'Forex',
    symbol: 'FX',
    description:
      'Understand currency pairs, exchange rates, market sessions and the factors that influence foreign exchange markets.',
  },
  {
    name: 'Cryptocurrencies',
    symbol: 'CR',
    description:
      'Explore digital assets, blockchain concepts, market structure and the volatility associated with crypto markets.',
  },
  {
    name: 'Commodities',
    symbol: 'CM',
    description:
      'Learn about commodities such as gold, energy products and other globally traded raw materials.',
  },
  {
    name: 'Global indices',
    symbol: 'IN',
    description:
      'Discover how stock-market indices are constructed and what movements in major benchmarks can represent.',
  },
];

const resources = [
  {
    number: '01',
    title: 'Market education',
    description:
      'Build your understanding of financial markets, common instruments and the terminology used by traders.',
    href: '/academy',
    link: 'Explore the academy',
  },
  {
    number: '02',
    title: 'Market analysis',
    description:
      'Learn how to read charts, understand market movements and evaluate information before making decisions.',
    href: '/trading',
    link: 'Explore trading resources',
  },
  {
    number: '03',
    title: 'Risk awareness',
    description:
      'Understand volatility, leverage, position sizing and why protecting capital matters.',
    href: '/risk-disclosure',
    link: 'Read risk information',
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-background text-foreground">
        <section className="relative border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_28%,rgba(37,99,235,0.20),transparent_42%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Financial markets • Education • Tools
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Explore global markets.
                <span className="block text-primary">Build knowledge with confidence.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                Discover Forex, cryptocurrencies, commodities and global indices
                through market information, practical learning resources and
                tools designed to support more informed decisions.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="rounded-xl bg-primary px-7 py-3.5 text-center text-sm font-bold text-background transition hover:opacity-90"
                >
                  Create an account
                </Link>
                <Link
                  href="/trading"
                  className="rounded-xl border border-border bg-panel px-7 py-3.5 text-center text-sm font-bold text-foreground transition hover:border-primary"
                >
                  Explore markets
                </Link>
              </div>

              <p className="mt-6 max-w-xl text-xs leading-6 text-muted">
                Market information and educational resources are general in
                nature and are not personalized investment advice or a
                recommendation to buy or sell a financial instrument.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-panel/90 p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Market overview
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">Explore asset classes</h2>
                </div>
                <span className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted">
                  Learn
                </span>
              </div>

              <div className="mt-7 space-y-3">
                {markets.map((market) => (
                  <div
                    key={market.name}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-background/70 p-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-black text-primary">
                      {market.symbol}
                    </span>
                    <div>
                      <h3 className="font-semibold">{market.name}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted">
                        {market.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/trading"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View trading resources <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-panelAlt/40">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-3 sm:px-6 lg:px-8">
            <div>
              <p className="text-lg font-bold">Learn at your pace</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Explore clear educational material for different experience levels.
              </p>
            </div>
            <div>
              <p className="text-lg font-bold">Understand the markets</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Build familiarity with financial instruments and market terminology.
              </p>
            </div>
            <div>
              <p className="text-lg font-bold">Make informed decisions</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Consider risks, research independently and avoid relying on promised returns.
              </p>
            </div>
          </div>
        </section>

        <section id="markets" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Global financial markets
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Discover the markets you want to understand
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Each market has its own structure, risks and trading conditions.
              Start with the fundamentals before considering any financial activity.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {markets.map((market) => (
              <article
                key={market.name}
                className="rounded-2xl border border-border bg-panel p-6 transition hover:-translate-y-1 hover:border-primary/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-black text-primary">
                  {market.symbol}
                </span>
                <h3 className="mt-5 text-lg font-bold">{market.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {market.description}
                </p>
                <Link
                  href="/trading"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-panelAlt/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Tools and learning
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Resources to support your learning journey
              </h2>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {resources.map((resource) => (
                <article
                  key={resource.number}
                  className="rounded-2xl border border-border bg-panel p-7"
                >
                  <p className="text-sm font-black tracking-widest text-primary">
                    {resource.number}
                  </p>
                  <h3 className="mt-5 text-xl font-bold">{resource.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {resource.description}
                  </p>
                  <Link
                    href={resource.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {resource.link} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 px-6 py-10 text-center sm:px-12 sm:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              TradeWithMe Global
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold">
              Take the next step in your financial-market education
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted">
              Create an account to explore the platform, or sign in to continue
              to your existing customer dashboard.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="rounded-xl bg-primary px-7 py-3.5 text-sm font-bold text-background transition hover:opacity-90"
              >
                Get started
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-border bg-panel px-7 py-3.5 text-sm font-bold text-foreground transition hover:border-primary"
              >
                Customer login
              </Link>
            </div>
          </div>
        </section>

        <section id="risk" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/5 p-6 sm:p-8">
            <h2 className="font-bold text-amber-200">Important risk disclosure</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Trading foreign exchange, cryptocurrencies, contracts for difference
              and other speculative financial products involves substantial risk.
              Leverage can magnify both gains and losses, and you may lose some or
              all of your invested capital. No profit or return is guaranteed.
              Product availability and legal requirements vary by jurisdiction.
              Information on this website is general and educational, not
              individualized financial advice.
            </p>
            <Link
              href="/risk-disclosure"
              className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              Read the full risk disclosure
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
