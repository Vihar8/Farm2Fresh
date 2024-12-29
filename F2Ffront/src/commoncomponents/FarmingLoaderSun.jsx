import React, { useState, useEffect } from 'react';
import { Sprout, Leaf, Cloud, Sun } from 'lucide-react';

const FarmingLoaderSun = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const growthTexts = ["Seeding", "Growing", "Nurturing", "Blooming"];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Background environment */}
      <div className="relative w-48 h-48">
        {/* Animated sun */}
        <div className="absolute -right-4 top-0">
          <Sun className="w-8 h-8 text-yellow-400 animate-pulse" />
        </div>
        
        {/* Animated clouds */}
        <div className="absolute -left-6 top-0">
          <Cloud className="w-6 h-6 text-gray-300 animate-bounce" 
                style={{ animationDuration: '3s' }} />
        </div>

        {/* Main loader rings */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Outer rotating petals */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full origin-center animate-spin-slow"
              style={{ 
                transform: `rotate(${i * 45}deg)`,
                animationDirection: i % 2 ? 'reverse' : 'normal',
                animationDuration: '8s'
              }}
            >
              <Leaf 
                className="w-6 h-6 text-green-400 absolute -top-3 left-1/2 transform -translate-x-1/2"
                style={{ opacity: 0.6 + (i % 3) * 0.2 }}
              />
            </div>
          ))}

          {/* Middle rotating circle */}
          <div className="absolute inset-4">
            <div className="w-full h-full border-4 border-green-100 rounded-full animate-spin">
              <div className="w-full h-full border-4 border-green-400 rounded-full"
                   style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
            </div>
          </div>

          {/* Inner growing sprout */}
          <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-inner">
            <Sprout 
              className={`w-10 h-10 transition-all duration-1000 ease-in-out transform
                         ${phase === 0 ? 'text-green-300 scale-75' : 
                           phase === 1 ? 'text-green-400 scale-90' : 
                           phase === 2 ? 'text-green-500 scale-100' : 
                           'text-green-600 scale-110'}`}
            />
          </div>
        </div>
      </div>

      {/* Animated text section */}
      <div className="mt-8">
        <div className="relative px-6 py-3">
          <div className="relative flex items-center justify-center space-x-2">
            <span className="text-lg font-medium bg-gradient-to-r from-green-600 to-green-400 
                           bg-clip-text text-transparent transition-all duration-500">
              {growthTexts[phase]}
            </span>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    backgroundColor: `rgb(${34 + phase * 20}, ${197 - phase * 15}, ${94})`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Decorative bottom line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                        from-transparent via-green-400 to-transparent opacity-50" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FarmingLoaderSun;