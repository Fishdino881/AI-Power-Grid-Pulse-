import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, RotateCcw, Zap, AlertTriangle, TrendingUp, Dice6, Settings2, Save, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ScatterChart, Scatter, ZAxis, ReferenceLine } from 'recharts';
import { Progress } from '@/components/ui/progress';

interface SimulationResult {
  hour: string;
  demand: number;
  renewable: number;
  conventional: number;
  carbonIntensity: number;
  gridStress: number;
  price: number;
}

interface MonteCarloResult {
  iteration: number;
  peakDemand: number;
  minReserve: number;
  blackoutRisk: number;
  avgPrice: number;
}

const ScenarioSimulator = () => {
  const [scenario, setScenario] = useState('baseline');
  const [demandMultiplier, setDemandMultiplier] = useState([1]);
  const [renewablePercent, setRenewablePercent] = useState([40]);
  const [storageCapacity, setStorageCapacity] = useState([15]);
  const [temperatureOffset, setTemperatureOffset] = useState([0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [enableMonteCarlo, setEnableMonteCarlo] = useState(false);
  const [monteCarloIterations, setMonteCarloIterations] = useState([100]);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [monteCarloResults, setMonteCarloResults] = useState<MonteCarloResult[]>([]);
  const [riskMetrics, setRiskMetrics] = useState<any>(null);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const scenarios = {
    baseline: { name: 'Current Conditions', demandMod: 1, renewableMod: 1, riskLevel: 'low' },
    heatwave: { name: 'Extreme Heat (+30% AC load)', demandMod: 1.3, renewableMod: 0.95, riskLevel: 'high' },
    coldsnap: { name: 'Polar Vortex (+40% heating)', demandMod: 1.4, renewableMod: 0.7, riskLevel: 'critical' },
    plantOutage: { name: 'Major Plant Outage (-15% capacity)', demandMod: 1, renewableMod: 0.85, riskLevel: 'high' },
    renewableSurge: { name: 'High Renewable Output (+50%)', demandMod: 1, renewableMod: 1.5, riskLevel: 'low' },
    peakDemand: { name: 'Peak Demand Period', demandMod: 1.25, renewableMod: 1, riskLevel: 'medium' },
    gridAttack: { name: 'Cyber Attack Scenario', demandMod: 1.1, renewableMod: 0.6, riskLevel: 'critical' },
    solarEclipse: { name: 'Solar Eclipse Event', demandMod: 1, renewableMod: 0.4, riskLevel: 'medium' },
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimulationProgress(0);
    
    const scenarioConfig = scenarios[scenario as keyof typeof scenarios];
    const baseCapacity = 250;
    
    // Main simulation
    const simulatedData: SimulationResult[] = [];
    for (let i = 0; i < 24; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      setSimulationProgress(Math.round((i / 24) * 50));
      
      const hour = i;
      const timeOfDay = Math.sin((hour - 6) * Math.PI / 12);
      const baseDemand = 180 + timeOfDay * 60 + (temperatureOffset[0] * 2);
      const demand = baseDemand * demandMultiplier[0] * scenarioConfig.demandMod;
      
      const solarOutput = Math.max(0, timeOfDay * 50) * (renewablePercent[0] / 40) * scenarioConfig.renewableMod;
      const windOutput = (25 + Math.sin(hour / 4) * 15) * (renewablePercent[0] / 40) * scenarioConfig.renewableMod;
      const renewable = solarOutput + windOutput;
      
      const conventional = Math.max(0, demand - renewable - storageCapacity[0]);
      const gridStress = Math.min(100, (demand / baseCapacity) * 100);
      const price = 30 + (gridStress * 0.5) + Math.random() * 10;
      const carbonIntensity = 400 - (renewablePercent[0] * 3) + (conventional / demand) * 100;

      simulatedData.push({
        hour: `${hour}:00`,
        demand: Math.round(demand * 10) / 10,
        renewable: Math.round(renewable * 10) / 10,
        conventional: Math.round(conventional * 10) / 10,
        carbonIntensity: Math.round(carbonIntensity),
        gridStress: Math.round(gridStress * 10) / 10,
        price: Math.round(price * 100) / 100,
      });
    }

    setResults(simulatedData);

    // Monte Carlo simulation
    if (enableMonteCarlo) {
      const mcResults: MonteCarloResult[] = [];
      const iterations = monteCarloIterations[0];
      
      for (let iter = 0; iter < iterations; iter++) {
        if (iter % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 10));
          setSimulationProgress(50 + Math.round((iter / iterations) * 50));
        }
        
        const randomDemand = demandMultiplier[0] * (0.9 + Math.random() * 0.2);
        const randomRenewable = renewablePercent[0] * (0.7 + Math.random() * 0.6);
        const peakDemand = (180 + 60) * randomDemand * scenarioConfig.demandMod;
        const minReserve = 250 - peakDemand + randomRenewable;
        const blackoutRisk = minReserve < 0 ? Math.abs(minReserve) / peakDemand * 100 : 0;
        const avgPrice = 35 + (peakDemand / 250) * 20 + Math.random() * 15;
        
        mcResults.push({
          iteration: iter + 1,
          peakDemand: Math.round(peakDemand * 10) / 10,
          minReserve: Math.round(minReserve * 10) / 10,
          blackoutRisk: Math.round(blackoutRisk * 10) / 10,
          avgPrice: Math.round(avgPrice * 100) / 100,
        });
      }

      setMonteCarloResults(mcResults);

      // Calculate risk metrics
      const sortedBlackout = mcResults.map(r => r.blackoutRisk).sort((a, b) => a - b);
      const p95BlackoutRisk = sortedBlackout[Math.floor(iterations * 0.95)];
      const avgBlackoutRisk = mcResults.reduce((acc, r) => acc + r.blackoutRisk, 0) / iterations;
      const maxPeakDemand = Math.max(...mcResults.map(r => r.peakDemand));
      const minReserveWorst = Math.min(...mcResults.map(r => r.minReserve));
      const avgPrice = mcResults.reduce((acc, r) => acc + r.avgPrice, 0) / iterations;

      setRiskMetrics({
        p95BlackoutRisk,
        avgBlackoutRisk,
        maxPeakDemand,
        minReserveWorst,
        avgPrice,
        confidenceLevel: 95,
        iterations,
      });
    }

    setSimulationProgress(100);
    setIsSimulating(false);
  };

  const resetSimulation = () => {
    setScenario('baseline');
    setDemandMultiplier([1]);
    setRenewablePercent([40]);
    setStorageCapacity([15]);
    setTemperatureOffset([0]);
    setResults([]);
    setMonteCarloResults([]);
    setRiskMetrics(null);
    setSimulationProgress(0);
  };

  const currentScenario = scenarios[scenario as keyof typeof scenarios];

  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Advanced Scenario Simulator
          <Badge variant={
            currentScenario.riskLevel === 'low' ? 'secondary' :
            currentScenario.riskLevel === 'medium' ? 'outline' :
            currentScenario.riskLevel === 'high' ? 'default' : 'destructive'
          }>
            {currentScenario.riskLevel.toUpperCase()} RISK
          </Badge>
        </CardTitle>
        <CardDescription>
          Monte Carlo simulations, stress testing, and risk analysis for grid operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="config" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="results" disabled={results.length === 0}>Results</TabsTrigger>
            <TabsTrigger value="risk" disabled={!riskMetrics}>Risk Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Scenario Type</Label>
                <Select value={scenario} onValueChange={setScenario}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(scenarios).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {config.riskLevel === 'critical' && <AlertTriangle className="h-3 w-3 text-destructive" />}
                          {config.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Demand Multiplier: {demandMultiplier[0].toFixed(2)}x</Label>
                <Slider
                  value={demandMultiplier}
                  onValueChange={setDemandMultiplier}
                  min={0.5}
                  max={1.5}
                  step={0.05}
                />
              </div>

              <div className="space-y-2">
                <Label>Renewable Generation: {renewablePercent[0]}%</Label>
                <Slider
                  value={renewablePercent}
                  onValueChange={setRenewablePercent}
                  min={0}
                  max={100}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Storage Capacity: {storageCapacity[0]} GW</Label>
                <Slider
                  value={storageCapacity}
                  onValueChange={setStorageCapacity}
                  min={0}
                  max={50}
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Temperature Offset: {temperatureOffset[0] > 0 ? '+' : ''}{temperatureOffset[0]}°C</Label>
                <Slider
                  value={temperatureOffset}
                  onValueChange={setTemperatureOffset}
                  min={-20}
                  max={20}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Dice6 className="h-4 w-4" />
                    Monte Carlo Analysis
                  </Label>
                  <Switch checked={enableMonteCarlo} onCheckedChange={setEnableMonteCarlo} />
                </div>
                {enableMonteCarlo && (
                  <div className="pt-2">
                    <Label className="text-xs">Iterations: {monteCarloIterations[0]}</Label>
                    <Slider
                      value={monteCarloIterations}
                      onValueChange={setMonteCarloIterations}
                      min={50}
                      max={500}
                      step={50}
                    />
                  </div>
                )}
              </div>
            </div>

            {isSimulating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{enableMonteCarlo ? 'Running Monte Carlo simulation...' : 'Running simulation...'}</span>
                  <span>{simulationProgress}%</span>
                </div>
                <Progress value={simulationProgress} className="h-2" />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={runSimulation} disabled={isSimulating} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                {isSimulating ? 'Simulating...' : 'Run Simulation'}
              </Button>
              <Button onClick={resetSimulation} variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Save className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            {results.length > 0 && (
              <>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                      <XAxis dataKey="hour" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <ReferenceLine y={250} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label="Capacity Limit" />
                      <Area type="monotone" dataKey="renewable" stackId="1" stroke="hsl(var(--energy-renewable))" fill="hsl(var(--energy-renewable))" fillOpacity={0.6} name="Renewable (GW)" />
                      <Area type="monotone" dataKey="conventional" stackId="1" stroke="hsl(var(--energy-gas))" fill="hsl(var(--energy-gas))" fillOpacity={0.6} name="Conventional (GW)" />
                      <Line type="monotone" dataKey="demand" stroke="hsl(var(--primary))" strokeWidth={2} name="Demand (GW)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                      <XAxis dataKey="hour" className="text-xs" />
                      <YAxis yAxisId="left" className="text-xs" />
                      <YAxis yAxisId="right" orientation="right" className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="gridStress" stroke="hsl(var(--status-warning))" strokeWidth={2} name="Grid Stress (%)" />
                      <Line yAxisId="right" type="monotone" dataKey="price" stroke="hsl(var(--energy-nuclear))" strokeWidth={2} name="Price ($/MWh)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Peak Demand</p>
                    <p className="text-lg font-bold text-primary">{Math.max(...results.map(r => r.demand))} GW</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Max Grid Stress</p>
                    <p className={`text-lg font-bold ${Math.max(...results.map(r => r.gridStress)) > 90 ? 'text-destructive' : 'text-status-warning'}`}>
                      {Math.max(...results.map(r => r.gridStress))}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Avg Renewable</p>
                    <p className="text-lg font-bold text-energy-renewable">
                      {Math.round(results.reduce((acc, r) => acc + r.renewable, 0) / results.length)} GW
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Avg Price</p>
                    <p className="text-lg font-bold">
                      ${(results.reduce((acc, r) => acc + r.price, 0) / results.length).toFixed(2)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            {riskMetrics && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="glass-panel p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">P95 Blackout Risk</p>
                    <p className={`text-2xl font-bold ${riskMetrics.p95BlackoutRisk > 10 ? 'text-destructive' : riskMetrics.p95BlackoutRisk > 5 ? 'text-status-warning' : 'text-status-optimal'}`}>
                      {riskMetrics.p95BlackoutRisk.toFixed(1)}%
                    </p>
                    <p className="text-xs text-muted-foreground">{riskMetrics.confidenceLevel}% confidence</p>
                  </div>
                  <div className="glass-panel p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Worst-Case Reserve</p>
                    <p className={`text-2xl font-bold ${riskMetrics.minReserveWorst < 0 ? 'text-destructive' : 'text-status-optimal'}`}>
                      {riskMetrics.minReserveWorst.toFixed(1)} GW
                    </p>
                    <p className="text-xs text-muted-foreground">Minimum margin</p>
                  </div>
                  <div className="glass-panel p-4 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Max Peak Demand</p>
                    <p className="text-2xl font-bold text-primary">{riskMetrics.maxPeakDemand.toFixed(1)} GW</p>
                    <p className="text-xs text-muted-foreground">Across {riskMetrics.iterations} simulations</p>
                  </div>
                </div>

                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                      <XAxis dataKey="peakDemand" name="Peak Demand" unit=" GW" className="text-xs" />
                      <YAxis dataKey="blackoutRisk" name="Blackout Risk" unit="%" className="text-xs" />
                      <ZAxis dataKey="avgPrice" range={[20, 200]} name="Price" unit="$" />
                      <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Scatter name="Simulations" data={monteCarloResults} fill="hsl(var(--primary))" fillOpacity={0.6} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Risk Assessment</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {riskMetrics.iterations} Monte Carlo simulations, there is a {riskMetrics.p95BlackoutRisk.toFixed(1)}% probability 
                    of grid stress exceeding safe limits under current conditions. 
                    {riskMetrics.p95BlackoutRisk > 10 
                      ? ' Recommend increasing reserve capacity or curtailing non-essential load.'
                      : riskMetrics.p95BlackoutRisk > 5
                      ? ' Monitor conditions closely and prepare contingency plans.'
                      : ' Current capacity margins are adequate for this scenario.'}
                  </p>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ScenarioSimulator;