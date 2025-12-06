import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingDown, DollarSign, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DemandResponsePrograms = () => {
  const responseData = [
    { hour: '12', baseline: 68, actual: 68, curtailed: 0 },
    { hour: '13', baseline: 72, actual: 72, curtailed: 0 },
    { hour: '14', baseline: 75, actual: 75, curtailed: 0 },
    { hour: '15', baseline: 78, actual: 65, curtailed: 13 },
    { hour: '16', baseline: 82, actual: 68, curtailed: 14 },
    { hour: '17', baseline: 85, actual: 70, curtailed: 15 },
    { hour: '18', baseline: 80, actual: 72, curtailed: 8 },
  ];

  const programMetrics = [
    {
      metric: 'Active Participants',
      value: '12,458',
      change: '+245 this month',
      icon: Users,
      color: 'text-blue-500',
    },
    {
      metric: 'Available Capacity',
      value: '245 MW',
      change: 'Total enrolled',
      icon: Zap,
      color: 'text-primary',
    },
    {
      metric: 'Load Curtailed',
      value: '42 MW',
      change: 'Active event',
      icon: TrendingDown,
      color: 'text-green-500',
    },
    {
      metric: 'Incentives Paid',
      value: '$128K',
      change: 'This month',
      icon: DollarSign,
      color: 'text-green-500',
    },
  ];

  const activePrograms = [
    {
      name: 'Commercial Peak Shaving',
      participants: 1245,
      capacity: '85 MW',
      status: 'active',
      curtailment: '18 MW',
      savings: '$24,500',
    },
    {
      name: 'Industrial Load Shifting',
      participants: 156,
      capacity: '120 MW',
      status: 'active',
      curtailment: '24 MW',
      savings: '$38,200',
    },
    {
      name: 'Residential Smart Thermostat',
      participants: 8945,
      capacity: '32 MW',
      status: 'standby',
      curtailment: '0 MW',
      savings: '$0',
    },
    {
      name: 'EV Managed Charging',
      participants: 2112,
      capacity: '8 MW',
      status: 'standby',
      curtailment: '0 MW',
      savings: '$0',
    },
  ];

  const participantTiers = [
    { tier: 'Large Commercial', count: 245, capacity: '145 MW', response: '98%' },
    { tier: 'Small Commercial', count: 1892, capacity: '62 MW', response: '92%' },
    { tier: 'Industrial', count: 78, capacity: '156 MW', response: '99%' },
    { tier: 'Residential', count: 10243, capacity: '38 MW', response: '85%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'standby': return 'secondary';
      case 'ended': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Demand Response Programs
        </CardTitle>
        <CardDescription>
          Managing 12,458 participants to reduce peak demand and stabilize the grid
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {programMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.metric}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                  <span className="text-xs text-muted-foreground">{metric.metric}</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{metric.change}</div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">Active Event: Peak Load Reduction</h4>
            <Badge variant="default" className="animate-pulse">Live Event</Badge>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={responseData}>
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
              <Legend />
              <Bar dataKey="baseline" fill="hsl(var(--muted))" name="Baseline Load" />
              <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual Load" />
              <Bar dataKey="curtailed" fill="hsl(var(--energy-renewable))" name="Load Curtailed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Active Programs</h4>
          <div className="space-y-2">
            {activePrograms.map((program, index) => (
              <div
                key={index}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{program.name}</span>
                      <Badge variant={getStatusColor(program.status)} className="text-xs">
                        {program.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                      <div>
                        Participants: <span className="font-medium text-foreground">{program.participants}</span>
                      </div>
                      <div>
                        Capacity: <span className="font-medium text-foreground">{program.capacity}</span>
                      </div>
                      <div>
                        Curtailment: <span className="font-medium text-primary">{program.curtailment}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-500">{program.savings}</div>
                    <div className="text-xs text-muted-foreground">Savings</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Participant Breakdown</h4>
          <div className="grid grid-cols-2 gap-3">
            {participantTiers.map((tier, index) => (
              <div
                key={index}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{tier.tier}</span>
                  <Badge variant="outline" className="text-xs">{tier.response} response</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-2">
                  <div>Count: <span className="font-medium text-foreground">{tier.count}</span></div>
                  <div>Capacity: <span className="font-medium text-foreground">{tier.capacity}</span></div>
                </div>
                <Progress value={parseFloat(tier.response)} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">Event Performance</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Time:</span>
                <span className="font-medium text-foreground">15:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium text-foreground">3 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Called Capacity:</span>
                <span className="font-medium text-foreground">50 MW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivered:</span>
                <span className="font-medium text-green-500">42 MW (84%)</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">Economic Impact</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Energy Saved:</span>
                <span className="font-medium text-foreground">126 MWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cost Avoided:</span>
                <span className="font-medium text-green-500">$156,800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Incentives:</span>
                <span className="font-medium text-foreground">$62,700</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Net Savings:</span>
                <span className="font-medium text-green-500">$94,100</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-sm">This Month</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Events Called:</span>
                <span className="font-medium text-foreground">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Curtailment:</span>
                <span className="font-medium text-foreground">845 MWh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg Response:</span>
                <span className="font-medium text-foreground">91.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Savings:</span>
                <span className="font-medium text-green-500">$1.2M</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandResponsePrograms;