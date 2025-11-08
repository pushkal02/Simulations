import { Gauge } from 'lucide-react';

function SpeedSlider({ value, onChange, min = 1, max = 100 }) {
  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Gauge size={16} />
          Simulation Speed
        </label>
        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
          {value} cycles/sec
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
      />
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Slow</span>
        <span>Fast</span>
      </div>
    </div>
  );
}

export default SpeedSlider;
