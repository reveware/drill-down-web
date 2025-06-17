import { toast as sonnerToast } from 'sonner';
import { CustomToast } from '@/components/shared/CustomToast/CustomToast';

type ToastType = 'default' | 'success' | 'error' | 'warning';

function createCustomToast(type: ToastType) {
  return (message: string, options?: { description?: string }) => {
    return sonnerToast.custom((t) => (
      <div onClick={() => sonnerToast.dismiss(t)} className="cursor-pointer">
        <CustomToast type={type} title={message} description={options?.description ?? ''} />
      </div>
    ));
  };
}

export const toast = {
  success: createCustomToast('success'),
  error: createCustomToast('error'),
  warning: createCustomToast('warning'),
  info: createCustomToast('default'),
  custom: sonnerToast.custom,
  dismiss: sonnerToast.dismiss,
};
