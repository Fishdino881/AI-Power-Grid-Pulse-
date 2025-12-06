import { useState, useEffect } from 'react';
import GridMap from '@/components/GridMap';
import EnergyMixChart from '@/components/EnergyMixChart';
import CarbonIntensity from '@/components/CarbonIntensity';
import GridStatus from '@/components/GridStatus';
import AlertsPanel from '@/components/AlertsPanel';
import StatsBar from '@/components/StatsBar';
import { ThemeToggle } from '@/components/ThemeToggle';
import Grid3DVisualization from '@/components/Grid3DVisualization';
import AdvancedAnalytics from '@/components/AdvancedAnalytics';
import PredictiveForecasting from '@/components/PredictiveForecasting';
import NotificationCenter from '@/components/NotificationCenter';
import GridPerformanceMetrics from '@/components/GridPerformanceMetrics';
import EnergyEconomics from '@/components/EnergyEconomics';
import EnvironmentalImpact from '@/components/EnvironmentalImpact';
import InfrastructureHealth from '@/components/InfrastructureHealth';
import DataExportPanel from '@/components/DataExportPanel';
import HistoricalComparison from '@/components/HistoricalComparison';
import AdvancedFilters from '@/components/AdvancedFilters';
import CollaborationPanel from '@/components/CollaborationPanel';
import AIInsightsChat from '@/components/AIInsightsChat';
import ScenarioSimulator from '@/components/ScenarioSimulator';
import MultiRegionComparison from '@/components/MultiRegionComparison';
import AnomalyAnalysis from '@/components/AnomalyAnalysis';
import PredictiveAlerts from '@/components/PredictiveAlerts';
import OptimizationRecommendations from '@/components/OptimizationRecommendations';
import EventStream from '@/components/EventStream';
import PerformanceBenchmarking from '@/components/PerformanceBenchmarking';
import PredictiveMaintenance from '@/components/PredictiveMaintenance';
import WeatherImpactAnalysis from '@/components/WeatherImpactAnalysis';
import GridResilienceScore from '@/components/GridResilienceScore';
import LoadForecastingDashboard from '@/components/LoadForecastingDashboard';
import PowerQualityMonitor from '@/components/PowerQualityMonitor';
import EnergyTradingDashboard from '@/components/EnergyTradingDashboard';
import RenewableForecasting from '@/components/RenewableForecasting';
import CapacityPlanningTool from '@/components/CapacityPlanningTool';
import CyberSecurityMonitor from '@/components/CyberSecurityMonitor';
import DERManagementSystem from '@/components/DERManagementSystem';
import VoltageStabilityAnalysis from '@/components/VoltageStabilityAnalysis';
import EnergyStorageOptimization from '@/components/EnergyStorageOptimization';
import DemandResponsePrograms from '@/components/DemandResponsePrograms';
import TransmissionCongestionAnalysis from '@/components/TransmissionCongestionAnalysis';
import GridDigitalTwin from '@/components/GridDigitalTwin';
import CarbonCreditTrading from '@/components/CarbonCreditTrading';
import OutageManagementSystem from '@/components/OutageManagementSystem';
import AssetLifecycleManagement from '@/components/AssetLifecycleManagement';
import FrequencyRegulationMonitor from '@/components/FrequencyRegulationMonitor';
import BlackStartCapability from '@/components/BlackStartCapability';
import RegulatoryComplianceDashboard from '@/components/RegulatoryComplianceDashboard';
import SmartMeterAnalytics from '@/components/SmartMeterAnalytics';
import NetworkTopologyAnalyzer from '@/components/NetworkTopologyAnalyzer';
import FaultLocationSystem from '@/components/FaultLocationSystem';
import LoadSheddingManager from '@/components/LoadSheddingManager';
import InterconnectionManagement from '@/components/InterconnectionManagement';
import UserMenu from '@/components/UserMenu';
import { 
  StatsBarSkeleton, 
  GridMapSkeleton, 
  ChartSkeleton, 
  StatusSkeleton 
} from '@/components/LoadingSkeleton';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate initial data loading
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-panel sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-energy-renewable bg-clip-text text-transparent">
                Global Power Grid Pulse
              </h1>
              <p className="text-sm text-muted-foreground">Real-time energy flow visualization</p>
            </div>
            <div className="flex items-center gap-4">
              <NotificationCenter />
              <ThemeToggle />
              <UserMenu />
              <div className="text-right">
                <div className="text-sm text-muted-foreground">System Time</div>
                <div className="text-lg font-mono text-foreground">
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Bar */}
        {isLoading ? <StatsBarSkeleton /> : <StatsBar />}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            {isLoading ? <GridMapSkeleton /> : <GridMap />}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {isLoading ? (
              <>
                <StatusSkeleton />
                <StatusSkeleton />
              </>
            ) : (
              <>
                <CarbonIntensity />
                <GridStatus />
              </>
            )}
          </div>
        </div>

        {/* 3D Visualization */}
        {isLoading ? <GridMapSkeleton /> : <Grid3DVisualization />}

        {/* Advanced Analytics */}
        {isLoading ? <ChartSkeleton /> : <AdvancedAnalytics />}

        {/* Predictive Forecasting */}
        {isLoading ? <ChartSkeleton /> : <PredictiveForecasting />}

        {/* New Advanced Visualizations */}
        {isLoading ? <ChartSkeleton /> : <GridPerformanceMetrics />}
        {isLoading ? <ChartSkeleton /> : <EnergyEconomics />}
        {isLoading ? <ChartSkeleton /> : <EnvironmentalImpact />}
        {isLoading ? <ChartSkeleton /> : <InfrastructureHealth />}

        {/* Advanced Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <DataExportPanel />
              <HistoricalComparison />
            </>
          )}
        </div>

        {isLoading ? <ChartSkeleton /> : <AdvancedFilters />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <CollaborationPanel />
              <AIInsightsChat />
            </>
          )}
        </div>

        {/* Advanced AI Features */}
        {isLoading ? <ChartSkeleton /> : <ScenarioSimulator />}
        {isLoading ? <ChartSkeleton /> : <MultiRegionComparison />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <AnomalyAnalysis />
              <PredictiveAlerts />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <OptimizationRecommendations />
              <EventStream />
            </>
          )}
        </div>

        {isLoading ? <ChartSkeleton /> : <PerformanceBenchmarking />}

        {/* Advanced Operations & Analytics */}
        {isLoading ? <ChartSkeleton /> : <PredictiveMaintenance />}
        {isLoading ? <ChartSkeleton /> : <WeatherImpactAnalysis />}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <GridResilienceScore />
              <LoadForecastingDashboard />
            </>
          )}
        </div>

        {isLoading ? <ChartSkeleton /> : <PowerQualityMonitor />}
        {isLoading ? <ChartSkeleton /> : <EnergyTradingDashboard />}
        {isLoading ? <ChartSkeleton /> : <RenewableForecasting />}
        {isLoading ? <ChartSkeleton /> : <CapacityPlanningTool />}

        {/* Critical Infrastructure Monitoring */}
        {isLoading ? <ChartSkeleton /> : <CyberSecurityMonitor />}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <DERManagementSystem />
              <VoltageStabilityAnalysis />
            </>
          )}
        </div>

        {isLoading ? <ChartSkeleton /> : <EnergyStorageOptimization />}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <DemandResponsePrograms />
              <TransmissionCongestionAnalysis />
            </>
          )}
        </div>

        {/* Grid Digital Twin & Carbon Trading */}
        {isLoading ? <ChartSkeleton /> : <GridDigitalTwin />}
        {isLoading ? <ChartSkeleton /> : <CarbonCreditTrading />}

        {/* Outage & Asset Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <OutageManagementSystem />
              <AssetLifecycleManagement />
            </>
          )}
        </div>

        {/* Frequency & Black Start */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <FrequencyRegulationMonitor />
              <BlackStartCapability />
            </>
          )}
        </div>

        {/* Regulatory & Smart Meters */}
        {isLoading ? <ChartSkeleton /> : <RegulatoryComplianceDashboard />}
        {isLoading ? <ChartSkeleton /> : <SmartMeterAnalytics />}

        {/* Network & Fault Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <NetworkTopologyAnalyzer />
              <FaultLocationSystem />
            </>
          )}
        </div>

        {/* Load Shedding & Interconnections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <LoadSheddingManager />
              <InterconnectionManagement />
            </>
          )}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <EnergyMixChart />
              <AlertsPanel />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
