function initialsFor(repo = '') {
  const words = repo.split(/[-_.\s]+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : repo.slice(0, 2)).toUpperCase();
}

export default function ProjectCover({ project }) {
  const color = project.languageColor || '#22d3ee';
  const initials = initialsFor(project.repo);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `radial-gradient(circle at 18% 18%, ${color}38 0%, transparent 55%), linear-gradient(135deg, #0f172a 0%, #020617 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="absolute -right-6 -bottom-12 text-[9rem] font-black leading-none tracking-tighter select-none"
        style={{ color, opacity: 0.09 }}
      >
        {initials}
      </div>

      <div className="relative h-full flex flex-col justify-end p-6">
        <h3 className="text-2xl font-black text-white leading-tight break-words">
          {project.repo}
        </h3>
        <div className="flex items-center gap-2 mt-3">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs font-semibold" style={{ color }}>
            {project.language || 'Code'}
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400">
            {project.stars} {project.stars === 1 ? 'star' : 'stars'}
          </span>
        </div>
      </div>
    </div>
  );
}
