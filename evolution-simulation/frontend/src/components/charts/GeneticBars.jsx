import { memo } from 'react';
import ProgressBar from './ProgressBar';

function GeneticBars({ genetics }) {
  // Default values if no genetics provided
  const defaultGenetics = {
    replicationRate: 0,
    attractiveness: 0,
    strength: 0,
    mutationChance: 0,
    intelligence: 0,
    resourceEfficiency: 0,
  };

  const data = genetics || defaultGenetics;

  const traits = [
    { key: 'replicationRate', label: 'Replication Rate', color: 'primary' },
    { key: 'attractiveness', label: 'Attractiveness', color: 'pink' },
    { key: 'strength', label: 'Strength', color: 'danger' },
    { key: 'mutationChance', label: 'Mutation Chance', color: 'warning' },
    { key: 'intelligence', label: 'Intelligence', color: 'info' },
    { key: 'resourceEfficiency', label: 'Resource Efficiency', color: 'success' },
  ];

  return (
    <div className="card">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Average Genetic Properties</h2>
      
      <div className="space-y-4">
        {traits.map(trait => (
          <ProgressBar
            key={trait.key}
            label={trait.label}
            value={data[trait.key]}
            color={trait.color}
            max={1}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(GeneticBars);
