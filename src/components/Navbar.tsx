interface NavbarProps {
  onStartQuiz: () => void;
}

export function Navbar({ onStartQuiz }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e7e2d7] bg-[#f9f6ee]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 sm:px-6 py-3.5 lg:px-10">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7350b5] text-white shadow-sm font-black text-sm">
            ∑
          </div>
          <div>
            <span className="font-display text-sm font-extrabold text-[#23201d] block">
              PSAJ MATEMATIKA
            </span>
            <span className="text-[10px] font-semibold text-[#746e63] block -mt-0.5">
              Eksplorasi RLS Indonesia
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[#746e63]">
          <a href="#explore" className="transition hover:text-[#7350b5]">
            Jelajahi Peta
          </a>
          <a href="#playground" className="transition hover:text-[#7350b5]">
            Simulasi & Komparasi
          </a>
          <a href="#numbers" className="transition hover:text-[#7350b5]">
            Di Balik Angka
          </a>
          <a href="#leaderboard" className="transition hover:text-[#7350b5]">
            Papan Skor
          </a>
        </nav>

        {/* CTA Button */}
        <button
          onClick={onStartQuiz}
          className="flex items-center gap-2 rounded-xl bg-[#faecc2] px-4 py-2 text-xs font-bold text-[#6d5a1b] shadow-sm transition hover:bg-[#f5e3ad]"
        >
          <span>Mulai Kuis</span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-currentColor stroke-2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
