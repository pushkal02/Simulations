import { useState } from 'react';
import { X, Settings } from 'lucide-react';

function ConfigModal({ isOpen, onClose }) {
  const [config, setConfig] = useState({
    initialPopulation: 100,
    resourcesPerGeneration: 1000,
    maxAge: 100,
    mutationRate: 0.1,
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Config submitted:', config);
    // TODO: Send to API
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="card max-w-md w-full animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Settings size={24} />
            Simulation Configuration
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Initial Population
            </label>
            <input
              type="number"
              value={config.initialPopulation}
              onChange={(e) => handleChange('initialPopulation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              min="10"
              max="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Resources Per Generation
            </label>
            <input
              type="number"
              value={config.resourcesPerGeneration}
              onChange={(e) => handleChange('resourcesPerGeneration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              min="100"
              max="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Max Age
            </label>
            <input
              type="number"
              value={config.maxAge}
              onChange={(e) => handleChange('maxAge', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              min="10"
              max="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mutation Rate
            </label>
            <input
              type="number"
              step="0.01"
              value={config.mutationRate}
              onChange={(e) => handleChange('mutationRate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              min="0"
              max="1"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfigModal;
