import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import UserSync from '@/components/common/user-sync';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DentWise',
  description: 'Your AI-Powered Dental Assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: 'var(--primary)',
          colorText: 'var(--foreground)',
          fontFamily: 'var(--font-geist-sans)',
          colorForeground: 'var(--foreground)',
          colorMutedForeground: 'var(--muted)',
        },
      }}
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
          <UserSync />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
