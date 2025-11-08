import { useCallback, useState } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import SpeedSlider from './SpeedSlider';
import ConfigModal from '../config/ConfigModal';
import { useSimulation } from '../../context/SimulationContext';

function ControlPanel() {
  const [showConfig, setShowConfig] = useState(false);
  const { isRunning, speed, start, pause, reset, updateSpeed } = useSimulation();

  const handleStart = useCallback(() => {
    start();
  }, [start]);

  const handlePause = useCallback(() => {
    pause();
  }, [pause]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleSpeedChange = useCallback((newSpeed) => {
    updateSpeed(newSpeed);
  }, [updateSpeed]);

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">Controls</h2>
          <button
            onClick={() => setShowConfig(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Configuration"
          >
            <Settings size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className="btn btn-primary flex items-center justify-center gap-2 flex-1 touch-manipulation"
            >
              <Play size={18} />
              <span>Start</span>
            </button>
            
            <button
              onClick={handlePause}
              disabled={!isRunning}
              className="btn btn-secondary flex items-center justify-center gap-2 flex-1 touch-manipulation"
            >
              <Pause size={18} />
              <span>Pause</span>
            </button>
            
            <button
              onClick={handleReset}
              className="btn btn-danger flex items-center justify-center gap-2 flex-1 touch-manipulation"
            >
              <RotateCcw size={18} />
              <span>Reset</span>
            </button>
          </div>

          {/* Speed Slider */}
          <SpeedSlider 
            value={speed} 
            onChange={handleSpeedChange}
          />
        </div>
      </div>

      <ConfigModal isOpen={showConfig} onClose={() => setShowConfig(false)} />
    </>
  );
}

export default ControlPanel;
