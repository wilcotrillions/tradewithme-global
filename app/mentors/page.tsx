import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Mentors | TradeWithMe Global',
  description: 'Meet the mentoring and education focus of the TradeWithMe Global platform.',
};

const mentorFocus = [
  {
    title: 'Educational Guidance',
    description: 'Supportive learning frameworks built around process, patience, and consistent review.',
  },
  {
    title: 'Risk Awareness',
    description: 'Mentors emphasize disciplined risk control and realistic expectations in market learning.',
  },
  {
    title: 'Practical Learning',
    description: 'Skill-building through observation, analysis, and real-world examples without guaranteed outcomes.',
  },
];

export default function MentorsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">TradeWithMe Global</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Mentors & Guidance</h1>
            <p className="mt-6 max-w-3xl text-lg text-muted">
              The mentorship experience is focused on education, accountability, and practical skills that help
              members make better-informed decisions in financial markets.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              {mentorFocus.map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-panel p-6">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-panel p-8">
            <h2 className="text-2xl font-bold">Mentorship philosophy</h2>
            <p className="mt-4 text-muted">
              TradeWithMe Global is designed to help members develop healthier market habits, stronger research
              routines, and more realistic expectations. Educational guidance is meant to support learning, not
              promise profits or guaranteed outcomes.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
