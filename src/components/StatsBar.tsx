import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  unit: string;
  change: number;
}

const StatsBar = () => {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Total Generation', value: 452.3, unit: 'GW', change: 2.3 },
    { label: 'Total Demand', value: 438.7, unit: 'GW', change: 1.8 },
    { label: 'Renewable %', value: 45.2, unit: '%', change: 3.1 },
    { label: 'Grid Efficiency', value: 94.8, unit: '%', change: 0.5 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        const changeAmount = (Math.random() - 0.5) * 2;
        const newValue = Math.max(0, stat.value + changeAmount);
        return {
          ...stat,
          value: newValue,
          change: changeAmount
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card 
          key={stat.label} 
          className="p-4 glass-panel border-border/50 hover:border-primary/50 transition-all duration-300 interactive-scale cursor-pointer"
        >
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold font-mono text-foreground">
                  {stat.value.toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">{stat.unit}</p>
              </div>
              <div className={`text-sm font-medium transition-colors ${
                stat.change > 0 ? 'text-status-optimal' : 'text-status-critical'
              }`}>
                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change).toFixed(1)}%
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsBar;
