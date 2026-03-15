import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Nav } from '@/widgets/nav/ui/Nav';

export const metadata: Metadata = {
  title: 'auth-jwt tester',
  description: 'Frontend for testing auth-jwt API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Providers>
          <Nav />
          <main className="max-w-lg mx-auto py-10 px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
