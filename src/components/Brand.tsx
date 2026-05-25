import whiskMark from "@/assets/whisk-mark.png";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={whiskMark}
        alt="Grand Coffee — fuê"
        width={40}
        height={40}
        className="h-9 w-9 object-contain"
      />
      <div className="flex flex-col leading-none">
        <span className="font-display text-base italic text-primary">Grand</span>
        <span className="font-display text-lg font-semibold text-primary -mt-0.5">Coffee</span>
      </div>
    </div>
  );
}
