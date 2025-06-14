import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface ActionModalProps {
  title: string;
  isOpen: boolean;
  content: React.ReactNode;
  onClose: () => void;
}

export const ActionModal = ({ title, isOpen, content, onClose }: ActionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card h-lg bottom-24 w-full overflow-hidden rounded-2xl shadow-lg">
        <DialogTitle>{title}</DialogTitle>
        {content}
      </DialogContent>
    </Dialog>
  );
};
