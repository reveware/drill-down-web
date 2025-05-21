import { Navbar } from '@/components/layout/navbar/navbar';
import '../styles/globals.css';
import { Orbitron, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const title = Orbitron({ subsets: ['latin'], variable: '--font-title' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Drill Down',
  description: 'Time-locked emotional social media app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${title.variable} ${mono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <QueryProvider>
            <main className="container mx-auto px-4 py-2">
              <Navbar />
              <div className="flex justify-around mx-auto max-w-7xl">{children}</div>
            </main>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
