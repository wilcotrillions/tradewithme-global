import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import { getCurrentUser } from '../../lib/auth';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard | TradeWithMe Global',
  description: 'Your secure TradeWithMe Global member dashboard.',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <DashboardClient
      user={{
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      }}
    />
  );
}
