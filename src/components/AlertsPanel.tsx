import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Alert {
  id: number;
  type: 'info' | 'warning' | 'critical';
  message: string;
  location: string;
  timestamp: Date;
}

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'info',
      message: 'Solar generation peaked at 15.2 GW',
      location: 'California ISO',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'warning',
      message: 'High load demand detected',
      location: 'Texas ERCOT',
      timestamp: new Date(Date.now() - 600000)
    },
    {
      id: 3,
      type: 'info',
      message: 'Wind farm output increased 25%',
      location: 'Midwest ISO',
      timestamp: new Date(Date.now() - 900000)
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        { msg: 'Grid frequency stabilized', loc: 'Eastern Interconnect', type: 'info' as const },
        { msg: 'Peak demand approaching', loc: 'California ISO', type: 'warning' as const },
        { msg: 'Renewable generation increased', loc: 'Southwest Power Pool', type: 'info' as const },
        { msg: 'Reserve margin optimal', loc: 'PJM', type: 'info' as const },
      ];

      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      const newAlert = {
        id: Date.now(),
        type: randomMessage.type,
        message: randomMessage.msg,
        location: randomMessage.loc,
        timestamp: new Date()
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);

      // Show toast notification for new alert
      toast[randomMessage.type === 'warning' ? 'warning' : 'info'](randomMessage.msg, {
        description: randomMessage.loc,
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-status-critical';
      case 'warning': return 'border-l-status-warning';
      default: return 'border-l-primary';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return '⚠️';
      case 'warning': return '⚡';
      default: return 'ℹ️';
    }
  };

  return (
    <Card className="p-6 glass-panel border-border/50">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-foreground">System Alerts</h2>
        <p className="text-sm text-muted-foreground">Recent grid events</p>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 bg-secondary/30 rounded-lg border-l-4 ${getAlertColor(alert.type)} transition-all duration-300 hover:bg-secondary/50`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{getAlertIcon(alert.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{alert.location}</span>
                  <span>•</span>
                  <span>{alert.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertsPanel;
