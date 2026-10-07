import { useState } from 'react';
import { provinces, Province } from '../data/provinces';
import { SectionBadge } from './SectionBadge';

export function Section02MakeItPersonal() {
  // Goal targets in years
  const goals = [
    { label: 'Lulus SD', years: 6, desc: 'Pendidikan dasar awal' },
    { label: 'Lulus SMP', years: 9, desc: 'Wajib belajar 9 tahun dasar' },
    { label: 'Lulus SMA / SMK', years: 12, desc: 'Pendidikan menengah' },
    { label: 'Lulus D3', years: 15, desc: 'Pendidikan vokasi diploma' },
    { label: 'Lulus S1', years: 16, desc: 'Sarjana strata 1' },
    { label: 'Lulus S2', years: 18, desc: 'Magister pascasarjana' },
  ];

  const [selectedProv, setSelectedProv] = useState<Province>(provinces[0]);
  const [selectedGoal, setSelectedGoal] = useState<number>(16); // Default S1
  const [provA, setProvA] = useState<Province>(provinces[0]); // DKI Jakarta
  const [provB, setProvB] = useState<Province>(provinces[37]); // Papua Pegunungan

  const goalObj = goals.find(g => g.years === selectedGoal) || goals[4];
  const diffGoal = (selectedGoal - selectedProv.value).toFixed(2);
  const versusGap = Math.abs(provA.value - provB.value).toFixed(2);

  return (
    <section id="playground" className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 lg:px-10">
      <div className="mb-8">
        <SectionBadge number="02">TARGET PRIBADI & KOMPARASI</SectionBadge>
        <h2 className="font-display text-[24px] font-extrabold tracking-[-0.6px] sm:text-[28px] text-[#23201d]">
          Sekarang, giliranmu.
        </h2>
        <p className="mt-2 text-[13px] text-[#746e63]">
          Bukan sekadar angka di atas kertas. Mari ukur target impianmu dan bandingkan realitas antarwilayah.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 items-start">
        {/* Sub-Card 1: Personal Target Milestone */}
        <div className="rounded-[22px] border border-[#e7e2d7] bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-3 mb-5">
              <span className="rounded-md bg-[#ebe4f8] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#583794]">
                PERJALANAN PENDIDIKANMU
              </span>
              <span className="text-xs font-semibold text-[#746e63]">
                Target Impian
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#23201d] mb-1.5">
                  Provinsi Asal Kamu:
                </label>
                <select
                  value={selectedProv.name}
                  onChange={(e) => {
                    const found = provinces.find(p => p.name === e.target.value);
                    if (found) setSelectedProv(found);
                  }}
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
                <label className="block text-xs font-bold text-[#23201d] mb-1.5">
                  Target Jenjang Pendidikan Kamu:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {goals.map((g) => (
                    <button
                      key={g.years}
                      type="button"
                      onClick={() => setSelectedGoal(g.years)}
                      className={`rounded-xl border p-2.5 text-left transition ${
                        selectedGoal === g.years
                          ? 'border-[#7350b5] bg-[#7350b5] text-white shadow-sm'
                          : 'border-[#e7e2d7] bg-[#fbf9f4] text-[#23201d] hover:bg-[#ebe4f8]'
                      }`}
                    >
                      <p className="text-xs font-bold">{g.label}</p>
                      <p className={`text-[10px] mt-0.5 ${selectedGoal === g.years ? 'text-[#faecc2]' : 'text-[#746e63]'}`}>
                        {g.years} tahun
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Perspective Result */}
          <div className="mt-6 rounded-2xl bg-[#f9f6ee] p-4 border border-[#e7e2d7]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-[#746e63] uppercase tracking-wider">
                  Target Pendidikan
                </p>
                <p className="text-base font-extrabold text-[#23201d]">
                  {goalObj.label} ({goalObj.years} Thn)
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-[#746e63] uppercase tracking-wider">
                  RLS {selectedProv.name}
                </p>
                <p className="text-base font-extrabold text-[#7350b5]">
                  {selectedProv.value.toFixed(2)} Thn
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[#746e63]">
              Targetmu adalah <strong className="text-[#23201d]">{selectedGoal} tahun</strong>. Dibandingkan rata-rata di {selectedProv.name}, kamu merencanakan capaian{' '}
              <strong className="text-[#583794]">{diffGoal} tahun lebih tinggi</strong> dari rata-rata populasi saat ini. Mimpi itu tanpa batas!
            </p>
          </div>
        </div>

        {/* Sub-Card 2: Versus Mode (Side by Side) */}
        <div className="rounded-[22px] border border-[#e7e2d7] bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-3 mb-5">
              <span className="rounded-md bg-[#faecc2] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#6d5a1b]">
                MODE KOMPARASI
              </span>
              <span className="text-xs font-semibold text-[#746e63]">
                Perbandingan Nyata
              </span>
            </div>

            <p className="text-xs text-[#746e63] mb-4">
              Dua provinsi, dua kenyataan. Seberapa jauh gap kesempatan belajarnya?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Province A */}
              <div className="rounded-xl border border-[#e7e2d7] bg-[#fbf9f4] p-3.5">
                <span className="text-[10px] font-bold text-[#7350b5] uppercase tracking-wider">
                  Provinsi A
                </span>
                <select
                  value={provA.name}
                  onChange={(e) => {
                    const found = provinces.find(p => p.name === e.target.value);
                    if (found) setProvA(found);
                  }}
                  className="mt-1.5 w-full rounded-lg border border-[#e7e2d7] bg-white px-2.5 py-2 text-xs font-bold text-[#23201d] focus:outline-none"
                >
                  {provinces.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-xs text-[#746e63]">RLS:</span>
                  <span className="text-lg font-extrabold text-[#7350b5]">{provA.value.toFixed(2)} thn</span>
                </div>
              </div>

              {/* Province B */}
              <div className="rounded-xl border border-[#e7e2d7] bg-[#fbf9f4] p-3.5">
                <span className="text-[10px] font-bold text-[#bba0d1] uppercase tracking-wider">
                  Provinsi B
                </span>
                <select
                  value={provB.name}
                  onChange={(e) => {
                    const found = provinces.find(p => p.name === e.target.value);
                    if (found) setProvB(found);
                  }}
                  className="mt-1.5 w-full rounded-lg border border-[#e7e2d7] bg-white px-2.5 py-2 text-xs font-bold text-[#23201d] focus:outline-none"
                >
                  {provinces.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-xs text-[#746e63]">RLS:</span>
                  <span className="text-lg font-extrabold text-[#8b67cc]">{provB.value.toFixed(2)} thn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Progress Bar & Gap Info */}
          <div className="mt-6 rounded-2xl bg-[#f9f6ee] p-4 border border-[#e7e2d7]">
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-bold text-[#583794] mb-1">
                  <span>{provA.name}</span>
                  <span>{provA.value.toFixed(2)} tahun</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#e7e2d7] overflow-hidden">
                  <div className="h-full bg-[#7350b5] rounded-full" style={{ width: `${(provA.value / 16) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold text-[#8b67cc] mb-1">
                  <span>{provB.name}</span>
                  <span>{provB.value.toFixed(2)} tahun</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#e7e2d7] overflow-hidden">
                  <div className="h-full bg-[#bba0d1] rounded-full" style={{ width: `${(provB.value / 16) * 100}%` }} />
                </div>
              </div>
            </div>

            <p className="mt-3.5 text-xs text-[#746e63]">
              Selisih kesenjangan:{' '}
              <strong className="font-extrabold text-[#23201d]">{versusGap} tahun</strong>. Ini setara dengan perbedaan rentang jenjang{' '}
              {Number(versusGap) >= 3 ? 'satu jenjang sekolah penuh (SD/SMP/SMA)' : 'beberapa tahun masa studi'}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
