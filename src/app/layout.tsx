import type { Metadata } from 'next';
import './globals.css';
import UIProvider from '@/providers/UIProvider';

export const metadata: Metadata = {
  title: 'Overflow | Dev',
  description:
    'Question and answers for professional and enthusiast programmers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
