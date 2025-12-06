import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileSpreadsheet, Image, Calendar, Clock, Settings, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const DataExportPanel = () => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [dateRange, setDateRange] = useState('24h');
  const [format, setFormat] = useState('csv');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRawData, setIncludeRawData] = useState(true);
  const [includeAnalytics, setIncludeAnalytics] = useState(true);
  const [scheduledExports, setScheduledExports] = useState([
    { id: 1, name: 'Daily Grid Summary', frequency: 'Daily', format: 'PDF', nextRun: '06:00 AM', active: true },
    { id: 2, name: 'Weekly Performance', frequency: 'Weekly', format: 'Excel', nextRun: 'Monday 09:00', active: true },
    { id: 3, name: 'Monthly Carbon Report', frequency: 'Monthly', format: 'PDF', nextRun: '1st of Month', active: false },
  ]);

  const dateRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last Quarter' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const formatOptions = [
    { value: 'csv', label: 'CSV', icon: FileSpreadsheet },
    { value: 'xlsx', label: 'Excel', icon: FileSpreadsheet },
    { value: 'json', label: 'JSON', icon: FileText },
    { value: 'pdf', label: 'PDF Report', icon: FileText },
    { value: 'png', label: 'Chart Image', icon: Image },
  ];

  const generateGridData = () => {
    const hours = dateRange === '1h' ? 12 : dateRange === '6h' ? 72 : dateRange === '24h' ? 288 : 1440;
    const data = [];
    const now = Date.now();
    
    for (let i = 0; i < hours; i++) {
      const timestamp = new Date(now - (hours - i) * 5 * 60000);
      data.push({
        timestamp: timestamp.toISOString(),
        totalDemand: (240 + Math.sin(i / 24) * 20 + Math.random() * 10).toFixed(1),
        solarOutput: (45 + Math.sin((i / 12) + 6) * 25 + Math.random() * 5).toFixed(1),
        windOutput: (35 + Math.cos(i / 18) * 15 + Math.random() * 8).toFixed(1),
        nuclearOutput: '98.5',
        gasOutput: (60 + Math.random() * 15).toFixed(1),
        carbonIntensity: (280 + Math.random() * 40).toFixed(0),
        frequency: (60 + (Math.random() - 0.5) * 0.1).toFixed(3),
        voltage: (1 + (Math.random() - 0.5) * 0.02).toFixed(3),
        price: (35 + Math.random() * 20).toFixed(2),
      });
    }
    return data;
  };

  const exportData = async () => {
    setIsExporting(true);
    setExportProgress(0);
    
    const data = generateGridData();
    
    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setExportProgress(i);
    }

    if (format === 'csv' || format === 'xlsx') {
      const headers = ['Timestamp', 'Total Demand (GW)', 'Solar (GW)', 'Wind (GW)', 'Nuclear (GW)', 'Gas (GW)', 'Carbon (g/kWh)', 'Frequency (Hz)', 'Voltage (pu)', 'Price ($/MWh)'];
      const csvContent = [
        headers.join(','),
        ...data.map(row => [
          row.timestamp,
          row.totalDemand,
          row.solarOutput,
          row.windOutput,
          row.nuclearOutput,
          row.gasOutput,
          row.carbonIntensity,
          row.frequency,
          row.voltage,
          row.price
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `grid-data-${dateRange}-${Date.now()}.${format === 'xlsx' ? 'csv' : format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const jsonContent = JSON.stringify({ 
        exportDate: new Date().toISOString(),
        dateRange,
        includeCharts,
        includeRawData,
        includeAnalytics,
        data 
      }, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `grid-data-${dateRange}-${Date.now()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    }

    setIsExporting(false);
    toast({
      title: "Export Complete",
      description: `Grid data exported as ${format.toUpperCase()} successfully. ${data.length} records included.`,
    });
  };

  const toggleScheduledExport = (id: number) => {
    setScheduledExports(prev => prev.map(exp => 
      exp.id === id ? { ...exp, active: !exp.active } : exp
    ));
    toast({
      title: "Schedule Updated",
      description: "Export schedule has been updated.",
    });
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Advanced Data Export
        </CardTitle>
        <CardDescription>
          Export grid data with custom ranges, formats, and scheduled reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="export" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="export">Quick Export</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRangeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formatOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-charts" className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  Include Chart Snapshots
                </Label>
                <Switch id="include-charts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="include-raw" className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                  Include Raw Data
                </Label>
                <Switch id="include-raw" checked={includeRawData} onCheckedChange={setIncludeRawData} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="include-analytics" className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Include Analytics Summary
                </Label>
                <Switch id="include-analytics" checked={includeAnalytics} onCheckedChange={setIncludeAnalytics} />
              </div>
            </div>

            {isExporting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Exporting...</span>
                  <span>{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="h-2" />
              </div>
            )}

            <Button onClick={exportData} disabled={isExporting} className="w-full" size="lg">
              <Download className="mr-2 h-4 w-4" />
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            {scheduledExports.map(exp => (
              <div key={exp.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{exp.name}</span>
                    <Badge variant="outline" className="text-xs">{exp.format}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {exp.frequency}
                    </span>
                    <span>Next: {exp.nextRun}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {exp.active && <CheckCircle2 className="h-4 w-4 text-status-optimal" />}
                  <Switch checked={exp.active} onCheckedChange={() => toggleScheduledExport(exp.id)} />
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Create New Schedule
            </Button>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: 'Executive Summary', desc: 'High-level KPIs and trends', format: 'PDF' },
                { name: 'Technical Report', desc: 'Detailed metrics and raw data', format: 'Excel' },
                { name: 'Compliance Report', desc: 'Regulatory compliance data', format: 'PDF' },
                { name: 'Carbon Footprint', desc: 'Environmental impact analysis', format: 'PDF' },
              ].map((template, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">{template.name}</p>
                    <p className="text-xs text-muted-foreground">{template.desc}</p>
                  </div>
                  <Badge variant="secondary">{template.format}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataExportPanel;