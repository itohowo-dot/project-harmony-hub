const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-muted rounded-full border-t-primary animate-spin" />
    </div>
  </div>
);

export default LoadingFallback;
