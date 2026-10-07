export interface SectionBadgeProps {
  number: string;
  children: React.ReactNode;
}

export function SectionBadge({ number, children }: SectionBadgeProps) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0ebd8] text-[10px] font-bold text-[#5c4a1e]">
        {number}
      </span>
      <span className="text-[11px] font-bold tracking-widest text-[#746e63]">
        {children}
      </span>
    </div>
  );
}
