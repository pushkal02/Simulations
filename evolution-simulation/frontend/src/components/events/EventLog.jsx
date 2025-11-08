import { useEffect, useRef } from 'react';
import EventItem from './EventItem';

function EventLog({ events = [], maxEvents = 50 }) {
  const logEndRef = useRef(null);

  // Auto-scroll to latest event
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [events]);

  const displayEvents = events.slice(-maxEvents);

  return (
    <div className="card">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Event Log</h2>
      
      <div className="h-48 md:h-64 overflow-y-auto space-y-2 pr-2">
        {displayEvents.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>No events yet. Start the simulation to see activity.</p>
          </div>
        ) : (
          <>
            {displayEvents.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
            <div ref={logEndRef} />
          </>
        )}
      </div>
    </div>
  );
}

export default EventLog;
