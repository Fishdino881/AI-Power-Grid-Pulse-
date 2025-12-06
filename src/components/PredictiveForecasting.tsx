import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import { Brain, AlertTriangle, TrendingUp, Zap, CloudSun, Wind, Loader2, Sparkles, RefreshCw, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ForecastPoint {
  time: string;
  actual: number | null;
  forecast: number;
  confidence: number;
  upper: number;
  lower: number;
}

interface RenewableForecast {
  time: string;
  solar: number;
  wind: number;
  total: number;
  weather: string;
}

interface MLInsight {
  type: 'warning' | 'success' | 'info' | 'critical';
  title: string;
  message: string;
  confidence: number;
  action: string;
  impact: 'High' | 'Medium' | 'Low';
  timeframe: string;
}

const PredictiveForecasting = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [forecastHorizon, setForecastHorizon] = useState<'6h' | '24h' | '48h' | '7d'>('24h');
  
  const [forecastData, setForecastData] = useState<ForecastPoint[]>([
    { time: 'Now', actual: 178.4, forecast: 178.4, confidence: 100, upper: 178.4, lower: 178.4 },
    { time: '+1h', actual: null, forecast: 182.3, confidence: 95, upper: 186.5, lower: 178.1 },
    { time: '+2h', actual: null, forecast: 189.7, confidence: 92, upper: 195.2, lower: 184.2 },
    { time: '+3h', actual: null, forecast: 195.2, confidence: 88, upper: 202.4, lower: 188.0 },
    { time: '+4h', actual: null, forecast: 198.4, confidence: 85, upper: 207.3, lower: 189.5 },
    { time: '+5h', actual: null, forecast: 196.8, confidence: 82, upper: 206.8, lower: 186.8 },
    { time: '+6h', actual: null, forecast: 188.3, confidence: 78, upper: 200.4, lower: 176.2 },
    { time: '+8h', actual: null, forecast: 175.2, confidence: 74, upper: 189.3, lower: 161.1 },
    { time: '+12h', actual: null, forecast: 158.4, confidence: 68, upper: 175.6, lower: 141.2 },
    { time: '+18h', actual: null, forecast: 165.8, confidence: 62, upper: 186.2, lower: 145.4 },
    { time: '+24h', actual: null, forecast: 182.1, confidence: 55, upper: 206.4, lower: 157.8 },
  ]);

  const [renewableForecast, setRenewableForecast] = useState<RenewableForecast[]>([
    { time: 'Now', solar: 45.2, wind: 32.8, total: 78.0, weather: 'Sunny' },
    { time: '+3h', solar: 62.4, wind: 28.3, total: 90.7, weather: 'Partly Cloudy' },
    { time: '+6h', solar: 48.7, wind: 35.1, total: 83.8, weather: 'Cloudy' },
    { time: '+9h', solar: 22.3, wind: 42.6, total: 64.9, weather: 'Windy' },
    { time: '+12h', solar: 5.2, wind: 38.4, total: 43.6, weather: 'Dusk' },
    { time: '+15h', solar: 0.0, wind: 35.8, total: 35.8, weather: 'Night' },
    { time: '+18h', solar: 0.0, wind: 28.4, total: 28.4, weather: 'Night' },
    { time: '+21h', solar: 12.5, wind: 31.2, total: 43.7, weather: 'Dawn' },
    { time: '+24h', solar: 38.6, wind: 29.8, total: 68.4, weather: 'Sunny' },
  ]);

  const [mlInsights, setMlInsights] = useState<MLInsight[]>([
    {
      type: 'critical',
      title: 'Grid Congestion Alert',
      message: 'California transmission lines predicted to reach 94% capacity in 3 hours. Immediate action recommended to prevent bottleneck.',
      confidence: 91,
      action: 'Activate load redistribution',
      impact: 'High',
      timeframe: '3 hours'
    },
    {
      type: 'warning',
      title: 'Peak Demand Surge',
      message: 'Expected 18% demand increase due to heatwave conditions. Recommend pre-positioning 25 GW reserve capacity.',
      confidence: 87,
      action: 'Activate reserves',
      impact: 'High',
      timeframe: '4 hours'
    },
    {
      type: 'success',
      title: 'Renewable Peak Opportunity',
      message: 'Solar generation will peak at 62.4 GW in 3 hours. Optimal window for battery charging and gas turbine reduction.',
      confidence: 92,
      action: 'Optimize energy mix',
      impact: 'Medium',
      timeframe: '3 hours'
    },
    {
      type: 'info',
      title: 'Weather Pattern Change',
      message: 'Cold front arriving tonight. Expected 15% increase in heating load after 20:00. Wind generation to increase 40%.',
      confidence: 78,
      action: 'Adjust forecast models',
      impact: 'Medium',
      timeframe: '8 hours'
    },
    {
      type: 'success',
      title: 'Price Arbitrage Window',
      message: 'Market prices dropping 22% in next 2 hours. Ideal opportunity to charge storage systems and reduce peak costs.',
      confidence: 89,
      action: 'Charge batteries',
      impact: 'Low',
      timeframe: '2 hours'
    },
  ]);

  const [liveMetrics, setLiveMetrics] = useState({
    modelAccuracy: 94.3,
    dataPoints: 1847293,
    predictionsToday: 2847,
    avgResponseTime: 142,
    modelVersion: 'v3.2.1',
    lastTrained: '2 hours ago',
  });

  const [predictionStats, setPredictionStats] = useState({
    mape: 3.2, // Mean Absolute Percentage Error
    rmse: 8.4, // Root Mean Square Error
    r2: 0.94, // R-squared
    bias: -0.5,
  });

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Simulate real-time forecast updates
      setForecastData(prev => prev.map(item => ({
        ...item,
        forecast: item.forecast + (Math.random() - 0.5) * 2,
        upper: item.upper + (Math.random() - 0.5) * 3,
        lower: item.lower + (Math.random() - 0.5) * 3,
        confidence: item.confidence ? Math.max(50, item.confidence - 0.1) : item.confidence
      })));

      // Update live metrics
      setLiveMetrics(prev => ({
        ...prev,
        modelAccuracy: Math.min(99, Math.max(90, prev.modelAccuracy + (Math.random() - 0.5) * 0.3)),
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 100),
        predictionsToday: prev.predictionsToday + Math.floor(Math.random() * 5),
        avgResponseTime: Math.max(100, Math.min(200, prev.avgResponseTime + (Math.random() - 0.5) * 10)),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const generateAIForecast = async () => {
    setIsLoading(true);
    try {
      // Generate enhanced forecast data
      const newForecast: ForecastPoint[] = [];
      const hours = forecastHorizon === '6h' ? 6 : forecastHorizon === '24h' ? 24 : forecastHorizon === '48h' ? 48 : 168;
      
      for (let i = 0; i <= hours; i++) {
        const baseValue = 175 + Math.sin(i / 6) * 25;
        const trend = (i / hours) * 10;
        const forecast = baseValue + trend + (Math.random() - 0.5) * 10;
        const uncertainty = (i / hours) * 20 + 5;
        
        newForecast.push({
          time: i === 0 ? 'Now' : `+${i}h`,
          actual: i === 0 ? forecast : null,
          forecast: Math.round(forecast * 10) / 10,
          confidence: Math.round(100 - (i / hours) * 45),
          upper: Math.round((forecast + uncertainty) * 10) / 10,
          lower: Math.round((forecast - uncertainty) * 10) / 10,
        });
      }
      
      setForecastData(newForecast);
      
      toast({
        title: "AI Forecast Updated",
        description: `Generated ${hours}-hour forecast with ${newForecast.length} prediction points.`,
      });
    } catch (error) {
      toast({
        title: "Forecast Error",
        description: "Failed to generate AI forecast. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-status-warning" />;
      case 'success': return <TrendingUp className="w-4 h-4 text-status-optimal" />;
      default: return <Brain className="w-4 h-4 text-primary" />;
    }
  };

  const getInsightBorder = (type: string) => {
    switch (type) {
      case 'critical': return 'border-destructive';
      case 'warning': return 'border-status-warning';
      case 'success': return 'border-status-optimal';
      default: return 'border-primary';
    }
  };

  return (
    <Card className="glass-panel p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-energy-renewable bg-clip-text text-transparent">
              AI-Powered Predictive Forecasting
            </h3>
            <Badge variant="outline" className="text-xs">
              {liveMetrics.modelVersion}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Machine learning insights for grid optimization</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={isLive ? "default" : "outline"} 
            size="sm" 
            onClick={() => setIsLive(!isLive)}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLive ? 'animate-spin' : ''}`} />
            {isLive ? 'Live' : 'Paused'}
          </Button>
          <Button 
            onClick={generateAIForecast} 
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Sparkles className="h-4 w-4 mr-1" />}
            Generate Forecast
          </Button>
        </div>
      </div>

      {/* Live AI Model Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="glass-panel p-3 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Model Accuracy</div>
          <div className="text-xl font-bold text-status-optimal">{liveMetrics.modelAccuracy.toFixed(1)}%</div>
        </div>
        <div className="glass-panel p-3 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">MAPE</div>
          <div className="text-xl font-bold text-primary">{predictionStats.mape}%</div>
        </div>
        <div className="glass-panel p-3 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Data Points</div>
          <div className="text-xl font-bold">{(liveMetrics.dataPoints / 1000000).toFixed(2)}M</div>
        </div>
        <div className="glass-panel p-3 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Predictions</div>
          <div className="text-xl font-bold text-primary">{liveMetrics.predictionsToday.toLocaleString()}</div>
        </div>
        <div className="glass-panel p-3 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Response Time</div>
          <div className="text-xl font-bold text-energy-renewable">{liveMetrics.avgResponseTime}ms</div>
        </div>
        <div className="glass-panel p-3 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Last Trained</div>
          <div className="text-sm font-bold">{liveMetrics.lastTrained}</div>
        </div>
      </div>

      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecast">
            <Zap className="h-4 w-4 mr-1" />
            Demand
          </TabsTrigger>
          <TabsTrigger value="renewable">
            <CloudSun className="h-4 w-4 mr-1" />
            Renewable
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Brain className="h-4 w-4 mr-1" />
            Insights ({mlInsights.length})
          </TabsTrigger>
          <TabsTrigger value="accuracy">
            <Settings2 className="h-4 w-4 mr-1" />
            Model
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <div className="flex gap-2 mb-4">
            {(['6h', '24h', '48h', '7d'] as const).map((horizon) => (
              <Button
                key={horizon}
                variant={forecastHorizon === horizon ? 'default' : 'outline'}
                size="sm"
                onClick={() => setForecastHorizon(horizon)}
              >
                {horizon}
              </Button>
            ))}
          </div>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <ReferenceLine y={200} stroke="hsl(var(--status-critical))" strokeDasharray="3 3" label="Critical" />
                <ReferenceLine y={180} stroke="hsl(var(--status-warning))" strokeDasharray="3 3" label="Warning" />
                <Area type="monotone" dataKey="upper" stroke="transparent" fill="hsl(var(--primary))" fillOpacity={0.1} name="Upper Bound" />
                <Area type="monotone" dataKey="lower" stroke="transparent" fill="hsl(var(--primary))" fillOpacity={0.1} name="Lower Bound" />
                <Line type="monotone" dataKey="actual" stroke="hsl(var(--primary))" strokeWidth={3} name="Actual (GW)" dot={{ fill: 'hsl(var(--primary))' }} />
                <Line type="monotone" dataKey="forecast" stroke="hsl(var(--energy-renewable))" strokeWidth={2} strokeDasharray="5 5" name="Forecast (GW)" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Confidence:</span>
            <div className="flex-1">
              <Progress value={forecastData[forecastData.length - 1]?.confidence || 0} className="h-2" />
            </div>
            <span className="text-xs font-medium">{forecastData[forecastData.length - 1]?.confidence || 0}%</span>
          </div>
        </TabsContent>

        <TabsContent value="renewable" className="space-y-4">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={renewableForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(1)} GW`,
                    name
                  ]}
                />
                <Legend />
                <Area type="monotone" dataKey="solar" stackId="1" stroke="hsl(var(--energy-solar))" fill="hsl(var(--energy-solar))" fillOpacity={0.8} name="Solar" />
                <Area type="monotone" dataKey="wind" stackId="1" stroke="hsl(var(--energy-wind))" fill="hsl(var(--energy-wind))" fillOpacity={0.8} name="Wind" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass-panel p-3 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Peak Solar</div>
              <div className="text-xl font-bold text-energy-solar">
                {Math.max(...renewableForecast.map(r => r.solar)).toFixed(1)} GW
              </div>
              <div className="text-xs text-muted-foreground">at +3h</div>
            </div>
            <div className="glass-panel p-3 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Peak Wind</div>
              <div className="text-xl font-bold text-energy-wind">
                {Math.max(...renewableForecast.map(r => r.wind)).toFixed(1)} GW
              </div>
              <div className="text-xs text-muted-foreground">at +9h</div>
            </div>
            <div className="glass-panel p-3 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Max Combined</div>
              <div className="text-xl font-bold text-energy-renewable">
                {Math.max(...renewableForecast.map(r => r.total)).toFixed(1)} GW
              </div>
              <div className="text-xs text-muted-foreground">at +3h</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-3">
          {mlInsights.map((insight, idx) => (
            <div 
              key={idx} 
              className={`glass-panel p-4 rounded-lg border-l-4 transition-all hover:scale-[1.01] ${getInsightBorder(insight.type)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getInsightIcon(insight.type)}
                  <span className="font-semibold text-sm">{insight.title}</span>
                  <Badge variant={insight.impact === 'High' ? 'destructive' : insight.impact === 'Medium' ? 'secondary' : 'outline'} className="text-xs">
                    {insight.impact}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{insight.timeframe}</Badge>
                  <Badge variant="outline" className="text-xs">{insight.confidence}%</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{insight.message}</p>
              <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                {insight.action} →
              </Button>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="accuracy" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">MAPE</div>
              <div className="text-2xl font-bold text-status-optimal">{predictionStats.mape}%</div>
              <div className="text-xs text-muted-foreground">Mean Absolute % Error</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">RMSE</div>
              <div className="text-2xl font-bold text-primary">{predictionStats.rmse} GW</div>
              <div className="text-xs text-muted-foreground">Root Mean Square Error</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">R² Score</div>
              <div className="text-2xl font-bold text-energy-renewable">{predictionStats.r2}</div>
              <div className="text-xs text-muted-foreground">Coefficient of Determination</div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Bias</div>
              <div className="text-2xl font-bold">{predictionStats.bias} GW</div>
              <div className="text-xs text-muted-foreground">Systematic Error</div>
            </div>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              Model Configuration
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Algorithm:</span>
                <span className="ml-2 font-medium">Transformer + LSTM Ensemble</span>
              </div>
              <div>
                <span className="text-muted-foreground">Training Data:</span>
                <span className="ml-2 font-medium">5 years, 15-min intervals</span>
              </div>
              <div>
                <span className="text-muted-foreground">Features:</span>
                <span className="ml-2 font-medium">Weather, Calendar, Load, Price</span>
              </div>
              <div>
                <span className="text-muted-foreground">Update Frequency:</span>
                <span className="ml-2 font-medium">Hourly retraining</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PredictiveForecasting;