import { useState } from 'react';
import { provinces } from '../data/provinces';

export function BehindTheNumbers() {
  const [activeTab, setActiveTab] = useState<'Mean' | 'Median' | 'Min' | 'Max' | 'Range'>('Mean');

  const values = provinces.map(p => p.value);
  const totalSum = values.reduce((a, b) => a + b, 0);
  const totalCount = provinces.length;
  const meanValue = totalSum / totalCount; // 9.02947... -> 9.03

  // Median calculation
  const sortedValues = [...values].sort((a, b) => a - b);
  const medianValue = (sortedValues[18] + sortedValues[19]) / 2; // 9.00 + 8.96 / 2 or exact median

  const minProv = provinces.reduce((prev, curr) => (curr.value < prev.value ? curr : prev), provinces[0]);
  const maxProv = provinces.reduce((prev, curr) => (curr.value > prev.value ? curr : prev), provinces[0]);
  const rangeValue = maxProv.value - minProv.value;

  // Persentase capaian terhadap standar pendidikan sarjana (16 tahun)
  const BENCHMARK = 16.0;

  // Persentase perhitungan (setelah pembagian x 100%)
  const meanPercent = ((meanValue / BENCHMARK) * 100).toFixed(1);
  const medianPercent = ((medianValue / BENCHMARK) * 100).toFixed(1);
  const minPercent = ((minProv.value / BENCHMARK) * 100).toFixed(1);
  const maxPercent = ((maxProv.value / BENCHMARK) * 100).toFixed(1);
  const rangePercent = ((rangeValue / BENCHMARK) * 100).toFixed(1);

  // Kategori Distribusi 38 Provinsi
  const catSangatTinggi = provinces.filter(p => p.value >= 10.0); // ≥ 10 Thn
  const catTinggi = provinces.filter(p => p.value >= 9.0 && p.value < 10.0); // 9.0 - 9.99 Thn
  const catSedang = provinces.filter(p => p.value >= 8.0 && p.value < 9.0); // 8.0 - 8.99 Thn
  const catPrioritas = provinces.filter(p => p.value < 8.0); // < 8.0 Thn

  const pctSangatTinggi = ((catSangatTinggi.length / totalCount) * 100).toFixed(1);
  const pctTinggi = ((catTinggi.length / totalCount) * 100).toFixed(1);
  const pctSedang = ((catSedang.length / totalCount) * 100).toFixed(1);
  const pctPrioritas = ((catPrioritas.length / totalCount) * 100).toFixed(1);

  // Dynamic Pie slices based on active tab
  const getDynamicSlices = () => {
    if (activeTab === 'Mean') {
      const p = Number(meanPercent);
      return [
        { label: 'Capaian Rata-rata Nasional (Mean)', pct: p, color: '#7350b5', badgeBg: 'bg-[#7350b5]', desc: `${meanValue.toFixed(2)} dari 16 thn` },
        { label: 'Sisa Gap Menuju Jenjang Penuh (16 Thn)', pct: Number((100 - p).toFixed(1)), color: '#ebe4f8', badgeBg: 'bg-[#ebe4f8]', desc: `${(16 - meanValue).toFixed(2)} tahun lagi` }
      ];
    }
    if (activeTab === 'Median') {
      const p = Number(medianPercent);
      return [
        { label: 'Nilai Tengah Nasional (Median)', pct: p, color: '#6845a7', badgeBg: 'bg-[#6845a7]', desc: `${medianValue.toFixed(2)} dari 16 thn` },
        { label: 'Sisa Gap Menuju 16 Tahun', pct: Number((100 - p).toFixed(1)), color: '#f0e8fa', badgeBg: 'bg-[#f0e8fa]', desc: `${(16 - medianValue).toFixed(2)} tahun lagi` }
      ];
    }
    if (activeTab === 'Min') {
      const p = Number(minPercent);
      return [
        { label: `Provinsi Terendah (${minProv.name})`, pct: p, color: '#c4b68e', badgeBg: 'bg-[#c4b68e]', desc: `${minProv.value.toFixed(2)} dari 16 thn` },
        { label: 'Kesenjangan Akses yang Harus Dikejar', pct: Number((100 - p).toFixed(1)), color: '#f7f4e9', badgeBg: 'bg-[#f7f4e9]', desc: `${(16 - minProv.value).toFixed(2)} tahun lagi` }
      ];
    }
    if (activeTab === 'Max') {
      const p = Number(maxPercent);
      return [
        { label: `Provinsi Tertinggi (${maxProv.name})`, pct: p, color: '#583794', badgeBg: 'bg-[#583794]', desc: `${maxProv.value.toFixed(2)} dari 16 thn` },
        { label: 'Sisa Capaian Menuju 16 Tahun', pct: Number((100 - p).toFixed(1)), color: '#ebe4f8', badgeBg: 'bg-[#ebe4f8]', desc: `${(16 - maxProv.value).toFixed(2)} tahun lagi` }
      ];
    }
    // Range
    const p = Number(rangePercent);
    return [
      { label: 'Besaran Rentang Kesenjangan (Range)', pct: p, color: '#e58080', badgeBg: 'bg-[#e58080]', desc: `${rangeValue.toFixed(2)} tahun perbedaan` },
      { label: 'Tingkat Pemerataan Baseline', pct: Number((100 - p).toFixed(1)), color: '#f3efe6', badgeBg: 'bg-[#f3efe6]', desc: 'Ruang intervensi afirmasi' }
    ];
  };

  const dynamicSlices = getDynamicSlices();

  // Pie chart calculation
  let cumulativeAngle = 0;
  const piePaths = dynamicSlices.map((slice) => {
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
      formula: `(343,12 ÷ 38) ÷ 16 × 100%`,
      number: `${meanPercent}%`,
      subnumber: `${meanValue.toFixed(2).replace('.', ',')} thn`,
      detail: `Total nilai RLS 38 provinsi (343,12) dibagi 38 provinsi = 9,03 tahun. Terhadap standar 16 tahun (sarjana), rata-rata pencapaian nasional berada di angka ${meanPercent}%.`
    },
    Median: {
      subtitle: 'NILAI TENGAH (MEDIAN)',
      formula: `(8,98 ÷ 16) × 100%`,
      number: `${medianPercent}%`,
      subnumber: `${medianValue.toFixed(2).replace('.', ',')} thn`,
      detail: `Nilai tengah dari 38 provinsi setelah diurutkan adalah ${medianValue.toFixed(2).replace('.', ',')} tahun, atau setara dengan ${medianPercent}% dari standar 16 tahun.`
    },
    Min: {
      subtitle: 'NILAI TERENDAH (MINIMUM)',
      formula: `(${minProv.value.toFixed(2).replace('.', ',')} ÷ 16) × 100%`,
      number: `${minPercent}%`,
      subnumber: `${minProv.name} (${minProv.value.toFixed(2).replace('.', ',')} thn)`,
      detail: `Provinsi dengan RLS terendah di Indonesia adalah ${minProv.name} (${minProv.value.toFixed(2).replace('.', ',')} tahun), mencerminkan ${minPercent}% standar capaian.`
    },
    Max: {
      subtitle: 'NILAI TERTINGGI (MAKSIMUM)',
      formula: `(${maxProv.value.toFixed(2).replace('.', ',')} ÷ 16) × 100%`,
      number: `${maxPercent}%`,
      subnumber: `${maxProv.name} (${maxProv.value.toFixed(2).replace('.', ',')} thn)`,
      detail: `Provinsi dengan RLS tertinggi adalah ${maxProv.name} (${maxProv.value.toFixed(2).replace('.', ',')} tahun), mencapai ${maxPercent}% standar capaian 16 tahun.`
    },
    Range: {
      subtitle: 'RENTANG KESENJANGAN (RANGE)',
      formula: `(${rangeValue.toFixed(2).replace('.', ',')} ÷ 16) × 100%`,
      number: `${rangePercent}%`,
      subnumber: `${rangeValue.toFixed(2).replace('.', ',')} thn selisih`,
      detail: `Rentang selisih antara provinsi tertinggi (${maxProv.name}) dan terendah (${minProv.name}) mencapai ${rangeValue.toFixed(2).replace('.', ',')} tahun (${rangePercent}% dari standar).`
    }
  };

  const currentTabInfo = tabDetails[activeTab];

  return (
    <section id="numbers" className="mx-auto max-w-[1200px] px-4 sm:px-6 py-6 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] items-start">
        {/* Left column: Title, desc, and tabs */}
        <div>
          <div className="mb-2 flex items-center gap-2">
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

          <p className="mt-2 text-[13px] leading-relaxed text-[#746e63]">
            Tidak ada rumus rumit. Hanya angka nyata dengan makna mendalam. Klik tab di bawah untuk melihat dinamika persentase diagram lingkaran.
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Statistical breakdown">
            {(['Mean', 'Median', 'Min', 'Max', 'Range'] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl border px-3.5 py-1.5 text-xs font-bold transition shadow-sm ${
                  activeTab === tab
                    ? 'border-[#7350b5] bg-[#7350b5] text-white'
                    : 'border-[#e7e2d7] bg-white text-[#583794] hover:bg-[#ebe4f8]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Stat Card with Percentage x 100% */}
          <div className="mt-5 rounded-[22px] border border-[#e7e2d7] bg-white p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#746e63]">
                  {currentTabInfo.subtitle}
                </p>
                <p className="mt-1 font-display text-[18px] sm:text-[20px] font-extrabold text-[#23201d]">
                  {currentTabInfo.formula}
                </p>
              </div>
              <div className="shrink-0 rounded-xl bg-[#ebe4f8] px-4 py-2 text-right">
                <span className="text-xs font-bold text-[#583794] mr-1">=</span>
                <span className="text-xl font-extrabold text-[#7350b5]">{currentTabInfo.number}</span>
                <p className="text-[10px] font-semibold text-[#746e63] mt-0.5">{currentTabInfo.subnumber}</p>
              </div>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-[#746e63]">
              {currentTabInfo.detail}
            </p>
          </div>
        </div>

        {/* Right column: Dynamic Pie Chart (Diagram Lingkaran Persentase) */}
        <div className="rounded-[22px] border border-[#e7e2d7] bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#e7e2d7] pb-3">
            <div>
              <span className="rounded-md bg-[#faecc2] px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#6d5a1b]">
                DIAGRAM LINGKARAN PERSENTASE
              </span>
              <h3 className="mt-1 text-sm sm:text-base font-bold text-[#23201d]">
                Dinamika {activeTab}: Distribusi & Rasio Persentase (2025)
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#746e63]">
              38 Provinsi
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-[160px_1fr] items-center gap-5">
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
                    <title>{`${slice.label}: ${slice.pct}%`}</title>
                  </path>
                ))}
                {/* Donut inner hole */}
                <circle cx="50" cy="50" r="22" fill="#ffffff" />
                <text x="50" y="47" textAnchor="middle" className="text-[9.5px] font-extrabold fill-[#7350b5]">
                  {currentTabInfo.number}
                </text>
                <text x="50" y="57" textAnchor="middle" className="text-[6.5px] font-bold fill-[#746e63]">
                  {activeTab}
                </text>
              </svg>
            </div>

            {/* Dynamic Legend based on Tab */}
            <div className="space-y-2.5">
              {dynamicSlices.map((slice, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-[#f0ebd8] bg-[#fbf9f4] p-2.5 transition hover:bg-[#f3efe6]"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 shrink-0 rounded-full ${slice.badgeBg}`} />
                    <div>
                      <p className="text-[11px] font-semibold text-[#23201d]">
                        {slice.label}
                      </p>
                      <p className="text-[10px] text-[#746e63]">
                        {slice.desc}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-white px-2 py-0.5 text-xs font-bold text-[#583794] shadow-sm border border-[#e7e2d7]">
                    {slice.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-[#f9f6ee] p-3 border border-[#e7e2d7]">
            <p className="text-[11px] leading-relaxed text-[#746e63]">
              <strong className="text-[#23201d]">Distribusi Total Provinsi:</strong> ≥10 thn ({pctSangatTinggi}%), 9.0–9.99 thn ({pctTinggi}%), 8.0–8.99 thn ({pctSedang}%), dan &lt;8.0 thn ({pctPrioritas}%).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
