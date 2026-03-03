import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '@/contexts/DarkModeContext';

export const DarkModeToggle = ({ className = '' }) => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative p-2 rounded-xl transition-all duration-300 ${className} ${
        isDark
          ? 'bg-slate-700 hover:bg-slate-600 text-amber-300'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
      }`}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <div className="relative w-5 h-5">
        <Sun className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
        <Moon className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
      </div>
    </button>
  );
};
