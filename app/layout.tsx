import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TradeWithMe Global - Trading Education & Investment Platform',
  description: 'Learn to trade and invest with professional education, market analysis, and expert mentorship.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
