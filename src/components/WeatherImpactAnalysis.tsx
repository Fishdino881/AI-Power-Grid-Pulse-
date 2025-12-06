import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Wind, Droplets, Sun, ThermometerSun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeatherImpactAnalysis = () => {
  const weatherData = [
    { time: '00:00', demand: 45, temperature: 18, windSpeed: 12, solarGen: 0 },
    { time: '04:00', demand: 38, temperature: 16, windSpeed: 15, solarGen: 0 },
    { time: '08:00', demand: 52, temperature: 20, windSpeed: 18, solarGen: 35 },
    { time: '12:00', demand: 68, temperature: 28, windSpeed: 22, solarGen: 88 },
    { time: '16:00', demand: 72, temperature: 32, windSpeed: 20, solarGen: 65 },
    { time: '20:00', demand: 65, temperature: 25, windSpeed: 16, solarGen: 12 },
  ];

  const correlations = [
    { factor: 'Temperature', impact: '+85%', description: 'High correlation with cooling demand', icon: ThermometerSun },
    { factor: 'Wind Speed', impact: '+62%', description: 'Strong influence on wind generation', icon: Wind },
    { factor: 'Solar Radiation', impact: '+95%', description: 'Direct impact on solar output', icon: Sun },
    { factor: 'Humidity', impact: '-28%', description: 'Moderate effect on equipment efficiency', icon: Droplets },
  ];

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          Weather Impact Analysis
        </CardTitle>
        <CardDescription>
          Real-time correlation between weather conditions and grid performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {correlations.map((correlation) => {
            const Icon = correlation.icon;
            return (
              <div
                key={correlation.factor}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">{correlation.factor}</h4>
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {correlation.impact}
                </div>
                <p className="text-xs text-muted-foreground">{correlation.description}</p>
              </div>
            );
          })}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">24-Hour Weather-Grid Correlation</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="demand" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Demand (GW)"
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="hsl(var(--energy-renewable))" 
                strokeWidth={2}
                name="Temp (°C)"
              />
              <Line 
                type="monotone" 
                dataKey="windSpeed" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="Wind (m/s)"
              />
              <Line 
                type="monotone" 
                dataKey="solarGen" 
                stroke="hsl(var(--chart-5))" 
                strokeWidth={2}
                name="Solar (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherImpactAnalysis;