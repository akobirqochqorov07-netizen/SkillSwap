import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/lib/providers/AppProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkillSwap.uz | Exchange Skills, Not Money',
  description: 'The premier student skill exchange platform in Uzbekistan. Learn English, Coding, Design and more by swapping your skills.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

