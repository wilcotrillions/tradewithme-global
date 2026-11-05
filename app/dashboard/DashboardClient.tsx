'use client';

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
        {[0, 1, 2, 3].map((line) => <div key={line} className="flex items-center gap-3"><span>${(12.8 + (3 - line) * 0.4).toFixed(1)}k</span><div className="h-px flex-1 border-t border-dashed border-slate-800" /></div>)}
      </div>
      <svg viewBox="0 0 640 180" preserveAspectRatio="none" className="absolute inset-x-9 top-2 h-[calc(100%-24px)] w-[calc(100%-36px)]" aria-label="Account performance trend">
        <defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#41d6a3" stopOpacity=".23"/><stop offset="100%" stopColor="#41d6a3" stopOpacity="0"/></linearGradient></defs>
        <path d="M0 145 C30 139 35 112 70 122 S108 98 135 111 S173 75 205 92 S248 81 273 87 S303 51 337 69 S376 60 401 73 S440 39 471 50 S502 30 529 46 S568 20 594 36 S620 12 640 18 L640 180 L0 180Z" fill="url(#areaFill)" />
        <path d="M0 145 C30 139 35 112 70 122 S108 98 135 111 S173 75 205 92 S248 81 273 87 S303 51 337 69 S376 60 401 73 S440 39 471 50 S502 30 529 46 S568 20 594 36 S620 12 640 18" fill="none" stroke="#41d6a3" strokeWidth="3" vectorEffect="non-scaling-stroke" />
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
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-slate-800 bg-[#0e161f] px-5 py-6 transition-transform lg:translate-x-0 ${mobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <a href="/" className="mb-10 flex items-center gap-3 px-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-sm font-black text-[#07120f]">TWM</span>
          <span className="text-[15px] font-semibold tracking-tight">TradeWithMe<span className="text-emerald-400">.</span><span className="block text-[10px] font-medium uppercase tracking-[.2em] text-slate-500">Global</span></span>
        </a>
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-600">Workspace</p>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => changeSection(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] transition ${active === label ? 'bg-emerald-400/10 font-semibold text-emerald-300' : 'text-slate-400 hover:bg-white/[.04] hover:text-white'}`}><Icon size={17} strokeWidth={1.8}/>{label}{label === 'Support' && <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400"/>}</button>)}
        </nav>
        <div className="mt-auto rounded-2xl border border-slate-800 bg-[#121e28] p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><BookOpen size={18}/></div>
          <p className="text-sm font-semibold">Trade smarter</p><p className="mt-1 text-xs leading-5 text-slate-500">Explore practical lessons in the Trading Academy.</p>
          <a href="/academy" className="mt-3 inline-block text-xs font-semibold text-emerald-300">Visit academy →</a>
        </div>
        <div className="mt-5 flex items-center gap-3 border-t border-slate-800 pt-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#26343f] text-xs font-bold text-emerald-300">JD</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold">Jordan Davis</p><p className="text-[10px] text-slate-500">Personal account</p></div><Settings2 size={16} className="text-slate-500"/>
        </div>
      </aside>
      {mobileMenu && <button aria-label="Close navigation" onClick={() => setMobileMenu(false)} className="fixed inset-0 z-30 bg-black/60 lg:hidden"/>}

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-800/80 bg-[#0b1118]/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3"><button onClick={() => setMobileMenu(true)} className="rounded-lg p-2 text-slate-400 lg:hidden" aria-label="Open menu"><Menu size={20}/></button><div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">Workspace <span>/</span><span className="text-slate-200">{active}</span></div><h1 className="text-sm font-semibold sm:hidden">{active}</h1></div>
          <div className="flex items-center gap-3"><span className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[.06] px-3 py-1.5 text-[11px] font-medium text-emerald-300 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> Account active</span><button aria-label="Notifications" onClick={() => setNotice('You’re all caught up on notifications.')} className="relative rounded-xl border border-slate-800 p-2.5 text-slate-400 hover:text-white"><Bell size={17}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-400"/></button><button className="flex items-center gap-2 rounded-xl border border-slate-800 p-1.5 pr-2.5"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#26343f] text-[10px] font-bold text-emerald-300">JD</span><ChevronDown size={14} className="text-slate-500"/></button></div>
        </header>

        <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-9">
          {notice && <div role="status" className="mb-5 flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-400/[.06] px-4 py-3 text-sm text-emerald-200">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={16}/></button></div>}
          {active === 'Overview' && <>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-xs font-medium text-slate-500">Wednesday, November 5, 2026</p><h2 className="text-[26px] font-semibold tracking-tight sm:text-3xl">Good morning, Jordan <span>✦</span></h2><p className="mt-2 text-sm text-slate-500">Here’s what’s happening with your account today.</p></div><button onClick={() => changeSection('Transactions')} className="flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-[#07120f] hover:bg-emerald-300"><ArrowDownLeft size={15}/> Add funds</button></div>
            <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[{ label: 'Total account balance', value: '$12,840.50', change: '+8.24%', icon: Wallet },{ label: 'Available to withdraw', value: '$8,420.50', change: 'Ready to request', icon: CreditCard },{ label: 'Net performance', value: '+$1,248.20', change: '+10.76% this month', icon: TrendingUp },{ label: 'Active positions', value: '04', change: '2 markets', icon: BriefcaseBusiness }].map(({label,value,change,icon:Icon},i)=><Panel key={label} className="p-5"><div className="mb-5 flex items-center justify-between"><span className="text-xs text-slate-500">{label}</span><Icon size={17} className="text-slate-500"/></div><div className="flex items-center gap-2"><p className="text-[25px] font-semibold tracking-tight">{i === 0 && !balanceVisible ? '••••••' : value}</p>{i === 0 && <button onClick={() => setBalanceVisible(!balanceVisible)} aria-label={balanceVisible?'Hide balance':'Show balance'} className="text-slate-500">{balanceVisible?<Eye size={15}/>:<EyeOff size={15}/>}</button>}</div><p className={`mt-2 text-[11px] ${i === 2 ? 'text-emerald-300' : 'text-slate-500'}`}>{i === 2 && <ArrowUpRight size={12} className="mr-1 inline"/>}{change}</p></Panel>)}
            </div>
            <div className="grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              <Panel className="p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-semibold">Account performance</p><p className="mt-1 text-xs text-slate-500">Your balance over time</p></div><select aria-label="Performance period" className="rounded-lg border border-slate-800 bg-[#0e161f] px-3 py-2 text-xs text-slate-400"><option>Last 30 days</option><option>Last 7 days</option><option>Last 90 days</option></select></div><div className="mt-4 flex items-baseline gap-2"><span className="text-2xl font-semibold">$12,840.50</span><span className="text-xs text-emerald-300">+8.24%</span></div><Chart/></Panel>
              <Panel className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold">Account verification</p><p className="mt-1 text-xs text-slate-500">Complete your profile setup</p></div><ShieldCheck size={19} className="text-emerald-300"/></div><div className="mt-6 flex items-center justify-between text-xs"><span className="text-slate-400">Profile progress</span><span className="font-semibold text-emerald-300">2 of 3</span></div><div className="mt-2 h-1.5 rounded-full bg-slate-800"><div className="h-1.5 w-2/3 rounded-full bg-emerald-400"/></div><div className="mt-5 space-y-4">{[['Identity details','Verified',true],['Email address','Verified',true],['Proof of address','Action needed',false]].map(([name,status,done])=><div key={String(name)} className="flex items-center justify-between"><div className="flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${done?'bg-emerald-400':'bg-amber-400'}`}/><span className="text-xs text-slate-300">{name}</span></div><span className={`text-[10px] ${done?'text-emerald-300':'text-amber-300'}`}>{status}</span></div>)}</div><button onClick={() => changeSection('Documents')} className="mt-5 w-full rounded-xl border border-slate-700 py-2.5 text-xs font-semibold text-slate-300 hover:border-emerald-400/40 hover:text-emerald-300">Complete verification</button></Panel>
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_1fr]">
              <Panel className="overflow-hidden"><div className="flex items-center justify-between border-b border-slate-800 px-5 py-4"><div><p className="text-sm font-semibold">Recent trading activity</p><p className="mt-1 text-xs text-slate-500">Your latest positions</p></div><button onClick={() => changeSection('Trading activity')} className="text-xs font-semibold text-emerald-300">View all →</button></div><TradeTable rows={trades.slice(0,3)}/></Panel>
              <CommissionCard profit={profit} setProfit={setProfit} split={split}/>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-2"><TransactionsPanel/><SupportPanel onOpen={() => changeSection('Support')}/></div>
            <p className="mt-7 text-[10px] leading-5 text-slate-600">Illustrative account figures shown for dashboard preview only. Trading involves substantial risk and may not be suitable for all investors. Past performance is not indicative of future results. This platform provides educational content, not personalized financial advice.</p>
          </>}

          {active === 'Trading activity' && <><SectionHeading title="Trading activity" subtitle="Review your recent positions and trading history."/><Panel className="overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-5"><div className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="Search markets" className="w-56 rounded-lg border border-slate-800 bg-[#0b1118] py-2 pl-9 pr-3 text-xs outline-none focus:border-emerald-400/50"/></div><button onClick={()=>setNotice('Your activity report is being prepared.')} className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300"><Download size={14}/> Export report</button></div><TradeTable rows={filteredTrades}/></Panel></>}
          {active === 'Transactions' && <><SectionHeading title="Transactions" subtitle="Track deposits, withdrawals, and payment activity."/><div className="mb-5 grid gap-4 sm:grid-cols-3"><Metric label="Total deposits" value="$8,500.00"/><Metric label="Total withdrawals" value="$1,250.00"/><Metric label="Pending requests" value="$250.00"/></div><Panel className="overflow-hidden"><div className="border-b border-slate-800 p-5"><p className="text-sm font-semibold">Deposit & withdrawal history</p></div><TransactionRows/></Panel><p className="mt-4 text-xs text-slate-500">Withdrawal requests are subject to account verification and processing times.</p></>}
          {active === 'Commissions' && <><SectionHeading title="Commission calculator" subtitle="Estimate how a hypothetical profit amount is divided using a 70/30 split."/><div className="grid gap-5 lg:grid-cols-2"><CommissionCard profit={profit} setProfit={setProfit} split={split}/><Panel className="p-6"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><CircleHelp size={19}/></div><h3 className="text-sm font-semibold">How the split works</h3><p className="mt-2 text-sm leading-6 text-slate-400">This illustrative calculator applies a 70% customer / 30% platform split to the amount entered. Review your signed agreement for the terms that apply to your account.</p><div className="mt-5 rounded-xl border border-amber-400/15 bg-amber-400/[.04] p-4 text-xs leading-5 text-amber-200/80">This estimate is for demonstration only. It is not a statement, earnings guarantee, or offer of investment returns.</div></Panel></div></>}
          {active === 'Support' && <><SectionHeading title="Customer support" subtitle="We’re here to help with your account and platform questions."/><div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><Panel className="p-6"><div className="flex items-start gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><MessageSquareText size={20}/></div><div><h3 className="text-sm font-semibold">Send us a message</h3><p className="mt-1 text-xs text-slate-500">Typical response time: within one business day.</p></div></div><form onSubmit={(event)=>{event.preventDefault();setNotice('Your support message has been recorded in this preview.')}} className="mt-6 space-y-4"><label className="block text-xs text-slate-400">Topic<select className="mt-2 w-full rounded-xl border border-slate-800 bg-[#0b1118] px-3 py-3 text-sm text-slate-200"><option>Account question</option><option>Deposits and withdrawals</option><option>Verification</option><option>Platform feedback</option></select></label><label className="block text-xs text-slate-400">Message<textarea required rows={5} placeholder="How can we help?" className="mt-2 w-full resize-y rounded-xl border border-slate-800 bg-[#0b1118] px-3 py-3 text-sm text-slate-200 outline-none focus:border-emerald-400/50"/></label><button className="rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-[#07120f]">Send message</button></form></Panel><Panel className="p-6"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700/40 text-slate-300"><Clock3 size={19}/></div><h3 className="mt-4 text-sm font-semibold">Recent conversations</h3><div className="mt-4 rounded-xl border border-slate-800 p-4"><div className="flex justify-between gap-2"><p className="text-xs font-medium">Verification document question</p><span className="text-[10px] text-emerald-300">Replied</span></div><p className="mt-2 text-[11px] text-slate-500">Support team · Nov 3</p></div><a href="/contact" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-300"><Headset size={14}/> Contact support</a></Panel></div></>}
          {active === 'Documents' && <><SectionHeading title="Documents & verification" subtitle="Manage the documents associated with your account."/><div className="grid gap-4 md:grid-cols-2"><DocumentCard title="Identity verification" status="Verified" description="Your identity details have been reviewed."/><DocumentCard title="Email address" status="Verified" description="Your email address is confirmed."/><DocumentCard title="Proof of address" status="Action needed" description="Upload a recent statement or utility bill to continue."/><DocumentCard title="Account agreement" status="Available" description="Review the terms and disclosures for your account."/></div></>}
        </main>
      </div>
    </div>
  );
}

function SectionHeading({title,subtitle}:{title:string;subtitle:string}) { return <div className="mb-6"><p className="mb-2 text-xs text-slate-500">Account workspace</p><h2 className="text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-2 text-sm text-slate-500">{subtitle}</p></div>; }
function Metric({label,value}:{label:string;value:string}) { return <Panel className="p-5"><p className="text-xs text-slate-500">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></Panel>; }
function TradeTable({rows}:{rows:typeof trades}) { return <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left"><thead><tr className="text-[10px] uppercase tracking-wider text-slate-600"><th className="px-5 py-3 font-medium">Market</th><th className="px-4 py-3 font-medium">Direction</th><th className="px-4 py-3 font-medium">Opened</th><th className="px-4 py-3 font-medium">Size</th><th className="px-5 py-3 text-right font-medium">P/L</th></tr></thead><tbody>{rows.length?rows.map((trade)=><tr key={`${trade.pair}-${trade.opened}`} className="border-t border-slate-800/70 text-xs"><td className="px-5 py-4 font-semibold">{trade.pair}</td><td className="px-4 py-4"><span className={`rounded-md px-2 py-1 text-[10px] ${trade.type==='Long'?'bg-emerald-400/10 text-emerald-300':'bg-rose-400/10 text-rose-300'}`}>{trade.type}</span></td><td className="px-4 py-4 text-slate-500">{trade.opened}</td><td className="px-4 py-4 text-slate-400">{trade.size}</td><td className={`px-5 py-4 text-right font-semibold ${trade.positive?'text-emerald-300':'text-rose-300'}`}>{trade.result}</td></tr>):<tr><td colSpan={5} className="px-5 py-10 text-center text-xs text-slate-500">No matching activity found.</td></tr>}</tbody></table></div>; }
function CommissionCard({profit,setProfit,split}:{profit:string;setProfit:(value:string)=>void;split:{customer:number;platform:number}}) { const money=(value:number)=>value.toLocaleString('en-US',{style:'currency',currency:'USD'}); return <Panel className="p-5 sm:p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold">70 / 30 commission split</p><p className="mt-1 text-xs text-slate-500">Quick illustrative estimate</p></div><BriefcaseBusiness size={18} className="text-slate-500"/></div><label className="mt-5 block text-xs text-slate-400">Hypothetical profit amount<input type="number" min="0" step="0.01" value={profit} onChange={(event)=>setProfit(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-800 bg-[#0b1118] px-3 py-3 text-lg font-semibold text-slate-100 outline-none focus:border-emerald-400/50"/></label><div className="mt-4 space-y-3"><div className="flex justify-between text-xs"><span className="text-slate-400">Customer share <span className="text-slate-600">70%</span></span><strong className="text-emerald-300">{money(split.customer)}</strong></div><div className="h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full w-[70%] rounded-full bg-emerald-400"/></div><div className="flex justify-between text-xs"><span className="text-slate-400">Platform share <span className="text-slate-600">30%</span></span><strong className="text-slate-300">{money(split.platform)}</strong></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full w-[30%] rounded-full bg-slate-500"/></div></div><p className="mt-4 text-[10px] leading-4 text-slate-600">Illustration only; actual fees and terms are defined by your agreement.</p></Panel>; }
function TransactionRows() { return <div className="divide-y divide-slate-800/70">{transactions.map((item)=><div key={item.label+item.date} className="flex items-center gap-3 px-5 py-4"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.deposit?'bg-emerald-400/10 text-emerald-300':'bg-slate-700/40 text-slate-300'}`}>{item.deposit?<ArrowDownLeft size={17}/>:<ArrowUpRight size={17}/>}</span><div className="min-w-0 flex-1"><p className="text-xs font-semibold">{item.label}</p><p className="mt-1 truncate text-[10px] text-slate-500">{item.detail} · {item.date}</p></div><div className="text-right"><p className={`text-xs font-semibold ${item.deposit?'text-emerald-300':'text-slate-200'}`}>{item.amount}</p><p className={`mt-1 text-[10px] ${item.status==='Completed'?'text-slate-500':'text-amber-300'}`}>{item.status}</p></div></div>)}</div>; }
function TransactionsPanel() { return <Panel className="overflow-hidden"><div className="flex items-center justify-between border-b border-slate-800 px-5 py-4"><div><p className="text-sm font-semibold">Recent transactions</p><p className="mt-1 text-xs text-slate-500">Your latest account movements</p></div><span className="text-xs text-slate-600">All activity</span></div><TransactionRows/></Panel>; }
function SupportPanel({onOpen}:{onOpen:()=>void}) { return <Panel className="flex items-center justify-between gap-4 p-5 sm:p-6"><div className="flex items-start gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300"><Headset size={19}/></div><div><p className="text-sm font-semibold">Need a hand?</p><p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">Our support team is ready to help with your account.</p><button onClick={onOpen} className="mt-3 text-xs font-semibold text-emerald-300">Start a conversation →</button></div></div><MessageSquareText size={25} className="hidden text-slate-700 sm:block"/></Panel>; }
function DocumentCard({title,status,description}:{title:string;status:string;description:string}) { const isDone=status==='Verified'; return <Panel className="p-5"><div className="flex items-start justify-between gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-700/30 text-slate-300"><FileCheck2 size={18}/></div><span className={`rounded-full px-2.5 py-1 text-[10px] ${isDone?'bg-emerald-400/10 text-emerald-300':status==='Action needed'?'bg-amber-400/10 text-amber-300':'bg-slate-700/50 text-slate-300'}`}>{status}</span></div><h3 className="mt-4 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>{!isDone&&<button className="mt-4 text-xs font-semibold text-emerald-300">{status==='Available'?'View document':'Continue'} →</button>}</Panel>; }
