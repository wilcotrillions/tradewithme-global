import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | TradeWithMe Global',
  description: 'Draft privacy policy page placeholder for the TradeWithMe Global application.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Privacy</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-panel p-8">
            <p className="text-sm leading-7 text-muted">
              This draft privacy policy is a placeholder for future platform publishing. It is intended to reflect the
              need for a clear explanation of data handling, account information, cookies, and user communications before
              a production release.
            </p>
            <p className="mt-6 text-sm leading-7 text-muted">
              Final privacy terms should be reviewed by legal counsel and updated as soon as the authentication and data
              storage architecture is finalized. We do not currently implement secure account storage or production data
              collection in this phase.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
