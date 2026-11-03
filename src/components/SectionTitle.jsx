export default function SectionTitle({ eyebrow, title, className = 'mb-16' }) {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
        {eyebrow}
      </h2>
      <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        {title}
      </p>
    </div>
  );
}
