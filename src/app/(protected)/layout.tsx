'use client';
import { RouteGuard } from '@/components/auth/RouteGuard';
import { DesktopSidePanel } from '@/components/navigation/DesktopSidePanel';
import { MobileTopbar } from '@/components/navigation/MobileTopbar';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <RouteGuard stage="completeAccount">
      <div className="flex h-screen flex-col">
        <MobileTopbar user={user} />
        <div className="flex min-h-0 flex-1">
          <DesktopSidePanel user={user} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </RouteGuard>
  );
}
