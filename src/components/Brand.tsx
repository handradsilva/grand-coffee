export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="18" />
        <path d="M14 12 L14 22 Q14 26 18 26 L22 26 Q26 26 26 22 L26 12" strokeLinecap="round" />
        <path d="M26 14 Q30 14 30 18 Q30 22 26 22" strokeLinecap="round" />
        <path d="M16 30 L24 30" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-base italic text-primary">Grand</span>
        <span className="font-display text-lg font-semibold text-primary -mt-0.5">Coffee</span>
      </div>
    </div>
  );
}
