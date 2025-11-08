import { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [statistics, setStatistics] = useState(null);
  const [history, setHistory] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const addEvent = useCallback((message, type = 'info') => {
    const event = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      message,
      type,
    };
    setEvents(prev => [...prev, event]);
  }, []);

  const start = useCallback(async () => {
    try {
      setError(null);
      const result = await api.start();
      if (result.success) {
        setIsRunning(true);
        addEvent('Simulation started', 'success');
      }
    } catch (err) {
      setError('Failed to start simulation');
      addEvent('Failed to start simulation', 'error');
      console.error(err);
    }
  }, [addEvent]);

  const pause = useCallback(async () => {
    try {
      setError(null);
      const result = await api.pause();
      if (result.success) {
        setIsRunning(false);
        addEvent('Simulation paused', 'info');
      }
    } catch (err) {
      setError('Failed to pause simulation');
      addEvent('Failed to pause simulation', 'error');
      console.error(err);
    }
  }, [addEvent]);

  const reset = useCallback(async () => {
    try {
      setError(null);
      const result = await api.reset();
      if (result.success) {
        setIsRunning(false);
        setStatistics(null);
        setHistory([]);
        setEvents([]);
        addEvent('Simulation reset', 'warning');
      }
    } catch (err) {
      setError('Failed to reset simulation');
      addEvent('Failed to reset simulation', 'error');
      console.error(err);
    }
  }, [addEvent]);

  const updateSpeed = useCallback(async (newSpeed) => {
    try {
      setError(null);
      const result = await api.setSpeed(newSpeed);
      if (result.success) {
        setSpeed(newSpeed);
      }
    } catch (err) {
      setError('Failed to update speed');
      console.error(err);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const stats = await api.getStats();
      setStatistics(stats);
      
      // Add to history (keep last 100 points)
      setHistory(prev => {
        const newHistory = [...prev, {
          generation: stats.generation,
          population: stats.totalPopulation,
          variants: stats.uniqueVariants,
          births: stats.birthsThisGeneration,
          deaths: stats.deathsThisGeneration,
          ...stats.averageGenetics,
        }];
        return newHistory.slice(-100);
      });
    } catch (err) {
      // Don't set error for polling failures to avoid spam
      console.error('Failed to fetch stats:', err);
    }
  }, []);

  const value = {
    isRunning,
    speed,
    statistics,
    history,
    events,
    error,
    start,
    pause,
    reset,
    updateSpeed,
    fetchStats,
    addEvent,
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
}
