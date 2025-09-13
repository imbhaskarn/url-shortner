import React from 'react';
import { Building2, Users, BarChart3, Clock, Database } from 'lucide-react';

const OrgProLoader = ({ message = "Loading ..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  from-slate-50 to-blue-50">
      {/* Logo Section */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold ">
            OrgPro<span className="text-blue-600">CRM</span>
          </h1>
        </div>
        <p className="text-sm text-gray-500 font-medium"></p>
      </div>

      {/* Main Loader Container */}
      <div className="relative w-40 h-40">
        {/* Outer Ring - Enterprise Grade */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 opacity-20"></div>
        </div>

        {/* Middle Ring - Business Intelligence */}
        <div className="absolute inset-4 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-blue-500 border-b-blue-500 opacity-30"></div>
        </div>

        {/* Inner Circle - Data Processing */}
        <div className="absolute inset-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 opacity-10 animate-pulse"></div>
        </div>

        {/* Rotating Icons */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '8s' }}>
          {[
            { Icon: Users, position: 'top' },
            { Icon: BarChart3, position: 'right' },
            { Icon: Database, position: 'bottom' },
            { Icon: Clock, position: 'left' }
          ].map(({ Icon, position }, index) => (
            <div
              key={index}
              className={`absolute ${
                position === 'top' ? '-top-2 left-1/2 -translate-x-1/2' :
                position === 'right' ? 'top-1/2 -right-2 -translate-y-1/2' :
                position === 'bottom' ? '-bottom-2 left-1/2 -translate-x-1/2' :
                'top-1/2 -left-2 -translate-y-1/2'
              } transform`}
            >
              <Icon className="w-4 h-4 text-blue-600" />
            </div>
          ))}
        </div>

        {/* Central Spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
          </div>
        </div>

        {/* Processing Dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-600 mx-0.5"
              style={{
                animation: `processingDot 1.5s infinite ${i * 0.2}s`,
                opacity: 0.3
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Message */}
      <div className="mt-8 text-center">
        <div className="relative">
          <p className="text-gray-700 font-medium tracking-wide">
            {message}
          </p>
          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-blue-600"
                style={{
                  animation: `loadingDot 1.4s infinite ${i * 0.2}s`,
                  opacity: 0.6
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      <div className="mt-6 text-sm text-gray-500">
        <p className="animate-pulse">Preparing your workspace...</p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes processingDot {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.7;
          }
        }

        @keyframes loadingDot {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OrgProLoader;