import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar, ReferenceLine } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, AlertTriangle, Sparkles, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataPoint {
  date: string;
  current: number;
  historical: number;
  average: number;
  anomaly?: boolean;
  prediction?: number;
}

const HistoricalComparison = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d' | '1y'>('7d');
  const [metric, setMetric] = useState('demand');
  const [showAnomalies, setShowAnomalies] = useState(true);

  const metrics = [
    { value: 'demand', label: 'Total Demand (GW)', unit: 'GW' },
    { value: 'renewable', label: 'Renewable Generation', unit: '%' },
    { value: 'carbon', label: 'Carbon Intensity', unit: 'g/kWh' },
    { value: 'price', label: 'Market Price', unit: '$/MWh' },
    { value: 'frequency', label: 'Grid Frequency', unit: 'Hz' },
    { value: 'efficiency', label: 'System Efficiency', unit: '%' },
  ];

  const generateData = (range: string, metricType: string): DataPoint[] => {
    const points = range === '24h' ? 24 : range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
    const data: DataPoint[] = [];
    
    for (let i = 0; i < points; i++) {
      const baseValue = metricType === 'demand' ? 240 : 
                       metricType === 'renewable' ? 42 :
                       metricType === 'carbon' ? 285 :
                       metricType === 'price' ? 45 :
                       metricType === 'frequency' ? 60 : 92;
      
      const variation = metricType === 'frequency' ? 0.05 : baseValue * 0.15;
      const trend = (i / points) * (metricType === 'renewable' ? 5 : metricType === 'carbon' ? -10 : 3);
      
      const current = baseValue + Math.sin(i / 5) * variation + trend + (Math.random() - 0.5) * variation * 0.5;
      const historical = baseValue + Math.sin((i + 10) / 5) * variation + (Math.random() - 0.5) * variation * 0.3;
      const average = baseValue + trend * 0.5;
      
      const isAnomaly = Math.random() > 0.92;
      const anomalyValue = isAnomaly ? current * (1 + (Math.random() - 0.5) * 0.3) : current;
      
      const dateLabel = range === '24h' ? `${i}:00` :
                       range === '7d' ? `Day ${i + 1}` :
                       range === '30d' ? `${i + 1}` :
                       `Week ${Math.floor(i / 7) + 1}`;

      data.push({
        date: dateLabel,
        current: Math.round(anomalyValue * 10) / 10,
        historical: Math.round(historical * 10) / 10,
        average: Math.round(average * 10) / 10,
        anomaly: isAnomaly,
        prediction: i > points * 0.8 ? Math.round((current + trend) * 10) / 10 : undefined,
      });
    }
    return data;
  };

  const data = useMemo(() => generateData(timeRange, metric), [timeRange, metric]);
  
  const anomalies = data.filter(d => d.anomaly);

  const comparisonMetrics = useMemo(() => {
    const current = data.slice(-7);
    const historical = data.slice(0, 7);
    
    const avgCurrent = current.reduce((acc, d) => acc + d.current, 0) / current.length;
    const avgHistorical = historical.reduce((acc, d) => acc + d.historical, 0) / historical.length;
    const change = ((avgCurrent - avgHistorical) / avgHistorical) * 100;
    
    return [
      { 
        label: 'Period Change', 
        value: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`, 
        trend: change > 0 ? 'up' : 'down',
        positive: metric === 'renewable' ? change > 0 : metric === 'carbon' ? change < 0 : null
      },
      { 
        label: 'vs. Last Year', 
        value: '+3.2%', 
        trend: 'up',
        positive: metric === 'renewable'
      },
      { 
        label: 'Anomalies Detected', 
        value: anomalies.length.toString(), 
        trend: anomalies.length > 3 ? 'up' : 'down',
        positive: anomalies.length < 3
      },
      { 
        label: 'Forecast Accuracy', 
        value: '94.7%', 
        trend: 'up',
        positive: true
      },
    ];
  }, [data, metric, anomalies]);

  const yoyData = [
    { month: 'Jan', y2024: 245, y2023: 238, y2022: 232 },
    { month: 'Feb', y2024: 252, y2023: 245, y2022: 239 },
    { month: 'Mar', y2024: 248, y2023: 240, y2022: 235 },
    { month: 'Apr', y2024: 238, y2023: 232, y2022: 228 },
    { month: 'May', y2024: 242, y2023: 236, y2022: 230 },
    { month: 'Jun', y2024: 258, y2023: 250, y2022: 244 },
    { month: 'Jul', y2024: 275, y2023: 268, y2022: 260 },
    { month: 'Aug', y2024: 278, y2023: 270, y2022: 263 },
    { month: 'Sep', y2024: 255, y2023: 248, y2022: 242 },
    { month: 'Oct', y2024: 245, y2023: 240, y2022: 235 },
    { month: 'Nov', y2024: 250, y2023: 244, y2022: 238 },
    { month: 'Dec', y2024: 262, y2023: 255, y2022: 248 },
  ];

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Historical Data Analysis
          {anomalies.length > 0 && showAnomalies && (
            <Badge variant="destructive" className="ml-2">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {anomalies.length} Anomalies
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Compare current performance with historical trends and AI-detected anomalies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2">
            {(['24h', '7d', '30d', '90d', '1y'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {metrics.map(m => (
                <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="trend" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trend">
              <TrendingUp className="h-4 w-4 mr-1" />
              Trend
            </TabsTrigger>
            <TabsTrigger value="yoy">
              <BarChart3 className="h-4 w-4 mr-1" />
              Year over Year
            </TabsTrigger>
            <TabsTrigger value="anomaly">
              <Sparkles className="h-4 w-4 mr-1" />
              Anomalies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trend">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="average"
                    stroke="hsl(var(--muted-foreground))"
                    fill="hsl(var(--muted))"
                    fillOpacity={0.3}
                    strokeDasharray="5 5"
                    name="5-Year Average"
                  />
                  <Line
                    type="monotone"
                    dataKey="historical"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    name="Last Year"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Current"
                    dot={(props: any) => {
                      const { cx, cy, payload } = props;
                      if (payload.anomaly && showAnomalies) {
                        return (
                          <circle cx={cx} cy={cy} r={6} fill="hsl(var(--destructive))" stroke="white" strokeWidth={2} />
                        );
                      }
                      return null;
                    }}
                  />
                  {data.some(d => d.prediction) && (
                    <Line
                      type="monotone"
                      dataKey="prediction"
                      stroke="hsl(var(--energy-renewable))"
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      name="Forecast"
                      dot={false}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="yoy">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yoyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="y2022" stackId="1" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted))" name="2022" />
                  <Area type="monotone" dataKey="y2023" stackId="2" stroke="hsl(var(--energy-renewable))" fill="hsl(var(--energy-renewable))" fillOpacity={0.3} name="2023" />
                  <Area type="monotone" dataKey="y2024" stackId="3" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.5} name="2024" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="anomaly">
            <div className="space-y-3">
              {anomalies.length > 0 ? (
                anomalies.map((anomaly, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="font-medium text-sm">Anomaly Detected at {anomaly.date}</p>
                        <p className="text-xs text-muted-foreground">
                          Value: {anomaly.current} | Expected: {anomaly.average.toFixed(1)} | Deviation: {((anomaly.current - anomaly.average) / anomaly.average * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <Badge variant="destructive">
                      {Math.abs((anomaly.current - anomaly.average) / anomaly.average * 100).toFixed(1)}% deviation
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No anomalies detected in the selected time range</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
          {comparisonMetrics.map((m) => (
            <div key={m.label} className="space-y-1">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <div className="flex items-center gap-2">
                <p className={`text-lg font-bold ${
                  m.positive === true ? 'text-status-optimal' : 
                  m.positive === false ? 'text-destructive' : 
                  'text-foreground'
                }`}>
                  {m.value}
                </p>
                {m.trend === 'up' ? (
                  <TrendingUp className={`h-4 w-4 ${m.positive === true ? 'text-status-optimal' : m.positive === false ? 'text-destructive' : 'text-muted-foreground'}`} />
                ) : (
                  <TrendingDown className={`h-4 w-4 ${m.positive === true ? 'text-status-optimal' : m.positive === false ? 'text-destructive' : 'text-muted-foreground'}`} />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalComparison;