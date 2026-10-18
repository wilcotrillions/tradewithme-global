import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  ArrowRight,
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: BarChart3,
    title: 'Advanced Trading',
    description:
      'Real-time market analysis, professional charting tools, and expert insights.',
  },
  {
    icon: Users,
    title: 'Expert Mentors',
    description:
      'Learn from experienced traders and investment professionals.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Academy',
    description:
      'Structured courses from beginner to advanced levels.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Education',
    description:
      'Understand risk management and portfolio building.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description:
      'Your data and security are our top priorities.',
  },
  {
    icon: Zap,
    title: 'Community Support',
    description:
      'Connect with traders worldwide and share knowledge.',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative px-4 py-20 text-center sm:px-6 md:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              Master Trading &amp; Investment
              <span className="text-primary"> with Confidence</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted sm:text-xl">
              Join thousands of traders learning from expert mentors on a
              secure, professional platform. No guarantees, just education
              and community.
            </p>

            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-background transition-colors hover:bg-primary/80 sm:px-8"
              >
                Get Started <ArrowRight size={18} />
              </Link>

              <Link
                href="/trading"
                className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary/10 sm:px-8"
              >
                Explore Trading
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-panelAlt px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Why Choose TradeWithMe?
            </h2>

            <p className="mx-auto mb-16 max-w-2xl text-center text-muted">
              A complete ecosystem designed for traders and investors at
              every level.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-lg border border-border bg-panel p-6 transition-colors hover:border-primary/50"
                  >
                    <Icon className="mb-4 h-10 w-10 text-primary" />

                    <h3 className="mb-2 text-lg font-semibold">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-muted">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-3xl font-bold md:text-4xl">
              Our Platform
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Link
                href="/trading"
                className="group rounded-lg border border-border bg-panel p-8 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <BarChart3 className="mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />

                <h3 className="mb-2 text-xl font-semibold">
                  Trading Hub
                </h3>

                <p className="mb-4 text-sm text-muted">
                  Professional trading tools, market data, and analysis
                  for demo trading.
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-2">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>

              <Link
                href="/investments"
                className="group rounded-lg border border-border bg-panel p-8 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <TrendingUp className="mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />

                <h3 className="mb-2 text-xl font-semibold">
                  Investments
                </h3>

                <p className="mb-4 text-sm text-muted">
                  Explore investment education and portfolio management
                  principles.
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-2">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>

              <Link
                href="/academy"
                className="group rounded-lg border border-border bg-panel p-8 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <BookOpen className="mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />

                <h3 className="mb-2 text-xl font-semibold">
                  Academy
                </h3>

                <p className="mb-4 text-sm text-muted">
                  Structured courses and learning paths for all skill
                  levels.
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-2">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Risk Disclosure */}
        <section className="border-t border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-lg border border-warning/30 bg-panel p-6">
            <h3 className="mb-2 text-lg font-semibold text-warning">
              ⚠️ Risk Disclosure
            </h3>

            <p className="text-sm text-muted">
              Trading and investing involve substantial risk of loss.
              Past performance does not guarantee future results. This
              platform is for educational purposes only. Always do your
              own research and consult with qualified financial advisors
              before making investment decisions. Never invest more than
              you can afford to lose.
            </p>

            <Link
              href="/risk-disclosure"
              className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
            >
              View Full Risk Disclosure
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Start Learning?
            </h2>

            <p className="mb-8 text-lg text-muted">
              Join our community of traders and investors today.
            </p>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-background transition-colors hover:bg-primary/80"
            >
              Create Your Account <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
          }
