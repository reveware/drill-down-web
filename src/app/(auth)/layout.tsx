import { RouteGuard } from '@/components/auth/RouteGuard';
import { Brand } from '@/components/shared/Brand/Brand';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard stage="guest">
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
        <Brand />
        <div className="glow-pulse w-full max-w-md rounded-xl border [--glow-color:var(--ring)]">
          {children}
        </div>
      </main>
    </RouteGuard>
  );
}
