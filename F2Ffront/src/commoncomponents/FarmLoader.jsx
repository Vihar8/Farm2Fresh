import React from 'react';
import { Sprout } from 'lucide-react';

const FarmLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      {/* Main loader container */}
      <div className="relative">
        {/* Rotating circle */}
        <div className="w-20 h-20 border-4 border-green-200 rounded-full animate-spin border-t-green-600" />
        
        {/* Centered sprout icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Sprout className="w-8 h-8 text-green-600 animate-pulse" />
        </div>
      </div>

      {/* Loading text */}
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Simple progress bar */}
      <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 rounded-full animate-progress origin-left" />
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(0.9); }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
          transform-origin: left;
        }
      `}</style>
    </div>
  );
};

export default FarmLoader;