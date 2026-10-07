import { HeroIllustration } from './HeroIllustration';

interface HeroSectionProps {
  onStartQuiz: () => void;
}

export function HeroSection({ onStartQuiz }: HeroSectionProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-6 pb-12 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        {/* Left Copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e7e2d7] bg-white px-3.5 py-1.5 text-xs font-semibold shadow-sm mb-5">
            <span className="h-2 w-2 rounded-full bg-[#7350b5]" />
            <span className="text-[#746e63]">Ruang Belajar Interaktif · 38 Provinsi · BPS 2025</span>
          </div>

          <h1 className="font-display text-[32px] font-extrabold tracking-[-1px] sm:text-[44px] lg:text-[48px] leading-[1.15] text-[#23201d]">
            Beda tempat.{' '}
            <span className="relative inline-block text-[#7350b5]">
              Beda kesempatan.
              <svg viewBox="0 0 350 12" className="absolute -bottom-1.5 left-0 w-full" aria-hidden="true">
                <path d="M2 8Q170-2 348 6" fill="none" stroke="#daca86" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#746e63] max-w-lg">
            Mimpi setiap anak Indonesia sama besarnya. Namun dalam akses pendidikan, garis awal tidak selalu sama. Mari bedah data ketimpangan dan jadilah bagian dari perubahan.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#explore"
              className="flex items-center gap-2 rounded-xl bg-[#7350b5] px-6 py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#583794]"
            >
              <span>Jelajahi Peta</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-currentColor stroke-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <button
              onClick={onStartQuiz}
              className="flex items-center gap-2 rounded-xl border border-[#e7e2d7] bg-[#faecc2] px-6 py-3.5 text-xs font-bold text-[#6d5a1b] shadow-sm transition hover:bg-[#f5e3ad]"
            >
              <span>Mulai Kuis</span>
              <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px]">15 Soal</span>
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="rounded-[26px] border border-[#e7e2d7] bg-white p-4 sm:p-6 shadow-sm">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
