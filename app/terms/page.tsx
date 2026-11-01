import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Terms & Conditions | TradeWithMe Global',
  description: 'Draft terms and conditions page placeholder for the TradeWithMe Global application.',
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Terms</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Terms & Conditions</h1>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-panel p-8">
            <p className="text-sm leading-7 text-muted">
              This draft terms page is intentionally placeholder content for future final legal review. It is intended to
              outline the general use of the website and to reflect the educational nature of the platform.
            </p>
            <p className="mt-6 text-sm leading-7 text-muted">
              Final terms should be reviewed and approved by legal counsel before public launch. The content here does not
              create a binding contract and should not be treated as final legal wording.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
