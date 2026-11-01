import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Academy | TradeWithMe Global',
  description: 'Beginner to advanced trading education resources and learning pathways.',
};

const learningTracks = [
  {
    title: 'Foundation Track',
    description: 'Learn market basics, terminology, and how economic events affect price action.',
  },
  {
    title: 'Technical Analysis',
    description: 'Understand charts, support and resistance, trend structure, and momentum concepts.',
  },
  {
    title: 'Risk Management',
    description: 'Build a disciplined trading framework around sizing, stop placement, and consistency.',
  },
  {
    title: 'Portfolio Thinking',
    description: 'Explore diversification and how investors approach long-term decision making.',
  },
];

export default function AcademyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              TradeWithMe Global
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Trading Academy</h1>
            <p className="mt-6 max-w-3xl text-lg text-muted">
              A structured learning environment for traders and investors who want to strengthen their
              market understanding without relying on hype or shortcuts.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <h2 className="text-3xl font-bold">Learning paths</h2>
              <p className="mt-3 max-w-2xl text-muted">
                Each track is designed to build practical knowledge on research, process, and risk-aware
                decision making.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {learningTracks.map((track) => (
                <div key={track.title} className="rounded-2xl border border-border bg-panel p-6">
                  <h3 className="text-xl font-semibold">{track.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{track.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-2xl border border-border bg-panel p-8">
            <h2 className="text-2xl font-bold">What learners can expect</h2>
            <ul className="mt-6 space-y-3 text-muted">
              <li>• Clear explanations of trading terminology and core market concepts.</li>
              <li>• Educational frameworks for planning, analysis, and emotional discipline.</li>
              <li>• Risk-aware strategies that emphasize process over speculation.</li>
              <li>• A pathway for moving from beginner learning to confident independent study.</li>
            </ul>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">Continue your learning journey</h2>
            <p className="mt-4 text-muted">
              Explore the platform resources and start building a structured approach to financial market
              education.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/trading" className="rounded-lg bg-primary px-6 py-3 font-semibold text-background transition hover:bg-primary/80">
                Explore Trading
              </Link>
              <Link href="/community" className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition hover:border-primary hover:text-primary">
                Join the Community
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
