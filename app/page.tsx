import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'TradeWithMe Global | Trading education',
  description: 'Professional trading and investment education, market insights, and learning resources.',
};

export default function HomePage() {
  const marketOverview = [
    { name: 'EUR/USD', movement: '+1.24%', positive: true },
    { name: 'GBP/USD', movement: '+0.86%', positive: true },
    { name: 'Gold', movement: '-0.31%', positive: false },
    { name: 'BTC/USD', movement: '+2.17%', positive: true },
    { name: 'NASDAQ', movement: '+0.74%', positive: true },
  ];
  const focusCards = [
    { icon: '📊', title: 'Market Education', description: 'Learn technical analysis, market structure, risk management, trading psychology, and investment fundamentals.' },
    { icon: '📈', title: 'Trading Strategies', description: 'Explore structured approaches to analyzing markets and developing your own trading plan.' },
    { icon: '🛡️', title: 'Risk Management', description: 'Understand position sizing, stop-loss planning, portfolio protection, and responsible trading practices.' },
  ];
  const educationCards = [
    { icon: '🎓', title: 'Beginner Education', description: 'Start with the fundamentals and develop a strong understanding of how financial markets work.' },
    { icon: '🧠', title: 'Trading Psychology', description: 'Learn how discipline, patience, and emotional control affect trading decisions.' },
    { icon: '💼', title: 'Professional Development', description: 'Develop structured routines and analytical skills for a more professional approach to trading.' },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-background text-foreground">
        <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-primary">TradeWithMe Global</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">Trade Smarter. <span className="text-primary">Invest Better.</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">TradeWithMe Global is a professional trading and investment education platform designed to help you understand the markets, develop better strategies, and make informed decisions.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/register" className="rounded-lg bg-primary px-5 py-3 font-semibold text-background">Get Started</Link>
                <Link href="#about" className="rounded-lg border border-border px-5 py-3 font-semibold">Explore Platform</Link>
              </div>
            </div>
            <aside aria-label="Illustrative market overview" className="rounded-2xl border border-border bg-panel p-6 shadow-xl">
              <h2 className="mb-4 text-lg font-semibold">Market Overview</h2>
              <ul className="divide-y divide-border">
                {marketOverview.map((market) => <li key={market.name} className="flex justify-between py-3 text-sm"><span>{market.name}</span><span className={market.positive ? 'text-emerald-400' : 'text-red-400'}>{market.movement}</span></li>)}
              </ul>
              <p className="mt-3 text-xs text-muted">Illustrative market data, not live quotes.</p>
            </aside>
          </div>
        </section>

        <section id="about" className="border-t border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center"><h2 className="text-3xl font-bold">Built for Serious Traders</h2><p className="mt-3 text-muted">Everything you need to improve your understanding of financial markets in one platform.</p></div>
            <div className="grid gap-5 md:grid-cols-3">{focusCards.map((card) => <article key={card.title} className="rounded-2xl border border-border bg-panel p-6"><div className="text-3xl">{card.icon}</div><h3 className="mt-4 text-xl font-semibold">{card.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{card.description}</p></article>)}</div>
          </div>
        </section>

        <section id="education" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center"><h2 className="text-3xl font-bold">Learn. Practice. Improve.</h2><p className="mt-3 text-muted">Build your knowledge before putting your capital at risk.</p></div>
            <div className="grid gap-5 md:grid-cols-3">{educationCards.map((card) => <article key={card.title} className="rounded-2xl border border-border bg-panel p-6"><div className="text-3xl">{card.icon}</div><h3 className="mt-4 text-xl font-semibold">{card.title}</h3><p className="mt-3 text-sm leading-6 text-muted">{card.description}</p></article>)}</div>
          </div>
        </section>

        <section className="border-y border-border bg-panelAlt px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl"><h2 className="text-3xl font-bold">Ready to Trade With Knowledge?</h2><p className="mt-4 leading-7 text-muted">Join TradeWithMe Global and access a professional environment focused on trading education and market development.</p><Link href="/login" className="mt-7 inline-block rounded-lg bg-primary px-5 py-3 font-semibold text-background">Access Your Account</Link></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
