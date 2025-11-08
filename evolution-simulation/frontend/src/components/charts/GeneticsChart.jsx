import { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function GeneticsChart({ data = [] }) {
  // Sample data for initial display
  const chartData = data.length > 0 ? data : [
    { 
      generation: 0, 
      replicationRate: 0,
      attractiveness: 0,
      strength: 0,
      mutationChance: 0,
      intelligence: 0,
      resourceEfficiency: 0
    }
  ];

  const traits = [
    { key: 'replicationRate', name: 'Replication Rate', color: '#8b5cf6' },
    { key: 'attractiveness', name: 'Attractiveness', color: '#ec4899' },
    { key: 'strength', name: 'Strength', color: '#ef4444' },
    { key: 'mutationChance', name: 'Mutation Chance', color: '#f59e0b' },
    { key: 'intelligence', name: 'Intelligence', color: '#3b82f6' },
    { key: 'resourceEfficiency', name: 'Resource Efficiency', color: '#10b981' },
  ];

  return (
    <div className="card">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Genetic Traits Over Time</h2>
      
      <ResponsiveContainer width="100%" height={300} className="md:h-[350px]">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="generation" 
            label={{ value: 'Generation', position: 'insideBottom', offset: -5 }}
            stroke="#6b7280"
          />
          <YAxis 
            label={{ value: 'Average Value', angle: -90, position: 'insideLeft' }}
            stroke="#6b7280"
            domain={[0, 1]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
            formatter={(value) => value.toFixed(3)}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '10px' }}
            iconType="line"
          />
          {traits.map(trait => (
            <Line
              key={trait.key}
              type="monotone"
              dataKey={trait.key}
              stroke={trait.color}
              strokeWidth={2}
              dot={false}
              name={trait.name}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(GeneticsChart);
