import StatusIndicator from './StatusIndicator';
import GenerationCounter from './GenerationCounter';
import ThemeToggle from './ThemeToggle';
import { useSimulation } from '../../context/SimulationContext';

function Header() {
  const { isRunning, statistics } = useSimulation();
  const generation = statistics?.generation || 0;

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-2xl md:text-3xl">🧬</span>
            <h1 className="text-lg md:text-2xl font-bold">Evolution Simulation</h1>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <GenerationCounter generation={generation} />
            <StatusIndicator isRunning={isRunning} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
