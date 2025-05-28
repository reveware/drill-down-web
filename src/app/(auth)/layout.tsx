export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">{children}</div>
    </div>
  );
}
