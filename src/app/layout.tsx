'use client';
import { GoogleTagManager } from '@next/third-parties/google';
import React from 'react';

import '../styles/index.css';

import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { getSiteConfig } from '@/lib/utils';
import Head from './head';

const { gtmId } = getSiteConfig();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang='en'>
      <head>
        <Head></Head>
      </head>
      <GoogleTagManager gtmId={gtmId} />
      <body>
        {/* Remove md: two-column layout so < lg main is full width */}
        <div className='grid min-h-screen lg:grid-cols-[22rem_1fr]'>
          <Navigation />
          <main className='flex min-h-screen flex-col p-4'>
            <div className='flex-1'>{children}</div>
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
