'use client';
import React from 'react';
import '../styles/globals.css';
import { DM_Sans, JetBrains_Mono, Share_Tech_Mono, Orbitron } from 'next/font/google';
import { AppProviders } from '@/components/providers/AppProviders';
import { Toaster } from '@/components/ui/sonner';

const brand = Orbitron({ subsets: ['latin'], variable: '--font-brand' });
const sans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const clock = Share_Tech_Mono({ subsets: ['latin'], weight: '400', variable: '--font-clock' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} ${clock.variable} ${brand.variable}`}>
        <AppProviders>
          {children}
          <Toaster position="top-right" />
        </AppProviders>
      </body>
    </html>
  );
}
