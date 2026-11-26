import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | TradeWithMe Global',
  description: 'Password recovery information for TradeWithMe Global.',
};

export default function ForgotPasswordLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
