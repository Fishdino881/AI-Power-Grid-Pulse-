import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, CheckCircle, AlertTriangle, Clock, FileText, Calendar, TrendingUp, Scale } from 'lucide-react';

const RegulatoryComplianceDashboard = () => {
  const complianceMetrics = {
    overall: 96.8,
    nerc: 98.2,
    ferc: 95.4,
    state: 97.1,
    environmental: 96.2,
  };

  const standards = [
    { code: 'NERC CIP-002', name: 'Critical Cyber Asset Identification', status: 'compliant', score: 100, dueDate: null },
    { code: 'NERC CIP-003', name: 'Security Management Controls', status: 'compliant', score: 98, dueDate: null },
    { code: 'NERC CIP-005', name: 'Electronic Security Perimeter', status: 'review', score: 94, dueDate: '2024-12-15' },
    { code: 'NERC CIP-007', name: 'System Security Management', status: 'compliant', score: 97, dueDate: null },
    { code: 'NERC FAC-001', name: 'Facility Interconnection', status: 'compliant', score: 100, dueDate: null },
    { code: 'NERC TPL-001', name: 'Transmission System Planning', status: 'action', score: 88, dueDate: '2024-12-20' },
    { code: 'FERC Order 2222', name: 'DER Participation', status: 'in-progress', score: 75, dueDate: '2025-03-01' },
  ];

  const upcomingAudits = [
    { name: 'NERC CIP Audit', date: '2025-01-15', scope: 'Cyber Security', auditor: 'Regional Entity', status: 'scheduled' },
    { name: 'State PUC Review', date: '2025-02-20', scope: 'Rate Case', auditor: 'State Commission', status: 'preparing' },
    { name: 'Environmental Audit', date: '2025-03-10', scope: 'Emissions', auditor: 'EPA', status: 'scheduled' },
  ];

  const recentFindings = [
    { id: 'F-2024-089', standard: 'CIP-007', severity: 'low', description: 'Documentation update required', status: 'resolved' },
    { id: 'F-2024-088', standard: 'TPL-001', severity: 'medium', description: 'Study methodology review', status: 'in-progress' },
    { id: 'F-2024-087', standard: 'FAC-003', severity: 'low', description: 'Vegetation management record', status: 'resolved' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-energy-renewable/20 text-energy-renewable">Compliant</Badge>;
      case 'review':
        return <Badge className="bg-energy-solar/20 text-energy-solar">Under Review</Badge>;
      case 'action':
        return <Badge className="bg-destructive/20 text-destructive">Action Required</Badge>;
      case 'in-progress':
        return <Badge className="bg-primary/20 text-primary">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">Regulatory Compliance Dashboard</CardTitle>
              <p className="text-sm text-muted-foreground">NERC, FERC & state compliance tracking</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Compliance */}
        <div className="p-4 rounded-lg bg-gradient-to-br from-energy-renewable/10 to-transparent border border-energy-renewable/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-energy-renewable" />
              <span className="font-medium text-foreground">Overall Compliance Score</span>
            </div>
            <span className="text-3xl font-bold text-energy-renewable">{complianceMetrics.overall}%</span>
          </div>
          <Progress value={complianceMetrics.overall} className="h-3 mb-4" />
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{complianceMetrics.nerc}%</div>
              <div className="text-xs text-muted-foreground">NERC</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{complianceMetrics.ferc}%</div>
              <div className="text-xs text-muted-foreground">FERC</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{complianceMetrics.state}%</div>
              <div className="text-xs text-muted-foreground">State</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{complianceMetrics.environmental}%</div>
              <div className="text-xs text-muted-foreground">Environmental</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="standards" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/50">
            <TabsTrigger value="standards">Standards</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
          </TabsList>

          <TabsContent value="standards" className="space-y-2 mt-4">
            {standards.map((standard, index) => (
              <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary">{standard.code}</span>
                    <span className="font-medium text-foreground">{standard.name}</span>
                  </div>
                  {getStatusBadge(standard.status)}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <Progress value={standard.score} className="h-2 flex-1 max-w-32" />
                    <span className="text-sm text-foreground">{standard.score}%</span>
                  </div>
                  {standard.dueDate && (
                    <span className="text-xs text-energy-solar flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Due: {standard.dueDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="audits" className="space-y-3 mt-4">
            {upcomingAudits.map((audit, index) => (
              <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{audit.name}</span>
                  <Badge variant="outline" className={
                    audit.status === 'preparing' ? 'bg-energy-solar/20 text-energy-solar' :
                    'bg-primary/20 text-primary'
                  }>
                    {audit.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-foreground">{audit.date}</span>
                  </div>
                  <div className="text-muted-foreground">{audit.scope}</div>
                  <div className="text-muted-foreground">{audit.auditor}</div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="findings" className="space-y-2 mt-4">
            {recentFindings.map((finding, index) => (
              <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground">{finding.id}</span>
                  <Badge className={
                    finding.severity === 'low' ? 'bg-energy-renewable/20 text-energy-renewable' :
                    finding.severity === 'medium' ? 'bg-energy-solar/20 text-energy-solar' :
                    'bg-destructive/20 text-destructive'
                  }>
                    {finding.severity}
                  </Badge>
                  <span className="text-foreground">{finding.description}</span>
                </div>
                {finding.status === 'resolved' ? (
                  <CheckCircle className="h-4 w-4 text-energy-renewable" />
                ) : (
                  <Clock className="h-4 w-4 text-energy-solar" />
                )}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RegulatoryComplianceDashboard;
