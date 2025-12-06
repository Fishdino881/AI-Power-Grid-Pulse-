import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const AdvancedFilters = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const filterOptions = {
    region: ['North America', 'Europe', 'Asia Pacific', 'All Regions'],
    source: ['Solar', 'Wind', 'Nuclear', 'Gas', 'Coal', 'All Sources'],
    timeRange: ['Last Hour', 'Last 24h', 'Last 7d', 'Last 30d'],
    alertLevel: ['Critical', 'Warning', 'Info', 'All Levels'],
    metric: ['Demand', 'Generation', 'Carbon', 'Price', 'All Metrics'],
  };

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };

  const removeFilter = (key: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Advanced Filtering
        </CardTitle>
        <CardDescription>
          Filter all metrics by region, time, source, and custom parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(filterOptions).map(([key, options]) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <Select
                value={activeFilters[key] || ''}
                onValueChange={(value) => handleFilterChange(key, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${key}`} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {Object.keys(activeFilters).length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Active Filters:</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([key, value]) => (
                <Badge key={key} variant="secondary" className="gap-1">
                  <span className="capitalize">{key}:</span> {value}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFilter(key)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Applied filters will update all dashboard visualizations in real-time
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;