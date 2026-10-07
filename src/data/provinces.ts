export interface Province {
  name: string;
  capital: string;
  region: 'Sumatera' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Bali & Nusa' | 'Maluku & Papua';
  value: number;
  longitude: number;
  latitude: number;
  rank: number;
  diff: number;
}

export const provinces: Province[] = [
  { name: "DKI Jakarta", capital: "Jakarta", region: "Jawa", longitude: 106.85, latitude: -6.18, value: 11.59, rank: 1, diff: 2.52 },
  { name: "Kepulauan Riau", capital: "Tanjungpinang", region: "Sumatera", longitude: 104.45, latitude: 0.92, value: 10.72, rank: 2, diff: 1.65 },
  { name: "Maluku", capital: "Ambon", region: "Maluku & Papua", longitude: 128.18, latitude: -3.7, value: 10.51, rank: 3, diff: 1.44 },
  { name: "DI Yogyakarta", capital: "Yogyakarta", region: "Jawa", longitude: 110.37, latitude: -7.8, value: 10.2, rank: 4, diff: 1.13 },
  { name: "Kalimantan Timur", capital: "Samarinda", region: "Kalimantan", longitude: 117.15, latitude: -0.5, value: 10.1, rank: 5, diff: 1.03 },
  { name: "Sumatera Utara", capital: "Medan", region: "Sumatera", longitude: 98.67, latitude: 3.59, value: 10.08, rank: 6, diff: 1.01 },
  { name: "Papua", capital: "Jayapura", region: "Maluku & Papua", longitude: 140.72, latitude: -2.53, value: 10.01, rank: 7, diff: 0.94 },
  { name: "Aceh", capital: "Banda Aceh", region: "Sumatera", longitude: 95.32, latitude: 5.55, value: 9.95, rank: 8, diff: 0.88 },
  { name: "Sulawesi Utara", capital: "Manado", region: "Sulawesi", longitude: 124.85, latitude: 1.47, value: 9.91, rank: 9, diff: 0.84 },
  { name: "Sumatera Barat", capital: "Padang", region: "Sumatera", longitude: 100.36, latitude: -0.95, value: 9.77, rank: 10, diff: 0.70 },
  { name: "Bali", capital: "Denpasar", region: "Bali & Nusa", longitude: 115.22, latitude: -8.65, value: 9.75, rank: 11, diff: 0.68 },
  { name: "Banten", capital: "Serang", region: "Jawa", longitude: 106.15, latitude: -6.12, value: 9.56, rank: 12, diff: 0.49 },
  { name: "Sulawesi Tenggara", capital: "Kendari", region: "Sulawesi", longitude: 122.51, latitude: -3.99, value: 9.56, rank: 12, diff: 0.49 },
  { name: "Riau", capital: "Pekanbaru", region: "Sumatera", longitude: 101.45, latitude: 0.51, value: 9.55, rank: 14, diff: 0.48 },
  { name: "Maluku Utara", capital: "Sofifi", region: "Maluku & Papua", longitude: 127.58, latitude: 0.74, value: 9.5, rank: 15, diff: 0.43 },
  { name: "Kalimantan Utara", capital: "Tanjung Selor", region: "Kalimantan", longitude: 117.37, latitude: 2.84, value: 9.44, rank: 16, diff: 0.37 },
  { name: "Bengkulu", capital: "Bengkulu", region: "Sumatera", longitude: 102.27, latitude: -3.8, value: 9.23, rank: 17, diff: 0.16 },
  { name: "Jawa Barat", capital: "Bandung", region: "Jawa", longitude: 107.61, latitude: -6.91, value: 9.14, rank: 18, diff: 0.07 },
  { name: "Sulawesi Tengah", capital: "Palu", region: "Sulawesi", longitude: 119.87, latitude: -0.9, value: 9.1, rank: 19, diff: 0.03 },
  { name: "Sulawesi Selatan", capital: "Makassar", region: "Sulawesi", longitude: 119.41, latitude: -5.15, value: 9.0, rank: 20, diff: -0.07 },
  { name: "Kalimantan Tengah", capital: "Palangkaraya", region: "Kalimantan", longitude: 113.92, latitude: -2.21, value: 8.96, rank: 21, diff: -0.11 },
  { name: "Jambi", capital: "Jambi", region: "Sumatera", longitude: 103.61, latitude: -1.61, value: 8.95, rank: 22, diff: -0.12 },
  { name: "Sumatera Selatan", capital: "Palembang", region: "Sumatera", longitude: 104.75, latitude: -2.99, value: 8.91, rank: 23, diff: -0.16 },
  { name: "Kalimantan Selatan", capital: "Banjarbaru", region: "Kalimantan", longitude: 114.83, latitude: -3.44, value: 8.81, rank: 24, diff: -0.26 },
  { name: "Papua Barat Daya", capital: "Sorong", region: "Maluku & Papua", longitude: 131.25, latitude: -0.88, value: 8.69, rank: 25, diff: -0.38 },
  { name: "Kepulauan Bangka Belitung", capital: "Pangkalpinang", region: "Sumatera", longitude: 106.12, latitude: -2.13, value: 8.65, rank: 26, diff: -0.42 },
  { name: "Papua Selatan", capital: "Merauke", region: "Maluku & Papua", longitude: 140.4, latitude: -8.49, value: 8.64, rank: 27, diff: -0.43 },
  { name: "Lampung", capital: "Bandar Lampung", region: "Sumatera", longitude: 105.27, latitude: -5.43, value: 8.61, rank: 28, diff: -0.46 },
  { name: "Jawa Timur", capital: "Surabaya", region: "Jawa", longitude: 112.75, latitude: -7.25, value: 8.39, rank: 29, diff: -0.68 },
  { name: "Gorontalo", capital: "Gorontalo", region: "Sulawesi", longitude: 123.06, latitude: 0.54, value: 8.38, rank: 30, diff: -0.69 },
  { name: "Sulawesi Barat", capital: "Mamuju", region: "Sulawesi", longitude: 118.89, latitude: -2.68, value: 8.31, rank: 31, diff: -0.76 },
  { name: "Nusa Tenggara Timur", capital: "Kupang", region: "Bali & Nusa", longitude: 123.61, latitude: -10.18, value: 8.22, rank: 32, diff: -0.85 },
  { name: "Nusa Tenggara Barat", capital: "Mataram", region: "Bali & Nusa", longitude: 116.12, latitude: -8.58, value: 8.21, rank: 33, diff: -0.86 },
  { name: "Jawa Tengah", capital: "Semarang", region: "Jawa", longitude: 110.42, latitude: -6.97, value: 8.15, rank: 34, diff: -0.92 },
  { name: "Kalimantan Barat", capital: "Pontianak", region: "Kalimantan", longitude: 109.34, latitude: -0.03, value: 8.07, rank: 35, diff: -1.00 },
  { name: "Papua Barat", capital: "Manokwari", region: "Maluku & Papua", longitude: 134.06, latitude: -0.86, value: 8.07, rank: 35, diff: -1.00 },
  { name: "Papua Tengah", capital: "Nabire", region: "Maluku & Papua", longitude: 135.5, latitude: -3.36, value: 6.13, rank: 37, diff: -2.94 },
  { name: "Papua Pegunungan", capital: "Wamena", region: "Maluku & Papua", longitude: 138.95, latitude: -4.1, value: 4.3, rank: 38, diff: -4.77 }
];

export const NATIONAL_AVG_OFFICIAL = 9.07;
export const DATASET_AVG = Number((provinces.reduce((sum, p) => sum + p.value, 0) / provinces.length).toFixed(2));
