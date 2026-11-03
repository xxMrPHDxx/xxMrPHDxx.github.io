export default function ProjectFilterButton({ category, activeCategory, darkMode, onClick }) {
  const isActive = activeCategory === category;

  return (
    <button
      onClick={() => onClick(category)}
      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
        isActive
          ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
          : darkMode
            ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {category}
    </button>
  );
}
