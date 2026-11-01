import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Contact | TradeWithMe Global',
  description: 'Contact TradeWithMe Global for general inquiries and support information.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <section className="border-b border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h1>
            <p className="mt-6 max-w-2xl text-lg text-muted">
              For general questions about the platform, educational resources, or support, use the official contact
              details below.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-panel p-8">
              <h2 className="text-2xl font-bold">Support</h2>
              <ul className="mt-6 space-y-4 text-muted">
                <li>Email: support@tradewithme.global</li>
                <li>Hours: General support inquiries as available</li>
                <li>Topic: Platform, education, and resource questions</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-panelAlt p-8">
              <h2 className="text-2xl font-bold">Important note</h2>
              <p className="mt-4 text-sm leading-6 text-muted">
                Contact details are provided for general communication only. This website is designed for educational
                purposes and does not provide personalized financial advice.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
