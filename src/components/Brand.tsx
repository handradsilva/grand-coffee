export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="18" />
        {/* Whisk handle */}
        <path d="M26 9 L20 17" />
        {/* Whisk bulb outline */}
        <ellipse cx="17" cy="24" rx="6.5" ry="9" transform="rotate(-30 17 24)" />
        {/* Whisk wires */}
        <path d="M22.5 18.5 Q19 22 14.5 30" />
        <path d="M24 20.5 Q21 24 18 31" />
        <path d="M20.5 17.5 Q16 21 11.5 27" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-base italic text-primary">Grand</span>
        <span className="font-display text-lg font-semibold text-primary -mt-0.5">Coffee</span>
      </div>
    </div>
  );
}
