import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Forgot Password | TradeWithMe Global',
  description: 'Draft password recovery page placeholder for the TradeWithMe Global application.',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-panel p-8 shadow-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Account help</p>
          <h1 className="text-3xl font-bold">Forgot password</h1>
          <p className="mt-3 text-sm text-muted">
            This is a draft recovery page. Password reset functionality will be implemented in a later phase.
          </p>

          <form className="mt-8 space-y-5" aria-label="Password reset form">
            <div>
              <label htmlFor="reset-email" className="mb-2 block text-sm font-medium text-foreground">
                Email address
              </label>
              <input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-gray-500 focus:border-primary"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-background transition hover:bg-primary/80"
            >
              Send reset instructions (draft)
            </button>
          </form>

          <p className="mt-6 text-sm text-muted">
            <a href="/login" className="font-medium text-primary hover:underline">
              Back to login
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
