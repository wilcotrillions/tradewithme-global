import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, BarChart3, Users, BookOpen, TrendingUp, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: BarChart3,
    title: 'Advanced Trading',
    description: 'Real-time market analysis, professional charting tools, and expert insights.',
  },
  {
    icon: Users,
    title: 'Expert Mentors',
    description: 'Learn from experienced traders and investment professionals.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Academy',
    description: 'Structured courses from beginner to advanced levels.',
  },
  {
    icon: TrendingUp,
    title: 'Investment Education',
    description: 'Understand risk management and portfolio building.',
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Your data and security are our top priorities.',
  },
  {
    icon: Zap,
    title: 'Community Support',
    description: 'Connect with traders worldwide and share knowledge.',
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Master Trading & Investment
              <span className="text-primary"> with Confidence</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8">
              Join thousands of traders learning from expert mentors on a secure, professional platform. No guarantees, just education and community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-primary text-background rounded-lg hover:bg-primary/80 transition-colors font-semibold"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <Link
                href="/trading"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold"
              >
                Explore Trading
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-panelAlt">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose TradeWithMe?</h2>
            <p className="text-center text-muted mb-16 max-w-2xl mx-auto">
              A complete ecosystem designed for traders and investors at every level.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="p-6 bg-panel border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <Icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Platform</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link
                href="/trading"
                className="p-8 bg-panel border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <BarChart3 className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Trading Hub</h3>
                <p className="text-sm text-muted mb-4">
                  Professional trading tools, market data, and analysis for demo trading.
                </p>
                <span className="text-primary text-sm font-semibold group-hover:translate-x-2 inline-flex items-center gap-1 transition-transform">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>

              <Link
                href="/investments"
                className="p-8 bg-panel border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <TrendingUp className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Investments</h3>
                <p className="text-sm text-muted mb-4">
                  Explore investment education and portfolio management principles.
                </p>
                <span className="text-primary text-sm font-semibold group-hover:translate-x-2 inline-flex items-center gap-1 transition-transform">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>

              <Link
                href="/academy"
                className="p-8 bg-panel border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                <BookOpen className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Academy</h3>
                <p className="text-sm text-muted mb-4">
                  Structured courses and learning paths for all skill levels.
                </p>
                <span className="text-primary text-sm font-semibold group-hover:translate-x-2 inline-flex items-center gap-1 transition-transform">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Risk Disclosure */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-panelAlt border-t border-border">
          <div className="mx-auto max-w-4xl p-6 bg-panel border border-warning/30 rounded-lg">
            <h3 className="text-lg font-semibold text-warning mb-2">⚠️ Risk Disclosure</h3>
            <p className="text-sm text-muted">
              Trading and investing involve substantial risk of loss. Past performance does not guarantee future results. This platform is for educational purposes only. Always do your own research and consult with qualified financial advisors before making investment decisions. Never invest more than you can afford to lose.
            </p>
            <Link href="/risk-disclosure" className="text-primary text-sm font-semibold mt-3 inline-block hover:underline">
              View Full Risk Disclosure
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-lg text-muted mb-8">
              Join our community of traders and investors today.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-background rounded-lg hover:bg-primary/80 transition-colors font-semibold"
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
