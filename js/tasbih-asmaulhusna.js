/**
 * tasbih-asmaulhusna.js
 * Fitur Tambahan Islami & Hangat:
 * 1. Tasbih Digital Syahdu
 * 2. Asmaul Husna Interaktif
 * 3. Tadabbur Surah An-Nur: 35 (Cahaya Diatas Cahaya)
 * 4. Doa Setelah Adzan Lengkap
 */

const IslamicFeatures = {
  // Data Dzikir Tasbih
  DZIKIR_LIST: [
    {
      id: "subhanallah",
      arabic: "سُبْحَانَ اللَّهِ",
      latin: "Subhanallah",
      meaning: "Maha Suci Allah",
      target: 33
    },
    {
      id: "alhamdulillah",
      arabic: "الْحَمْدُ لِلَّهِ",
      latin: "Alhamdulillah",
      meaning: "Segala Puji Bagi Allah",
      target: 33
    },
    {
      id: "allahuakbar",
      arabic: "اللَّهُ أَكْبَرُ",
      latin: "Allahu Akbar",
      meaning: "Allah Maha Besar",
      target: 33
    },
    {
      id: "tahlil",
      arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
      latin: "Laa ilaaha illallaah",
      meaning: "Tiada Tuhan Selain Allah",
      target: 100
    },
    {
      id: "istighfar",
      arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
      latin: "Astaghfirullah wa atuubu ilaih",
      meaning: "Aku memohon ampun kepada Allah dan bertaubat kepada-Nya",
      target: 100
    },
    {
      id: "sholawat",
      arabic: "اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ",
      latin: "Allahumma shalli 'ala sayyidina Muhammad",
      meaning: "Ya Allah, limpahkanlah shalawat kepada junjungan kami Nabi Muhammad",
      target: 100
    }
  ],

  // 99 Asmaul Husna Terpilih
  ASMAUL_HUSNA: [
    { no: 1, ar: "الرَّحْمَٰنُ", latin: "Ar-Rahman", meaning: "Maha Pengasih bagi seluruh makhluk" },
    { no: 2, ar: "الرَّحِيمُ", latin: "Ar-Rahim", meaning: "Maha Penyayang bagi hamba-Nya yang beriman" },
    { no: 3, ar: "المَلِكُ", latin: "Al-Malik", meaning: "Maha Merajai dan Menguasai seluruh alam" },
    { no: 4, ar: "القُدُّوسُ", latin: "Al-Quddus", meaning: "Maha Suci dari segala kekurangan" },
    { no: 5, ar: "السَّلَامُ", latin: "As-Salam", meaning: "Maha Memberi Kedamaian dan Keselamatan" },
    { no: 6, ar: "المُؤْمِنُ", latin: "Al-Mu'min", meaning: "Maha Memberi Keamanan dan Ketentraman" },
    { no: 7, ar: "المُهَيْمِنُ", latin: "Al-Muhaymin", meaning: "Maha Memelihara dan Mengawasi" },
    { no: 8, ar: "العَزِيزُ", latin: "Al-'Aziz", meaning: "Maha Perkasa dan Mulia" },
    { no: 9, ar: "الجَبَّارُ", latin: "Al-Jabbar", meaning: "Maha Gagah Memaksa kehendak-Nya" },
    { no: 10, ar: "المُتَكَبِّرُ", latin: "Al-Mutakabbir", meaning: "Maha Memiliki Kebesaran Mutlak" },
    { no: 11, ar: "الخَالِقُ", latin: "Al-Khaliq", meaning: "Maha Pencipta segala sesuatu" },
    { no: 12, ar: "البَارِئُ", latin: "Al-Bari'", meaning: "Maha Melepaskan dan Mengadakan dari ketiadaan" },
    { no: 13, ar: "المُصَوِّرُ", latin: "Al-Mushawwir", meaning: "Maha Membentuk Rupa makhluk-Nya" },
    { no: 14, ar: "الغَفَّارُ", latin: "Al-Ghaffar", meaning: "Maha Pengampun tanpa batas" },
    { no: 15, ar: "القَهَّارُ", latin: "Al-Qahhar", meaning: "Maha Menundukkan segala yang ada" },
    { no: 16, ar: "الوَهَّابُ", latin: "Al-Wahhab", meaning: "Maha Pemberi Karunia tanpa pamrih" },
    { no: 17, ar: "الرَّزَّاقُ", latin: "Ar-Razzaq", meaning: "Maha Pemberi Rezeki berlimpah" },
    { no: 18, ar: "الفَتَّاحُ", latin: "Al-Fattah", meaning: "Maha Pembuka pintu rahmat dan kemudahan" },
    { no: 19, ar: "العَلِيمُ", latin: "Al-'Alim", meaning: "Maha Mengetahui segala rahasia langit dan bumi" },
    { no: 20, ar: "النُّورُ", latin: "An-Nur", meaning: "Maha Pemberi Cahaya petunjuk bagi semesta" }
  ],

  // Doa Setelah Adzan Lengkap
  DOA_SETELAH_ADZAN: {
    arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ، [إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ]",
    latin: "Allaahumma rabba haadzihid da'watit taammah, wash shalaatil qaa'imah, aati muhammadanil wasiilata wal fadhiilah, wab'atshu maqaamam mahmuudanil ladzii wa'adtah, [innaka laa tukhliful mii'aad].",
    meaning: "Ya Allah, Tuhan Pemilik seruan yang sempurna ini dan shalat yang senantiasa ditegakkan, berikanlah kepada junjungan kami Nabi Muhammad wasilah (kedudukan tertinggi di surga) dan fadhilah (keutamaan), serta bangkitkanlah beliau pada maqam yang terpuji yang telah Engkau janjikan. [Sesungguhnya Engkau tidak pernah menyalahi janji].",
    source: "HR. Bukhari no. 614 & Al-Baihaqi",
    virtue: "Barangsiapa membaca doa ini setelah mendengar adzan, maka halal baginya syafa'at Rasulullah ﷺ pada hari kiamat kelak."
  },

  // Ayat Cahaya Diatas Cahaya (QS. An-Nur: 35)
  AYAT_AN_NUR: {
    surah: "QS. An-Nur Ayat 35",
    arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ ۚ مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ ۖ الْمِصْبَاحُ فِي زُجَاجَةٍ ۖ الزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌ دُرِّيٌّ يُوقَدُ مِنْ شَجَرَةٍ مُبَارَكَةٍ زَيْتُونَةٍ لَا شَرْقِيَّةٍ وَلَا غَرْبِيَّةٍ يَكَادُ زَيْتُهَا يُضِيءُ وَلَوْ لَمْ تَمْسَسْهُ نَارٌ ۚ نُورٌ عَلَىٰ نُورٍ ۗ يَهْدِي اللَّهُ لِنُورِهِ مَنْ يَشَاءُ ۚ وَيَضْرِبُ اللَّهُ الْأَمْثَالَ لِلنَّاسِ ۗ وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ",
    meaning: "Allah (Pemberi) cahaya (kepada) langit dan bumi. Perumpamaan cahaya-Nya adalah seperti sebuah lubang yang tak tembus, yang di dalamnya ada pelita besar. Pelita itu di dalam kaca, (dan) kaca itu seakan-akan bintang (yang berkilau) seperti mutiara, yang dinyalakan dengan minyak dari pohon yang diberkahi, (yaitu) pohon zaitun yang tumbuh tidak di sebelah timur dan tidak pula di sebelah barat, yang minyaknya (saja) hampir-hampir menerangi, walaupun tidak disentuh api. Cahaya di atas cahaya (berlapis-lapis), Allah membimbing kepada cahaya-Nya siapa yang Dia kehendaki, dan Allah memperbuat perumpamaan-perumpamaan bagi manusia, dan Allah Maha Mengetahui segala sesuatu.",
    tadabbur: "Ayat ini merupakan puncak keindahan rahasia keimanan. Para ahli tafsir seperti Ibnu Abbas menjelaskan bahwa 'Cahaya di atas cahaya' adalah perpaduan antara cahaya fitrah suci seorang hamba yang bertemu dengan cahaya wahyu Al-Qur'an dan Sunnah, sehingga menerangi qalbunya dengan ketenangan abadi."
  },

  // State Tasbih Digital
  tasbihCount: 0,
  currentDzikirIndex: 0,

  init() {
    this.loadTasbihState();
    this.renderTasbihUI();
    this.renderAsmaulHusnaRandom();
    this.setupListeners();
  },

  loadTasbihState() {
    try {
      const savedCount = localStorage.getItem("tasbih_count");
      if (savedCount !== null) this.tasbihCount = parseInt(savedCount, 10);
      const savedIdx = localStorage.getItem("tasbih_idx");
      if (savedIdx !== null) this.currentDzikirIndex = parseInt(savedIdx, 10);
    } catch (e) {}
  },

  saveTasbihState() {
    try {
      localStorage.setItem("tasbih_count", this.tasbihCount);
      localStorage.setItem("tasbih_idx", this.currentDzikirIndex);
    } catch (e) {}
  },

  incrementTasbih() {
    const dzikir = this.DZIKIR_LIST[this.currentDzikirIndex];
    this.tasbihCount++;

    // Mainkan suara klik kayu
    if (window.AdzanAudioPlayer) {
      window.AdzanAudioPlayer.playTasbihClick();
    }

    // Getaran haptic jika didukung ponsel
    if ("vibrate" in navigator) {
      if (this.tasbihCount % dzikir.target === 0) {
        navigator.vibrate([100, 50, 100]); // Getar ganda saat selesai target
      } else {
        navigator.vibrate(20);
      }
    }

    this.saveTasbihState();
    this.renderTasbihUI();
  },

  resetTasbih() {
    this.tasbihCount = 0;
    this.saveTasbihState();
    this.renderTasbihUI();
  },

  setDzikir(index) {
    this.currentDzikirIndex = index;
    this.tasbihCount = 0;
    this.saveTasbihState();
    this.renderTasbihUI();
  },

  renderTasbihUI() {
    const countEl = document.getElementById("tasbih-count-display");
    const targetEl = document.getElementById("tasbih-target-display");
    const arabicEl = document.getElementById("tasbih-arabic-display");
    const latinEl = document.getElementById("tasbih-latin-display");
    const meaningEl = document.getElementById("tasbih-meaning-display");
    const circleProgress = document.getElementById("tasbih-progress-circle");

    const dzikir = this.DZIKIR_LIST[this.currentDzikirIndex];
    if (!dzikir) return;

    if (countEl) countEl.textContent = this.tasbihCount;
    if (targetEl) targetEl.textContent = `/ ${dzikir.target}`;
    if (arabicEl) arabicEl.textContent = dzikir.arabic;
    if (latinEl) latinEl.textContent = dzikir.latin;
    if (meaningEl) meaningEl.textContent = `"${dzikir.meaning}"`;

    if (circleProgress) {
      const percent = Math.min(100, (this.tasbihCount % dzikir.target) / dzikir.target * 100);
      const circumference = 2 * Math.PI * 45; // r=45
      const offset = circumference - (percent / 100) * circumference;
      circleProgress.style.strokeDashoffset = offset;
    }
  },

  renderAsmaulHusnaRandom() {
    const item = this.ASMAUL_HUSNA[Math.floor(Math.random() * this.ASMAUL_HUSNA.length)];
    const elAr = document.getElementById("asma-arabic");
    const elLatin = document.getElementById("asma-latin");
    const elMeaning = document.getElementById("asma-meaning");

    if (elAr) elAr.textContent = item.ar;
    if (elLatin) elLatin.textContent = `${item.no}. ${item.latin}`;
    if (elMeaning) elMeaning.textContent = item.meaning;
  },

  setupListeners() {
    const clickArea = document.getElementById("tasbih-click-button");
    if (clickArea) {
      clickArea.addEventListener("click", () => this.incrementTasbih());
    }

    const resetBtn = document.getElementById("btn-tasbih-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.resetTasbih();
      });
    }

    const dzikirSelect = document.getElementById("tasbih-select-dzikir");
    if (dzikirSelect) {
      dzikirSelect.addEventListener("change", (e) => {
        this.setDzikir(parseInt(e.target.value, 10));
      });
    }

    const btnNextAsma = document.getElementById("btn-next-asma");
    if (btnNextAsma) {
      btnNextAsma.addEventListener("click", () => this.renderAsmaulHusnaRandom());
    }
  }
};

// Global export
if (typeof window !== "undefined") {
  window.IslamicFeatures = IslamicFeatures;
}
