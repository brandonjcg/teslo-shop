import type { Metadata } from 'next';
import './globals.css';
import { inter } from '../fonts';
import { Providers } from '@/components/providers/Provider';

export const metadata: Metadata = {
  title: {
    template: '%s | Teslo shop',
    default: 'Home | Teslo shop',
  },
  description: 'The best shop in the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className}`}>{children}</body>
      </Providers>
    </html>
  );
}
