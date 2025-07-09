import { useEffect, useState } from "react";

export const DashboardHeader = () => {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/12c45d4f-f569-4ac0-91d7-9f080c31676c.png" 
              alt="Good Brother Kitchens Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Good Brother Kitchens
              </h1>
              <p className="text-muted-foreground">AI Dashboard</p>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="flex items-center space-x-6">
            {/* Live Status */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">
                Live Updates
              </span>
            </div>

            {/* Last Refresh */}
            <div className="text-sm text-muted-foreground">
              Last refresh: {formatTime(lastRefresh)}
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="Refresh Dashboard"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Layout - Only visible on mobile */}
        <div className="md:hidden">
          {/* Company Logo - Centered */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/12c45d4f-f569-4ac0-91d7-9f080c31676c.png" 
              alt="Good Brother Kitchens Logo" 
              className="h-16 w-auto"
            />
          </div>

          {/* Status Row */}
          <div className="flex items-center justify-between">
            {/* Live Status */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-foreground">
                Live Updates
              </span>
            </div>

            {/* Last Refresh */}
            <div className="text-sm text-muted-foreground">
              Last refresh: {formatTime(lastRefresh)}
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="Refresh Dashboard"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};