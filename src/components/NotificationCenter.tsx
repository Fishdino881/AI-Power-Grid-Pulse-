import { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, Info, CheckCircle, Clock, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  source: string;
}

const NotificationCenter = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Grid Overload Alert',
      message: 'California region approaching 95% capacity. Immediate action required.',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      priority: 'high',
      source: 'Grid Monitor'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Renewable Dip',
      message: 'Wind generation dropped 12% below forecast. Compensating with reserves.',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      priority: 'medium',
      source: 'Energy Mix'
    },
    {
      id: '3',
      type: 'success',
      title: 'Efficiency Target Met',
      message: 'Grid efficiency reached 94.2%, exceeding daily target by 2.1%.',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: true,
      priority: 'low',
      source: 'Analytics'
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const unreadCount = alerts.filter(a => !a.read).length;
  const criticalCount = alerts.filter(a => a.type === 'critical' && !a.read).length;

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldTrigger = Math.random() > 0.7; // 30% chance every interval
      if (shouldTrigger) {
        const alertTypes = [
          {
            type: 'critical' as const,
            titles: ['Grid Frequency Deviation', 'Transmission Line Overload', 'Reserve Capacity Critical'],
            messages: [
              'Frequency dropped to 59.97 Hz. Activating stabilization protocols.',
              'Line TX-4502 at 98% capacity. Rerouting recommended.',
              'Reserve margin below 5%. Activate emergency reserves immediately.'
            ],
            priority: 'high' as const
          },
          {
            type: 'warning' as const,
            titles: ['Demand Spike Detected', 'Equipment Temperature Alert', 'Weather Impact Warning'],
            messages: [
              'Unexpected 8% demand increase in Texas region.',
              'Transformer T-334 operating at 82°C. Monitor closely.',
              'Severe weather may impact wind generation in next 2 hours.'
            ],
            priority: 'medium' as const
          },
          {
            type: 'info' as const,
            titles: ['Maintenance Scheduled', 'System Update', 'Forecast Updated'],
            messages: [
              'Routine maintenance on Grid Section B scheduled for 02:00.',
              'Predictive model updated with latest weather data.',
              'Demand forecast revised +3% for evening peak.'
            ],
            priority: 'low' as const
          }
        ];

        const category = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        const titleIdx = Math.floor(Math.random() * category.titles.length);
        
        const newAlert: Alert = {
          id: `alert_${Date.now()}`,
          type: category.type,
          title: category.titles[titleIdx],
          message: category.messages[titleIdx],
          timestamp: new Date(),
          read: false,
          priority: category.priority,
          source: ['Grid Monitor', 'Analytics', 'Predictive AI', 'Weather System'][Math.floor(Math.random() * 4)]
        };

        setAlerts(prev => [newAlert, ...prev].slice(0, 50)); // Keep last 50 alerts

        // Show toast notification for critical and warning alerts
        if (category.type === 'critical' || category.type === 'warning') {
          toast({
            title: newAlert.title,
            description: newAlert.message,
            variant: category.type === 'critical' ? 'destructive' : 'default',
            duration: category.type === 'critical' ? 10000 : 5000,
          });
        }
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const clearAll = () => {
    setAlerts([]);
  };

  const getFilteredAlerts = () => {
    switch (filter) {
      case 'unread':
        return alerts.filter(a => !a.read);
      case 'critical':
        return alerts.filter(a => a.type === 'critical');
      default:
        return alerts;
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-status-critical" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-status-warning" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-status-optimal" />;
      default:
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative interactive-scale">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant={criticalCount > 0 ? "destructive" : "default"}
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-hidden flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Notifications</span>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
              {alerts.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  Clear all
                </Button>
              )}
            </div>
          </SheetTitle>
        </SheetHeader>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All ({alerts.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="critical">
              Critical ({alerts.filter(a => a.type === 'critical').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="flex-1 overflow-y-auto mt-4 space-y-2">
            {getFilteredAlerts().length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Bell className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">No notifications</p>
                <p className="text-xs text-muted-foreground mt-2">
                  You're all caught up!
                </p>
              </div>
            ) : (
              getFilteredAlerts().map((alert) => (
                <div
                  key={alert.id}
                  className={`glass-panel p-4 rounded-lg border-l-4 transition-all hover:scale-[1.01] ${
                    alert.type === 'critical' ? 'border-status-critical' :
                    alert.type === 'warning' ? 'border-status-warning' :
                    alert.type === 'success' ? 'border-status-optimal' :
                    'border-primary'
                  } ${!alert.read ? 'bg-primary/5' : 'opacity-75'}`}
                  onClick={() => markAsRead(alert.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-sm">{alert.title}</h4>
                          {!alert.read && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mt-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAlert(alert.id);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getTimeAgo(alert.timestamp)}
                        </span>
                        <span>•</span>
                        <span>{alert.source}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs h-5">
                          {alert.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationCenter;
