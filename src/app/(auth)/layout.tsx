'use client';

import { GuestGuard } from '@/components/auth/GuestGuard';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      <div className="h-screen flex flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </GuestGuard>
  );
}
