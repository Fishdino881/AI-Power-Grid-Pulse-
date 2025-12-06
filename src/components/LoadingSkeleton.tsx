import { Card } from '@/components/ui/card';

export const StatsBarSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="p-4 glass-panel border-border/50 animate-pulse">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-2/3" />
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </Card>
    ))}
  </div>
);

export const GridMapSkeleton = () => (
  <Card className="p-6 glass-panel border-border/50 h-[500px] animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-muted rounded w-1/3" />
      <div className="h-4 bg-muted rounded w-1/4" />
      <div className="mt-4 h-full bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg" />
    </div>
  </Card>
);

export const ChartSkeleton = () => (
  <Card className="p-6 glass-panel border-border/50 animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-muted rounded w-1/3" />
      <div className="h-4 bg-muted rounded w-1/4" />
      <div className="space-y-4 mt-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-20" />
              <div className="h-4 bg-muted rounded w-12" />
            </div>
            <div className="h-3 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  </Card>
);

export const StatusSkeleton = () => (
  <Card className="p-6 glass-panel border-border/50 animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-muted rounded w-1/3" />
      <div className="h-4 bg-muted rounded w-1/4" />
      <div className="space-y-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-4 bg-muted rounded w-16" />
            </div>
            <div className="h-1 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  </Card>
);
