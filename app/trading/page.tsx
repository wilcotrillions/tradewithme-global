import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { BarChart3, TrendingUp, PieChart, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

const tradingCategories = [
  { name: 'Forex', icon: TrendingUp },
  { name: 'Stocks', icon: BarChart3 },
  { name: 'Cryptocurrencies', icon: Zap },
  { name: 'Commodities', icon: PieChart },
];

const tools = [
  { name: 'Advanced Charting', description: 'Professional-grade charts with technical indicators' },
  { name: 'Real-time Data', description: 'Live market data and price updates' },
  { name: 'Watchlist', description: 'Track your favorite assets in one place' },
  { name: 'Market Analysis', description: 'Expert insights and market commentary' },
  { name: 'Risk Management', description: 'Tools to manage position sizing and risk' },
  { name: 'Trading Signals', description: 'Educational signals based on technical analysis' },
];

export default function TradingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-20 bg-panelAlt border-b border-border">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Trading Platform
            </h1>
            <p className="text-lg text-muted">
              Learn trading strategies with our comprehensive platform. Demo trading, real market data, and professional tools.
            </p>
          </div>
        </section>

        {/* Market Categories */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Market Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tradingCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.name}
                    className="p-6 bg-panel border border-border rounded-lg hover:border-primary/50 transition-colors text-center"
                  >
                    <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trading Tools */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-panelAlt">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">Trading Tools & Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-6 bg-panel border border-border rounded-lg"
                >
                  <h3 className="font-semibold mb-2">{tool.name}</h3>
                  <p className="text-sm text-muted">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Risk Management Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">
              Risk Management Information
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-panel border border-border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield size={20} className="text-primary" />
                  Position Sizing
                </h3>
                <p className="text-sm text-muted">
                  Never risk more than 1-2% of your account on a single trade. Use stop losses to limit potential losses.
                </p>
              </div>

              <div className="p-6 bg-panel border border-border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield size={20} className="text-primary" />
                  Diversification
                </h3>
                <p className="text-sm text-muted">
                  Spread your trades across different assets and timeframes. Avoid concentrating risk in a single position.
                </p>
              </div>

              <div className="p-6 bg-panel border border-border rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield size={20} className="text-primary" />
                  Emotional Control
                </h3>
                <p className="text-sm text-muted">
                  Stick to your trading plan. Avoid revenge trading or making decisions based on emotions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-panelAlt text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">
              Start Trading with Our Platform
            </h2>
            <p className="text-muted mb-6">
              Access professional trading tools and learn with demo data.
            </p>
            <Link
              href="/register"
              className="inline-block px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/80 transition-colors font-semibold"
            >
              Create Account
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
