import { useState } from 'react';
import { provinces, Province, NATIONAL_AVG_OFFICIAL } from '../data/provinces';
import { SectionBadge } from './SectionBadge';
import { InteractiveMap } from './InteractiveMap';

interface Section01Props {
  onSelectProvince?: (p: Province) => void;
}

export function Section01BigPicture({ onSelectProvince }: Section01Props) {
  const [selected, setSelected] = useState<Province>(provinces[0]); // Default DKI Jakarta
  const [activeRegion, setActiveRegion] = useState<string>('ALL');

  const regions = ['ALL', 'Sumatera', 'Jawa', 'Kalimantan', 'Sulawesi', 'Bali & Nusa', 'Maluku & Papua'];

  const filteredProvinces = activeRegion === 'ALL'
    ? provinces
    : provinces.filter(p => p.region === activeRegion);

  const handleSelect = (p: Province) => {
    setSelected(p);
    if (onSelectProvince) {
      onSelectProvince(p);
    }
  };

  return (
    <section id="explore" className="mx-auto max-w-[1200px] px-4 sm:px-6 py-10 lg:px-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <SectionBadge number="01">GAMBARAN BESAR</SectionBadge>
          <h2 className="font-display text-[24px] font-extrabold tracking-[-0.6px] sm:text-[28px] text-[#23201d]">
            Satu Indonesia. Banyak cerita.
          </h2>
          <p className="mt-2 text-[13px] text-[#746e63]">
            Klik pin di peta atau pilih provinsi di bawah untuk melihat potret rata-rata lama sekolah.
          </p>
        </div>

        {/* National Benchmark Pill */}
        <div className="flex items-center gap-2 rounded-full border border-[#e7e2d7] bg-white px-4 py-2 text-xs shadow-sm self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-[#7350b5] animate-pulse" />
          <span className="text-[#746e63]">Rata-rata Nasional BPS:</span>
          <strong className="font-bold text-[#583794]">{NATIONAL_AVG_OFFICIAL} tahun</strong>
        </div>
      </div>

      {/* Region Filter Bar */}
      <div className="mt-6 flex flex-wrap gap-2">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              activeRegion === region
                ? 'bg-[#7350b5] text-white shadow-sm'
                : 'bg-white text-[#746e63] border border-[#e7e2d7] hover:bg-[#ebe4f8] hover:text-[#583794]'
            }`}
          >
            {region === 'ALL' ? 'Semua Wilayah' : region}
          </button>
        ))}
      </div>

      {/* Interactive Map */}
      <div className="mt-4 rounded-[22px] border border-[#e7e2d7] bg-white p-2 sm:p-4 shadow-sm">
        <InteractiveMap selected={selected} onSelect={handleSelect} />
      </div>

      {/* Province Spotlight Card & Quick Selector */}
      <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Spotlight Details */}
        <div className="rounded-[22px] border border-[#e7e2d7] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-3">
            <span className="rounded-md bg-[#ebe4f8] px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#583794]">
              SOROTAN PROVINSI
            </span>
            <span className="text-xs font-semibold text-[#746e63]">
              Ibu kota: <strong className="text-[#23201d]">{selected.capital}</strong>
            </span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-[22px] font-extrabold text-[#23201d]">
                {selected.name}
              </h3>
              <p className="text-xs text-[#746e63]">
                Wilayah {selected.region} · Peringkat #{selected.rank} dari 38 Provinsi
              </p>
            </div>

            <div className="flex items-baseline gap-2 rounded-2xl bg-[#f9f6ee] p-4 border border-[#e7e2d7]">
              <span className="font-display text-3xl font-extrabold text-[#7350b5]">
                {selected.value.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-[#746e63]">tahun</span>
            </div>
          </div>

          {/* Progress Bar vs 16 Years Benchmark */}
          <div className="mt-5">
            <div className="flex justify-between text-[11px] font-semibold text-[#746e63] mb-1.5">
              <span>Rata-rata lama sekolah</span>
              <span>16 tahun (S1)</span>
            </div>
            <div className="h-3 w-full rounded-full bg-[#ebe4f8] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#7350b5] transition-all duration-500"
                style={{ width: `${Math.min(100, (selected.value / 16) * 100)}%` }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#fbf9f4] p-3 text-xs text-[#746e63]">
            <span>Selisih terhadap Rata-rata Nasional (9,07 thn):</span>
            <span className={`font-bold ${selected.diff >= 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
              {selected.diff >= 0 ? `+${selected.diff.toFixed(2)} thn` : `${selected.diff.toFixed(2)} thn`}
            </span>
          </div>
        </div>

        {/* Quick Province Jump List */}
        <div className="rounded-[22px] border border-[#e7e2d7] bg-white p-5 shadow-sm max-h-[340px] flex flex-col">
          <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-3 mb-3">
            <h4 className="text-xs font-bold tracking-wider text-[#746e63] uppercase">
              Daftar Provinsi ({filteredProvinces.length})
            </h4>
            <span className="text-[11px] text-[#746e63]">Klik untuk pilih</span>
          </div>

          <div className="overflow-y-auto space-y-1.5 pr-1 flex-1">
            {filteredProvinces.map((p) => (
              <button
                key={p.name}
                onClick={() => handleSelect(p)}
                className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                  selected.name === p.name
                    ? 'bg-[#7350b5] text-white shadow-sm'
                    : 'bg-[#fbf9f4] text-[#23201d] hover:bg-[#ebe4f8] hover:text-[#583794]'
                }`}
              >
                <span>{p.name}</span>
                <span className={selected.name === p.name ? 'text-white' : 'text-[#7350b5]'}>
                  {p.value.toFixed(2)} thn
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
