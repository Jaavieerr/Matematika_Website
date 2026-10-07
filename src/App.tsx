import { useState, useEffect } from 'react';
import { provinces, Province, NATIONAL_AVG_OFFICIAL, DATASET_AVG } from './data/provinces';
import { quizQuestions } from './data/quiz';
import { HeroIllustration } from './components/HeroIllustration';
import { InteractiveMap } from './components/InteractiveMap';
import { BehindTheNumbers } from './components/BehindTheNumbers';

export interface ScoreEntry {
  name: string;
  score: number;
  date?: string;
}

export function App() {
  // Navigation & Modal State
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province>(
    provinces.find(p => p.name === 'DKI Jakarta') || provinces[0]
  );

  // Personal Goal Calculator State
  const [personalProvince, setPersonalProvince] = useState<string>('DKI Jakarta');
  const [personalGoalYears, setPersonalGoalYears] = useState<number>(12); // Lulus SMA / SMK

  // Versus Mode State
  const [versusA, setVersusA] = useState<string>('DKI Jakarta');
  const [versusB, setVersusB] = useState<string>('Papua Pegunungan');

  // Policy Simulator State
  const [policyBoost, setPolicyBoost] = useState<number>(1.5);

  // Leaderboard State
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>(() => {
    try {
      const saved = localStorage.getItem('sekolah-scores-15');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, 5);
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Quiz State (Intro -> Question 1..15 -> Result)
  const [quizStep, setQuizStep] = useState<'intro' | 'question' | 'result'>('intro');
  const [playerName, setPlayerName] = useState('');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const reloadLeaderboard = () => {
    try {
      const saved = localStorage.getItem('sekolah-scores-15');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setLeaderboard(parsed.slice(0, 5));
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    reloadLeaderboard();
  }, []);

  // Calculations for Personal Goal
  const targetProvObj = provinces.find(p => p.name === personalProvince) || provinces[0];
  const goalDiff = (personalGoalYears - targetProvObj.value).toFixed(2);
  const goalDiffNum = personalGoalYears - targetProvObj.value;

  // Calculations for Versus Mode
  const provAObj = provinces.find(p => p.name === versusA) || provinces[0];
  const provBObj = provinces.find(p => p.name === versusB) || provinces[37];
  const versusDiff = Math.abs(provAObj.value - provBObj.value).toFixed(2);

  // Policy Simulator calculations
  const originalMean = DATASET_AVG;
  const originalMin = 4.3;
  const originalMax = 11.59;
  const originalGap = (originalMax - originalMin).toFixed(2);

  const simValues = provinces.map(p => {
    const weight = p.value < 8.0 ? 1.0 : p.value < 9.0 ? 0.75 : 0.4;
    return p.value + (policyBoost * weight);
  });
  const simMean = (simValues.reduce((a, b) => a + b, 0) / simValues.length).toFixed(2);
  const simMin = Math.min(...simValues).toFixed(2);
  const simMax = Math.max(...simValues).toFixed(2);
  const simGap = (Math.max(...simValues) - Math.min(...simValues)).toFixed(2);

  // Quiz Modal Logic
  const handleOpenQuiz = () => {
    setQuizStep('intro');
    setCurrentQIndex(0);
    setSelectedChoice(null);
    setQuizScore(0);
    setShowExplanation(false);
    setIsQuizModalOpen(true);
  };

  const handleStartQuizFromIntro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    setQuizStep('question');
    setCurrentQIndex(0);
    setSelectedChoice(null);
    setQuizScore(0);
    setShowExplanation(false);
  };

  const handleAnswerClick = (choiceIdx: number) => {
    if (showExplanation) return;
    setSelectedChoice(choiceIdx);
    setShowExplanation(true);
    if (choiceIdx === quizQuestions[currentQIndex].correct) {
      setQuizScore(prev => prev + 100); // 100 points per question = 1500 total
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedChoice(null);
      setShowExplanation(false);
    } else {
      // Finished: automatically save to leaderboard
      const finalScore = quizScore + (selectedChoice === quizQuestions[currentQIndex].correct ? 0 : 0);
      try {
        const existing = localStorage.getItem('sekolah-scores-15');
        const list: ScoreEntry[] = existing ? JSON.parse(existing) : [];
        const newEntry: ScoreEntry = {
          name: playerName.trim() || 'Explorer',
          score: finalScore,
          date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
        };
        list.push(newEntry);
        list.sort((a, b) => b.score - a.score);
        localStorage.setItem('sekolah-scores-15', JSON.stringify(list));
        reloadLeaderboard();
      } catch {
        // ignore
      }
      setQuizStep('result');
    }
  };

  // Medal icons for leaderboard
  const rankMedals = ['🥇', '🥈', '🥉', '04', '05'];

  return (
    <div className="min-h-screen bg-[#f9f6ee] text-[#23201d] font-sans antialiased selection:bg-[#faecc2] selection:text-[#583794]">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#e7e2d7] bg-[#f9f6ee]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
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

          <button
            onClick={handleOpenQuiz}
            className="flex items-center gap-2 rounded-xl bg-[#faecc2] px-4 py-2 text-xs font-bold text-[#6d5a1b] shadow-sm transition hover:bg-[#f5e3ad]"
          >
            <span>Mulai Kuis</span>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-currentColor stroke-2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </header>

      {/* 2. Hero Section (Full Viewport Landing Page) */}
      <section className="relative flex min-h-[calc(100vh-65px)] w-full items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e7e2d7] bg-white px-3.5 py-1.5 text-xs font-semibold shadow-sm mb-4">
                <span className="h-2 w-2 rounded-full bg-[#7350b5]" />
                <span className="text-[#746e63]">Ruang Belajar Interaktif · 38 Provinsi · BPS 2025</span>
              </div>

              <h1 className="font-display text-[36px] font-extrabold tracking-[-1px] sm:text-[46px] lg:text-[52px] leading-[1.15] text-[#23201d]">
                Beda tempat.{' '}
                <span className="relative inline-block text-[#7350b5]">
                  Beda kesempatan.
                  <svg viewBox="0 0 350 12" className="absolute -bottom-1.5 left-0 w-full" aria-hidden="true">
                    <path d="M2 8Q170-2 348 6" fill="none" stroke="#daca86" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#746e63] max-w-lg">
                Mimpi setiap anak Indonesia sama besarnya. Namun dalam akses pendidikan, garis awal tidak selalu sama. Mari bedah data ketimpangan dan jadilah bagian dari perubahan.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
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
                  onClick={handleOpenQuiz}
                  className="flex items-center gap-2 rounded-xl border border-[#e7e2d7] bg-[#faecc2] px-6 py-3.5 text-xs font-bold text-[#6d5a1b] shadow-sm transition hover:bg-[#f5e3ad]"
                >
                  <span>Mulai Kuis</span>
                  <span className="rounded-full bg-white/60 px-2 py-0.5 text-[10px]">15 Soal</span>
                </button>
              </div>
            </div>

            <div className="rounded-[26px] border border-[#e7e2d7] bg-white p-4 sm:p-6 shadow-sm">
              <HeroIllustration />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#explore"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] font-semibold text-[#746e63] opacity-75 hover:opacity-100 transition"
        >
          <span>Scroll ke bawah</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-currentColor stroke-2 animate-bounce">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>

      {/* 3. Section 01: The Big Picture (Peta di kiri, Spotlight di kanan persis Figma) */}
      <section id="explore" className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-10">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0ebd8] text-[10px] font-bold text-[#5c4a1e]">
                01
              </span>
              <span className="text-[11px] font-bold tracking-widest text-[#746e63]">
                THE BIG PICTURE
              </span>
            </div>
            <h2 className="font-display text-[24px] font-extrabold tracking-[-0.6px] sm:text-[28px] text-[#23201d]">
              Satu Indonesia. Banyak cerita.
            </h2>
            <p className="mt-1 text-[13px] text-[#746e63]">
              Klik pin titik di peta untuk menjelajahi cerita pendidikan di setiap provinsi.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#e7e2d7] bg-white px-3.5 py-1.5 text-xs shadow-sm self-start sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-[#7350b5] animate-pulse" />
            <span className="text-[#746e63]">Rata-rata Nasional:</span>
            <strong className="font-bold text-[#583794]">{NATIONAL_AVG_OFFICIAL} tahun</strong>
          </div>
        </div>

        {/* Unified 100% Figma Card: Map di kiri, Spotlight di kanan */}
        <div className="overflow-hidden rounded-[26px] border border-[#e7e2d7] bg-white shadow-sm">
          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_290px]">
            {/* Map Area on the Left */}
            <div className="relative flex min-w-0 flex-col justify-between bg-[#fcfbfd] p-3 sm:p-4">
              <InteractiveMap selected={selectedProvince} onSelect={(p) => setSelectedProvince(p)} />

              <div className="flex flex-wrap items-center justify-between gap-2 px-3 pt-2 text-[10px] text-[#746e63] border-t border-[#f0ebd8] mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#7350b5]" />
                  Pin ibu kota provinsi
                </span>
                <span>Geser peta untuk melihat seluruh nusantara</span>
              </div>
            </div>

            {/* Sidebar Spotlight on the Right */}
            <div className="flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#e7e2d7] bg-[#f9f7f4] p-5">
              <div>
                <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-2.5">
                  <span className="rounded-md bg-[#ebe4f8] px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#583794]">
                    PROVINCE SPOTLIGHT
                  </span>
                  <span className="text-[11px] text-[#746e63]">
                    Ibu kota: <strong className="text-[#23201d]">{selectedProvince.capital}</strong>
                  </span>
                </div>

                {/* Quick Dropdown Selector */}
                <div className="mt-3">
                  <label className="block text-[11px] font-bold text-[#746e63] mb-1">
                    Pilih Cepat Provinsi:
                  </label>
                  <select
                    value={selectedProvince.name}
                    onChange={(e) => {
                      const found = provinces.find(p => p.name === e.target.value);
                      if (found) setSelectedProvince(found);
                    }}
                    className="w-full rounded-xl border border-[#e7e2d7] bg-white px-3 py-2 text-xs font-semibold text-[#23201d] focus:border-[#7350b5] focus:outline-none"
                  >
                    {provinces.map((p) => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <h3 className="font-display text-xl font-extrabold text-[#23201d]">
                    {selectedProvince.name}
                  </h3>
                  <p className="text-[11px] text-[#746e63]">
                    Wilayah {selectedProvince.region} · Peringkat #{selectedProvince.rank}
                  </p>
                </div>

                <div className="mt-3 flex items-baseline gap-1.5 rounded-2xl bg-white p-3.5 border border-[#e7e2d7]">
                  <span className="font-display text-3xl font-extrabold text-[#7350b5]">
                    {selectedProvince.value.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-[#746e63]">tahun</span>
                </div>

                <div className="mt-3.5">
                  <div className="flex justify-between text-[10px] font-semibold text-[#746e63] mb-1">
                    <span>Rata-rata lama sekolah</span>
                    <span>16 thn (S1)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#e7e2d7] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#7350b5] transition-all duration-500"
                      style={{ width: `${Math.min(100, (selectedProvince.value / 16) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-white p-3 border border-[#e7e2d7] text-[11px] text-[#746e63]">
                <div className="flex justify-between">
                  <span>vs. Rata-rata Nasional:</span>
                  <strong className={selectedProvince.diff >= 0 ? 'text-emerald-700' : 'text-amber-700'}>
                    {selectedProvince.diff >= 0 ? `+${selectedProvince.diff.toFixed(2)} thn` : `${selectedProvince.diff.toFixed(2)} thn`}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 02: Make It Personal & Versus */}
      <section id="playground" className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-10">
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0ebd8] text-[10px] font-bold text-[#5c4a1e]">
              02
            </span>
            <span className="text-[11px] font-bold tracking-widest text-[#746e63]">
              MAKE IT PERSONAL
            </span>
          </div>
          <h2 className="font-display text-[24px] font-extrabold tracking-[-0.6px] sm:text-[28px] text-[#23201d]">
            Okay, now it's your turn.
          </h2>
          <p className="mt-1 text-[13px] text-[#746e63]">
            Bukan sekadar angka di layar. Yuk, hubungkan titik-titiknya dengan target perjalanan belajarmu.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 items-start">
          {/* Sub-Card 1: Personal Journey */}
          <div className="rounded-[22px] border border-[#e7e2d7] bg-white p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-2.5 mb-3">
                <span className="rounded-md bg-[#ebe4f8] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#583794]">
                  YOUR EDUCATION JOURNEY
                </span>
                <span className="text-xs font-semibold text-[#746e63]">
                  Target Impian
                </span>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#23201d] mb-1">
                    Provinsi Asal Kamu:
                  </label>
                  <select
                    value={personalProvince}
                    onChange={(e) => setPersonalProvince(e.target.value)}
                    className="w-full rounded-xl border border-[#e7e2d7] bg-[#fbf9f4] px-3.5 py-2.5 text-xs font-semibold text-[#23201d] focus:border-[#7350b5] focus:outline-none"
                  >
                    {provinces.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} (RLS: {p.value.toFixed(2)} tahun)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#23201d] mb-1">
                    Tujuan Pendidikan Kamu:
                  </label>
                  <select
                    value={personalGoalYears}
                    onChange={(e) => setPersonalGoalYears(Number(e.target.value))}
                    className="w-full rounded-xl border border-[#e7e2d7] bg-[#fbf9f4] px-3.5 py-2.5 text-xs font-semibold text-[#23201d] focus:border-[#7350b5] focus:outline-none"
                  >
                    <option value={6}>Lulus SD (6 tahun)</option>
                    <option value={9}>Lulus SMP (9 tahun)</option>
                    <option value={12}>Lulus SMA / SMK (12 tahun)</option>
                    <option value={15}>Lulus D3 (15 tahun)</option>
                    <option value={16}>Lulus S1 (16 tahun)</option>
                    <option value={18}>Lulus S2 (18 tahun)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Calculated Milestone Output */}
            <div className="mt-5 rounded-2xl bg-[#f9f6ee] p-4 border border-[#e7e2d7]">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#e7e2d7]">
                <div>
                  <p className="text-[10px] font-bold text-[#746e63] uppercase tracking-wider">
                    Lama Target
                  </p>
                  <p className="text-lg font-extrabold text-[#7350b5]">
                    {personalGoalYears} <span className="text-xs font-normal">tahun</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#746e63] uppercase tracking-wider">
                    RLS {targetProvObj.name}
                  </p>
                  <p className="text-lg font-extrabold text-[#23201d]">
                    {targetProvObj.value.toFixed(2)} <span className="text-xs font-normal">tahun</span>
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#746e63]">
                Target pendidikanmu{' '}
                <strong className="text-[#23201d]">
                  {goalDiffNum >= 0 ? `${goalDiff} tahun di atas` : `${Math.abs(goalDiffNum).toFixed(2)} tahun di bawah`}
                </strong>{' '}
                rata-rata provinsi {targetProvObj.name}. RLS mengukur lama pendidikan penduduk formal, sebuah tolok ukur kesempatan yang layak terus ditingkatkan!
              </p>
            </div>
          </div>

          {/* Sub-Card 2: Versus Mode */}
          <div className="rounded-[22px] border border-[#e7e2d7] bg-white p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-2.5 mb-3">
                <span className="rounded-md bg-[#faecc2] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#6d5a1b]">
                  VERSUS MODE
                </span>
                <span className="text-xs font-semibold text-[#746e63]">
                  Side by Side
                </span>
              </div>

              <p className="text-xs text-[#746e63] mb-3">
                Dua provinsi. Dua realitas. Seberapa jauh kesenjangannya?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#e7e2d7] bg-[#fbf9f4] p-3">
                  <span className="text-[10px] font-bold text-[#7350b5] uppercase tracking-wider">
                    Provinsi A
                  </span>
                  <select
                    value={versusA}
                    onChange={(e) => setVersusA(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#e7e2d7] bg-white px-2.5 py-2 text-xs font-bold text-[#23201d] focus:outline-none"
                  >
                    {provinces.map((p) => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-xs text-[#746e63]">RLS:</span>
                    <span className="text-base font-extrabold text-[#7350b5]">{provAObj.value.toFixed(2)} thn</span>
                  </div>
                </div>

                <div className="rounded-xl border border-[#e7e2d7] bg-[#fbf9f4] p-3">
                  <span className="text-[10px] font-bold text-[#8b67cc] uppercase tracking-wider">
                    Provinsi B
                  </span>
                  <select
                    value={versusB}
                    onChange={(e) => setVersusB(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#e7e2d7] bg-white px-2.5 py-2 text-xs font-bold text-[#23201d] focus:outline-none"
                  >
                    {provinces.map((p) => (
                      <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-xs text-[#746e63]">RLS:</span>
                    <span className="text-base font-extrabold text-[#8b67cc]">{provBObj.value.toFixed(2)} thn</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-[#f9f6ee] p-3.5 border border-[#e7e2d7]">
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-[#583794] mb-1">
                    <span>{provAObj.name}</span>
                    <span>{provAObj.value.toFixed(2)} tahun</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#e7e2d7] overflow-hidden">
                    <div className="h-full bg-[#7350b5] rounded-full" style={{ width: `${(provAObj.value / 16) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-bold text-[#8b67cc] mb-1">
                    <span>{provBObj.name}</span>
                    <span>{provBObj.value.toFixed(2)} tahun</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#e7e2d7] overflow-hidden">
                    <div className="h-full bg-[#bba0d1] rounded-full" style={{ width: `${(provBObj.value / 16) * 100}%` }} />
                  </div>
                </div>
              </div>

              <p className="mt-2.5 text-xs text-[#746e63]">
                Selisih kesenjangan:{' '}
                <strong className="font-extrabold text-[#23201d]">{versusDiff} tahun</strong>. Ini setara dengan perbedaan rentang jenjang{' '}
                {Number(versusDiff) >= 3 ? 'satu jenjang sekolah penuh (SD/SMP/SMA)' : 'beberapa tahun masa studi'}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section 03: Change The Playbook */}
      <section className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-10">
        <div className="rounded-[24px] border border-[#e7e2d7] bg-[#fdfcf9] p-5 sm:p-8 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0ebd8] text-[10px] font-bold text-[#5c4a1e]">
                  03
                </span>
                <span className="text-[11px] font-bold tracking-widest text-[#746e63]">
                  CHANGE THE PLAYBOOK
                </span>
              </div>
              <h2 className="font-display text-[24px] font-extrabold leading-tight sm:text-[30px] text-[#23201d]">
                Kalau kamu jadi <br />
                <span className="text-[#7350b5]">Menteri Pendidikan?</span>
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#746e63]">
                Geser slider buat ningkatin tahun sekolah, and see what happens to the whole country.
              </p>

              <div className="mt-5 rounded-2xl bg-[#ebe4f8] p-4 border border-[#d8cceb]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#583794]">Target Intervensi Kebijakan</span>
                  <span className="rounded-lg bg-[#7350b5] px-2.5 py-1 text-xs font-extrabold text-white">
                    +{policyBoost.toFixed(1)} Tahun
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={policyBoost}
                  onChange={(e) => setPolicyBoost(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#d5c5ec] rounded-lg appearance-none cursor-pointer accent-[#7350b5]"
                />

                <div className="flex justify-between text-[10px] font-bold text-[#583794] mt-2">
                  <span>As it is</span>
                  <span>Maximum (+3 years)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-2xl border border-[#e7e2d7] bg-white p-4 shadow-sm">
                <span className="text-[10px] font-bold tracking-wider text-[#746e63] uppercase">
                  Rata-Rata Nasional Terkini
                </span>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-[#7350b5]">{simMean}</span>
                  <span className="text-xs text-[#746e63]">tahun</span>
                </div>
                <p className="mt-1 text-[11px] text-[#746e63]">
                  Meningkat <strong className="text-emerald-700">+{(Number(simMean) - originalMean).toFixed(2)} thn</strong> dari baseline {originalMean.toFixed(2)} thn.
                </p>
              </div>

              <div className="rounded-2xl border border-[#e7e2d7] bg-white p-4 shadow-sm">
                <span className="text-[10px] font-bold tracking-wider text-[#746e63] uppercase">
                  Rentang Kesenjangan (Gap)
                </span>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-[#23201d]">{simGap}</span>
                  <span className="text-xs text-[#746e63]">tahun</span>
                </div>
                <p className="mt-1 text-[11px] text-[#746e63]">
                  The gap is <strong className="text-emerald-700">{(Number(originalGap) - Number(simGap)).toFixed(2)} thn</strong> narrower.
                </p>
              </div>

              <div className="rounded-2xl border border-[#e7e2d7] bg-white p-4 shadow-sm">
                <span className="text-[10px] font-bold tracking-wider text-[#746e63] uppercase">
                  RLS Terendah Terangkat
                </span>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-[#7350b5]">{simMin}</span>
                  <span className="text-xs text-[#746e63]">thn</span>
                </div>
                <p className="mt-1 text-[11px] text-[#746e63]">
                  Baseline {originalMin.toFixed(2)} thn terangkat signifikan dengan fokus afirmasi.
                </p>
              </div>

              <div className="rounded-2xl border border-[#e7e2d7] bg-white p-4 shadow-sm">
                <span className="text-[10px] font-bold tracking-wider text-[#746e63] uppercase">
                  RLS Tertinggi
                </span>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-[#23201d]">{simMax}</span>
                  <span className="text-xs text-[#746e63]">thn</span>
                </div>
                <p className="mt-1 text-[11px] text-[#746e63]">
                  Tetap maju secara berkesinambungan ({simMax} thn).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section 04: Behind The Numbers (Diagram Lingkaran Persentase) */}
      <BehindTheNumbers />

      {/* 7. Section 05: Leaderboard (100% Persis Image #1) */}
      <section id="leaderboard" className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-[22px] border border-[#e7dfb9] bg-[#f8f3de] p-6 sm:p-9 shadow-sm">
          <div className="grid gap-7 md:grid-cols-[0.9fr_1.1fr] items-center">
            {/* Left Box */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0ebd8] text-[10px] font-bold text-[#5c4a1e]">
                  05
                </span>
                <span className="text-[11px] font-bold tracking-widest text-[#746e63]">
                  SMART MINDS, BIG HEARTS
                </span>
              </div>
              <h2 className="font-display text-[26px] font-extrabold sm:text-[30px] text-[#23201d]">
                The Perspective <br />
                Leaderboard
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-[#746e63]">
                Not about being the smartest. It's about being curious. Ready to put your name on the board?
              </p>

              <button
                onClick={handleOpenQuiz}
                className="mt-6 flex items-center gap-2 rounded-xl bg-[#281c3c] px-6 py-3.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#3d2b59]"
              >
                <span>Let's Play the Quiz</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-currentColor stroke-2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <p className="mt-4 text-[11px] text-[#8a8169]">
                15 rapid questions · 1500 possible points · Good vibes only
              </p>
            </div>

            {/* Right Leaderboard Card (100% Matching Image #1) */}
            <div className="rounded-[22px] border border-[#e2d8ab] bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#f0ebd8] pb-3 mb-2">
                <h3 className="text-xs font-bold text-[#23201d]">
                  Top 5 · Curious Club
                </h3>
                <span className="rounded-full bg-[#f2eedf] px-2.5 py-1 text-[8px] font-bold tracking-wider text-[#8a8169]">
                  ON THIS DEVICE
                </span>
              </div>

              {/* Table Column Headers */}
              <div className="grid grid-cols-[36px_1fr_60px] border-b border-[#f0ebd8] py-2 text-[9px] font-bold tracking-wider text-[#8a8169]">
                <span>RANK</span>
                <span>EXPLORER</span>
                <span className="text-right">POINTS</span>
              </div>

              {/* 5 Rows */}
              <div className="divide-y divide-[#f0ebd8]">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const entry = leaderboard[idx];
                  return (
                    <div
                      key={idx}
                      className="grid grid-cols-[36px_1fr_60px] items-center py-2.5 text-xs"
                    >
                      <span className="font-bold text-[#23201d]">
                        {rankMedals[idx]}
                      </span>
                      <span className="font-medium text-[#23201d]">
                        {entry ? entry.name : (idx === 0 ? 'Your name could be here' : 'Open spot. Join the club!')}
                      </span>
                      <span className="text-right font-bold text-[#7350b5]">
                        {entry ? `${entry.score}` : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Button */}
              <button
                onClick={handleOpenQuiz}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7350b5] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#583794]"
              >
                <span>Lihat Leaderboard</span>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-currentColor stroke-2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="border-t border-[#e7e2d7] bg-[#f2eee3] py-8">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            <div>
              <p className="font-display text-sm font-extrabold text-[#23201d]">
                DESIGN WEBSITE PSAJ MATEMATIKA
              </p>
              <p className="mt-0.5 text-xs text-[#746e63]">
                Pendidikan bukanlah sebuah hak istimewa, melainkan kemungkinan yang layak didapatkan oleh setiap anak bangsa.
              </p>
            </div>

            <div className="text-xs text-[#746e63]">
              Sumber Data: <strong className="text-[#23201d]">Badan Pusat Statistik (BPS 2025)</strong>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. Quiz Modal (100% Matching Image #2 with Name Input First) */}
      {isQuizModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-[540px] overflow-y-auto rounded-[28px] border border-[#e7e2d7] bg-white p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setIsQuizModalOpen(false)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f3efe6] text-xs font-bold text-[#746e63] hover:bg-[#e7e2d7]"
            >
              ✕
            </button>

            {/* Step 1: Intro Tab / Kenalan Dulu (100% Persis Image #2) */}
            {quizStep === 'intro' && (
              <div>
                <p className="text-[10px] font-bold tracking-wider text-[#746e63] uppercase">
                  QUICK BRAIN CHECK · READY, SET, GROW
                </p>

                {/* Book Icon */}
                <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dfd3f0] bg-[#ebe4f8] text-[#7350b5]">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-currentColor stroke-2">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10" />
                    <path d="M6 10h10" />
                  </svg>
                </div>

                <h2 className="mt-4 font-display text-[22px] sm:text-[26px] font-extrabold leading-snug text-[#23201d]">
                  Siap uji pemahaman kamu tentang{' '}
                  <span className="text-[#7350b5]">Rata-rata Lama Sekolah?</span>
                </h2>

                <p className="mt-2.5 text-xs sm:text-[13px] leading-relaxed text-[#746e63]">
                  Let's put your perspective to the test! Kenalan dulu, lalu jawab 15 pertanyaan singkat. No timer, no pressure — just you and your curiosity.
                </p>

                {/* Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#ebe4f8] px-3 py-1 text-[11px] font-semibold text-[#583794]">
                    15 rapid questions
                  </span>
                  <span className="rounded-full bg-[#ebe4f8] px-3 py-1 text-[11px] font-semibold text-[#583794]">
                    Up to 1500 points
                  </span>
                  <span className="rounded-full bg-[#faecc2] px-3 py-1 text-[11px] font-semibold text-[#6d5a1b]">
                    Your name, your moment
                  </span>
                </div>

                {/* Form Input Nama */}
                <form onSubmit={handleStartQuizFromIntro} className="mt-5 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#23201d] mb-1">
                      Kenalan dulu — what's your name?
                    </label>
                    <input
                      type="text"
                      required
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Tulis nama atau nickname kamu"
                      className="w-full rounded-xl border border-[#e7e2d7] bg-white px-4 py-2.5 text-xs font-semibold text-[#23201d] placeholder:text-[#a8a196] focus:border-[#7350b5] focus:outline-none shadow-sm"
                    />
                    <p className="mt-1 text-[10px] text-[#746e63]">
                      Nama ini dipakai di leaderboard device ini. No account needed.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#a692cb] py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#7350b5]"
                  >
                    <span>Mulai Kuis — Let's Go!</span>
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-currentColor stroke-2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Quiz Question */}
            {quizStep === 'question' && (
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#ebe4f8] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#583794]">
                      QUICK BRAIN CHECK · {currentQIndex + 1} / {quizQuestions.length}
                    </span>
                    <span className="text-xs font-bold text-[#7350b5]">
                      {quizScore} Poin
                    </span>
                  </div>
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-[#ebe4f8] overflow-hidden">
                    <div
                      className="h-full bg-[#7350b5] transition-all duration-300"
                      style={{ width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold leading-snug text-[#23201d]">
                  {quizQuestions[currentQIndex].text}
                </h3>

                <div className="mt-4 space-y-2">
                  {quizQuestions[currentQIndex].choices.map((choice, idx) => {
                    const isCorrect = idx === quizQuestions[currentQIndex].correct;
                    const isSelected = idx === selectedChoice;

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
                        onClick={() => handleAnswerClick(idx)}
                        disabled={showExplanation}
                        className={`w-full rounded-xl border p-3 text-left text-xs font-medium transition ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[10px] font-bold">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{choice}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="mt-3.5 rounded-xl bg-[#f9f6ee] p-3 border border-[#e7e2d7]">
                    <p className="text-[10px] font-bold text-[#583794] mb-0.5">
                      Penjelasan:
                    </p>
                    <p className="text-xs text-[#746e63] leading-relaxed">
                      {quizQuestions[currentQIndex].explanation}
                    </p>
                    <button
                      onClick={handleNextQuestion}
                      className="mt-3 w-full rounded-xl bg-[#7350b5] py-2 text-xs font-bold text-white transition hover:bg-[#583794]"
                    >
                      {currentQIndex + 1 < quizQuestions.length ? 'Lanjut ke Soal Berikutnya →' : 'Lihat Hasil Akhir'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Result View */}
            {quizStep === 'result' && (
              <div className="text-center py-2">
                <span className="rounded-full bg-[#faecc2] px-3.5 py-1 text-xs font-bold text-[#6d5a1b]">
                  Kuis Selesai! 🎉
                </span>

                <h3 className="mt-3 font-display text-2xl font-extrabold text-[#23201d]">
                  {playerName}, Skormu: {quizScore} / 1500 Poin
                </h3>

                <p className="mt-1.5 text-xs text-[#746e63] max-w-md mx-auto">
                  {quizScore >= 1200
                    ? 'Luar biasa! Pemahamanmu tentang konsep rata-rata lama sekolah dan ketimpangan pendidikan sangat mendalam.'
                    : 'Bagus sekali! Kamu telah menjelajahi perspektif data di balik realitas pendidikan Indonesia.'}
                </p>

                <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
                  ✓ Skormu berhasil dicatat di Leaderboard atas nama <strong>{playerName}</strong>!
                </div>

                <div className="mt-5 flex justify-center gap-3">
                  <button
                    onClick={handleOpenQuiz}
                    className="rounded-xl border border-[#e7e2d7] bg-[#fbf9f4] px-4 py-2 text-xs font-bold text-[#23201d] hover:bg-[#ebe4f8]"
                  >
                    Ulangi Kuis
                  </button>
                  <button
                    onClick={() => setIsQuizModalOpen(false)}
                    className="rounded-xl bg-[#7350b5] px-4 py-2 text-xs font-bold text-white hover:bg-[#583794]"
                  >
                    Tutup & Lihat Leaderboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
