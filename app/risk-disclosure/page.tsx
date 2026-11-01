import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Risk Disclosure | TradeWithMe Global',
  description: 'Draft risk disclosure content for educational platform usage.',
};

export default function RiskDisclosurePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Risk disclosure</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Educational Risk Notice</h1>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-panel p-8">
            <p className="text-sm leading-7 text-muted">
              Trading and investing involve substantial risk, including the possibility of losing some or all of an
              investment. Past performance is not a reliable indicator of future results. The content on this website is
              intended for educational purposes only and is not personalized financial, legal, or tax advice.
            </p>
            <p className="mt-6 text-sm leading-7 text-muted">
              Any decisions made using information from this platform should be based on an individual’s own research,
              judgment, financial circumstances, and risk tolerance. This notice is drafted for informational clarity and
              may be reviewed by a legal or compliance professional before final publication.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
