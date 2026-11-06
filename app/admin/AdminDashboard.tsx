'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  ChevronDown,
  CircleDollarSign,
  FileCheck2,
  LayoutDashboard,
  Menu,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  X,
  ArrowUpRight,
  Clock3,
} from 'lucide-react';

type Customer = {
  initials: string;
  name: string;
  email: string;
  joined: string;
  balance: string;
  status: 'Verified' | 'Pending' | 'Review';
};

const customers: Customer[] = [
  { initials: 'JD', name: 'Jordan Davis', email: 'jordan.davis@email.com', joined: 'Nov 04, 2026', balance: '$12,840.50', status: 'Verified' },
  { initials: 'AM', name: 'Alex Morgan', email: 'alex.morgan@email.com', joined: 'Nov 03, 2026', balance: '$8,210.00', status: 'Pending' },
  { initials: 'SC', name: 'Sam Carter', email: 'sam.carter@email.com', joined: 'Nov 02, 2026', balance: '$4,685.75', status: 'Verified' },
  { initials: 'RK', name: 'Riley Kim', email: 'riley.kim@email.com', joined: 'Nov 01, 2026', balance: '$2,390.20', status: 'Review' },
];

const requests = [
  { name: 'Alex Morgan', initials: 'AM', bank: 'Bank transfer ···· 4821', amount: '$250.00', date: 'Today, 10:24 AM' },
  { name: 'Riley Kim', initials: 'RK', bank: 'Bank transfer ···· 1170', amount: '$180.00', date: 'Today, 09:12 AM' },
  { name: 'Sam Carter', initials: 'SC', bank: 'Card ···· 0912', amount: '$420.00', date: 'Yesterday, 04:38 PM' },
];

const sections = [
  'Overview',
  'Customers',
  'Verification',
  'Trading records',
  'Commissions',
  'Withdrawals',
  'Notifications',
];

const icons = [
  LayoutDashboard,
  Users,
  ShieldCheck,
  ArrowUpRight,
  CircleDollarSign,
  Wallet,
  Bell,
];

