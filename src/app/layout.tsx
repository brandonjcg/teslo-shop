import type { Metadata } from 'next';
import './globals.css';
import { inter } from '../fonts';

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
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
