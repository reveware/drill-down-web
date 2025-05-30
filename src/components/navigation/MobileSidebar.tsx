import * as React from 'react';
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet';
import { UserOverview } from '@/types/user';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { UserSection } from './UserSection';

interface MobileSidebarProps {
  user: UserOverview;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ user, open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col gap-4 p-4 w-64">
        <VisuallyHidden>
          <SheetTitle>User Menu</SheetTitle>
        </VisuallyHidden>
        <UserSection user={user} />
      </SheetContent>
    </Sheet>
  );
};
