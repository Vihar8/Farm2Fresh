import React from 'react';

const ElegantProduceLoader = () => {
  const [progress, setProgress] = React.useState(0);
  
  const produce = ["🥑", "🥦", "🍎", "🥕"];
  const [activeEmoji, setActiveEmoji] = React.useState(0);
  
  React.useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) return 0;
        return newProgress;
      });
    }, 50);

    const emojiInterval = setInterval(() => {
      setActiveEmoji(prev => (prev + 1) % produce.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(emojiInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg min-h-[300px]">
      {/* Main circle */}
      <div className="relative w-40 h-40">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            className="fill-none stroke-gray-100"
            strokeWidth="8"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            className="fill-none stroke-green-500"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 70}`}
            strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
            style={{
              transition: 'stroke-dashoffset 0.1s ease'
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className="text-4xl mb-1 transition-all duration-500"
            style={{
              transform: `scale(${progress % 20 < 10 ? 1.1 : 1})`,
            }}
          >
            {produce[activeEmoji]}
          </div>
          <div className="text-xl font-semibold text-gray-700">
            {progress}%
          </div>
        </div>
      </div>

      {/* Loading dots */}
      <div className="flex space-x-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ElegantProduceLoader;