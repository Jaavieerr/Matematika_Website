export interface Question {
  text: string;
  choices: string[];
  correct: number;
  explanation: string;
}

export const quizQuestions: Question[] = [
  {
    text: "Kalau ingin tahu lama pendidikan yang sudah diselesaikan, angka apa yang kita lihat?",
    choices: ["Rata-rata umur saat lulus", "Rata-rata Lama Sekolah", "Jumlah jam belajar sehari"],
    correct: 1,
    explanation: "Video 1: RLS melihat tahun pendidikan formal yang sudah diselesaikan. Bukan umur lulus atau jam belajar per hari."
  },
  {
    text: "Seorang anak lulus SMK umur 18 tahun. Apakah lama sekolahnya otomatis 18 tahun?",
    choices: ["Ya, umur lulus sama dengan lama sekolah", "Ya, karena semua tahun sejak lahir dihitung", "Tidak, yang dihitung tahun pendidikan yang diselesaikan"],
    correct: 2,
    explanation: "Video 1 membedakan umur dan lama pendidikan. Umur 18 tahun bukan berarti sudah menyelesaikan 18 tahun sekolah."
  },
  {
    text: "Dalam pengukuran pembangunan manusia, RLS melihat pendidikan kelompok mana?",
    choices: ["Penduduk usia 25 tahun ke atas", "Hanya siswa yang masih sekolah", "Hanya orang yang baru lulus"],
    correct: 0,
    explanation: "Video 1: kelompok yang dihitung adalah penduduk usia 25 tahun ke atas. Jadi, RLS bukan cuma cerita siswa saat ini."
  },
  {
    text: "RLS suatu daerah lebih rendah. Kesimpulan mana yang paling masuk akal?",
    choices: ["Warganya pasti kurang pintar", "Kesempatan pendidikannya perlu kita perhatikan", "Mutu semua sekolahnya pasti buruk"],
    correct: 1,
    explanation: "Video 1: lama sekolah bukan ukuran kecerdasan dan belum menjelaskan mutu pembelajaran. Angkanya mengajak kita menelusuri kesempatan yang tersedia."
  },
  {
    text: "Menurut video, kenapa pendidikan penting untuk masa depan?",
    choices: ["Karena menjamin semua orang mendapat pekerjaan yang sama", "Karena lama sekolah saja sudah menceritakan seluruh kemampuan", "Karena dapat memperluas pilihan kerja dan membantu memahami informasi"],
    correct: 2,
    explanation: "Video 1: pendidikan dapat membuka lebih banyak pilihan. Tetapi bukan jaminan pekerjaan tertentu atau satu-satunya ukuran kemampuan."
  },
  {
    text: "Dua anak sama-sama semangat sekolah, tapi satu harus menyeberangi sungai. Dukungan apa yang paling sesuai?",
    choices: ["Menyediakan perjalanan ke sekolah yang aman", "Meminta anak itu lebih semangat saja", "Memberi tugas lebih banyak saat ia terlambat"],
    correct: 0,
    explanation: "Video 2: hambatannya ada pada perjalanan. Semangat penting, tetapi transportasi yang aman membantu mengatasi rintangan yang sebenarnya."
  },
  {
    text: "Anak tidak bisa hadir karena perjalanan terhambat cuaca. Apa yang sebaiknya kita pahami dulu?",
    choices: ["Ia pasti sengaja tidak masuk", "Ia tidak punya cita-cita", "Ketidakhadirannya bisa disebabkan hambatan akses"],
    correct: 2,
    explanation: "Video 2: cuaca bisa menghambat perjalanan. Kita perlu memahami penyebabnya sebelum menilai kemauan anak untuk belajar."
  },
  {
    text: "Keluarga kesulitan membayar ongkos sekolah dan buku. Bantuan mana yang paling tepat sasaran?",
    choices: ["Menambah aturan seragam baru", "Membantu biaya perjalanan dan kebutuhan belajar", "Meminta mereka menyelesaikan masalah sendiri"],
    correct: 1,
    explanation: "Video 2: biaya dapat membuat pendidikan sulit dilanjutkan. Bantuan yang sesuai menyasar ongkos dan kebutuhan yang menjadi hambatan."
  },
  {
    text: "Semua anak tinggal di provinsi yang sama. Apakah pengalaman sekolah mereka pasti sama?",
    choices: ["Tidak, akses dan keadaan keluarga bisa berbeda", "Ya, karena angka RLS provinsinya sama", "Ya, kalau cita-cita mereka sama"],
    correct: 0,
    explanation: "Video 2 mengingatkan bahwa warga satu provinsi tidak selalu punya pengalaman seragam. Satu angka tidak merangkum seluruh cerita."
  },
  {
    text: "Sekolah sudah dekat, tapi guru dan fasilitas terbatas. Apa yang masih perlu diperbaiki?",
    choices: ["Jarak rumah ke sekolah saja", "Dukungan belajar, termasuk guru dan fasilitas", "Semangat siswa saja"],
    correct: 1,
    explanation: "Video 2: akses bukan cuma soal jarak. Guru, fasilitas, listrik, dan jaringan juga dapat memengaruhi kesempatan belajar."
  },
  {
    text: "Di video, empat orang punya 6, 6, 6, dan 12 balok pendidikan. Kalau dibagi rata, berapa balok per orang?",
    choices: ["6 balok", "12 balok", "7,5 balok"],
    correct: 2,
    explanation: "Video 3: totalnya 30 balok. Dibagi 4 orang menjadi 7,5. Rata-rata tidak harus sama dengan jumlah balok milik salah satu orang."
  },
  {
    text: "Dua daerah punya jumlah penduduk berbeda. Kenapa angka nasional tidak cukup dihitung dengan membagi dua rata-rata daerahnya?",
    choices: ["Karena banyaknya orang di setiap daerah ikut menentukan", "Karena cukup memakai angka daerah yang lebih tinggi", "Karena setiap daerah harus dianggap punya penduduk sama"],
    correct: 0,
    explanation: "Video 3: setiap orang ikut dalam penghitungan. Daerah dengan penduduk lebih banyak tidak bisa otomatis diberi bobot yang sama dengan daerah berpenduduk lebih sedikit."
  },
  {
    text: "Hanya kelompok yang sudah tinggi mendapat tambahan pendidikan. Rata-rata naik. Apakah jaraknya dengan kelompok rendah pasti mengecil?",
    choices: ["Ya, rata-rata naik selalu berarti makin merata", "Belum tentu, jaraknya justru bisa melebar", "Ya, selama angka tertinggi terus naik"],
    correct: 1,
    explanation: "Video 3: rata-rata bisa membaik tanpa pemerataan. Kalau hanya kelompok yang sudah tinggi bertambah, kelompok lainnya bisa makin jauh tertinggal."
  },
  {
    text: "Kelompok yang lebih rendah mendapat tambahan pendidikan, mendekati kelompok tinggi yang tetap. Apa yang bisa terjadi?",
    choices: ["Rata-rata harus tetap, walaupun ada tambahan", "Jarak pasti melebar karena hanya satu kelompok bertambah", "Rata-rata naik dan jarak antarkelompok mengecil"],
    correct: 2,
    explanation: "Video 3: saat kelompok yang lebih rendah mendekati kelompok tinggi, jumlah pendidikan bertambah dan kesenjangannya berkurang. Perhatikan keduanya, bukan rata-rata saja."
  },
  {
    text: "Bantuan pendidikan mulai diberikan hari ini. Apa harapan yang paling masuk akal?",
    choices: ["Perubahan butuh waktu; lihat juga siapa yang terjangkau", "Angka RLS pasti langsung melonjak hari ini", "Cukup melihat rata-rata, tanpa memeriksa pemerataan"],
    correct: 0,
    explanation: "Video 3: perubahan nyata membutuhkan waktu. Selain mengikuti rata-rata, kita perlu melihat apakah dukungan menjangkau orang yang sebelumnya kesulitan."
  }
];
