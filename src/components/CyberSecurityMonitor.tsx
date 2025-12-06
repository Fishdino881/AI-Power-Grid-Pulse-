import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Lock, Activity, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CyberSecurityMonitor = () => {
  const threatData = [
    { hour: '00', threats: 12, blocked: 12, severity: 2.1 },
    { hour: '04', threats: 8, blocked: 8, severity: 1.5 },
    { hour: '08', threats: 25, blocked: 24, severity: 3.2 },
    { hour: '12', threats: 18, blocked: 17, severity: 2.8 },
    { hour: '16', threats: 32, blocked: 31, severity: 4.1 },
    { hour: '20', threats: 15, blocked: 15, severity: 2.3 },
  ];

  const securityMetrics = [
    {
      metric: 'Threat Level',
      value: 'Medium',
      score: 65,
      icon: AlertTriangle,
      color: 'text-yellow-500',
      status: 'monitoring',
    },
    {
      metric: 'Firewall Status',
      value: 'Active',
      score: 100,
      icon: Shield,
      color: 'text-green-500',
      status: 'secure',
    },
    {
      metric: 'Intrusion Attempts',
      value: '32/hour',
      score: 75,
      icon: Eye,
      color: 'text-orange-500',
      status: 'elevated',
    },
    {
      metric: 'System Integrity',
      value: 'Verified',
      score: 98,
      icon: Lock,
      color: 'text-green-500',
      status: 'secure',
    },
  ];

  const recentThreats = [
    {
      id: 1,
      type: 'Port Scan',
      source: '185.220.*.***',
      target: 'SCADA Gateway',
      severity: 'medium',
      status: 'blocked',
      time: '2 min ago',
    },
    {
      id: 2,
      type: 'Brute Force',
      source: '91.192.*.***',
      target: 'Control Center',
      severity: 'high',
      status: 'blocked',
      time: '15 min ago',
    },
    {
      id: 3,
      type: 'DDoS Attempt',
      source: 'Multiple IPs',
      target: 'Data Server',
      severity: 'critical',
      status: 'mitigated',
      time: '28 min ago',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'blocked': return 'default';
      case 'mitigated': return 'secondary';
      case 'investigating': return 'outline';
      default: return 'destructive';
    }
  };

  return (
    <Card className="glass-panel border-red-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-500" />
          Cybersecurity Monitoring
        </CardTitle>
        <CardDescription>
          Real-time threat detection and infrastructure protection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {securityMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.metric}
                className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                  <Badge variant="outline" className="text-xs">
                    {metric.status}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-1">{metric.metric}</div>
                <div className="text-xl font-bold text-foreground mb-2">{metric.value}</div>
                <Progress value={metric.score} className="h-2" />
              </div>
            );
          })}
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">24-Hour Threat Activity</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={threatData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="hour" 
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
              <Line 
                type="monotone" 
                dataKey="threats" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Threats Detected"
              />
              <Line 
                type="monotone" 
                dataKey="blocked" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Blocked"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Recent Security Events</h4>
          <div className="space-y-2">
            {recentThreats.map((threat) => (
              <div
                key={threat.id}
                className="p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-red-500" />
                      <span className="font-semibold text-sm">{threat.type}</span>
                      <Badge variant={getSeverityColor(threat.severity)} className="text-xs">
                        {threat.severity}
                      </Badge>
                    </div>
                    <div className="space-y-0.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>Source: {threat.source}</span>
                        <span>•</span>
                        <span>Target: {threat.target}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusBadge(threat.status)} className="text-xs mb-1">
                      {threat.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{threat.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
            <div className="text-xs text-muted-foreground mb-1">Critical Alerts</div>
            <div className="text-2xl font-bold text-red-500">1</div>
          </div>
          <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <div className="text-xs text-muted-foreground mb-1">Active Monitoring</div>
            <div className="text-2xl font-bold text-yellow-500">8</div>
          </div>
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
            <div className="text-xs text-muted-foreground mb-1">Threats Blocked</div>
            <div className="text-2xl font-bold text-green-500">127</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CyberSecurityMonitor;