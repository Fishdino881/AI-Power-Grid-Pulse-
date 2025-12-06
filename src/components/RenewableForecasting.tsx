import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Wind, CloudRain, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';

const RenewableForecasting = () => {
  const forecastData = [
    { hour: '00', solar: 0, wind: 12.5, hydro: 8.2, actual_solar: 0, actual_wind: 11.8 },
    { hour: '04', solar: 0, wind: 15.2, hydro: 8.2, actual_solar: 0, actual_wind: 14.9 },
    { hour: '08', solar: 15.5, wind: 18.3, hydro: 8.2, actual_solar: 14.2, actual_wind: 17.8 },
    { hour: '12', solar: 42.8, wind: 22.1, hydro: 8.2, actual_solar: 41.5, actual_wind: 21.5 },
    { hour: '16', solar: 28.5, wind: 19.8, hydro: 8.2, actual_solar: 27.8, actual_wind: 20.2 },
    { hour: '20', solar: 3.2, wind: 16.5, hydro: 8.2, actual_solar: 2.8, actual_wind: 15.9 },
    { hour: '24', solar: 0, wind: 13.8, hydro: 8.2 },
  ];

  const renewableMetrics = [
    {
      source: 'Solar',
      icon: Sun,
      current: '28.5 GW',
      forecast: '15.2 GW',
      accuracy: '96.8%',
      confidence: 'high',
      color: 'text-yellow-500',
    },
    {
      source: 'Wind',
      icon: Wind,
      current: '19.8 GW',
      forecast: '16.5 GW',
      accuracy: '94.2%',
      confidence: 'high',
      color: 'text-blue-500',
    },
    {
      source: 'Hydro',
      icon: CloudRain,
      current: '8.2 GW',
      forecast: '8.2 GW',
      accuracy: '99.1%',
      confidence: 'excellent',
      color: 'text-cyan-500',
    },
    {
      source: 'Total Renewable',
      icon: Zap,
      current: '56.5 GW',
      forecast: '39.9 GW',
      accuracy: '95.7%',
      confidence: 'high',
      color: 'text-green-500',
    },
  ];

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-primary" />
          Renewable Energy Forecasting
        </CardTitle>
        <CardDescription>
          AI-powered solar and wind generation predictions with weather integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {renewableMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.source}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                  <span className="text-xs font-semibold text-muted-foreground">{metric.source}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-foreground">{metric.current}</div>
                  <div className="text-xs text-muted-foreground">
                    Next: {metric.forecast}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Accuracy:</span>
                    <Badge variant="outline" className="text-xs">{metric.accuracy}</Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">24-Hour Generation Forecast</h4>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1" />
                Solar
              </Badge>
              <Badge variant="outline" className="text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-1" />
                Wind
              </Badge>
              <Badge variant="outline" className="text-xs">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mr-1" />
                Hydro
              </Badge>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                label={{ value: 'Generation (GW)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="solar"
                stackId="1"
                stroke="#eab308"
                fill="#eab308"
                fillOpacity={0.6}
                name="Solar (GW)"
              />
              <Area
                type="monotone"
                dataKey="wind"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                name="Wind (GW)"
              />
              <Area
                type="monotone"
                dataKey="hydro"
                stackId="1"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.6}
                name="Hydro (GW)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Weather Conditions</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Solar Irradiance:</span>
                <span className="font-medium">850 W/m²</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cloud Cover:</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Wind Speed:</span>
                <span className="font-medium">12.5 m/s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Air Density:</span>
                <span className="font-medium">1.225 kg/m³</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Forecast Reliability</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">0-6 hours:</span>
                <Badge variant="default">98.5%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">6-12 hours:</span>
                <Badge variant="secondary">95.2%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">12-24 hours:</span>
                <Badge variant="secondary">91.8%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">24+ hours:</span>
                <Badge variant="outline">87.3%</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RenewableForecasting;