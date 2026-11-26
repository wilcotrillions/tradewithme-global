import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const metadata = { title: 'TradeWithMe Global | Trading education', description: 'Build your understanding of financial markets with trading education, learning resources, and risk awareness.' };
const cards = [
  { title: 'Trading', description: 'Explore market fundamentals and trading concepts.', href: '/trading' },
  { title: 'Investments', description: 'Learn about investment principles and risk.', href: '/investments' },
  { title: 'Academy', description: 'Access educational resources for your learning journey.', href: '/academy' },
];
export default function HomePage() {
  return <><Navbar/><main className="bg-background text-foreground"><section className="px-4 py-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl"><p className="text-sm font-bold uppercase tracking-[.2em] text-primary">TradeWithMe Global</p><h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">Learn about markets. Make informed decisions.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">Explore financial-market education, practical learning resources, and responsible risk awareness.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/academy" className="rounded-lg bg-primary px-5 py-3 font-semibold text-background">Explore the academy</Link><Link href="/register" className="rounded-lg border border-border px-5 py-3 font-semibold">Create an account</Link></div></div></section><section className="border-t border-border bg-panelAlt px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">{cards.map((card)=><Link key={card.href} href={card.href} className="rounded-xl border border-border bg-panel p-6 transition-colors hover:border-primary/50"><h2 className="text-xl font-bold">{card.title}</h2><p className="mt-3 text-sm leading-6 text-muted">{card.description}</p><span className="mt-5 inline-block text-sm font-semibold text-primary">Learn more →</span></Link>)}</div></section><section className="px-4 py-10 sm:px-6 lg:px-8"><p className="mx-auto max-w-6xl text-xs leading-6 text-muted">Trading and investing involve financial risk and may not be suitable for everyone. Content is for general educational purposes and is not personalized financial advice.</p></section></main><Footer/></>;
}
