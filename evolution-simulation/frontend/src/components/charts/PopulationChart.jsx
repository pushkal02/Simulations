import { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PopulationChart({ data = [] }) {
  // Sample data for initial display
  const chartData = data.length > 0 ? data : [
    { generation: 0, population: 0, variants: 0 }
  ];

  return (
    <div className="card">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Population Over Time</h2>
      
      <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="generation" 
            label={{ value: 'Generation', position: 'insideBottom', offset: -5 }}
            stroke="#6b7280"
          />
          <YAxis 
            yAxisId="left"
            label={{ value: 'Population', angle: -90, position: 'insideLeft' }}
            stroke="#8b5cf6"
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            label={{ value: 'Variants', angle: 90, position: 'insideRight' }}
            stroke="#3b82f6"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="population" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            dot={false}
            name="Population"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="variants" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
            name="Variants"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(PopulationChart);
