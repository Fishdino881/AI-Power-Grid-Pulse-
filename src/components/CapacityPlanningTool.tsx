import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, AlertCircle, Layers } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const CapacityPlanningTool = () => {
  const capacityData = [
    { year: '2024', current: 85.2, required: 88.5, renewable: 45.2, fossil: 40.0 },
    { year: '2025', current: 88.5, required: 92.8, renewable: 52.8, fossil: 35.7 },
    { year: '2026', current: 92.8, required: 97.5, renewable: 61.5, fossil: 31.3 },
    { year: '2027', current: 97.5, required: 102.8, renewable: 71.8, fossil: 25.7 },
    { year: '2028', current: 102.8, required: 108.5, renewable: 83.2, fossil: 19.6 },
  ];

  const expansionProjects = [
    {
      name: 'Solar Farm Expansion',
      capacity: '2.5 GW',
      status: 'In Progress',
      completion: 65,
      deadline: 'Q3 2025',
      priority: 'high',
    },
    {
      name: 'Offshore Wind Project',
      capacity: '3.2 GW',
      status: 'Planning',
      completion: 25,
      deadline: 'Q4 2026',
      priority: 'high',
    },
    {
      name: 'Grid Modernization',
      capacity: '1.8 GW',
      status: 'In Progress',
      completion: 45,
      deadline: 'Q2 2025',
      priority: 'medium',
    },
    {
      name: 'Battery Storage',
      capacity: '1.2 GW',
      status: 'Planning',
      completion: 15,
      deadline: 'Q1 2026',
      priority: 'medium',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'default';
      case 'Planning': return 'secondary';
      case 'Complete': return 'outline';
      default: return 'destructive';
    }
  };

  const getPriorityVariant = (priority: string) => {
    return priority === 'high' ? 'destructive' : 'outline';
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Capacity Planning & Expansion
        </CardTitle>
        <CardDescription>
          Long-term capacity requirements and renewable transition planning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border border-border/50 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Current Capacity</span>
            </div>
            <div className="text-2xl font-bold text-foreground">85.2 GW</div>
            <div className="text-xs text-muted-foreground mt-1">Peak load: 78.5 GW</div>
          </div>
          <div className="p-4 border border-border/50 rounded-lg bg-gradient-to-br from-energy-renewable/10 to-energy-renewable/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-energy-renewable" />
              <span className="text-xs text-muted-foreground">2028 Target</span>
            </div>
            <div className="text-2xl font-bold text-foreground">108.5 GW</div>
            <div className="text-xs text-muted-foreground mt-1">+27% growth required</div>
          </div>
          <div className="p-4 border border-border/50 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">Capacity Gap</span>
            </div>
            <div className="text-2xl font-bold text-foreground">3.3 GW</div>
            <div className="text-xs text-muted-foreground mt-1">By end of 2024</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">5-Year Capacity Projection</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={capacityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="year" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                label={{ value: 'Capacity (GW)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="renewable" stackId="a" fill="hsl(var(--energy-renewable))" name="Renewable" />
              <Bar dataKey="fossil" stackId="a" fill="hsl(var(--energy-fossil))" name="Fossil" />
              <Bar dataKey="required" fill="hsl(var(--primary))" fillOpacity={0.3} name="Required" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Active Expansion Projects</h4>
          <div className="space-y-3">
            {expansionProjects.map((project, index) => (
              <div
                key={index}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-semibold">{project.name}</h5>
                      <Badge variant={getPriorityVariant(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{project.capacity}</span>
                      <span>•</span>
                      <span>{project.deadline}</span>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.completion}%</span>
                  </div>
                  <Progress value={project.completion} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Investment Summary</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Budget:</span>
                <span className="font-medium text-foreground">$8.7B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Allocated:</span>
                <span className="font-medium text-foreground">$6.2B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Spent YTD:</span>
                <span className="font-medium text-foreground">$3.8B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ROI Target:</span>
                <span className="font-medium text-foreground">8.5%</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-3 text-sm">Renewable Transition</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Mix:</span>
                <span className="font-medium text-foreground">53% renewable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">2028 Target:</span>
                <span className="font-medium text-foreground">77% renewable</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coal Retirement:</span>
                <span className="font-medium text-foreground">12.5 GW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">New Solar:</span>
                <span className="font-medium text-foreground">18.2 GW</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapacityPlanningTool;