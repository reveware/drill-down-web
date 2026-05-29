import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SettingsSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SettingsSection = ({
  title,
  description,
  action,
  children,
  className,
}: SettingsSectionProps) => (
  <section className={cn('flex flex-col gap-2', className)}>
    <div className="flex min-h-8 items-center justify-between gap-3 px-1">
      <div>
        <h3 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          {title}
        </h3>
        {description && <p className="text-muted-foreground/70 mt-0.5 text-xs">{description}</p>}
      </div>
      {action}
    </div>
    <Card className="card">
      <CardContent className="flex flex-col gap-4 p-4">{children}</CardContent>
    </Card>
  </section>
);
