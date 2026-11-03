export default function IconLink({ href, title, darkMode, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 rounded-lg transition-colors ${
        darkMode
          ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
      }`}
      title={title}
    >
      {children}
    </a>
  );
}
