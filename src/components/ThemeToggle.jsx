import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ darkMode, onToggle, mobile = false }) {
  return (
    <button
      onClick={onToggle}
      className={`${mobile ? '' : 'transition-colors '}p-2 rounded-lg ${
        darkMode
          ? `${mobile ? 'bg-slate-900' : 'bg-slate-900 hover:bg-slate-800'} text-amber-400`
          : `${mobile ? 'bg-slate-100' : 'bg-slate-100 hover:bg-slate-200'} text-indigo-600`
      }`}
      aria-label="Toggle Theme"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
