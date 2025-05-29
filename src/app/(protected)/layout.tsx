'use client';
import { AuthGuard } from '@/components/auth/auth-guard';
import { DesktopSidePanel } from '@/components/navigation/DesktopSidePanel';
import { MobileTopbar } from '@/components/navigation/MobileTopbar';
import { mockUser } from '@/mocks/user';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="h-screen flex flex-col">
        <MobileTopbar user={mockUser} />
        <div className="flex-1 flex min-h-0">
          <DesktopSidePanel user={mockUser} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
