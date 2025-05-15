import "./globals.css";

export const metadata = {
  title: "Drill Down Web",
  description: "A Next.js project following best practices.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
