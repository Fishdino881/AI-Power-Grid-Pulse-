import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp, Target } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

const PerformanceBenchmarking = () => {
  const benchmarkData = [
    { metric: 'Reliability', current: 98.5, industry: 97.2, target: 99.5 },
    { metric: 'Efficiency', current: 94.2, industry: 92.8, target: 96.0 },
    { metric: 'Renewable %', current: 42.1, industry: 38.5, target: 50.0 },
    { metric: 'Response Time', current: 88.3, industry: 85.0, target: 95.0 },
    { metric: 'Cost Control', current: 91.7, industry: 89.2, target: 93.0 },
    { metric: 'Carbon Reduction', current: 85.4, industry: 78.9, target: 90.0 },
  ];

  const radarData = benchmarkData.map(item => ({
    metric: item.metric,
    Current: item.current,
    Industry: item.industry,
    Target: item.target,
  }));

  const getPerformanceColor = (current: number, industry: number, target: number) => {
    if (current >= target) return 'text-green-500';
    if (current >= industry) return 'text-primary';
    return 'text-yellow-500';
  };

  const overallScore = Math.round(
    benchmarkData.reduce((acc, item) => acc + item.current, 0) / benchmarkData.length
  );

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Performance Benchmarking
        </CardTitle>
        <CardDescription>
          Compare grid performance against industry standards and targets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <Target className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Overall Score</p>
            <p className="text-2xl font-bold text-primary">{overallScore}%</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Above Industry Avg</p>
            <p className="text-2xl font-bold text-green-500">+3.2%</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <Award className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Targets Met</p>
            <p className="text-2xl font-bold">4/6</p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid className="stroke-border/30" />
              <PolarAngleAxis dataKey="metric" className="text-xs" />
              <PolarRadiusAxis className="text-xs" />
              <Radar
                name="Current Performance"
                dataKey="Current"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
              <Radar
                name="Industry Average"
                dataKey="Industry"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted-foreground))"
                fillOpacity={0.2}
                strokeDasharray="5 5"
              />
              <Radar
                name="Target"
                dataKey="Target"
                stroke="hsl(var(--energy-renewable))"
                fill="hsl(var(--energy-renewable))"
                fillOpacity={0.1}
                strokeDasharray="3 3"
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {benchmarkData.map((item) => (
            <div key={item.metric} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.metric}</span>
                <span className={`font-bold ${getPerformanceColor(item.current, item.industry, item.target)}`}>
                  {item.current}%
                </span>
              </div>
              <Progress value={item.current} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Industry: {item.industry}%</span>
                <span>Target: {item.target}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceBenchmarking;