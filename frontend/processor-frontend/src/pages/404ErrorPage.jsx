import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  RefreshCw, 
  Box, 
  Hexagon,
  Circle,
  Triangle
} from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute opacity-10 animate-float
              ${i % 3 === 0 ? 'text-purple-500' : i % 3 === 1 ? 'text-blue-500' : 'text-cyan-500'}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Hexagon size={30 + Math.random() * 40} />
            ) : i % 3 === 1 ? (
              <Circle size={20 + Math.random() * 30} />
            ) : (
              <Triangle size={25 + Math.random() * 35} />
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Glowing 404 text */}
        <div className="relative mb-8">
          <h1 className="text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse leading-none">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse" />
        </div>

        {/* Animated cube */}
        <div className="mb-8 flex justify-center">
          <div className="relative animate-spin-slow">
            <Box 
              size={80} 
              className="text-purple-400 animate-pulse" 
              strokeWidth={1.5}
            />
            <RefreshCw 
              size={40} 
              className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-reverse-spin" 
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
        Oops! We Lost This Page
        </h2>
        
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl mx-auto leading-relaxed">
        It seems you took a wrong turn. This page is as lost as your last sock in the laundry.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signin"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold transition-transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <Home className="mr-2" size={20} />
            Return Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-8 py-4 rounded-xl bg-white/10 text-white font-semibold backdrop-blur-sm transition-transform hover:scale-105 hover:bg-white/20"
          >
            <RefreshCw className="mr-2" size={20} />
            Go Back
          </button>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Add required CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes reverse-spin {
    from { transform: translate(-50%, -50%) rotate(360deg); }
    to { transform: translate(-50%, -50%) rotate(0deg); }
  }
  .animate-float {
    animation: float 5s ease-in-out infinite;
  }
  .animate-spin-slow {
    animation: spin-slow 10s linear infinite;
  }
  .animate-reverse-spin {
    animation: reverse-spin 8s linear infinite;
  }
`;
document.head.appendChild(style);

export default NotFoundPage;