import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const CarbonIntensity = () => {
  const [intensity, setIntensity] = useState(285);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('down');

  useEffect(() => {
    const interval = setInterval(() => {
      setIntensity(prev => {
        const change = (Math.random() - 0.5) * 10;
        const newValue = Math.max(150, Math.min(500, prev + change));
        
        if (change > 2) setTrend('up');
        else if (change < -2) setTrend('down');
        else setTrend('stable');
        
        return newValue;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getIntensityColor = () => {
    if (intensity < 250) return 'hsl(var(--status-optimal))';
    if (intensity < 350) return 'hsl(var(--status-warning))';
    return 'hsl(var(--status-critical))';
  };

  const getIntensityLabel = () => {
    if (intensity < 250) return 'Low';
    if (intensity < 350) return 'Moderate';
    return 'High';
  };

  return (
    <Card className="p-6 glass-panel border-border/50">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Carbon Intensity</h2>
        <p className="text-xs text-muted-foreground">gCO₂/kWh</p>
      </div>

      <div className="space-y-4">
        {/* Main Value Display */}
        <div className="text-center py-4">
          <div className="text-5xl font-bold font-mono" style={{ color: getIntensityColor() }}>
            {intensity.toFixed(0)}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {getIntensityLabel()} Emission Rate
          </div>
        </div>

        {/* Visual Gauge */}
        <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${(intensity / 500) * 100}%`,
              backgroundColor: getIntensityColor()
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Scale Labels */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>250</span>
          <span>500</span>
        </div>

        {/* Trend Indicator */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className={`text-sm font-medium ${
            trend === 'down' ? 'text-status-optimal' :
            trend === 'up' ? 'text-status-critical' :
            'text-muted-foreground'
          }`}>
            {trend === 'down' ? '↓ Decreasing' :
             trend === 'up' ? '↑ Increasing' :
             '→ Stable'}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CarbonIntensity;
