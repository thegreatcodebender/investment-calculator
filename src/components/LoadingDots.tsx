const LoadingDots = () => {
  return (
    <div className="flex justify-center items-center h-full space-x-2">
      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse delay-75"></div>
      <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse delay-150"></div>
    </div>
  );
};

export default LoadingDots;
