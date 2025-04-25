import React from 'react';
import { Loader2 } from 'lucide-react';

interface AuthLoaderProps {
  fullscreen?: boolean;
}

const AuthLoader: React.FC<AuthLoaderProps> = ({ fullscreen = true }) => {
  const containerClasses = fullscreen
    ? 'fixed inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-50'
    : 'flex justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className="flex items-center justify-center min-h-full">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthLoader);