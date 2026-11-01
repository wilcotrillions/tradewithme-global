import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'FAQ | TradeWithMe Global',
  description: 'Common questions about process, education, and platform usage.',
};

const faqs = [
  {
    question: 'Is this platform a guarantee of financial success?',
    answer: 'No. TradeWithMe Global is an educational platform and does not promise investment or trading results.',
  },
  {
    question: 'What is the focus of the learning content?',
    answer: 'The content is centered on market education, strategy fundamentals, risk awareness, and disciplined learning habits.',
  },
  {
    question: 'Can I use these resources for my own trading decisions?',
    answer: 'Educational resources may help build knowledge, but individuals should make final decisions based on their own research and circumstances.',
  },
  {
    question: 'Does this platform provide personalized financial advice?',
    answer: 'No. The platform is intended for general educational purposes and should not be treated as personalized financial advice.',
  },
];

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Frequently Asked Questions</h1>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-6">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-2xl border border-border bg-panel p-6">
                <h2 className="text-xl font-semibold">{item.question}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
