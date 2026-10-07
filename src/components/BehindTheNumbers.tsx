import { useState } from 'react';
import { provinces } from '../data/provinces';

export function BehindTheNumbers() {
  const [activeTab, setActiveTab] = useState<'Mean' | 'Min' | 'Max' | 'Range'>('Mean');

  const values = provinces.map(p => p.value);
  const totalSum = values.reduce((a, b) => a + b, 0);
  const meanValue = (totalSum / provinces.length).toFixed(2);
  const minProv = provinces.reduce((prev, curr) => (curr.value < prev.value ? curr : prev), provinces[0]);
  const maxProv = provinces.reduce((prev, curr) => (curr.value > prev.value ? curr : prev), provinces[0]);
  const rangeValue = (maxProv.value - minProv.value).toFixed(2);

  // Kategori Distribusi untuk Diagram Lingkaran
  const catSangatTinggi = provinces.filter(p => p.value >= 10.0); // ≥ 10 Thn
  const catTinggi = provinces.filter(p => p.value >= 9.0 && p.value < 10.0); // 9.0 - 9.99 Thn
  const catSedang = provinces.filter(p => p.value >= 8.0 && p.value < 9.0); // 8.0 - 8.99 Thn
  const catPrioritas = provinces.filter(p => p.value < 8.0); // < 8.0 Thn

  const totalProvs = provinces.length;
  const pctSangatTinggi = ((catSangatTinggi.length / totalProvs) * 100).toFixed(1);
  const pctTinggi = ((catTinggi.length / totalProvs) * 100).toFixed(1);
  const pctSedang = ((catSedang.length / totalProvs) * 100).toFixed(1);
  const pctPrioritas = ((catPrioritas.length / totalProvs) * 100).toFixed(1);

  // Perhitungan SVG Pie Chart Slice Angles
  const slices = [
    { label: '≥ 10.0 Tahun (Sangat Tinggi)', count: catSangatTinggi.length, pct: Number(pctSangatTinggi), color: '#583794', badgeBg: 'bg-[#583794]' },
    { label: '9.0 – 9.99 Tahun (Tinggi)', count: catTinggi.length, pct: Number(pctTinggi), color: '#7350b5', badgeBg: 'bg-[#7350b5]' },
    { label: '8.0 – 8.99 Tahun (Sedang)', count: catSedang.length, pct: Number(pctSedang), color: '#a68bd7', badgeBg: 'bg-[#a68bd7]' },
    { label: '< 8.0 Tahun (Prioritas Khusus)', count: catPrioritas.length, pct: Number(pctPrioritas), color: '#e5dcbe', badgeBg: 'bg-[#c4b68e]' },
  ];

  // SVG Pie chart helper
  let cumulativeAngle = 0;
  const piePaths = slices.map((slice) => {
    const angle = (slice.pct / 100) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const x1 = 50 + 40 * Math.cos((Math.PI * (startAngle - 90)) / 180);
    const y1 = 50 + 40 * Math.sin((Math.PI * (startAngle - 90)) / 180);
    const x2 = 50 + 40 * Math.cos((Math.PI * (endAngle - 90)) / 180);
    const y2 = 50 + 40 * Math.sin((Math.PI * (endAngle - 90)) / 180);
    const largeArc = angle > 180 ? 1 : 0;

    const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return { ...slice, pathData };
  });

  const tabDetails = {
    Mean: {
      subtitle: 'NILAI RATA-RATA (MEAN)',
      formula: `${totalSum.toFixed(2).replace('.', ',')} ÷ 38 provinsi`,
      number: meanValue.replace('.', ','),
      unit: 'tahun',
      detail: `Semua nilai RLS 38 provinsi dijumlahkan (${totalSum.toFixed(2).replace('.', ',')}), kemudian dibagi total 38 provinsi. Hasil rata-rata mean adalah ${meanValue.replace('.', ',')} tahun.`
    },
    Min: {
      subtitle: 'NILAI TERENDAH (MINIMUM)',
      formula: `${minProv.name}`,
      number: minProv.value.toFixed(2).replace('.', ','),
      unit: 'tahun',
      detail: `Provinsi dengan RLS terendah di Indonesia pada dataset 2025 adalah ${minProv.name} (${minProv.value.toFixed(2).replace('.', ',')} tahun).`
    },
    Max: {
      subtitle: 'NILAI TERTINGGI (MAKSIMUM)',
      formula: `${maxProv.name}`,
      number: maxProv.value.toFixed(2).replace('.', ','),
      unit: 'tahun',
      detail: `Provinsi dengan RLS tertinggi di Indonesia pada dataset 2025 adalah ${maxProv.name} (${maxProv.value.toFixed(2).replace('.', ',')} tahun).`
    },
    Range: {
      subtitle: 'RENTANG KESENJANGAN (RANGE)',
      formula: `${maxProv.value.toFixed(2).replace('.', ',')} − ${minProv.value.toFixed(2).replace('.', ',')}`,
      number: rangeValue.replace('.', ','),
      unit: 'tahun selisih',
      detail: `Rentang kesenjangan (range) antara provinsi tertinggi (${maxProv.name}) dan terendah (${minProv.name}) mencapai ${rangeValue.replace('.', ',')} tahun.`
    }
  };

  const currentTabInfo = tabDetails[activeTab];

  return (
    <section id="numbers" className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] items-start">
        {/* Left column: Title, desc, and tabs */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f0ebd8] text-[10px] font-bold text-[#5c4a1e]">
              04
            </span>
            <span className="text-[11px] font-bold tracking-widest text-[#746e63]">
              DI BALIK ANGKA
            </span>
          </div>

          <h2 className="font-display text-[24px] font-extrabold tracking-[-0.6px] sm:text-[28px] text-[#23201d]">
            Matematika yang Mudah Dipahami.
          </h2>

          <p className="mt-3 text-[13px] leading-relaxed text-[#746e63]">
            Tidak ada rumus rumit. Hanya angka nyata dengan makna mendalam. Mari kita uraikan data statistik dan sebarannya.
          </p>

          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Statistical breakdown">
            {(['Mean', 'Min', 'Max', 'Range'] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl border px-4 py-2 text-xs font-bold transition shadow-sm ${
                  activeTab === tab
                    ? 'border-[#7350b5] bg-[#7350b5] text-white'
                    : 'border-[#e7e2d7] bg-white text-[#583794] hover:bg-[#ebe4f8]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Stat Card */}
          <div className="mt-6 rounded-[22px] border border-[#e7e2d7] bg-white p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#746e63]">
                  {currentTabInfo.subtitle}
                </p>
                <p className="mt-1 font-display text-[20px] font-extrabold text-[#23201d]">
                  {currentTabInfo.formula}
                </p>
              </div>
              <div className="shrink-0 rounded-xl bg-[#ebe4f8] px-4 py-2.5 text-right">
                <span className="text-xs font-bold text-[#583794] mr-1">=</span>
                <span className="text-xl font-extrabold text-[#7350b5]">{currentTabInfo.number}</span>
                <span className="ml-1 text-[11px] font-medium text-[#583794]">{currentTabInfo.unit}</span>
              </div>
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-[#746e63]">
              {currentTabInfo.detail}
            </p>
          </div>
        </div>

        {/* Right column: Interactive Pie Chart (Diagram Lingkaran Persentase) */}
        <div className="rounded-[22px] border border-[#e7e2d7] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-4">
            <div>
              <span className="rounded-md bg-[#faecc2] px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#6d5a1b]">
                DIAGRAM LINGKARAN
              </span>
              <h3 className="mt-1 text-base font-bold text-[#23201d]">
                Distribusi RLS 38 Provinsi Indonesia (2025)
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#746e63]">
              Total 38 Provinsi
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-6">
            {/* SVG Pie Chart */}
            <div className="relative mx-auto flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-44 w-44 drop-shadow-sm transition-transform duration-500 hover:scale-105">
                {piePaths.map((slice, idx) => (
                  <path
                    key={idx}
                    d={slice.pathData}
                    fill={slice.color}
                    className="cursor-pointer transition-opacity duration-200 hover:opacity-85"
                  >
                    <title>{`${slice.label}: ${slice.count} provinsi (${slice.pct}%)`}</title>
                  </path>
                ))}
                {/* Donut inner hole for modern aesthetics */}
                <circle cx="50" cy="50" r="22" fill="#ffffff" />
                <text x="50" y="48" textAnchor="middle" className="text-[9px] font-extrabold fill-[#23201d]">
                  {meanValue}
                </text>
                <text x="50" y="58" textAnchor="middle" className="text-[6px] font-bold fill-[#746e63]">
                  Mean Nas.
                </text>
              </svg>
            </div>

            {/* Legend & Breakdown */}
            <div className="space-y-3">
              {slices.map((slice, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-[#f0ebd8] bg-[#fbf9f4] p-2.5 transition hover:bg-[#f3efe6]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`h-3 w-3 shrink-0 rounded-full ${slice.badgeBg}`} />
                    <div>
                      <p className="text-[12px] font-semibold text-[#23201d]">
                        {slice.label}
                      </p>
                      <p className="text-[10px] text-[#746e63]">
                        {slice.count} Provinsi
                      </p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-[#583794] shadow-sm border border-[#e7e2d7]">
                    {slice.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-[#f9f6ee] p-3 border border-[#e7e2d7]">
            <p className="text-[11px] leading-relaxed text-[#746e63]">
              <strong className="text-[#23201d]">Insight Distribusi:</strong> Mayoritas provinsi di Indonesia ({pctTinggi}% + {pctSedang}% = {(Number(pctTinggi) + Number(pctSedang)).toFixed(1)}%) berada pada rentang RLS 8.0 hingga 9.99 tahun. Sebanyak 7 provinsi telah melampaui 10.0 tahun (lulus SMP menuju SMA/PT).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
