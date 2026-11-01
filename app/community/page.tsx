import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Community | TradeWithMe Global',
  description: 'A community-based learning space for trading and investment education discussions.',
};

const communityTopics = [
  'Market education and learning groups',
  'Trading psychology and discipline',
  'Investment research and portfolio discussions',
  'Responsible risk management conversations',
];

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Community</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">TradeWithMe Community</h1>
            <p className="mt-6 max-w-3xl text-lg text-muted">
              A place for thoughtful discussion, peer learning, and encouragement around trading education.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-border bg-panel p-8">
              <h2 className="text-2xl font-bold">Discussion themes</h2>
              <ul className="mt-6 space-y-4 text-muted">
                {communityTopics.map((topic) => (
                  <li key={topic} className="rounded-lg border border-border bg-background p-4">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-panelAlt p-8">
              <h2 className="text-2xl font-bold">Community guidelines</h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                Conversations should remain educational, respectful, and focused on responsible market learning.
                Content is not a substitute for professional financial advice.
              </p>
              <Link href="/faq" className="mt-6 inline-block text-primary hover:underline">
                Review common questions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
