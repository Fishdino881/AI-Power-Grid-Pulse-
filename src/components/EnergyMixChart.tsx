import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface EnergySource {
  name: string;
  percentage: number;
  color: string;
}

const EnergyMixChart = () => {
  const [energyMix, setEnergyMix] = useState<EnergySource[]>([
    { name: 'Wind', percentage: 28, color: 'hsl(var(--energy-wind))' },
    { name: 'Solar', percentage: 22, color: 'hsl(var(--energy-solar))' },
    { name: 'Nuclear', percentage: 18, color: 'hsl(var(--energy-nuclear))' },
    { name: 'Hydro', percentage: 15, color: 'hsl(var(--energy-hydro))' },
    { name: 'Natural Gas', percentage: 12, color: 'hsl(var(--energy-gas))' },
    { name: 'Coal', percentage: 5, color: 'hsl(var(--energy-coal))' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyMix(prev => prev.map(source => ({
        ...source,
        percentage: Math.max(1, source.percentage + (Math.random() - 0.5) * 2)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const total = energyMix.reduce((sum, source) => sum + source.percentage, 0);

  return (
    <Card className="p-6 glass-panel border-border/50">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground">Energy Mix</h2>
        <p className="text-sm text-muted-foreground">Current generation breakdown</p>
      </div>

      <div className="space-y-4">
        {energyMix.map((source) => {
          const normalizedPercentage = (source.percentage / total) * 100;
          
          return (
            <div key={source.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{source.name}</span>
                <span className="text-sm font-mono text-muted-foreground">
                  {normalizedPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ 
                    width: `${normalizedPercentage}%`,
                    backgroundColor: source.color
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Generation */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-foreground">Total Generation</span>
          <span className="text-lg font-mono font-bold text-primary">
            {(total * 100).toFixed(0)} GW
          </span>
        </div>
      </div>
    </Card>
  );
};

export default EnergyMixChart;
