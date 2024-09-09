import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 blur-3xl"></div>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 300 + 50}px`,
            height: `${Math.random() * 300 + 50}px`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 20 + 10}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default AnimatedBackground;