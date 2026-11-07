import {
  ComicPublication,
  LearningObjectiveData,
  MaterialModule,
  QuizQuestion,
  TeacherProfile,
  StudentProgress
} from '../types';

export const DEFAULT_TEACHER_PROFILE: TeacherProfile = {
  name: 'Suwandi, S.Pd.',
  title: 'Guru Matematika SMKN 4 Soppeng',
  school: 'SMKN 4 Soppeng',
  year: '2026',
  grade: 'Kelas X',
  phase: 'Fase E',
  subject: 'Matematika',
  seriesTitle: 'SERI MATEMATIKA MENYENANGKAN',
  topicTitle: 'MENEMUKAN AKAR-AKAR PERSAMAAN KUADRAT',
  appDescription:
    'Selamat datang di Matematika Adventure! Mari menjelajahi dunia persamaan kuadrat melalui komik, eksperimen matematika, permainan, dan tantangan menarik.',
  coverImageUrl: '/src/assets/images/comic_cover_hero_1794015828898.jpg'
};

export const DEFAULT_OBJECTIVES: LearningObjectiveData = {
  capaianPembelajaran:
    'Di akhir fase E, peserta didik dapat menyelesaikan masalah yang berkaitan dengan persamaan dan fungsi kuadrat (termasuk akar-akar persamaan kuadrat) serta memodelkan fenomena kontekstual dalam bidang kejuruan dan kehidupan sehari-hari.',
  tujuanPembelajaran: [
    'Memahami konsep dan bentuk umum persamaan kuadrat ax² + bx + c = 0 dengan a ≠ 0.',
    'Menemukan dan menentukan akar-akar persamaan kuadrat menggunakan metode faktorisasi.',
    'Menentukan akar-akar persamaan kuadrat dengan melengkapkan kuadrat sempurna secara sistematis.',
    'Menentukan akar-akar persamaan kuadrat menggunakan rumus kuadratik (Rumus ABC).',
    'Menganalisis jenis-jenis akar persamaan kuadrat berdasarkan nilai diskriminan (D = b² - 4ac).',
    'Menerapkan konsep persamaan kuadrat dalam menyelesaikan masalah kontekstual kejuruan di SMK (teknik mesin, ketenagalistrikan, teknologi informasi, dan rekayasa konstruksi).'
  ],
  indikatorKetercapaian: [
    'Peserta didik dapat mengidentifikasi nilai koefisien a, b, dan konstanta c dari persamaan kuadrat.',
    'Peserta didik mampu membuktikan apakah suatu nilai x merupakan akar dari persamaan kuadrat.',
    'Peserta didik terampil memfaktorkan persamaan kuadrat bentuk x² + bx + c = 0 dan ax² + bx + c = 0.',
    'Peserta didik dapat mengubah bentuk ax² + bx + c = 0 menjadi bentuk kuadrat sempurna (x + p)² = q.',
    'Peserta didik mampu menghitung nilai diskriminan dan menginterpretasikan grafik parabola serta titik potongnya.',
    'Peserta didik dapat menyelesaikan soal terapan kejuruan dengan presisi dan logis.'
  ],
  materiPrasyarat: [
    'Operasi Aljabar Dasar (Penjumlahan, Pengurangan, Perkalian Suku Aljabar)',
    'Operasi Bentuk Pangkat dan Penarikan Akar Kuadrat',
    'Persamaan Linier Satu Variabel (PLSV)',
    'Sistem Koordinat Kartesius dan Titik Potong'
  ],
  alurPembelajaran: [
    {
      tahap: 1,
      judul: 'Orientasi Masalah Kontekstual',
      deskripsi: 'Mengamati lintasan potong mesin CNC, lengkung jembatan, dan panel surya melalui komik interaktif.',
      durasi: '15 Menit'
    },
    {
      tahap: 2,
      judul: 'Eksplorasi Laboratorium Matematika',
      deskripsi: 'Mempelajari 6 modul konsep dari bentuk umum hingga diskriminan dengan visualizer grafik parabola.',
      durasi: '40 Menit'
    },
    {
      tahap: 3,
      judul: 'Arena Tantangan & Gamifikasi',
      deskripsi: 'Mengasah intuisi matematika melalui 5 game tantangan dengan skor langsung dan umpan balik.',
      durasi: '25 Menit'
    },
    {
      tahap: 4,
      judul: 'Evaluasi & Refleksi Pembelajaran',
      deskripsi: 'Mengerjakan kuis 10 butir soal pilihan ganda berstandar AKM/SMK dan mengisi lembar refleksi diri.',
      durasi: '20 Menit'
    }
  ]
};

