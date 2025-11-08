import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function VariantChart({ data = [] }) {
  // Sample data for initial display
  const chartData = data.length > 0 ? data : [
    { variantId: 'No data', count: 0 }
  ];

  // Color palette for bars
  const colors = [
    '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', 
    '#ef4444', '#ec4899', '#6366f1', '#14b8a6',
    '#f97316', '#84cc16'
  ];

  return (
    <div className="card">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Top 10 Genetic Variants</h2>
      
      <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="variantId" 
            angle={-45}
            textAnchor="end"
            height={80}
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
            stroke="#6b7280"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Bar 
            dataKey="count" 
            radius={[8, 8, 0, 0]}
            animationDuration={500}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(VariantChart);
