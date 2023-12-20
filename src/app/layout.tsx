import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
