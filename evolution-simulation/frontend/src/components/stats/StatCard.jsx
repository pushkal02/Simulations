import { memo } from 'react';

function StatCard({ label, value, color = 'primary', icon }) {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const iconColorClasses = {
    primary: 'text-primary-600',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  };

  return (
    <div className={`card border-2 ${colorClasses[color]} transition-all duration-200 hover:shadow-xl`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80 mb-1">{label}</p>
          <p className="text-3xl font-bold tabular-nums">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        {icon && (
          <div className={`${iconColorClasses[color]} opacity-60`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(StatCard);
