import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Register | TradeWithMe Global',
  description: 'Draft registration page placeholder for the TradeWithMe Global application.',
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-panel p-8 shadow-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Create account</p>
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-3 text-sm text-muted">
            This registration page is a draft placeholder. Secure account creation will be implemented in a future
            phase.
          </p>

          <form className="mt-8 space-y-5" aria-label="Registration form">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-gray-500 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="register-email" className="mb-2 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-gray-500 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="register-password" className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                placeholder="Minimum 8 characters"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-gray-500 focus:border-primary"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-background transition hover:bg-primary/80"
            >
              Create account (draft)
            </button>
          </form>

          <p className="mt-6 text-sm text-muted">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
