import '../styles/globals.css'
import { Orbitron, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'

const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' })
const title = Orbitron({ subsets: ['latin'], variable: '--font-title' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Drill Down',
  description: 'Time-locked emotional social media app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${title.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
