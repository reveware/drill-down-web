'use client';
import { DesktopSidePanel } from '@/components/navigation/DesktopSidePanel';

import { mockUser } from '@/mocks/user';
import '../styles/globals.css';
import { Orbitron, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import React from 'react';
import { MobileTopbar } from '@/components/navigation/MobileTopbar';

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const title = Orbitron({ subsets: ['latin'], variable: '--font-title' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${title.variable} ${mono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <QueryProvider>
            <div className="h-screen flex flex-col">
              <MobileTopbar user={mockUser} />
              <div className="flex-1 flex min-h-0">
                <DesktopSidePanel user={mockUser} />
                <main className="flex-1">{children}</main>
              </div>
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
