import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Badge } from '@/components/ui/badge';

const LoadForecastingDashboard = () => {
  const forecastData = [
    { hour: '00', actual: 45.2, predicted: 45.8, upper: 48.0, lower: 43.6 },
    { hour: '04', actual: 38.5, predicted: 39.2, upper: 41.5, lower: 36.9 },
    { hour: '08', actual: 52.3, predicted: 51.8, upper: 54.2, lower: 49.4 },
    { hour: '12', actual: 68.7, predicted: 69.2, upper: 72.5, lower: 65.9 },
    { hour: '16', actual: 72.1, predicted: 71.5, upper: 74.8, lower: 68.2 },
    { hour: '20', actual: 65.4, predicted: 64.9, upper: 68.2, lower: 61.6 },
    { hour: '24', actual: null, predicted: 58.3, upper: 61.5, lower: 55.1 },
  ];

  const modelMetrics = [
    { name: 'MAPE', value: '2.34%', status: 'excellent', description: 'Mean Absolute Percentage Error' },
    { name: 'Accuracy', value: '97.66%', status: 'excellent', description: 'Overall prediction accuracy' },
    { name: 'Bias', value: '+0.8%', status: 'good', description: 'Systematic error tendency' },
    { name: 'R²', value: '0.982', status: 'excellent', description: 'Coefficient of determination' },
  ];

  const getStatusIcon = (status: string) => {
    return status === 'excellent' ? CheckCircle : status === 'good' ? TrendingUp : AlertTriangle;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'fair': return 'text-yellow-500';
      default: return 'text-red-500';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          ML-Powered Load Forecasting
        </CardTitle>
        <CardDescription>
          Neural network predictions with confidence intervals and accuracy metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {modelMetrics.map((metric) => {
            const StatusIcon = getStatusIcon(metric.status);
            return (
              <div
                key={metric.name}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{metric.name}</span>
                  <StatusIcon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            );
          })}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">24-Hour Forecast with Confidence Bands</h4>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                <div className="w-2 h-2 rounded-full bg-primary mr-1" />
                Predicted
              </Badge>
              <Badge variant="outline" className="text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                Actual
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
                label={{ value: 'Hour', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                label={{ value: 'Load (GW)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="upper" 
                fill="hsl(var(--primary) / 0.1)"
                stroke="none"
              />
              <Area 
                type="monotone" 
                dataKey="lower" 
                fill="hsl(var(--background))"
                stroke="none"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--energy-renewable))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--energy-renewable))', r: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Model Architecture</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• LSTM Neural Network (3 layers)</li>
              <li>• 168-hour lookback window</li>
              <li>• Weather & calendar features</li>
              <li>• Retrained daily at 00:00 UTC</li>
            </ul>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Input Features</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Historical load patterns</li>
              <li>• Temperature & weather forecasts</li>
              <li>• Day of week & holidays</li>
              <li>• Economic activity indicators</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadForecastingDashboard;