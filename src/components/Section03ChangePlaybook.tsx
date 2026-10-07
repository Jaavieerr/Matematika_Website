import { useState } from 'react';
import { provinces } from '../data/provinces';
import { SectionBadge } from './SectionBadge';

export function Section03ChangePlaybook() {
  const [boost, setBoost] = useState<number>(1.5); // Policy boost in years

  // Calculate simulated dataset
  const originalValues = provinces.map(p => p.value);
  const originalMean = originalValues.reduce((a, b) => a + b, 0) / provinces.length;
  const originalMin = Math.min(...originalValues);
  const originalMax = Math.max(...originalValues);
  const originalGap = originalMax - originalMin;

  // Policy simulation: Memberikan intervensi tertarget lebih besar kepada provinsi di bawah rata-rata
  const simulatedValues = provinces.map(p => {
    // Daerah di bawah 8 thn mendapat 100% boost, daerah di atas mendapat porsi bertahap
    const weight = p.value < 8.0 ? 1.0 : p.value < 9.0 ? 0.75 : 0.4;
    return p.value + (boost * weight);
  });

  const simMean = simulatedValues.reduce((a, b) => a + b, 0) / simulatedValues.length;
  const simMin = Math.min(...simulatedValues);
  const simMax = Math.max(...simulatedValues);
  const simGap = simMax - simMin;

  return (
    <section className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 lg:px-10">
      <div className="rounded-[24px] border border-[#e7e2d7] bg-[#fdfcf9] p-6 sm:p-10 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-center">
          {/* Left Column */}
          <div>
            <SectionBadge number="03">SIMULASI KEBIJAKAN</SectionBadge>
            <h2 className="font-display text-[24px] font-extrabold leading-tight sm:text-[30px] text-[#23201d]">
              Kalau kamu jadi <br />
              <span className="text-[#7350b5]">Menteri Pendidikan?</span>
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-[#746e63]">
              Geser slider kebijakan di bawah untuk mensimulasikan percepatan akses dan infrastruktur pendidikan tertarget di seluruh daerah 3T & daerah tertinggal.
            </p>

            {/* Slider Controls */}
            <div className="mt-6 rounded-2xl bg-[#ebe4f8] p-5 border border-[#d8cceb]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#583794]">Target Intervensi Kebijakan</span>
                <span className="rounded-lg bg-[#7350b5] px-2.5 py-1 text-xs font-extrabold text-white">
                  +{boost.toFixed(1)} Tahun
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={boost}
                onChange={(e) => setBoost(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#d5c5ec] rounded-lg appearance-none cursor-pointer accent-[#7350b5]"
              />

              <div className="flex justify-between text-[10px] font-bold text-[#583794] mt-2">
                <span>Status Quo (+0 thn)</span>
                <span>Prioritas Maksimal (+3 thn)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Impact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Metric 1: Mean Nasional */}
            <div className="rounded-2xl border border-[#e7e2d7] bg-white p-5 shadow-sm">
              <span className="text-[10px] font-bold tracking-wider text-[#746e63] uppercase">
                Rata-Rata Nasional (Mean)
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#7350b5]">
                  {simMean.toFixed(2)}
                </span>
                <span className="text-xs text-[#746e63]">tahun</span>
              </div>
              <p className="mt-2 text-[11px] text-[#746e63]">
                Meningkat <strong className="text-emerald-700">+{(simMean - originalMean).toFixed(2)} thn</strong> dari baseline {originalMean.toFixed(2)} thn.
              </p>
            </div>

            {/* Metric 2: Range Gap */}
            <div className="rounded-2xl border border-[#e7e2d7] bg-white p-5 shadow-sm">
              <span className="text-[10px] font-bold tracking-wider text-[#746e63] uppercase">
                Rentang Kesenjangan (Gap)
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#23201d]">
                  {simGap.toFixed(2)}
                </span>
                <span className="text-xs text-[#746e63]">tahun</span>
              </div>
              <p className="mt-2 text-[11px] text-[#746e63]">
                Gap menyusut <strong className="text-emerald-700">{(originalGap - simGap).toFixed(2)} thn</strong> lebih sempit & merata.
              </p>
            </div>

            {/* Metric 3: Provinsi Terendah */}
            <div className="rounded-2xl border border-[#e7e2d7] bg-white p-5 shadow-sm">
              <span className="text-[10px] font-bold tracking-wider text-[#746e63] uppercase">
                RLS Terendah Terangkat
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#7350b5]">
                  {simMin.toFixed(2)}
                </span>
                <span className="text-xs text-[#746e63]">thn</span>
              </div>
              <p className="mt-2 text-[11px] text-[#746e63]">
                Baseline {originalMin.toFixed(2)} thn terangkat signifikan dengan fokus afirmasi.
              </p>
            </div>

            {/* Metric 4: Provinsi Tertinggi */}
            <div className="rounded-2xl border border-[#e7e2d7] bg-white p-5 shadow-sm">
              <span className="text-[10px] font-bold tracking-wider text-[#746e63] uppercase">
                RLS Tertinggi
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#23201d]">
                  {simMax.toFixed(2)}
                </span>
                <span className="text-xs text-[#746e63]">thn</span>
              </div>
              <p className="mt-2 text-[11px] text-[#746e63]">
                Tetap maju secara berkesinambungan ({simMax.toFixed(2)} thn).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
