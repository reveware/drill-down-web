import { RouteGuard } from '@/components/auth/RouteGuard';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard stage="incompleteAccount">
      <div className="flex h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </RouteGuard>
  );
}
