function StatusIndicator({ isRunning }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div 
          className={`w-3 h-3 rounded-full ${
            isRunning ? 'bg-green-400' : 'bg-gray-400'
          }`}
        />
        {isRunning && (
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping" />
        )}
      </div>
      <span className="text-sm font-medium">
        {isRunning ? 'Running' : 'Paused'}
      </span>
    </div>
  );
}

export default StatusIndicator;
