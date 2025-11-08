import { memo } from 'react';

function ProgressBar({ label, value, color = 'primary', max = 1 }) {
  const percentage = (value / max) * 100;

  const colorClasses = {
    primary: 'bg-purple-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    pink: 'bg-pink-500',
  };

  const bgColorClasses = {
    primary: 'bg-purple-100',
    success: 'bg-green-100',
    danger: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100',
    pink: 'bg-pink-100',
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900 tabular-nums">
          {value.toFixed(3)}
        </span>
      </div>
      
      <div className={`w-full h-3 ${bgColorClasses[color]} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default memo(ProgressBar);
