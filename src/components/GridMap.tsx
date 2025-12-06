import { Card } from '@/components/ui/card';

const GridMap = () => {
  return (
    <Card className="p-6 glass-panel border-border/50 relative overflow-hidden h-[500px] transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground">North America Grid</h2>
        <p className="text-sm text-muted-foreground">Live power flow visualization</p>
      </div>

      {/* Map Container */}
      <div className="relative h-full bg-gradient-to-br from-background to-secondary/20 rounded-lg border border-border/30 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Simulated Power Flow Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {/* California to Nevada */}
          <line x1="15%" y1="45%" x2="25%" y2="40%" 
                stroke="url(#gradient1)" strokeWidth="3" className="animate-pulse" />
          
          {/* Texas Internal Grid */}
          <circle cx="45%" cy="70%" r="60" fill="none" 
                  stroke="hsl(var(--energy-wind))" strokeWidth="2" 
                  className="grid-flow-glow" opacity="0.4" />
          
          {/* Eastern Interconnect */}
          <line x1="65%" y1="35%" x2="75%" y2="45%" 
                stroke="url(#gradient2)" strokeWidth="3" className="animate-pulse" />
          
          <line x1="70%" y1="50%" x2="80%" y2="60%" 
                stroke="url(#gradient1)" strokeWidth="2" className="animate-pulse" />

          {/* West Coast Line */}
          <line x1="10%" y1="30%" x2="15%" y2="60%" 
                stroke="url(#gradient3)" strokeWidth="3" className="animate-pulse" />

          {/* Gradients for power flow */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--energy-renewable))" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(var(--energy-renewable))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--energy-renewable))" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--energy-solar))" stopOpacity="0.2" />
              <stop offset="50%" stopColor="hsl(var(--energy-solar))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--energy-solar))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Regional Nodes */}
        <div className="absolute top-[30%] left-[12%] flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-energy-solar shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-pulse" />
          <span className="text-xs mt-1 text-foreground font-medium">CA Solar</span>
        </div>

        <div className="absolute top-[70%] left-[45%] flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-energy-wind shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-pulse" />
          <span className="text-xs mt-1 text-foreground font-medium">TX Wind</span>
        </div>

        <div className="absolute top-[45%] left-[75%] flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-energy-nuclear shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse" />
          <span className="text-xs mt-1 text-foreground font-medium">Eastern Nuclear</span>
        </div>

        <div className="absolute top-[35%] left-[70%] flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-energy-hydro shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse" />
          <span className="text-xs mt-1 text-foreground font-medium">Hydro</span>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 glass-panel p-3 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-energy-solar" />
            <span className="text-xs text-foreground">Solar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-energy-wind" />
            <span className="text-xs text-foreground">Wind</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-energy-nuclear" />
            <span className="text-xs text-foreground">Nuclear</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-energy-hydro" />
            <span className="text-xs text-foreground">Hydro</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GridMap;
