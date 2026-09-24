import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Nada Playground', description: 'Interactive playground for Nada programs' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}