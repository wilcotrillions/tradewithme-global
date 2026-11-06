'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  CircleHelp,
  Clock3,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileCheck2,
  Headset,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Search,
  Settings2,
  ShieldCheck,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react';

type Section = 'Overview' | 'Trading activity' | 'Transactions' | 'Commissions' | 'Support' | 'Documents';

const trades = [
  { pair: 'EUR / USD', type: 'Long', opened: 'Today, 09:42', size: '0.40 lots', result: '+$184.20', positive: true },
  { pair: 'GBP / USD', type: 'Short', opened: 'Today, 08:16', size: '0.25 lots', result: '+$96.75', positive: true },
  { pair: 'XAU / USD', type: 'Long', opened: 'Yesterday, 15:38', size: '0.10 lots', result: '−$42.10', positive: false },
  { pair: 'USD / JPY', type: 'Long', opened: 'Yesterday, 11:04', size: '0.30 lots', result: '+$128.40', positive: true },
];

const transactions = [
  { label: 'Deposit', detail: 'Bank transfer ···· 4821', date: 'Nov 04, 2026', amount: '+$1,000.00', status: 'Completed', deposit: true },
  { label: 'Withdrawal', detail: 'Bank transfer ···· 4821', date: 'Nov 02, 2026', amount: '−$250.00', status: 'Processing', deposit: false },
  { label: 'Deposit', detail: 'Card ···· 0912', date: 'Oct 28, 2026', amount: '+$500.00', status: 'Completed', deposit: true },
];

const navItems: { label: Section; icon: typeof LayoutDashboard }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Trading activity', icon: TrendingUp },
  { label: 'Transactions', icon: Wallet },
  { label: 'Commissions', icon: BriefcaseBusiness },
  { label: 'Support', icon: Headset },
  { label: 'Documents', icon: FileCheck2 },
];

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-slate-800/80 bg-[#101923] ${className}`}>{children}</section>;
}

function Chart() {
  return (
    <div className="relative mt-5 h-52 w-full overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-between text-[11px] text-slate-600">
        {[0, 1, 2, 3].map((line) => <div key={line} className="flex items-center gap-3"><span>${(12.8 + (3 - line) * 0.4).toFixed(1)}k</span><div className="h-px flex-1 border-t border-dashed border-slate-700" /></div>)}
      </div>
      <svg viewBox="0 0 640 180" preserveAspectRatio="none" className="absolute inset-x-9 top-2 h-[calc(100%-24px)] w-[calc(100%-36px)]" aria-label="Account performance trend">
        <defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#41d6a3" stopOpacity=".23"/><stop offset="100%" stopColor="#41d6a3" stopOpacity="0"/></linearGradient></defs>
        <path d="M0 145 C30 139 35 112 70 122 S108 98 135 111 S173 75 205 92 S248 81 273 87 S303 51 337 69 S376 60 401 73 S440 39 471 50 S502 30 529 46 S568 20 594 36 S620 12 640 18 L640 180 L0 180 Z" fill="url(#areaFill)"/>
        <path d="M0 145 C30 139 35 112 70 122 S108 98 135 111 S173 75 205 92 S248 81 273 87 S303 51 337 69 S376 60 401 73 S440 39 471 50 S502 30 529 46 S568 20 594 36 S620 12 640 18" fill="none" stroke="#41d6a3" strokeWidth="3" strokeLinecap="round"/>
      </svg>
      <div className="absolute bottom-0 left-9 right-0 flex justify-between text-[10px] text-slate-600"><span>Oct 06</span><span>Oct 13</span><span>Oct 20</span><span>Oct 27</span><span>Nov 04</span></div>
    </div>
  );
}

