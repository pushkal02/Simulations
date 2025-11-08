import { useEffect, useRef } from 'react';

/**
 * Custom hook for polling data at regular intervals
 * @param {Function} callback - Function to call on each interval
 * @param {number} interval - Interval in milliseconds
 * @param {boolean} enabled - Whether polling is enabled
 */
function usePolling(callback, interval, enabled = true) {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (!enabled) return;

    function tick() {
      savedCallback.current();
    }

    // Call immediately
    tick();

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval, enabled]);
}

export default usePolling;
