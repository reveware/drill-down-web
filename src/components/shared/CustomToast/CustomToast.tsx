import { CheckCircle2, Info, AlertTriangle, XCircle } from '@/components/shared/Icons';
import { cn } from '@/lib/utils';

const TOAST_STYLES = {
  default: {
    icon: Info,
    color: 'var(--color-info)',
  },
  success: {
    icon: CheckCircle2,
    color: 'var(--color-success)',
  },
  warning: {
    icon: AlertTriangle,
    color: 'var(--color-warning)',
  },
  error: {
    icon: XCircle,
    color: 'var(--color-danger)',
  },
} as const;

interface CustomToastProps {
  type?: 'default' | 'success' | 'error' | 'warning';
  title?: string;
  description?: string;
}

export function CustomToast({
  type = 'default',
  title = 'Toast Title',
  description = 'This is a toast message',
}: CustomToastProps) {
  const { icon, color } = TOAST_STYLES[type];
  const Icon = icon;

  return (
    <div
      className={cn(
        'flex items-center',
        'max-w-md min-w-[300px]',
        'bg-primary',
        'backdrop-blur-sm',
        'rounded-md',
        'shadow-md',
        'text-on-primary',
        'p-1',
        'border-border border-1'
      )}
      style={{
        borderLeft: `4px solid ${color}`,
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
      }}
    >
      {/* ICON */}
      {Icon && (
        <Icon
          size={24}
          strokeWidth={2.5}
          style={{
            color,
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
          className="mr-2"
        />
      )}

      {/* TEXT */}
      <div className="ml-2 flex-1 py-2">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs">{description}</p>
      </div>
    </div>
  );
}