export default function DashboardClient() {
  const [active, setActive] = useState<Section>('Overview');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profit, setProfit] = useState('1000');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const split = useMemo(() => {
    const amount = Math.max(0, Number(profit) || 0);
    return { customer: amount * 0.7, platform: amount * 0.3 };
  }, [profit]);

  const changeSection = (section: Section) => { setActive(section); setMobileMenu(false); };
  const filteredTrades = trades.filter((trade) => `${trade.pair} ${trade.type}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0b1118] text-slate-100">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-slate-800 bg-[#0e161f] px-5 py-6 transition-transform lg:translate-x-0 ${mobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <Link href="/" className="mb-10 flex items-center gap-3 px-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-sm font-black text-[#07120f]">TWM</span>
          <span className="text-[15px] font-semibold tracking-tight">TradeWithMe<span className="text-emerald-400">.</span><span className="block text-[10px] font-medium uppercase tracking-[.2em] text-slate-500">Global</span></span>
        </Link>
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-600">Workspace</p>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => changeSection(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] transition ${active === label ? 'bg-[#152532] text-emerald-300' : 'text-slate-300 hover:bg-[#121d29]'}`}><Icon size={16} /><span>{label}</span></button>)}
        </nav>
        <div className="mt-auto rounded-2xl border border-slate-800 bg-[#121e28] p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><BookOpen size={18}/></div>
          <p className="text-sm font-semibold">Trade smarter</p><p className="mt-1 text-xs leading-5 text-slate-500">Explore practical lessons in the Trading Academy.</p>
          <Link href="/academy" className="mt-3 inline-block text-xs font-semibold text-emerald-300">Visit academy →</Link>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-slate-800 pt-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#26343f] text-xs font-bold text-emerald-300">JD</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Jordan Doe</p><p className="truncate text-[11px] text-slate-500">Premium member</p></div>
        </div>
      </aside>
      {mobileMenu && <button aria-label="Close navigation" onClick={() => setMobileMenu(false)} className="fixed inset-0 z-30 bg-black/60 lg:hidden"/>}

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-800/80 bg-[#0b1118]/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3"><button onClick={() => setMobileMenu(true)} className="rounded-lg p-2 text-slate-400 lg:hidden" aria-label="Open menu"><Menu size={20}/></button><div className="flex items-center gap-2 rounded-full border border-slate-700 bg-[#101923] px-3 py-1.5 text-[11px] text-slate-300"><Search size={14} /> <span className="hidden sm:inline">Search market overview</span></div></div>
          <div className="flex items-center gap-3"><span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[.06] px-3 py-1.5 text-[11px] font-medium text-emerald-300 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Live account</span><button type="button" className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-slate-500" aria-label="Notifications"><Bell size={17} /></button><button type="button" className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:border-slate-500" aria-label="Settings"><Settings2 size={17} /></button></div>
        </header>

        <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-9">
          {notice && <div role="status" className="mb-5 flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-400/[.06] px-4 py-3 text-sm text-emerald-200">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss notice" className="text-emerald-300"><X size={16}/></button></div>}
          {active === 'Overview' && <>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-medium text-slate-500">Wednesday, November 5, 2026</p><h2 className="text-[26px] font-semibold tracking-tight">Welcome back, Jordan</h2></div><div className="flex items-center gap-2"><span className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#101923] px-3 py-1.5 text-[11px] font-medium text-slate-300"><ShieldCheck size={14} className="text-emerald-300" /> Verified account</span><button type="button" className="rounded-lg border border-slate-700 bg-[#101923] px-3 py-2 text-xs font-medium text-slate-300" onClick={() => setBalanceVisible((current) => !current)}>{balanceVisible ? 'Hide balance' : 'Show balance'}</button></div></div>
            <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[{ label: 'Total account balance', value: '$12,840.50', change: '+8.24%', icon: Wallet },{ label: 'Available to withdraw', value: '$8,420.50', change: 'Ready to request', icon: CreditCard },{ label: 'Open positions', value: '6', change: '+2 this week', icon: TrendingUp },{ label: 'Win rate', value: '68.4%', change: '+3.1%', icon: ArrowUpRight }].map(({ label, value, change, icon: Icon }) => <div key={label} className="rounded-2xl border border-slate-800 bg-[#101923] p-4"><div className="flex items-center justify-between"><p className="text-xs text-slate-500">{label}</p><span className="rounded-lg border border-slate-700 p-2 text-slate-300"><Icon size={15}/></span></div><div className="mt-5 flex items-end justify-between"><p className="text-[28px] font-semibold tracking-tight">{balanceVisible ? value : '••••••'}</p><span className="text-xs font-medium text-emerald-300">{change}</span></div></div>)}
            </div>
            <div className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              <Panel className="p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-semibold">Account performance</p><p className="mt-1 text-xs text-slate-500">Your portfolio trend over the last 30 days</p></div><div className="flex items-center gap-2 text-xs text-emerald-300"><ArrowUpRight size={14}/> +12.8% this month</div></div><Chart /></Panel>
              <Panel className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold">Account verification</p><p className="mt-1 text-xs text-slate-500">KYC and compliance overview</p></div><span className="rounded-full border border-emerald-400/20 bg-emerald-400/[.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-emerald-300">Verified</span></div><div className="mt-5 space-y-4 text-sm text-slate-300"><div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#121d29] px-3 py-2.5"><span>Identity</span><span className="text-emerald-300">Approved</span></div><div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#121d29] px-3 py-2.5"><span>Tax documents</span><span className="text-emerald-300">Complete</span></div><div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#121d29] px-3 py-2.5"><span>Risk profile</span><span className="text-slate-400">Updated</span></div></div></Panel>
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              <Panel className="overflow-hidden"><div className="flex items-center justify-between border-b border-slate-800 px-5 py-4"><div><p className="text-sm font-semibold">Recent trading activity</p><p className="mt-1 text-xs text-slate-500">Latest closed and open positions</p></div><button type="button" className="text-xs font-medium text-emerald-300">View all</button></div><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left"><thead><tr className="text-[10px] uppercase tracking-[.14em] text-slate-500"><th className="px-5 py-3">Pair</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Opened</th><th className="px-5 py-3">Size</th><th className="px-5 py-3 text-right">Result</th></tr></thead><tbody>{filteredTrades.map((trade) => <tr key={`${trade.pair}-${trade.opened}`} className="border-t border-slate-800 text-sm"><td className="px-5 py-3 font-medium">{trade.pair}</td><td className="px-5 py-3"><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${trade.type === 'Long' ? 'bg-emerald-400/10 text-emerald-300' : 'bg-cyan-400/10 text-cyan-300'}`}>{trade.type}</span></td><td className="px-5 py-3 text-slate-400">{trade.opened}</td><td className="px-5 py-3 text-slate-300">{trade.size}</td><td className="px-5 py-3 text-right font-medium text-emerald-300">{trade.result}</td></tr>)}</tbody></table></div></Panel>
              <div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold">Commission calculator</p><p className="mt-1 text-xs text-slate-500">Estimate payout split</p></div><span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] font-medium text-slate-400">70 / 30</span></div><div className="mt-5 space-y-4"><label className="block text-xs uppercase tracking-[.14em] text-slate-500">Profit amount<input type="number" min="0" value={profit} onChange={(event) => setProfit(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-[#0d141b] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" /></label><div className="rounded-xl border border-slate-800 bg-[#121d29] p-3"><div className="flex items-center justify-between text-sm"><span>Customer</span><span className="font-semibold text-emerald-300">${split.customer.toFixed(2)}</span></div><div className="mt-2 flex items-center justify-between text-sm"><span>Platform</span><span className="font-semibold text-slate-300">${split.platform.toFixed(2)}</span></div></div></div></div>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-2"><Panel className="overflow-hidden"><div className="flex items-center justify-between border-b border-slate-800 px-5 py-4"><div><p className="text-sm font-semibold">Recent transactions</p><p className="mt-1 text-xs text-slate-500">Latest account activity</p></div><button type="button" className="text-xs font-medium text-emerald-300">See all</button></div><div className="divide-y divide-slate-800/70">{transactions.map((item) => <div key={item.label+item.date} className="flex items-center gap-3 px-5 py-4"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.deposit ? 'bg-emerald-400/10 text-emerald-300' : 'bg-slate-700/60 text-slate-300'}`}>{item.deposit ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}</span><div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-slate-500">{item.detail} · {item.date}</p></div><div className="text-right"><p className="text-sm font-semibold">{item.amount}</p><p className="text-[10px] uppercase tracking-[.14em] text-slate-500">{item.status}</p></div></div>)}</div></Panel><Panel className="flex items-center justify-between gap-4 p-5 sm:p-6"><div className="flex items-start gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><Headset size={18}/></div><div><p className="text-sm font-semibold">Need help?</p><p className="mt-1 text-xs leading-5 text-slate-500">Our support team can assist with account, trading, and platform questions.</p></div></div><button type="button" onClick={() => changeSection('Support')} className="shrink-0 rounded-lg border border-slate-700 bg-[#121d29] px-3 py-2 text-xs font-semibold text-slate-200">Contact us</button></Panel></div>
            <p className="mt-7 text-[10px] leading-5 text-slate-600">Illustrative account figures shown for dashboard preview only. Trading involves substantial risk and may not be suitable for all investors.</p>
          </>}

          {active === 'Trading activity' && <><div className="mb-6"><p className="mb-2 text-xs text-slate-500">Account workspace</p><h2 className="text-2xl font-semibold">Trading activity</h2><p className="mt-2 text-sm text-slate-400">Review your recent positions and trading history.</p></div><Panel className="overflow-hidden"><div className="flex items-center justify-between border-b border-slate-800 px-5 py-4"><div><p className="text-sm font-semibold">Recent positions</p><p className="mt-1 text-xs text-slate-500">Closed and open trades</p></div><button type="button" className="text-xs font-medium text-emerald-300">Export</button></div><div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left"><thead><tr className="text-[10px] uppercase tracking-[.14em] text-slate-500"><th className="px-5 py-3">Pair</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Opened</th><th className="px-5 py-3">Size</th><th className="px-5 py-3 text-right">Result</th></tr></thead><tbody>{filteredTrades.map((trade) => <tr key={`${trade.pair}-${trade.opened}-list`} className="border-t border-slate-800 text-sm"><td className="px-5 py-3 font-medium">{trade.pair}</td><td className="px-5 py-3"><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${trade.type === 'Long' ? 'bg-emerald-400/10 text-emerald-300' : 'bg-cyan-400/10 text-cyan-300'}`}>{trade.type}</span></td><td className="px-5 py-3 text-slate-400">{trade.opened}</td><td className="px-5 py-3 text-slate-300">{trade.size}</td><td className="px-5 py-3 text-right font-medium text-emerald-300">{trade.result}</td></tr>)}</tbody></table></div></Panel></>}

          {active === 'Transactions' && <><div className="mb-6"><p className="mb-2 text-xs text-slate-500">Account workspace</p><h2 className="text-2xl font-semibold">Transactions</h2><p className="mt-2 text-sm text-slate-400">Track deposits, withdrawals, and payment activity.</p></div><div className="mb-5 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><p className="text-xs text-slate-500">Total deposits</p><p className="mt-3 text-2xl font-semibold">$1,500.00</p></div><div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><p className="text-xs text-slate-500">Total withdrawals</p><p className="mt-3 text-2xl font-semibold">$250.00</p></div><div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><p className="text-xs text-slate-500">Pending</p><p className="mt-3 text-2xl font-semibold">1</p></div></div><Panel className="overflow-hidden"><div className="divide-y divide-slate-800/70">{transactions.map((item) => <div key={item.label+item.date+'transactions'} className="flex items-center gap-3 px-5 py-4"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.deposit ? 'bg-emerald-400/10 text-emerald-300' : 'bg-slate-700/60 text-slate-300'}`}>{item.deposit ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}</span><div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-slate-500">{item.detail} · {item.date}</p></div><div className="text-right"><p className="text-sm font-semibold">{item.amount}</p><p className="text-[10px] uppercase tracking-[.14em] text-slate-500">{item.status}</p></div></div>)}</div></Panel></>}

          {active === 'Commissions' && <><div className="mb-6"><p className="mb-2 text-xs text-slate-500">Account workspace</p><h2 className="text-2xl font-semibold">Commission calculator</h2><p className="mt-2 text-sm text-slate-400">Estimate how a hypothetical profit amount is divided using a 70/30 split.</p></div><div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]"><div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><label className="block text-xs uppercase tracking-[.14em] text-slate-500">Profit amount<input type="number" min="0" value={profit} onChange={(event) => setProfit(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-[#0d141b] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" /></label><div className="mt-4 space-y-3"><div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#121d29] px-3 py-3"><span className="text-sm">Customer</span><span className="font-semibold text-emerald-300">${split.customer.toFixed(2)}</span></div><div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#121d29] px-3 py-3"><span className="text-sm">Platform</span><span className="font-semibold text-slate-300">${split.platform.toFixed(2)}</span></div></div></div><div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><p className="text-xs uppercase tracking-[.14em] text-slate-500">Summary</p><p className="mt-4 text-sm leading-7 text-slate-400">The calculator uses a standard 70% customer share and 30% platform share based on the profit entered.</p></div></div></>}

          {active === 'Support' && <><div className="mb-6"><p className="mb-2 text-xs text-slate-500">Account workspace</p><h2 className="text-2xl font-semibold">Customer support</h2><p className="mt-2 text-sm text-slate-400">We&apos;re here to help with your account and platform questions.</p></div><div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><Headset size={18}/></div><div><p className="font-semibold">Live support</p><p className="text-sm text-slate-500">Available Monday to Friday, 08:00–18:00 UTC</p></div></div><div className="mt-5 space-y-3 text-sm text-slate-300"><div className="rounded-xl border border-slate-800 bg-[#121d29] px-3 py-2.5">Email: support@tradewithmeglobal.com</div><div className="rounded-xl border border-slate-800 bg-[#121d29] px-3 py-2.5">Phone: +1 (800) 555-0148</div><div className="rounded-xl border border-slate-800 bg-[#121d29] px-3 py-2.5">Response time: under 2 hours</div></div></div><div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><p className="text-xs uppercase tracking-[.14em] text-slate-500">Need a quick answer?</p><p className="mt-4 text-sm leading-7 text-slate-400">Use the support desk to request onboarding help, account updates, or trading assistance.</p></div></div></>}

          {active === 'Documents' && <><div className="mb-6"><p className="mb-2 text-xs text-slate-500">Account workspace</p><h2 className="text-2xl font-semibold">Documents & verification</h2><p className="mt-2 text-sm text-slate-400">Manage the documents associated with your account.</p></div><div className="grid gap-4 md:grid-cols-2"><div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">Proof of identity</p><p className="mt-1 text-xs text-slate-500">Government-issued ID</p></div><span className="rounded-full border border-emerald-400/20 bg-emerald-400/[.06] px-2 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-emerald-300">Verified</span></div></div><div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">Tax residency form</p><p className="mt-1 text-xs text-slate-500">Submitted on Nov 01</p></div><span className="rounded-full border border-emerald-400/20 bg-emerald-400/[.06] px-2 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-emerald-300">Verified</span></div></div></div></>}
        </main>
      </div>
    </div>
  );
}

function SectionHeading({title,subtitle}:{title:string;subtitle:string}) { return <div className="mb-6"><p className="mb-2 text-xs text-slate-500">Account workspace</p><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-2 text-sm text-slate-400">{subtitle}</p></div>; }
function Metric({label,value}:{label:string;value:string}) { return <div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><p className="text-xs text-slate-500">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>; }
function TradeTable({rows}:{rows:typeof trades}) { return <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left"><thead><tr className="text-[10px] uppercase tracking-[.14em] text-slate-500"><th className="px-5 py-3">Pair</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Opened</th><th className="px-5 py-3">Size</th><th className="px-5 py-3 text-right">Result</th></tr></thead><tbody>{rows.map((trade) => <tr key={`${trade.pair}-${trade.opened}-table`} className="border-t border-slate-800 text-sm"><td className="px-5 py-3 font-medium">{trade.pair}</td><td className="px-5 py-3"><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${trade.type === 'Long' ? 'bg-emerald-400/10 text-emerald-300' : 'bg-cyan-400/10 text-cyan-300'}`}>{trade.type}</span></td><td className="px-5 py-3 text-slate-400">{trade.opened}</td><td className="px-5 py-3 text-slate-300">{trade.size}</td><td className="px-5 py-3 text-right font-medium text-emerald-300">{trade.result}</td></tr>)}</tbody></table></div>; }
function CommissionCard({profit,setProfit,split}:{profit:string;setProfit:(value:string)=>void;split:{customer:number;platform:number}}) { const money=(value:number)=>value.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); return <div className="rounded-2xl border border-slate-800 bg-[#101923] p-5"><div className="flex items-center justify-between"><p className="text-sm font-semibold">Commission calculator</p><span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] font-medium text-slate-400">70 / 30</span></div><div className="mt-5 space-y-4"><label className="block text-xs uppercase tracking-[.14em] text-slate-500">Profit amount<input type="number" min="0" value={profit} onChange={(event) => setProfit(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-[#0d141b] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400" /></label><div className="rounded-xl border border-slate-800 bg-[#121d29] p-3"><div className="flex items-center justify-between text-sm"><span>Customer</span><span className="font-semibold text-emerald-300">${money(split.customer)}</span></div><div className="mt-2 flex items-center justify-between text-sm"><span>Platform</span><span className="font-semibold text-slate-300">${money(split.platform)}</span></div></div></div></div>; }
function TransactionRows() { return <div className="divide-y divide-slate-800/70">{transactions.map((item)=><div key={item.label+item.date+'rows'} className="flex items-center gap-3 px-5 py-4"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.deposit ? 'bg-emerald-400/10 text-emerald-300' : 'bg-slate-700/60 text-slate-300'}`}>{item.deposit ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}</span><div className="min-w-0 flex-1"><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-slate-500">{item.detail} · {item.date}</p></div><div className="text-right"><p className="text-sm font-semibold">{item.amount}</p><p className="text-[10px] uppercase tracking-[.14em] text-slate-500">{item.status}</p></div></div>)}</div>; }
function TransactionsPanel() { return <Panel className="overflow-hidden"><div className="flex items-center justify-between border-b border-slate-800 px-5 py-4"><div><p className="text-sm font-semibold">Recent transactions</p><p className="mt-1 text-xs text-slate-500">Latest account activity</p></div><button type="button" className="text-xs font-medium text-emerald-300">See all</button></div><TransactionRows /></Panel>; }
function SupportPanel({onOpen}:{onOpen:()=>void}) { return <Panel className="flex items-center justify-between gap-4 p-5 sm:p-6"><div className="flex items-start gap-4"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><Headset size={18}/></div><div><p className="text-sm font-semibold">Need help?</p><p className="mt-1 text-xs leading-5 text-slate-500">Our support team can assist with account and platform questions.</p></div></div><button type="button" onClick={onOpen} className="shrink-0 rounded-lg border border-slate-700 bg-[#121d29] px-3 py-2 text-xs font-semibold text-slate-200">Contact us</button></Panel>; }
function DocumentCard({title,status,description}:{title:string;status:string;description:string}) { const isDone=status==='Verified'; return <Panel className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-slate-500">{description}</p></div><span className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[.14em] ${isDone ? 'border-emerald-400/20 bg-emerald-400/[.06] text-emerald-300' : 'border-slate-700 bg-slate-800 text-slate-300'}`}>{status}</span></div></Panel>; }
