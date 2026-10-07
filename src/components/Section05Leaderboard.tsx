import { useState, useEffect } from 'react';
import { SectionBadge } from './SectionBadge';

export interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}

interface LeaderboardProps {
  onStartQuiz: () => void;
}

export function Section05Leaderboard({ onStartQuiz }: LeaderboardProps) {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sekolah-scores-15');
      if (saved) {
        setScores(JSON.parse(saved));
      }
    } catch {
      // LocalStorage error fallback
    }
  }, []);

  return (
    <section id="leaderboard" className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 lg:px-10">
      <div className="overflow-hidden rounded-[24px] border border-[#e7dfb9] bg-[#f8f3de] p-6 sm:p-10 shadow-sm">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] items-center">
          {/* Left Hero Box */}
          <div>
            <SectionBadge number="05">PAPAN SKOR EKSPLORER</SectionBadge>
            <h2 className="font-display text-[26px] font-extrabold sm:text-[30px] text-[#23201d]">
              Papan Peringkat <br />
              Penjelajah Data
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-[#746e63]">
              Tempat berkumpulnya para penjelajah data yang peduli dengan masa depan pendidikan Indonesia. Selesaikan kuis dan ukir namamu di sini!
            </p>

            <button
              onClick={onStartQuiz}
              className="mt-6 flex items-center gap-2 rounded-xl bg-[#7350b5] px-6 py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#583794]"
            >
              <span>Mainkan Kuis Sekarang</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-currentColor stroke-2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Leaderboard Table */}
          <div className="rounded-2xl border border-[#e2d8ab] bg-white p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-3 mb-4">
              <span className="text-xs font-bold tracking-wider text-[#746e63] uppercase">
                5 Teratas · Sahabat Penjelajah
              </span>
              <span className="text-[11px] font-semibold text-[#746e63]">
                Tersimpan di Perangkat Ini
              </span>
            </div>

            {scores.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-xs font-semibold text-[#23201d]">
                  Belum ada skor yang tersimpan.
                </p>
                <p className="mt-1 text-[11px] text-[#746e63]">
                  Jadilah explorer pertama yang menuntaskan kuis 15 soal!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {scores.slice(0, 5).map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-[#fbf9f4] p-3 border border-[#f0ebd8]"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        idx === 0 ? 'bg-[#faecc2] text-[#6d5a1b]' : 'bg-[#ebe4f8] text-[#583794]'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-[#23201d]">
                        {entry.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-lg bg-[#ebe4f8] px-2.5 py-1 text-xs font-extrabold text-[#7350b5]">
                        {entry.score} / 15 Poin
                      </span>
                      <span className="text-[10px] text-[#746e63]">
                        {entry.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
