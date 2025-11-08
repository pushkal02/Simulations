function EventItem({ event }) {
  const typeColors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const typeIcons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className={`p-3 rounded-lg border ${typeColors[event.type]} transition-all duration-200`}>
      <div className="flex items-start gap-2">
        <span className="text-lg">{typeIcons[event.type]}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium break-words">{event.message}</p>
          <p className="text-xs opacity-60 mt-1">{formatTime(event.timestamp)}</p>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