export default function AdminDashboard() {
  const [active, setActive] = useState('Overview');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const select = (section: string) => {
    setActive(section);
    setMenuOpen(false);
  };

  const action = (text: string) => setMessage(text);

  return (
    <div className="min-h-screen bg-[#0b1118] text-slate-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-slate-800 bg-[#0e161f] px-5 py-6 transition-transform lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link href="/" className="mb-10 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-sm font-black text-[#07120f]">
            TWM
          </span>
          <span className="text-[15px] font-semibold">
            TradeWithMe<span className="text-emerald-400">.</span>
            <span className="block text-[10px] uppercase tracking-[.2em] text-slate-500">
              Admin console
            </span>
          </span>
        </Link>

        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-600">
          Administration
        </p>

        <nav className="space-y-1">
          {sections.map((section, index) => {
            const Icon = icons[index];

            return (
              <button
                type="button"
                key={section}
                onClick={() => select(section)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[13px] ${
                  active === section
                    ? 'bg-emerald-400/10 font-semibold text-emerald-300'
                    : 'text-slate-400 hover:bg-white/[.04] hover:text-white'
                }`}
              >
                <Icon size={17} />
                {section}

                {section === 'Withdrawals' && (
                  <span className="ml-auto rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] text-amber-300">
                    8
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-amber-400/15 bg-amber-400/[.04] p-4">
          <div className="flex items-center gap-2 text-amber-300">
            <ShieldCheck size={16} />
            <span className="text-xs font-semibold">Secure access</span>
          </div>
          <p className="mt-2 text-[10px] leading-4 text-slate-500">
            Admin access should be protected by server-side role checks and MFA.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-slate-800 pt-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#26343f] text-xs font-bold text-emerald-300">
            AD
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold">Admin user</p>
            <p className="text-[10px] text-slate-500">Operations</p>
          </div>
          <ChevronDown size={15} className="text-slate-500" />
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
        />
      )}

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-800/80 bg-[#0b1118]/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="text-slate-400 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <p className="text-xs text-slate-500">
              Admin console <span className="px-2">/</span>
              <span className="text-slate-200">{active}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-[11px] text-slate-500 sm:block">
              Wednesday, November 5, 2026
            </span>

            <button
              type="button"
              aria-label="Notifications"
              onClick={() => action('You’re all caught up on admin notifications.')}
              className="relative rounded-xl border border-slate-800 p-2.5 text-slate-400"
            >
              <Bell size={17} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-amber-400" />
            </button>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#26343f] text-[10px] font-bold text-emerald-300">
              AD
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">
          {message && (
            <div
              role="status"
              className="mb-5 flex justify-between rounded-xl border border-emerald-400/20 bg-emerald-400/[.06] px-4 py-3 text-sm text-emerald-200"
            >
              {message}
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setMessage('')}
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs text-slate-500">Operations overview</p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Administrator dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Monitor customer accounts and platform activity.
              </p>
            </div>

            <button
              type="button"
              onClick={() => action('Report export is available when connected to your reporting service.')}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300"
            >
              Export report
            </button>
          </div>

          <div className="mb-6 rounded-xl border border-amber-400/15 bg-amber-400/[.04] px-4 py-3 text-xs leading-5 text-amber-200/80">
            <strong className="mr-1 text-amber-200">Preview data.</strong>
            This interface uses illustrative records only. Connect an authenticated,
            role-protected backend before using it with real customer, identity,
            trading, or payment data.
          </div>

          {active === 'Overview' && (
            <>
              <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Total customers', value: '2,486', meta: '+12.8% this month', Icon: Users },
                  { label: 'Verification queue', value: '18', meta: 'Needs review', Icon: FileCheck2 },
                  { label: 'Withdrawal requests', value: '08', meta: 'Pending approval', Icon: Wallet },
                  { label: 'Platform commissions', value: '$24,680', meta: 'This month · illustrative', Icon: CircleDollarSign },
                ].map(({ label, value, meta, Icon }) => (
                  <section
                    key={label}
                    className="rounded-2xl border border-slate-800/80 bg-[#101923] p-5"
                  >
                    <div className="mb-5 flex justify-between text-xs text-slate-500">
                      <span>{label}</span>
                      <Icon size={17} />
                    </div>
                    <p className="text-2xl font-semibold">{value}</p>
                    <p className="mt-2 text-[11px] text-emerald-300">{meta}</p>
                  </section>
                ))}
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
                <section className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#101923]">
                  <div className="flex items-center justify-between border-b border-slate-800 p-5">
                    <div>
                      <h2 className="text-sm font-semibold">Customer management</h2>
                      <p className="mt-1 text-xs text-slate-500">Recent customer accounts</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => select('Customers')}
                      className="text-xs font-semibold text-emerald-300"
                    >
                      View all →
                    </button>
                  </div>
                  <CustomerTable customers={customers.slice(0, 4)} onAction={action} />
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#101923]">
                  <div className="flex items-center justify-between border-b border-slate-800 p-5">
                    <div>
                      <h2 className="text-sm font-semibold">Withdrawal requests</h2>
                      <p className="mt-1 text-xs text-slate-500">Review before processing</p>
                    </div>
                    <span className="rounded-full bg-amber-400/10 px-2.5 py-1 text-[10px] text-amber-300">
                      3 awaiting review
                    </span>
                  </div>

                  <div className="divide-y divide-slate-800/70">
                    {requests.map((request) => (
                      <div key={request.name} className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar initials={request.initials} />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold">{request.name}</p>
                            <p className="mt-1 truncate text-[10px] text-slate-500">
                              {request.bank}
                            </p>
                          </div>
                          <p className="text-xs font-semibold">{request.amount}</p>
                        </div>

                        <p className="mt-3 flex items-center gap-1 text-[10px] text-slate-600">
                          <Clock3 size={11} />
                          {request.date}
                        </p>

                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => action(`Request for ${request.name} flagged for secure review.`)}
                            className="flex-1 rounded-lg border border-slate-700 py-2 text-[10px] font-semibold text-slate-300"
                          >
                            Review
                          </button>
                          <button
                            type="button"
                            onClick={() => action(`Approval action for ${request.name} is disabled in this preview.`)}
                            className="flex-1 rounded-lg bg-emerald-400/10 py-2 text-[10px] font-semibold text-emerald-300"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <section className="rounded-2xl border border-slate-800/80 bg-[#101923] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold">Verification queue</h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Identity checks requiring attention
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => select('Verification')}
                      className="text-xs text-emerald-300"
                    >
                      Open queue →
                    </button>
                  </div>

                  <div className="mt-5 space-y-4">
                    {customers
                      .filter((customer) => customer.status !== 'Verified')
                      .map((customer) => (
                        <div key={customer.email} className="flex items-center gap-3">
                          <Avatar initials={customer.initials} />
                          <div className="flex-1">
                            <p className="text-xs font-semibold">{customer.name}</p>
                            <p className="mt-1 text-[10px] text-slate-500">
                              Identity document · Submitted recently
                            </p>
                          </div>
                          <span className="text-[10px] text-amber-300">
                            {customer.status}
                          </span>
                        </div>
                      ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-800/80 bg-[#101923] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold">Recent activity</h2>
                      <p className="mt-1 text-xs text-slate-500">Latest platform events</p>
                    </div>
                    <Clock3 size={17} className="text-slate-500" />
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      ['New customer registered', 'Jordan Davis · 24 minutes ago'],
                      ['Verification completed', 'Sam Carter · 1 hour ago'],
                      ['Withdrawal submitted', '$250.00 · 2 hours ago'],
                    ].map(([title, detail]) => (
                      <div key={title} className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400" />
                        <div>
                          <p className="text-xs font-medium">{title}</p>
                          <p className="mt-1 text-[10px] text-slate-500">{detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </>
          )}

          {active === 'Customers' && (
            <section className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#101923]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-5">
                <div>
                  <h2 className="text-sm font-semibold">Customer management</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Manage customer profiles and account status.
                  </p>
                </div>

                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search customers"
                    className="rounded-lg border border-slate-800 bg-[#0b1118] py-2 pl-9 pr-3 text-xs outline-none focus:border-emerald-400/50"
                  />
                </div>
              </div>

              <CustomerTable customers={visibleCustomers} onAction={action} />
            </section>
          )}

          {active === 'Verification' && (
            <section className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#101923]">
              <div className="border-b border-slate-800 p-5">
                <h2 className="text-sm font-semibold">Account &amp; identity verification</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Review submitted documents using authorized verification procedures.
                </p>
              </div>
              <CustomerTable
                customers={customers.filter((customer) => customer.status !== 'Verified')}
                onAction={action}
                verification
              />
            </section>
          )}

          {active === 'Trading records' && (
            <section className="rounded-2xl border border-slate-800/80 bg-[#101923] p-6">
              <h2 className="text-sm font-semibold">Trading activity records</h2>
              <p className="mt-2 text-xs text-slate-500">
                Illustrative records only. A production view must read from audited,
                permission-checked data sources.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  ['EUR / USD', 'Jordan Davis', '+$184.20', 'Today, 09:42'],
                  ['GBP / USD', 'Alex Morgan', '+$96.75', 'Today, 08:16'],
                  ['XAU / USD', 'Sam Carter', '−$42.10', 'Yesterday, 15:38'],
                ].map((row) => (
                  <div
                    key={row[0] + row[1]}
                    className="grid grid-cols-2 gap-3 rounded-xl border border-slate-800 p-4 text-xs sm:grid-cols-4"
                  >
                    {row.map((cell, index) => (
                      <span key={cell} className={index === 2 ? 'text-emerald-300' : ''}>
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          )}

          {active === 'Commissions' && (
            <section className="rounded-2xl border border-slate-800/80 bg-[#101923] p-6">
              <div className="flex items-center gap-3">
                <CircleDollarSign className="text-emerald-300" />
                <div>
                  <h2 className="text-sm font-semibold">Commission reports</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Illustrative 70/30 split summary
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <AdminMetric label="Gross eligible amount" value="$82,266.67" />
                <AdminMetric label="Customer share · 70%" value="$57,586.67" />
                <AdminMetric label="Platform share · 30%" value="$24,680.00" />
              </div>

              <button
                type="button"
                onClick={() => action('Commission export is not connected in this preview.')}
                className="mt-5 rounded-lg border border-slate-700 px-4 py-2 text-xs text-slate-300"
              >
                Export commission report
              </button>
            </section>
          )}

          {active === 'Withdrawals' && (
            <section className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#101923]">
              <div className="border-b border-slate-800 p-5">
                <h2 className="text-sm font-semibold">Withdrawal request management</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Review and track customer requests. No payment actions are connected.
                </p>
              </div>

              <div className="divide-y divide-slate-800/70">
                {requests.map((request) => (
                  <div key={request.name} className="flex flex-wrap items-center gap-4 p-5">
                    <Avatar initials={request.initials} />

                    <div className="min-w-[140px] flex-1">
                      <p className="text-xs font-semibold">{request.name}</p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {request.bank} · {request.date}
                      </p>
                    </div>

                    <p className="text-sm font-semibold">{request.amount}</p>

                    <span className="rounded-full bg-amber-400/10 px-2.5 py-1 text-[10px] text-amber-300">
                      Pending
                    </span>

                    <button
                      type="button"
                      onClick={() => action(`Request for ${request.name} opened for review.`)}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-[10px] text-slate-300"
                    >
                      Review request
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {active === 'Notifications' && (
            <section className="rounded-2xl border border-slate-800/80 bg-[#101923] p-5">
              <h2 className="text-sm font-semibold">Customer notifications</h2>
              <p className="mt-1 text-xs text-slate-500">
                Compose account announcements or targeted messages.
              </p>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  action('Notification saved as a draft in this preview.');
                }}
                className="mt-5 max-w-2xl space-y-4"
              >
                <label className="block text-xs text-slate-400">
                  Audience
                  <select className="mt-2 w-full rounded-lg border border-slate-800 bg-[#0b1118] p-3 text-sm">
                    <option>All customers</option>
                    <option>Customers pending verification</option>
                    <option>Customers with pending withdrawals</option>
                  </select>
                </label>

                <label className="block text-xs text-slate-400">
                  Notification message
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your update..."
                    className="mt-2 w-full rounded-lg border border-slate-800 bg-[#0b1118] p-3 text-sm outline-none focus:border-emerald-400/50"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-[#07120f]"
                >
                  Save notification draft
                </button>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#26343f] text-[10px] font-bold text-emerald-300">
      {initials}
    </span>
  );
}

function AdminMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#0b1118] p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-3 text-xl font-semibold">{value}</p>
    </div>
  );
}

function CustomerTable({
  customers,
  onAction,
  verification = false,
}: {
  customers: Customer[];
  onAction: (message: string) => void;
  verification?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-left">
        <thead>
          <tr className="text-[10px] uppercase tracking-wider text-slate-600">
            <th className="px-5 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Joined</th>
            <th className="px-4 py-3 font-medium">Balance</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-5 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.email}
              className="border-t border-slate-800/70 text-xs"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar initials={customer.initials} />
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {customer.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-4 text-slate-500">{customer.joined}</td>
              <td className="px-4 py-4 font-medium">{customer.balance}</td>

              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-2 py-1 text-[10px] ${
                    customer.status === 'Verified'
                      ? 'bg-emerald-400/10 text-emerald-300'
                      : customer.status === 'Pending'
                        ? 'bg-amber-400/10 text-amber-300'
                        : 'bg-rose-400/10 text-rose-300'
                  }`}
                >
                  {customer.status}
                </span>
              </td>

              <td className="px-5 py-4 text-right">
                <button
                  type="button"
                  onClick={() =>
                    onAction(
                      verification
                        ? `Verification review opened for ${customer.name}.`
                        : `Customer profile opened for ${customer.name}.`
                    )
                  }
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-[10px] font-semibold text-slate-300 hover:border-emerald-400/30"
                >
                  {verification ? 'Review' : 'View profile'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <p className="p-8 text-center text-xs text-slate-500">
          No customers match your search.
        </p>
      )}
    </div>
  );
}
