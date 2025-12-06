import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface GridEvent {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  description: string;
  timestamp: Date;
  source: string;
}

const EventStream = () => {
  const [events, setEvents] = useState<GridEvent[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Demand Spike Detected',
      description: 'Western grid demand increased by 15% in the last 30 minutes',
      timestamp: new Date(),
      source: 'Western Grid',
    },
    {
      id: '2',
      type: 'success',
      title: 'Renewable Target Met',
      description: 'Solar generation reached 50 GW, exceeding forecasts',
      timestamp: new Date(Date.now() - 300000),
      source: 'Solar Farms',
    },
    {
      id: '3',
      type: 'warning',
      title: 'Frequency Deviation',
      description: 'Grid frequency dropped to 59.9 Hz, approaching lower threshold',
      timestamp: new Date(Date.now() - 600000),
      source: 'Central Hub',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const eventTypes: Array<'alert' | 'info' | 'success' | 'warning'> = ['alert', 'info', 'success', 'warning'];
      const sources = ['Western Grid', 'Eastern Grid', 'Central Hub', 'Solar Farms', 'Wind Farms', 'Nuclear Plant'];
      const titles = [
        'Generation Change',
        'Load Adjustment',
        'Maintenance Started',
        'System Optimization',
        'Capacity Update',
        'Market Price Change',
      ];

      const newEvent: GridEvent = {
        id: Date.now().toString(),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
        description: 'Real-time grid event detected and logged',
        timestamp: new Date(),
        source: sources[Math.floor(Math.random() * sources.length)],
      };

      setEvents(prev => [newEvent, ...prev].slice(0, 20));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-500/20 text-red-500 border-red-500/50';
      case 'warning': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'success': return 'bg-green-500/20 text-green-500 border-green-500/50';
      default: return 'bg-blue-500/20 text-blue-500 border-blue-500/50';
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Real-time Event Stream
        </CardTitle>
        <CardDescription>
          Live feed of all grid events and system changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-3 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <Badge variant="outline" className={`text-xs ${getEventBadgeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{event.source}</span>
                      <span className="text-muted-foreground">
                        {event.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventStream;