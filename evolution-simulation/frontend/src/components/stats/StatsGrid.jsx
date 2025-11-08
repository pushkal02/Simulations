import { memo } from 'react';
import StatCard from './StatCard';
import { Users, GitBranch, TrendingUp, TrendingDown, Coins, Clock } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

function StatsGrid() {
  const { statistics } = useSimulation();
  
  const stats = {
    totalPopulation: statistics?.totalPopulation || 0,
    uniqueVariants: statistics?.uniqueVariants || 0,
    births: statistics?.birthsThisGeneration || 0,
    deaths: statistics?.deathsThisGeneration || 0,
    avgResources: statistics?.averageResources || 0,
    avgAge: statistics?.averageAge || 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        label="Total Population"
        value={stats.totalPopulation}
        color="primary"
        icon={<Users size={32} />}
      />
      
      <StatCard
        label="Unique Variants"
        value={stats.uniqueVariants}
        color="info"
        icon={<GitBranch size={32} />}
      />
      
      <StatCard
        label="Births This Generation"
        value={stats.births}
        color="success"
        icon={<TrendingUp size={32} />}
      />
      
      <StatCard
        label="Deaths This Generation"
        value={stats.deaths}
        color="danger"
        icon={<TrendingDown size={32} />}
      />
      
      <StatCard
        label="Average Resources"
        value={stats.avgResources.toFixed(1)}
        color="warning"
        icon={<Coins size={32} />}
      />
      
      <StatCard
        label="Average Age"
        value={stats.avgAge.toFixed(1)}
        color="info"
        icon={<Clock size={32} />}
      />
    </div>
  );
}

export default memo(StatsGrid);
