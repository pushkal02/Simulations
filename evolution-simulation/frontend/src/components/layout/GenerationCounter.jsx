function GenerationCounter({ generation }) {
  return (
    <div className="flex items-center gap-1 md:gap-2 bg-white/10 px-2 md:px-4 py-1 md:py-2 rounded-lg backdrop-blur-sm">
      <span className="text-xs md:text-sm font-medium opacity-80">Gen:</span>
      <span className="text-base md:text-xl font-bold tabular-nums">
        {generation.toLocaleString()}
      </span>
    </div>
  );
}

export default GenerationCounter;
