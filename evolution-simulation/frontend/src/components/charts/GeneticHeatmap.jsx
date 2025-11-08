import { memo } from 'react';

function GeneticHeatmap({ genetics }) {
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
    { key: 'replicationRate', label: 'Replication' },
    { key: 'attractiveness', label: 'Attractive' },
    { key: 'strength', label: 'Strength' },
    { key: 'mutationChance', label: 'Mutation' },
    { key: 'intelligence', label: 'Intelligence' },
    { key: 'resourceEfficiency', label: 'Efficiency' },
  ];

  const getColor = (value) => {
    const intensity = Math.round(value * 255);
    return `rgb(${255 - intensity}, ${100 + intensity / 2}, ${intensity})`;
  };

  return (
    <div className="card">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Genetic Properties Heatmap
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {traits.map(trait => (
          <div
            key={trait.key}
            className="relative overflow-hidden rounded-lg h-24 flex items-center justify-center transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: getColor(data[trait.key]) }}
          >
            <div className="text-center z-10">
              <p className="text-white font-bold text-sm drop-shadow-lg">
                {trait.label}
              </p>
              <p className="text-white text-2xl font-bold drop-shadow-lg">
                {(data[trait.key] * 100).toFixed(0)}%
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(GeneticHeatmap);
