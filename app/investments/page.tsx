import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AlertCircle, DollarSign } from "lucide-react";

const investmentCategories = [
  {
    name: "Stocks",
    description:
      "Learn about equity investing, stock selection, market research and portfolio management.",
  },
  {
    name: "Bonds",
    description:
      "Understand fixed-income investments, bond markets and the role of bonds in a portfolio.",
  },
  {
    name: "ETFs",
    description:
      "Explore exchange-traded funds, diversification and different investment strategies.",
  },
  {
    name: "Mutual Funds",
    description:
      "Learn about managed portfolios, fund selection and long-term investment planning.",
  },
];

const investmentProcess = [
  {
    step: 1,
    title: "Research",
    description:
      "Analyze investment options, objectives and risk profiles before making decisions.",
  },
  {
    step: 2,
    title: "Plan",
    description:
      "Create a diversified investment strategy based on your goals and risk tolerance.",
  },
  {
    step: 3,
    title: "Implement",
    description:
      "Put your investment plan into practice using appropriate investment products.",
  },
  {
    step: 4,
    title: "Monitor",
    description:
      "Review your portfolio regularly and make adjustments when appropriate.",
  },
];

export default function InvestmentsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-panel">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                TradeWithMe Global
              </p>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Investment Education
              </h1>

              <p className="mt-6 text-lg leading-8 text-muted">
                Learn the principles of sound investing, portfolio
                management, diversification and responsible risk management.
              </p>
            </div>
          </div>
        </section>

        {/* Risk Information */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex gap-4 rounded-2xl border border-warning/30 bg-panel p-6">
              <AlertCircle className="h-6 w-6 shrink-0 text-warning" />

              <div>
                <h2 className="font-semibold text-warning">
                  Important: No Guaranteed Returns
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted">
                  All investments carry risk, including the potential loss of
                  principal. Past performance does not guarantee future
                  results. The information provided on this website is for
                  general educational purposes and should not be considered
                  personalized financial advice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Categories */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <h2 className="text-3xl font-bold">Investment Categories</h2>

              <p className="mt-3 max-w-3xl text-muted">
                Build a broader understanding of different investment
                categories and how they may fit into a diversified portfolio.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {investmentCategories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-2xl border border-border bg-panel p-6 transition hover:border-primary"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {category.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Process */}
        <section className="bg-panel px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold">Investment Process</h2>

              <p className="mx-auto mt-3 max-w-2xl text-muted">
                A structured approach can help investors make informed
                decisions and manage risk more effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {investmentProcess.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-white">
                    {item.step}
                  </div>

                  <h3 className="text-xl font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">
              Learn Before You Invest
            </h2>

            <p className="mt-5 leading-7 text-muted">
              Our educational resources are designed to help members develop
              a better understanding of financial markets, investment
              principles and risk management. Investment decisions should
              always be made carefully and according to your own financial
              circumstances.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-border bg-panel px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-lg font-semibold">Investment Disclaimer</h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              The information provided by TradeWithMe Global is general in
              nature and is provided for educational purposes only. It is not
              intended to constitute financial, investment, legal or tax
              advice. Financial markets involve significant risk and you may
              lose some or all of your invested capital. Past performance is
              not a reliable indicator of future results. Consider seeking
              independent professional advice before making an investment
              decision.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
