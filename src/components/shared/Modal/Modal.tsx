import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  content: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ isOpen, onClose, title, content }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card flex max-h-[85svh] w-full flex-col shadow-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 overflow-y-auto">{content}</div>
      </DialogContent>
    </Dialog>
  );
};
