import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Login | TradeWithMe Global',
  description: 'Draft login page placeholder for the TradeWithMe Global application.',
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-panel p-8 shadow-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Member access</p>
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-3 text-sm text-muted">
            This is a draft page placeholder. Secure authentication is planned for a later phase.
          </p>

          <form className="mt-8 space-y-5" aria-label="Login form">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-gray-500 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-gray-500 focus:border-primary"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-background transition hover:bg-primary/80"
            >
              Sign in (draft)
            </button>
          </form>

          <div className="mt-6 space-y-3 text-sm text-muted">
            <p>
              Need an account?{' '}
              <a href="/register" className="font-medium text-primary hover:underline">
                Create one
              </a>
            </p>
            <p>
              Forgot your password?{' '}
              <a href="/forgot-password" className="font-medium text-primary hover:underline">
                Reset it
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
