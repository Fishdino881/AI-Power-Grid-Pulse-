import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, TrendingUp, TrendingDown, ArrowUpDown, DollarSign, BarChart3, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useState, useEffect } from 'react';

const CarbonCreditTrading = () => {
  const [selectedMarket, setSelectedMarket] = useState('EU-ETS');
  
  const priceHistory = [
    { time: '09:00', 'EU-ETS': 82.45, 'CA-CaT': 28.90, 'RGGI': 14.20, 'UK-ETS': 45.60 },
    { time: '10:00', 'EU-ETS': 83.10, 'CA-CaT': 29.15, 'RGGI': 14.35, 'UK-ETS': 46.20 },
    { time: '11:00', 'EU-ETS': 82.80, 'CA-CaT': 29.00, 'RGGI': 14.28, 'UK-ETS': 45.90 },
    { time: '12:00', 'EU-ETS': 84.25, 'CA-CaT': 29.45, 'RGGI': 14.50, 'UK-ETS': 47.10 },
    { time: '13:00', 'EU-ETS': 85.00, 'CA-CaT': 29.80, 'RGGI': 14.65, 'UK-ETS': 47.80 },
    { time: '14:00', 'EU-ETS': 84.60, 'CA-CaT': 29.60, 'RGGI': 14.55, 'UK-ETS': 47.40 },
    { time: '15:00', 'EU-ETS': 85.45, 'CA-CaT': 30.10, 'RGGI': 14.80, 'UK-ETS': 48.20 },
  ];

  const markets = [
    { name: 'EU-ETS', price: 85.45, change: 3.64, volume: '12.4M', region: 'Europe' },
    { name: 'CA-CaT', price: 30.10, change: 4.15, volume: '3.2M', region: 'California' },
    { name: 'RGGI', price: 14.80, change: 4.22, volume: '1.8M', region: 'US Northeast' },
    { name: 'UK-ETS', price: 48.20, change: 5.70, volume: '4.1M', region: 'United Kingdom' },
  ];

  const portfolio = {
    totalCredits: 125000,
    totalValue: 8234500,
    unrealizedPnL: 345200,
    realizedPnL: 128900,
    positions: [
      { market: 'EU-ETS', credits: 75000, avgPrice: 78.20, currentPrice: 85.45, pnl: 543750 },
      { market: 'CA-CaT', credits: 35000, avgPrice: 27.50, currentPrice: 30.10, pnl: 91000 },
      { market: 'UK-ETS', credits: 15000, avgPrice: 44.80, currentPrice: 48.20, pnl: 51000 },
    ],
  };

  const recentTrades = [
    { id: 1, type: 'BUY', market: 'EU-ETS', credits: 5000, price: 84.80, time: '14:32:15' },
    { id: 2, type: 'SELL', market: 'CA-CaT', credits: 2000, price: 30.05, time: '14:28:42' },
    { id: 3, type: 'BUY', market: 'UK-ETS', credits: 3000, price: 47.90, time: '14:15:08' },
    { id: 4, type: 'SELL', market: 'EU-ETS', credits: 1500, price: 85.20, time: '13:58:33' },
  ];

  const offsetProjects = [
    { name: 'Amazon Reforestation', type: 'Forestry', credits: 12500, verified: true, rating: 'Gold' },
    { name: 'Texas Wind Farm', type: 'Renewable', credits: 8900, verified: true, rating: 'Silver' },
    { name: 'Kenya Cookstoves', type: 'Energy Efficiency', credits: 4200, verified: true, rating: 'Gold' },
    { name: 'India Solar Initiative', type: 'Renewable', credits: 15600, verified: false, rating: 'Pending' },
  ];

  return (
    <Card className="glass-panel border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-energy-renewable/20">
              <Leaf className="h-5 w-5 text-energy-renewable" />
            </div>
            <div>
              <CardTitle className="text-foreground">Carbon Credit Trading</CardTitle>
              <p className="text-sm text-muted-foreground">Emissions trading & offset management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Trade
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg bg-card/50 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Total Credits</div>
            <div className="text-xl font-bold text-foreground">{portfolio.totalCredits.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">tonnes CO₂e</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Portfolio Value</div>
            <div className="text-xl font-bold text-foreground">${(portfolio.totalValue / 1000000).toFixed(2)}M</div>
            <div className="text-xs text-energy-renewable flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +4.38%
            </div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Unrealized P&L</div>
            <div className="text-xl font-bold text-energy-renewable">+${(portfolio.unrealizedPnL / 1000).toFixed(0)}K</div>
            <div className="text-xs text-muted-foreground">this month</div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Realized P&L</div>
            <div className="text-xl font-bold text-energy-renewable">+${(portfolio.realizedPnL / 1000).toFixed(0)}K</div>
            <div className="text-xs text-muted-foreground">YTD</div>
          </div>
        </div>

        {/* Market Prices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {markets.map((market, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedMarket === market.name 
                  ? 'bg-primary/20 border-primary/50' 
                  : 'bg-card/50 border-border/50 hover:border-primary/30'
              }`}
              onClick={() => setSelectedMarket(market.name)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground">{market.name}</span>
                <Globe className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="text-lg font-bold text-foreground">${market.price.toFixed(2)}</div>
              <div className="flex items-center justify-between">
                <span className={`text-xs flex items-center ${market.change >= 0 ? 'text-energy-renewable' : 'text-destructive'}`}>
                  {market.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {market.change >= 0 ? '+' : ''}{market.change}%
                </span>
                <span className="text-xs text-muted-foreground">{market.volume}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Price Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceHistory}>
              <defs>
                <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--energy-renewable))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Area 
                type="monotone" 
                dataKey={selectedMarket} 
                stroke="hsl(var(--energy-renewable))" 
                fill="url(#carbonGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <Tabs defaultValue="positions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/50">
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="trades">Recent Trades</TabsTrigger>
            <TabsTrigger value="offsets">Offset Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="space-y-3 mt-4">
            {portfolio.positions.map((position, index) => (
              <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{position.market}</span>
                  <span className={`font-medium ${position.pnl >= 0 ? 'text-energy-renewable' : 'text-destructive'}`}>
                    {position.pnl >= 0 ? '+' : ''}${position.pnl.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Credits: </span>
                    <span className="text-foreground">{position.credits.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg: </span>
                    <span className="text-foreground">${position.avgPrice}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Current: </span>
                    <span className="text-foreground">${position.currentPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="trades" className="space-y-2 mt-4">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="p-3 rounded-lg bg-card/50 border border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={trade.type === 'BUY' ? 'bg-energy-renewable/20 text-energy-renewable' : 'bg-destructive/20 text-destructive'}>
                    {trade.type}
                  </Badge>
                  <div>
                    <span className="font-medium text-foreground">{trade.market}</span>
                    <span className="text-sm text-muted-foreground ml-2">{trade.credits.toLocaleString()} credits</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">${trade.price}</div>
                  <div className="text-xs text-muted-foreground">{trade.time}</div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="offsets" className="space-y-3 mt-4">
            {offsetProjects.map((project, index) => (
              <div key={index} className="p-3 rounded-lg bg-card/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{project.name}</span>
                  <Badge className={
                    project.rating === 'Gold' ? 'bg-yellow-500/20 text-yellow-500' :
                    project.rating === 'Silver' ? 'bg-gray-400/20 text-gray-400' :
                    'bg-muted text-muted-foreground'
                  }>
                    {project.rating}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{project.type}</span>
                  <span className="text-foreground">{project.credits.toLocaleString()} credits</span>
                  {project.verified && (
                    <Badge variant="outline" className="bg-energy-renewable/10 text-energy-renewable border-energy-renewable/30">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CarbonCreditTrading;
