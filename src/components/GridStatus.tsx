import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface StatusMetric {
  label: string;
  value: number;
  unit: string;
  status: 'optimal' | 'warning' | 'critical';
}

const GridStatus = () => {
  const [metrics, setMetrics] = useState<StatusMetric[]>([
    { label: 'Frequency', value: 60.0, unit: 'Hz', status: 'optimal' },
    { label: 'Load Factor', value: 78, unit: '%', status: 'optimal' },
    { label: 'Reserve Margin', value: 15.2, unit: '%', status: 'optimal' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        let newValue = metric.value + (Math.random() - 0.5) * 2;
        let newStatus: 'optimal' | 'warning' | 'critical' = 'optimal';

        if (metric.label === 'Frequency') {
          newValue = Math.max(59.5, Math.min(60.5, newValue));
          if (Math.abs(newValue - 60) > 0.3) newStatus = 'warning';
          if (Math.abs(newValue - 60) > 0.4) newStatus = 'critical';
        } else if (metric.label === 'Load Factor') {
          newValue = Math.max(60, Math.min(95, newValue));
          if (newValue > 85) newStatus = 'warning';
          if (newValue > 90) newStatus = 'critical';
        } else {
          newValue = Math.max(5, Math.min(25, newValue));
          if (newValue < 10) newStatus = 'warning';
          if (newValue < 8) newStatus = 'critical';
        }

        return { ...metric, value: newValue, status: newStatus };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'hsl(var(--status-optimal))';
      case 'warning': return 'hsl(var(--status-warning))';
      case 'critical': return 'hsl(var(--status-critical))';
      default: return 'hsl(var(--muted))';
    }
  };

  return (
    <Card className="p-6 glass-panel border-border/50">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Grid Status</h2>
        <p className="text-xs text-muted-foreground">Real-time metrics</p>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">{metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-bold" style={{ color: getStatusColor(metric.status) }}>
                  {metric.value.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">{metric.unit}</span>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i < (metric.value / 5) 
                      ? getStatusColor(metric.status)
                      : 'hsl(var(--secondary))'
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Overall Status */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status-optimal animate-pulse" />
              <span className="text-sm font-medium text-status-optimal">Operational</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GridStatus;
