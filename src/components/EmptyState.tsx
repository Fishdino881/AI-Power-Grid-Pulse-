import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon
}: EmptyStateProps) => {
  return (
    <Card className="p-12 glass-panel border-border/50 text-center">
      <div className="flex flex-col items-center space-y-4">
        {icon && (
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            {icon}
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-md">{description}</p>
        </div>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="mt-4">
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};