export const DEFAULT_COMIC: ComicPublication = {
  id: 'comic-vol-1',
  title: 'Petualangan Menemukan Akar Kuadrat',
  description:
    'Ikuti perjalanan seru Pak Suwandi bersama Sari dan Dika di bengkel rekayasa dan laboratorium SMKN 4 Soppeng!',
  fileType: 'images',
  isPublished: true,
  uploadedAt: '2026-03-01T08:00:00Z',
  pages: [
    {
      id: 'p-cover',
      pageNumber: 1,
      imageUrl: '/src/assets/images/comic_cover_hero_1794015828898.jpg',
      title: 'Sampul Utama: Menemukan Akar-Akar Persamaan Kuadrat',
      caption: 'Pak Suwandi, Sari, dan Dika siap mengawali petualangan matematika di SMKN 4 Soppeng.'
    },
    {
      id: 'p-1',
      pageNumber: 2,
      imageUrl: '/src/assets/images/math_adventure_lab_1794015829630.jpg',
      title: 'Episode 1: Misteri Lintasan Parabola',
      caption: 'Dika mengamati lintasan alat potong laser CNC yang membentuk kurva parabola. Pak Suwandi menjelaskan bahwa saat benda menyentuh lantai (y = 0), kita sedang mencari akar-akar persamaan kuadrat!'
    },
    {
      id: 'p-2',
      pageNumber: 3,
      imageUrl: '/src/assets/images/student_duo_learning_1794015829841.jpg',
      title: 'Episode 2: Jurus Misi Faktorisasi',
      caption: 'Sari menemukan trik: mencari dua bilangan yang jika dikalikan menghasilkan c dan jika dijumlahkan menghasilkan b! Dika bersorak saat berhasil menemukan faktor persamaan x² + 2x - 3 = (x + 3)(x - 1).'
    },
    {
      id: 'p-3',
      pageNumber: 4,
      imageUrl: '/src/assets/images/teacher_suwandi_avatar_1794015829391.jpg',
      title: 'Episode 3: Menjinakkan Rumus Kuadratik ABC',
      caption: 'Pak Suwandi memperkenalkan formula legendaris: x = (-b ± √(b² - 4ac)) / (2a). Kuncinya adalah cermat mencatat nilai a, b, dan c lengkap dengan tanda negatifnya!'
    },
    {
      id: 'p-4',
      pageNumber: 5,
      imageUrl: '/src/assets/images/comic_cover_hero_1794015828898.jpg',
      title: 'Episode 4: Sang Penguji Karakter - Diskriminan D',
      caption: 'Sebelum menghitung panjang, periksa nilai D = b² - 4ac. Jika D positif ada dua akar berbeda, jika D nol ada satu akar kembar, dan jika negatif tidak ada akar real!'
    },
    {
      id: 'p-5',
      pageNumber: 6,
      imageUrl: '/src/assets/images/student_duo_learning_1794015829841.jpg',
      title: 'Episode 5: Sukses Bersama di SMKN 4 Soppeng',
      caption: 'Dengan kerja tim dan pemahaman konsep yang kokoh, Sari dan Dika berhasil menuntaskan semua tantangan dengan nilai sempurna. Belajar matematika sungguh menyenangkan!'
    }
  ]
};

export const DEFAULT_MATERIALS: MaterialModule[] = [
  {
    id: 'mat-1',
    number: 1,
    title: 'Pengertian Persamaan Kuadrat',
    subtitle: 'Bentuk Umum, Syarat, dan Identifikasi Koefisien',
    summary:
      'Persamaan kuadrat adalah persamaan polinomial satu variabel yang memiliki pangkat tertinggi bernilai 2 (dua).',
    content: [
      'Bentuk umum persamaan kuadrat adalah ax² + bx + c = 0, dengan syarat a, b, c merupakan bilangan real dan a ≠ 0.',
      'Koefisien a adalah angka di depan x², koefisien b adalah angka di depan x, dan c adalah suku konstanta.',
      'Jika a = 0, maka persamaannya berubah menjadi persamaan linier satu variabel (bx + c = 0), sehingga syarat a ≠ 0 adalah mutlak.',
      'Bentuk persamaan kuadrat tidak selalu berurutan rapi. Contoh: 3x - 5 + 2x² = 0 harus ditata menjadi 2x² + 3x - 5 = 0 untuk mempermudah identifikasi a = 2, b = 3, c = -5.'
    ],
    keyFormula: 'ax² + bx + c = 0  (dengan a ≠ 0)',
    contextualSMK:
      'Di bidang Teknik Otomotif dan Mesin SMK, percepatan gerak piston dan profil cam katup mesin dinyatakan dalam persamaan kuadrat.',
    sampleProblems: [
      {
        question: 'Tentukan nilai a, b, dan c dari persamaan 3x² - 7x = 10!',
        steps: [
          'Langkah 1: Ubah persamaan ke bentuk umum ax² + bx + c = 0 dengan memindahkan suku ke ruas kiri.',
          '3x² - 7x - 10 = 0',
          'Langkah 2: Identifikasi koefisien masing-masing suku.',
          'Nilai di depan x² adalah 3 → a = 3',
          'Nilai di depan x adalah -7 → b = -7',
          'Konstanta tanpa variabel x adalah -10 → c = -10'
        ],
        solution: 'Nilai koefisien adalah a = 3, b = -7, dan c = -10.'
      }
    ],
    interactivePractice: {
      question: 'Manakah nilai a, b, dan c yang tepat untuk persamaan: 5 - 2x² + 4x = 0?',
      options: [
        'a = 5, b = -2, c = 4',
        'a = -2, b = 4, c = 5',
        'a = 2, b = -4, c = -5',
        'a = 4, b = -2, c = 5'
      ],
      correctIndex: 1,
      explanation:
        'Susun sesuai bentuk baku ax² + bx + c = 0 → -2x² + 4x + 5 = 0. Jadi a = -2, b = 4, dan c = 5.'
    }
  },
  {
    id: 'mat-2',
    number: 2,
    title: 'Akar-Akar Persamaan Kuadrat',
    subtitle: 'Makna Geometris, Titik Potong Sumbu-X & Nilai Pembuat Nol',
    summary:
      'Akar-akar persamaan kuadrat adalah nilai pengganti variabel x yang menyebabkan persamaan bernilai benar (sama dengan nol).',
    content: [
      'Secara geometris pada grafik fungsi f(x) = ax² + bx + c, akar-akar persamaan kuadrat merupakan koordinat titik potong grafik parabola terhadap sumbu-X (y = 0).',
      'Jika x = p adalah akar dari ax² + bx + c = 0, maka berlaku substitusi a(p)² + b(p) + c = 0.',
      'Suatu persamaan kuadrat maksimal memiliki dua akar real: kita biasa menuliskannya sebagai x₁ dan x₂.',
      'Himpunan penyelesaian dituliskan sebagai HP = {x₁, x₂}.'
    ],
    keyFormula: 'Jika x = r adalah akar, maka a(r)² + b(r) + c = 0',
    contextualSMK:
      'Dalam instalasi kelistrikan AC SMK Teknik Elektro, akar kuadrat menentukan frekuensi resonansi titik netral tegangan bolak-balik.',
    sampleProblems: [
      {
        question: 'Buktikan apakah x = 2 merupakan akar dari persamaan x² + 3x - 10 = 0!',
        steps: [
          'Langkah 1: Lakukan substitusi nilai x = 2 ke ruas kiri persamaan.',
          '(2)² + 3(2) - 10 = 4 + 6 - 10',
          'Langkah 2: Hitung hasil penjumlahan.',
          '4 + 6 - 10 = 10 - 10 = 0',
          'Langkah 3: Ruas kiri sama dengan ruas kanan (0 = 0).'
        ],
        solution: 'Karena hasil substitusi bernilai 0, terbukti x = 2 adalah akar yang sah.'
      }
    ],
    interactivePractice: {
      question: 'Jika salah satu akar dari x² - 6x + c = 0 adalah x = 4, berapakah nilai konstanta c?',
      options: ['c = 8', 'c = -8', 'c = 10', 'c = -4'],
      correctIndex: 0,
      explanation:
        'Substitusi x = 4: (4)² - 6(4) + c = 0 → 16 - 24 + c = 0 → -8 + c = 0 → c = 8.'
    }
  },
  {
    id: 'mat-3',
    number: 3,
    title: 'Menentukan Akar dengan Faktorisasi',
    subtitle: 'Konsep Pemfaktoran Aljabar Bentuk x² + bx + c dan ax² + bx + c',
    summary:
      'Metode faktorisasi memanfaatkan sifat hasil kali nol: jika P × Q = 0, maka P = 0 atau Q = 0.',
    content: [
      'Untuk bentuk x² + bx + c = 0 (koefisien a = 1): Cari dua bilangan p dan q sedemikian sehingga p × q = c dan p + q = b.',
      'Bentuk faktorisasi menjadi: (x + p)(x + q) = 0.',
      'Maka akarnya adalah: x₁ = -p atau x₂ = -q.',
      'Untuk bentuk ax² + bx + c = 0 (a ≠ 1): Cari dua bilangan p dan q sedemikian sehingga p × q = a × c dan p + q = b, lalu pecah suku tengah bx menjadi px + qx dan faktorkan secara kelompok.'
    ],
    keyFormula: 'x² + bx + c = (x + p)(x + q) = 0  ⇒  x₁ = -p,  x₂ = -q',
    contextualSMK:
      'Di bidang Rekayasa Perangkat Lunak (RPL) dan Desain Grafis, pemfaktoran digunakan dalam algoritma kalkulasi resolusi aspek rasio layar.',
    sampleProblems: [
      {
        question: 'Tentukan akar-akar persamaan x² + 2x - 8 = 0 menggunakan pemfaktoran!',
        steps: [
          'Langkah 1: Catat nilai a = 1, b = 2, c = -8.',
          'Langkah 2: Cari dua bilangan p dan q yang jika dikalikan menghasilkan -8 dan dijumlahkan menghasilkan +2.',
          'Kemungkinan faktor dari -8: (4) × (-2) = -8 dan (4) + (-2) = 2. Cocok!',
          'Langkah 3: Tuliskan bentuk faktorisasi: (x + 4)(x - 2) = 0.',
          'Langkah 4: Terapkan sifat hasil kali nol: x + 4 = 0 → x₁ = -4, atau x - 2 = 0 → x₂ = 2.'
        ],
        solution: 'Akar-akarnya adalah x₁ = -4 dan x₂ = 2 atau HP = {-4, 2}.'
      }
    ],
    interactivePractice: {
      question: 'Berapakah akar-akar dari persamaan kuadrat x² - 7x + 12 = 0?',
      options: ['x = -3 dan x = -4', 'x = 3 dan x = 4', 'x = 2 dan x = 6', 'x = -2 dan x = -6'],
      correctIndex: 1,
      explanation:
        'Cari p × q = 12 dan p + q = -7 → p = -3, q = -4. Faktorisasi: (x - 3)(x - 4) = 0 → x₁ = 3, x₂ = 4.'
    }
  },
  {
    id: 'mat-4',
    number: 4,
    title: 'Melengkapkan Kuadrat Sempurna',
    subtitle: 'Mengubah Bentuk Aljabar Menjadi (x + p)² = q',
    summary:
      'Metode ini sangat ampuh ketika persamaan kuadrat sulit difaktorkan secara langsung dengan bilangan bulat.',
    content: [
      'Ingat identitas kuadrat sempurna: (x + p)² = x² + 2px + p².',
      'Tahap 1: Pastikan koefisien a = 1 (jika belum, bagi seluruh suku dengan a).',
      'Tahap 2: Pindahkan konstanta c ke ruas kanan: x² + (b/a)x = -c/a.',
      'Tahap 3: Tambahkan kedua ruas dengan kuadrat dari setengah koefisien x, yaitu [(b/2a)]².',
      'Tahap 4: Ubah ruas kiri menjadi bentuk (x + b/2a)² dan tarik akar kedua ruas.'
    ],
    keyFormula: '(x + b/2a)² = (b² - 4ac) / 4a²',
    contextualSMK:
      'Di bidang Teknik Konstruksi dan Bangunan SMK, kuadrat sempurna dipakai untuk menghitung titik puncak defleksi beban gelagar baja jembatan.',
    sampleProblems: [
      {
        question: 'Tentukan akar persamaan x² + 6x + 5 = 0 dengan melengkapkan kuadrat sempurna!',
        steps: [
          'Langkah 1: Pindahkan konstanta ke ruas kanan: x² + 6x = -5.',
          'Langkah 2: Tambahkan kedua ruas dengan [setengah dari 6]² = (3)² = 9.',
          'x² + 6x + 9 = -5 + 9',
          'Langkah 3: Ruas kiri menjadi kuadrat sempurna: (x + 3)² = 4.',
          'Langkah 4: Tarik akar kuadrat kedua ruas: x + 3 = ±√4 → x + 3 = ±2.',
          'x₁ = -3 + 2 = -1;  x₂ = -3 - 2 = -5.'
        ],
        solution: 'Akar-akarnya adalah x₁ = -1 dan x₂ = -5.'
      }
    ],
    interactivePractice: {
      question: 'Konstanta berapakah yang harus ditambahkan pada x² - 8x agar menjadi kuadrat sempurna?',
      options: ['4', '8', '16', '64'],
      correctIndex: 2,
      explanation: 'Rumus penambahan adalah (setengah dari koefisien x)² = (-8 / 2)² = (-4)² = 16.'
    }
  },
  {
    id: 'mat-5',
    number: 5,
    title: 'Menentukan Akar dengan Rumus ABC',
    subtitle: 'Formula Kuadratik Universal untuk Segala Jenis Persamaan Kuadrat',
    summary:
      'Rumus ABC (Quadratic Formula) adalah metode paling umum dan universal yang diperoleh dari generalisasi melengkapkan kuadrat sempurna.',
    content: [
      'Rumus kuadratik dinyatakan sebagai: x₁,₂ = (-b ± √(b² - 4ac)) / (2a).',
      'Langkah 1: Tuliskan persamaan dalam bentuk baku ax² + bx + c = 0.',
      'Langkah 2: Tentukan nilai a, b, dan c dengan teliti (waspadai tanda negatif).',
      'Langkah 3: Hitung nilai di dalam akar (b² - 4ac) terlebih dahulu.',
      'Langkah 4: Hitung nilai x₁ (menggunakan tanda +) dan x₂ (menggunakan tanda -).'
    ],
    keyFormula: 'x₁,₂ = [-b ± √(b² - 4ac)] / 2a',
    contextualSMK:
      'Di bidang Teknik Komputer & Jaringan serta Analisis Sinyal SMK, rumus ABC digunakan dalam perhitungan modulasi gelombang radio nirkabel.',
    sampleProblems: [
      {
        question: 'Gunakan rumus ABC untuk mencari akar dari 2x² - 5x - 3 = 0!',
        steps: [
          'Langkah 1: Catat a = 2, b = -5, c = -3.',
          'Langkah 2: Hitung diskriminan b² - 4ac = (-5)² - 4(2)(-3) = 25 + 24 = 49.',
          'Langkah 3: Masukkan ke rumus ABC:',
          'x = [-(-5) ± √49] / [2(2)] = (5 ± 7) / 4',
          'x₁ = (5 + 7) / 4 = 12 / 4 = 3',
          'x₂ = (5 - 7) / 4 = -2 / 4 = -1/2'
        ],
        solution: 'Akar-akar persamaannya adalah x₁ = 3 dan x₂ = -1/2.'
      }
    ],
    interactivePractice: {
      question: 'Berapakah nilai -b jika b = -6 pada rumus ABC?',
      options: ['-6', '+6', '36', '-36'],
      correctIndex: 1,
      explanation: 'Sesuai aturan aljabar tanda minus ganda: -b = -(-6) = +6.'
    }
  },
  {
    id: 'mat-6',
    number: 6,
    title: 'Diskriminan dan Sifat Akar-Akar',
    subtitle: 'Memprediksi Jenis Akar Tanpa Perlu Menyelesaikan Persamaan',
    summary:
      'Nilai D = b² - 4ac yang berada di bawah tanda akar menentukan karakteristik dan banyaknya akar real yang dimiliki.',
    content: [
      'Rumus Diskriminan: D = b² - 4ac.',
      'Kondisi 1: Jika D > 0, persamaan memiliki 2 akar real yang BERBEDA (grafik parabola memotong sumbu-X di dua titik terpisah). Jika D merupakan bilangan kuadrat sempurna, akarnya rasional; jika bukan, akarnya irasional.',
      'Kondisi 2: Jika D = 0, persamaan memiliki 2 akar real yang KEMBAR / SAMA (grafik parabola hanya menyinggung sumbu-X di satu titik puncak).',
      'Kondisi 3: Jika D < 0, persamaan TIDAK memiliki akar real / akarnya imajiner kompleks (grafik parabola melayang dan tidak pernah menyentuh sumbu-X).'
    ],
    keyFormula: 'D = b² - 4ac  ⇒  (D > 0: 2 akar real beda, D = 0: 1 akar kembar, D < 0: tak ada akar real)',
    contextualSMK:
      'Di bidang Teknik Ketenagalistrikan SMK, nilai D menentukan apakah sistem redaman sirkuit RLC bersifat overdamped, critically damped, atau underdamped.',
    sampleProblems: [
      {
        question: 'Tentukan jenis akar dari persamaan kuadrat x² - 4x + 4 = 0 tanpa menghitung akarnya!',
        steps: [
          'Langkah 1: Identifikasi a = 1, b = -4, c = 4.',
          'Langkah 2: Hitung nilai diskriminan D = b² - 4ac.',
          'D = (-4)² - 4(1)(4) = 16 - 16 = 0.',
          'Langkah 3: Analisis nilai D = 0.'
        ],
        solution: 'Karena D = 0, maka persamaan kuadrat memiliki dua akar real yang kembar (sama).'
      }
    ],
    interactivePractice: {
      question: 'Jika persamaan 2x² + 3x + 5 = 0 dihitung nilai diskriminannya, jenis akarnya adalah...',
      options: [
        'Dua akar real berbeda',
        'Dua akar real kembar',
        'Tidak memiliki akar real (akar imajiner)',
        'Akar bulat positif'
      ],
      correctIndex: 2,
      explanation:
        'D = (3)² - 4(2)(5) = 9 - 40 = -31. Karena D < 0, maka persamaan tidak memiliki akar real.'
    }
  }
];

export const DEFAULT_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    number: 1,
    question: 'Bentuk umum persamaan kuadrat adalah ax² + bx + c = 0. Manakah syarat mutlak untuk nilai a?',
    equation: 'ax² + bx + c = 0',
    options: [
      'a harus bilangan positif',
      'a boleh bernilai sembarang bilangan real kecuali nol (a ≠ 0)',
      'a harus sama dengan 1',
      'a harus lebih besar dari b dan c',
      'a tidak boleh bernilai negatif'
    ],
    correctIndex: 1,
    explanation:
      'Syarat mutlak agar suatu persamaan berderajat dua adalah koefisien kuadratnya tidak boleh nol (a ≠ 0). Jika a = 0, maka persamaan berubah menjadi persamaan linier.',
    difficulty: 'Mudah',
    topic: 'Pengertian Persamaan Kuadrat'
  },
  {
    id: 'q-2',
    number: 2,
    question: 'Tentukan nilai koefisien a, b, dan konstanta c berturut-turut dari persamaan: 4x - 6 = -3x²!',
    equation: '4x - 6 = -3x²',
    options: [
      'a = 4, b = -6, c = -3',
      'a = -3, b = 4, c = -6',
      'a = 3, b = 4, c = -6',
      'a = 3, b = -4, c = 6',
      'a = -6, b = 4, c = 3'
    ],
    correctIndex: 2,
    explanation:
      'Pindahkan -3x² ke ruas kiri: 3x² + 4x - 6 = 0. Maka diperoleh a = 3, b = 4, dan c = -6.',
    difficulty: 'Mudah',
    topic: 'Identifikasi Koefisien'
  },
  {
    id: 'q-3',
    number: 3,
    question: 'Jika salah satu akar dari persamaan kuadrat x² + kx - 15 = 0 adalah x = 3, berapakah nilai k?',
    equation: 'x² + kx - 15 = 0, dengan x = 3',
    options: ['k = 2', 'k = -2', 'k = 4', 'k = -4', 'k = 6'],
    correctIndex: 0,
    explanation:
      'Substitusi x = 3 ke dalam persamaan: (3)² + k(3) - 15 = 0 → 9 + 3k - 15 = 0 → 3k - 6 = 0 → 3k = 6 → k = 2.',
    difficulty: 'Sedang',
    topic: 'Akar Persamaan Kuadrat'
  },
  {
    id: 'q-4',
    number: 4,
    question: 'Himpunan penyelesaian dari persamaan kuadrat x² - 5x - 14 = 0 melalui pemfaktoran adalah...',
    equation: 'x² - 5x - 14 = 0',
    options: [
      'HP = {-7, 2}',
      'HP = {7, -2}',
      'HP = {7, 2}',
      'HP = {-7, -2}',
      'HP = {14, -1}'
    ],
    correctIndex: 1,
    explanation:
      'Faktorisasi dari x² - 5x - 14 = (x - 7)(x + 2) = 0. Maka x - 7 = 0 → x₁ = 7, atau x + 2 = 0 → x₂ = -2. HP = {7, -2}.',
    difficulty: 'Sedang',
    topic: 'Metode Faktorisasi'
  },
  {
    id: 'q-5',
    number: 5,
    question: 'Akar-akar dari persamaan kuadrat 2x² + 7x + 3 = 0 adalah...',
    equation: '2x² + 7x + 3 = 0',
    options: [
      'x = -3 atau x = -1/2',
      'x = 3 atau x = 1/2',
      'x = -3 atau x = 1/2',
      'x = 3 atau x = -1/2',
      'x = -1 atau x = -6'
    ],
    correctIndex: 0,
    explanation:
      'Cari p × q = 2 × 3 = 6 dan p + q = 7 → p = 6, q = 1. Faktorkan: (2x + 1)(x + 3) = 0. Jadi 2x + 1 = 0 → x₁ = -1/2, dan x + 3 = 0 → x₂ = -3.',
    difficulty: 'Sedang',
    topic: 'Faktorisasi ax² + bx + c'
  },
  {
    id: 'q-6',
    number: 6,
    question: 'Jika persamaan x² + 8x + 7 = 0 diselesaikan dengan melengkapkan kuadrat sempurna, bentuk kuadrat sempurna yang diperoleh adalah...',
    equation: 'x² + 8x + 7 = 0',
    options: [
      '(x + 4)² = 9',
      '(x + 4)² = 16',
      '(x + 8)² = 9',
      '(x - 4)² = 9',
      '(x + 4)² = 23'
    ],
    correctIndex: 0,
    explanation:
      'x² + 8x = -7. Tambahkan (8/2)² = 16 pada kedua ruas: x² + 8x + 16 = -7 + 16 → (x + 4)² = 9.',
    difficulty: 'Sedang',
    topic: 'Melengkapkan Kuadrat Sempurna'
  },
  {
    id: 'q-7',
    number: 7,
    question: 'Dengan menggunakan Rumus ABC, berapakah akar-akar dari x² - 4x - 1 = 0?',
    equation: 'x² - 4x - 1 = 0',
    options: [
      'x = 2 ± √5',
      'x = -2 ± √5',
      'x = 4 ± √20',
      'x = 2 ± √3',
      'x = 4 ± √5'
    ],
    correctIndex: 0,
    explanation:
      'a = 1, b = -4, c = -1. x = [-(-4) ± √((-4)² - 4(1)(-1))] / [2(1)] = (4 ± √(16 + 4)) / 2 = (4 ± √20) / 2 = (4 ± 2√5) / 2 = 2 ± √5.',
    difficulty: 'Tinggi (HOTS)',
    topic: 'Rumus ABC'
  },
  {
    id: 'q-8',
    number: 8,
    question: 'Hitung nilai diskriminan (D) dari persamaan kuadrat 3x² - 6x + 3 = 0 dan tentukan jenis akarnya!',
    equation: '3x² - 6x + 3 = 0',
    options: [
      'D = 0, memiliki dua akar real kembar (sama)',
      'D = 72, memiliki dua akar real berbeda',
      'D = -72, tidak memiliki akar real',
      'D = 36, memiliki dua akar real berbeda',
      'D = 0, tidak memiliki akar real'
    ],
    correctIndex: 0,
    explanation:
      'a = 3, b = -6, c = 3. D = b² - 4ac = (-6)² - 4(3)(3) = 36 - 36 = 0. Karena D = 0, maka memiliki dua akar real kembar.',
    difficulty: 'Sedang',
    topic: 'Diskriminan'
  },
  {
    id: 'q-9',
    number: 9,
    question: 'Agar persamaan kuadrat x² - 6x + m = 0 memiliki dua akar real yang berlainan (berbeda), nilai m yang memenuhi adalah...',
    equation: 'x² - 6x + m = 0',
    options: ['m < 9', 'm > 9', 'm = 9', 'm ≤ 9', 'm ≥ 9'],
    correctIndex: 0,
    explanation:
      'Syarat 2 akar real berbeda adalah D > 0. D = (-6)² - 4(1)(m) > 0 → 36 - 4m > 0 → -4m > -36 → m < 9.',
    difficulty: 'Tinggi (HOTS)',
    topic: 'Aplikasi Diskriminan'
  },
  {
    id: 'q-10',
    number: 10,
    question: 'Sebuah pelat logam berbentuk persegi panjang untuk proyek perakitan SMKN 4 Soppeng memiliki panjang 3 cm lebih dari lebarnya. Jika luas pelat tersebut adalah 40 cm², berapakah panjang dan lebar pelat logam tersebut?',
    equation: 'L = p × l; p = l + 3; (l + 3)l = 40',
    options: [
      'Panjang = 8 cm dan Lebar = 5 cm',
      'Panjang = 10 cm dan Lebar = 4 cm',
      'Panjang = 7 cm dan Lebar = 4 cm',
      'Panjang = 5 cm dan Lebar = 8 cm',
      'Panjang = 6 cm dan Lebar = 3 cm'
    ],
    correctIndex: 0,
    explanation:
      'Misalkan lebar = l, maka panjang p = l + 3. Luas: l(l + 3) = 40 → l² + 3l - 40 = 0. Faktorkan: (l + 8)(l - 5) = 0. Karena ukuran panjang harus bernilai positif, maka l = 5 cm. Panjang p = 5 + 3 = 8 cm.',
    difficulty: 'Tinggi (HOTS)',
    topic: 'Penerapan Kontekstual SMK'
  }
];

export const INITIAL_STUDENT_PROGRESS: StudentProgress = {
  materialsRead: ['mat-1'],
  comicProgress: 1,
  challengesScore: {
    tebakAkar: 0,
    misiFaktorisasi: 0,
    detektifAbc: 0,
    tantanganDiskriminan: 0,
    battleMatematika: 0
  },
  reflectionCompleted: false
};
