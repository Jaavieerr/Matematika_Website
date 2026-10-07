import { useState } from 'react';
import { quizQuestions } from '../data/quiz';
import { ScoreEntry } from './Section05Leaderboard';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScoreSaved: () => void;
}

export function QuizModal({ isOpen, onClose, onScoreSaved }: QuizModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [userName, setUserName] = useState('');
  const [hasSaved, setHasSaved] = useState(false);

  if (!isOpen) return null;

  const currentQ = quizQuestions[currentIdx];

  const handleSelectChoice = (choiceIdx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(choiceIdx);
    setShowExplanation(true);
    if (choiceIdx === currentQ.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    try {
      const existing = localStorage.getItem('sekolah-scores-15');
      const list: ScoreEntry[] = existing ? JSON.parse(existing) : [];
      const newEntry: ScoreEntry = {
        name: userName.trim(),
        score: score,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
      };
      list.push(newEntry);
      list.sort((a, b) => b.score - a.score);
      localStorage.setItem('sekolah-scores-15', JSON.stringify(list));
      setHasSaved(true);
      onScoreSaved();
    } catch {
      // Fallback
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setIsFinished(false);
    setUserName('');
    setHasSaved(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-[620px] overflow-y-auto rounded-[24px] border border-[#e7e2d7] bg-white p-6 sm:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f3efe6] text-xs font-bold text-[#746e63] hover:bg-[#e7e2d7]"
        >
          ✕
        </button>

        {!isFinished ? (
          <div>
            {/* Header & Progress */}
            <div className="mb-5">
              <span className="rounded-md bg-[#ebe4f8] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#583794]">
                KUIS INTERAKTIF · SOAL {currentIdx + 1} DARI {quizQuestions.length}
              </span>
              <div className="mt-3 h-2 w-full rounded-full bg-[#ebe4f8] overflow-hidden">
                <div
                  className="h-full bg-[#7350b5] transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base font-bold leading-snug text-[#23201d] sm:text-lg">
              {currentQ.text}
            </h3>

            {/* Choices */}
            <div className="mt-5 space-y-2.5">
              {currentQ.choices.map((choice, idx) => {
                const isCorrect = idx === currentQ.correct;
                const isSelected = idx === selectedAnswer;

                let btnStyle = "border-[#e7e2d7] bg-[#fbf9f4] text-[#23201d] hover:bg-[#ebe4f8]";
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                  } else if (isSelected) {
                    btnStyle = "border-rose-400 bg-rose-50 text-rose-900";
                  } else {
                    btnStyle = "border-[#e7e2d7] bg-white opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectChoice(idx)}
                    disabled={showExplanation}
                    className={`w-full rounded-xl border p-3.5 text-left text-xs font-medium transition ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[10px] font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{choice}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation Note */}
            {showExplanation && (
              <div className="mt-4 rounded-xl bg-[#f9f6ee] p-3.5 border border-[#e7e2d7]">
                <p className="text-[11px] font-bold text-[#583794] mb-1">
                  Penjelasan Edukatif:
                </p>
                <p className="text-xs text-[#746e63] leading-relaxed">
                  {currentQ.explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-4 w-full rounded-xl bg-[#7350b5] py-2.5 text-xs font-bold text-white transition hover:bg-[#583794]"
                >
                  {currentIdx + 1 < quizQuestions.length ? 'Lanjut ke Soal Berikutnya →' : 'Lihat Hasil Akhir'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished State */
          <div className="text-center py-4">
            <span className="rounded-full bg-[#faecc2] px-3.5 py-1.5 text-xs font-bold text-[#6d5a1b]">
              Kuis Selesai! 🎉
            </span>

            <h3 className="mt-4 font-display text-2xl font-extrabold text-[#23201d]">
              Skor Kamu: {score} / {quizQuestions.length}
            </h3>

            <p className="mt-2 text-xs text-[#746e63] max-w-md mx-auto">
              {score >= 12
                ? 'Luar biasa! Pemahamanmu tentang konsep rata-rata lama sekolah dan ketimpangan pendidikan sangat mendalam.'
                : 'Bagus sekali! Kamu telah menjelajahi perspektif data di balik realitas pendidikan Indonesia.'}
            </p>

            {!hasSaved ? (
              <form onSubmit={handleSaveScore} className="mt-6 max-w-sm mx-auto">
                <label className="block text-xs font-bold text-[#23201d] mb-1.5 text-left">
                  Simpan Namamu di Leaderboard Lokal:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Masukkan nama..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="flex-1 rounded-xl border border-[#e7e2d7] bg-[#fbf9f4] px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#7350b5]"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#7350b5] px-4 py-2 text-xs font-bold text-white hover:bg-[#583794]"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-6 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
                ✓ Skormu berhasil disimpan di Leaderboard!
              </div>
            )}

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="rounded-xl border border-[#e7e2d7] bg-[#fbf9f4] px-5 py-2.5 text-xs font-bold text-[#23201d] hover:bg-[#ebe4f8]"
              >
                Ulangi Kuis
              </button>
              <button
                onClick={onClose}
                className="rounded-xl bg-[#7350b5] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#583794]"
              >
                Tutup & Lihat Leaderboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
