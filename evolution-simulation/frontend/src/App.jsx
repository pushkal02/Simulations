import { useMemo } from 'react'
import Layout from './components/layout/Layout'
import ControlPanel from './components/controls/ControlPanel'
import StatsGrid from './components/stats/StatsGrid'
import PopulationChart from './components/charts/PopulationChart'
import VariantChart from './components/charts/VariantChart'
import GeneticsChart from './components/charts/GeneticsChart'
import GeneticBars from './components/charts/GeneticBars'
import GeneticHeatmap from './components/charts/GeneticHeatmap'
import EventLog from './components/events/EventLog'
import StatsSkeleton from './components/common/StatsSkeleton'
import ChartSkeleton from './components/common/ChartSkeleton'
import { useSimulation } from './context/SimulationContext'
import usePolling from './hooks/usePolling'

function App() {
  const { isRunning, history, statistics, events, fetchStats } = useSimulation();

  // Poll for stats every 100ms when running
  usePolling(fetchStats, 100, isRunning);

  // Transform variant data for chart (memoized)
  const variantData = useMemo(() => {
    if (!statistics?.populationByVariant) return [];
    
    return Object.entries(statistics.populationByVariant)
      .map(([variantId, count]) => ({ variantId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [statistics?.populationByVariant]);

  const isLoading = !statistics && !isRunning;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Control Panel */}
        <ControlPanel />

        {/* Statistics Grid */}
        {isLoading ? <StatsSkeleton /> : <StatsGrid />}

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <PopulationChart data={history} />
              <VariantChart data={variantData} />
            </>
          )}
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <GeneticsChart data={history} />
              <GeneticBars genetics={statistics?.averageGenetics} />
            </>
          )}
        </div>

        {/* Advanced Visualizations */}
        {!isLoading && <GeneticHeatmap genetics={statistics?.averageGenetics} />}

        {/* Event Log */}
        <EventLog events={events} />
      </div>
    </Layout>
  )
}

export default App
