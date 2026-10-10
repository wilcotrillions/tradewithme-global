import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { TrendingUp, PieChart, AlertCircle, DollarSign } from 'lucide-react';
import Link from 'next/link';

const investmentCategories = [
  { name: 'Stocks', description: 'Learn about equity investing and stock selection' },
  { name: 'Bonds', description: 'Understand fixed income and bond markets' },
  { name: 'ETFs', description: 'Explore exchange-traded funds and diversification' },
  { name: 'Mutual Funds', description: 'Learn about managed portfolios' },
];

const investmentProcess = [
  { step: 1, title: 'Research', description: 'Analyze investment options and risk profiles' },
  { step: 2, title: 'Plan', description: 'Create a diversified portfolio strategy' },
  { step: 3, title: 'Implement', description: 'Execute your investment plan' },
  { step: 4, title: 'Monitor', description: 'Review and rebalance regularly' },
];

export default function InvestmentsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-panelAlt border-b border-border">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Education</h1>
            <p className="text-lg text-muted">
              Learn the principles of sound investing and portfolio management. No guaranteed returns - just education.
            </p>
          </div>
        </section>

        {/* Risk Information */}
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="mx-auto max-w-4xl p-6 bg-panel border border-warning/30 rounded-lg flex gap-4">
            <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning mb-1">Important: No Guaranteed Returns</h3>
              <p className="text-sm text-muted">
                All investments carry risk, including the potential loss of principal. Past performance does not guarantee future results. Always consult with a financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Investment Categories */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Investment Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {investmentCategories.map((category) => (
                <div key={category.name} className="p-6 bg-panel border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <DollarSign className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Process */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-panelAlt">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">Investment Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {investmentProcess.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="p-6 bg-panel border border-border rounded-lg text-center">
                    <div className="w-10 h-10 bg-primary text-background rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-xs text-muted">{item.description}</p>
                  </div>
                  {index < investmentProcess.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary/30"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Risk Levels */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8">Understanding Risk Levels</h2>
            <div className="space-y-4">
              <div className="p-4 bg-panel border border-border rounded-lg">
                <h3 className="font-semibold mb-2 text-success">Low Risk</h3>
                <p className="text-sm text-muted">Bonds, money market funds, stable value funds. Lower returns but more predictable.</p>
              </div>
              <div className="p-4 bg-panel border border-border rounded-lg">
                <h3 className="font-semibold mb-2 text-warning">Medium Risk</h3>
                <p className="text-sm text-muted">Balanced portfolios with mix of stocks and bonds. Moderate volatility.</p>
              </div>
              <div className="p-4 bg-panel border border-border rounded-lg">
                <h3 className="font-semibold mb-2 text-danger">High Risk</h3>
                <p className="text-sm text-muted">Growth stocks, emerging markets, crypto. Higher potential returns but significant volatility.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-panelAlt text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Start Your Investment Journey</h2>
            <p className="text-muted mb-6">
              Learn investment principles from our academy courses.
            </p>
            <Link
              href="/register"
              className="inline-block px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/80 transition-colors font-semibold"
            >
              Register Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
