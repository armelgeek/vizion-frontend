import React from 'react';
import { Toaster } from '@/shared/components/atoms/ui/sonner';
import { Provider } from '@/shared/providers';
import NextTopLoader from 'nextjs-toploader';
import {  Livvic } from 'next/font/google';
import '@/shared/styles/globals.css';
import { Header } from '@/shared/components/atoms/ui/header';

const spaceGrotesk = Livvic({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
});

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-space-grotesk bg-gray-50 min-h-screen`}>
        <NextTopLoader showSpinner={true} />
        <Provider>
              <Header />
              {children}
        </Provider>
        <Toaster richColors />
      </body>
    </html>
  );
}
