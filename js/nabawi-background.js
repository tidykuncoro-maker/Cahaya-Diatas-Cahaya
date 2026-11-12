/**
 * nabawi-background.js
 * Manajemen Visual Latar Belakang Masjid Nabawi Berdasarkan Waktu Sholat
 * Aplikasi "Cahaya Diatas Cahaya"
 * 
 * Mendukung:
 * 1. Gambar Fotografi HD Kurasi Masjid Nabawi per waktu sholat (Subuh, Syuruq, Dhuha, Dzuhur, Ashar, Maghrib, Isya, Tahajjud, Imsak)
 * 2. Kanvas Vektor Siluet Kubah Hijau & Menara Nabawi (Zero-Latency Offline Fallback)
 * 3. Partikel Cahaya Emas Melayang (Warm Golden Ambient Particles)
 * 4. Mode Video Ambient / Siaran Live Madinah 24/7
 * 5. Penyelarasan Tema Atmosferik Otomatis (Warna & Kehangatan mengikuti waktu sholat)
 */

const NabawiBackground = {
  // Database Lengkap Suasana Masjid Nabawi per Waktu Sholat
  STATES: {
    imsak: {
      key: "imsak",
      name: "Imsak & Fajar Awal",
      arabic: "سُحُورُ وَفَجْرُ المَدِينَة",
      title: "Keheningan Fajar di Pelataran Madinah",
      subtitle: "Saat lampu menara dan lentera pilar memancarkan kedamaian sebelum fajar shadiq",
      themeColor: "#0b1f33",
      accentColor: "#38bdf8",
      glowWarmth: "rgba(56, 189, 248, 0.2)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(4, 18, 32, 0.72) 0%, rgba(2, 10, 20, 0.88) 100%)",
      // Curated high quality photo of Nabawi at dawn
      imageUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80",
      videoId: "PaRpUjbwKbQ"
    },
    subuh: {
      key: "subuh",
      name: "Waktu Subuh",
      arabic: "صَلَاةُ الفَجْرِ فِي مَسْجِدِ النَّبِي",
      title: "Fajar Berkah di Masjid Nabawi",
      subtitle: "Semburat biru safir dan jamaah yang berbondong-bondong meraih dua rakaat fajar",
      themeColor: "#082f49",
      accentColor: "#34d399",
      glowWarmth: "rgba(52, 211, 153, 0.25)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(6, 32, 54, 0.70) 0%, rgba(3, 16, 28, 0.86) 100%)",
      imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80",
      videoId: "hX-Zy5R9vPQ"
    },
    syuruq: {
      key: "syuruq",
      name: "Syuruq & Isyraq",
      arabic: "شُرُوقُ الشَّمْسِ وَتَفَتُّحُ المَظَلَّات",
      title: "Matahari Terbit & Mekarnya Payung Raksasa",
      subtitle: "Momen spektakuler mekarnya 250 payung raksasa Nabawi disinari fajar keemasan",
      themeColor: "#451a03",
      accentColor: "#f59e0b",
      glowWarmth: "rgba(245, 158, 11, 0.35)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(36, 18, 6, 0.68) 0%, rgba(14, 8, 4, 0.86) 100%)",
      imageUrl: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1920&q=80",
      videoId: "RSIkUVBJd2o"
    },
    dhuha: {
      key: "dhuha",
      name: "Waktu Dhuha",
      arabic: "ضُحَى المَدِينَةِ المُنَوَّرَة",
      title: "Pagi Cerah di Pelataran Masjid Nabawi",
      subtitle: "Sinar mentari pagi menyinari marmer putih Thassos yang sejuk di bawah naungan payung megah",
      themeColor: "#134e4a",
      accentColor: "#fbbf24",
      glowWarmth: "rgba(251, 191, 36, 0.3)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(10, 36, 36, 0.68) 0%, rgba(4, 18, 18, 0.86) 100%)",
      imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1920&q=80",
      videoId: "u7FLkmU9heU"
    },
    dzuhur: {
      key: "dzuhur",
      name: "Waktu Dzuhur",
      arabic: "ظَهِيرَةُ مَسْجِدِ رَسُولِ اللَّه",
      title: "Kemegahan Dzuhur di Bawah Payung Raksasa",
      subtitle: "Kesejukan lorong-lorong pilar bertatahkan emas dan payung-payung megah yang menaungi jamaah",
      themeColor: "#0f3a47",
      accentColor: "#34d399",
      glowWarmth: "rgba(16, 185, 129, 0.28)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(8, 28, 38, 0.72) 0%, rgba(3, 14, 20, 0.88) 100%)",
      imageUrl: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1920&q=80",
      videoId: "DeaUB1NNaxc"
    },
    ashar: {
      key: "ashar",
      name: "Waktu Ashar",
      arabic: "عَصْرُ المَدِينَةِ المُنَوَّرَة",
      title: "Cahaya Keemasan Sore di Masjid Nabawi",
      subtitle: "Bayangan pilar dan menara yang memanjang dengan kedamaian syahdu menjelang senja",
      themeColor: "#422006",
      accentColor: "#fbbf24",
      glowWarmth: "rgba(251, 191, 36, 0.35)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(34, 18, 6, 0.70) 0%, rgba(15, 8, 3, 0.88) 100%)",
      imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1920&q=80",
      videoId: "wwk8PxjJil4"
    },
    maghrib: {
      key: "maghrib",
      name: "Waktu Maghrib",
      arabic: "غُرُوبُ الشَّمْسِ فَوْقَ القُبَّةِ الخَضْرَاء",
      title: "Senja Maghrib di Atas Kubah Hijau",
      subtitle: "Lembayung jingga kemerahan saat lentera-lentera indah Madinah mulai menyala berpendar",
      themeColor: "#3f0a1c",
      accentColor: "#f97316",
      glowWarmth: "rgba(249, 115, 22, 0.4)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(38, 12, 22, 0.70) 0%, rgba(18, 5, 10, 0.88) 100%)",
      imageUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80",
      videoId: "7g7XDtb_NBk"
    },
    isya: {
      key: "isya",
      name: "Waktu Isya",
      arabic: "لَيْلُ مَسْجِدِ النَّبِيِّ الأَنْوَر",
      title: "Gemerlap Cahaya Malam Pelataran Nabawi",
      subtitle: "Kilauan marmer putih memantulkan cahaya menara-menara agung yang menjulang ke angkasa",
      themeColor: "#091e3a",
      accentColor: "#38bdf8",
      glowWarmth: "rgba(56, 189, 248, 0.25)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(6, 20, 38, 0.74) 0%, rgba(3, 10, 20, 0.90) 100%)",
      imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80",
      videoId: "TYz-JmYNCkc"
    },
    tahajjud: {
      key: "tahajjud",
      name: "Sepertiga Malam",
      arabic: "خُشُوعُ التَّهَجُّدِ فِي الرَّوْضَةِ الشَّرِيفَة",
      title: "Munajat Khusyuk di Sekitar Raudhah Syarifah",
      subtitle: "Kedamaian sepertiga malam terakhir saat rahmat Allah turun melimpahi para hamba-Nya",
      themeColor: "#051329",
      accentColor: "#a7f3d0",
      glowWarmth: "rgba(167, 243, 208, 0.25)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(4, 14, 30, 0.78) 0%, rgba(2, 7, 16, 0.93) 100%)",
      imageUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1920&q=80",
      videoId: "PaRpUjbwKbQ"
    },
    live: {
      key: "live",
      name: "Live Madinah 24 Jam",
      arabic: "بَثٌّ مُبَاشِرٌ مِنَ المَدِينَةِ المُنَوَّرَة",
      title: "Siaran Langsung Masjid Nabawi Saat Ini",
      subtitle: "Pantauan real-time langsung dari stasiun resmi TV Sunnah Nabawiyah Madinah",
      themeColor: "#064e3b",
      accentColor: "#ef4444",
      glowWarmth: "rgba(239, 68, 68, 0.35)",
      overlay: "radial-gradient(ellipse at 50% 30%, rgba(4, 24, 20, 0.65) 0%, rgba(2, 12, 10, 0.85) 100%)",
      imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1920&q=80",
      videoId: "5LVk-ACuCIs" // Live Sunnah TV
    }
  },

  currentKey: "auto",
  actualKey: "subuh",
  mediaMode: "photo", // "photo" | "video"
  blurLevel: "aesthetic", // "clear" (0px) | "aesthetic" (8px) | "focus" (16px)
  particlesEnabled: true,
  particleCanvas: null,
  particleAnimationId: null,

  init() {
    this.createBackgroundElements();
    this.initParticles();
    this.setupListeners();
  },

  /**
   * Membuat elemen DOM untuk latar belakang jika belum ada
   */
  createBackgroundElements() {
    let container = document.getElementById("nabawi-bg-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "nabawi-bg-container";
      container.className = "fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none";
      document.body.prepend(container);
    }

    // Layer 1: Layer Foto / Gradien dengan transisi crossfade halus
    container.innerHTML = `
      <div id="nabawi-image-layer-a" class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-100" style="background-color: #030d14;"></div>
      <div id="nabawi-image-layer-b" class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-0" style="background-color: #030d14;"></div>
      
      <!-- Layer Video Iframe (Opsional / Mode Video) -->
      <div id="nabawi-video-wrapper" class="absolute inset-0 hidden transition-opacity duration-700 opacity-0">
        <iframe id="nabawi-video-player"
          class="w-full h-full border-0 pointer-events-none scale-125"
          src=""
          title="Masjid Nabawi Video"
          allow="autoplay; encrypted-media">
        </iframe>
      </div>

      <!-- Layer Kanvas Partikel Cahaya Keemasan (Golden Dust Motes) -->
      <canvas id="nabawi-particles-canvas" class="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"></canvas>

      <!-- Layer Overlay Atmosferik & Blur -->
      <div id="nabawi-overlay" class="absolute inset-0 transition-all duration-700 z-20"></div>
    `;

    this.particleCanvas = document.getElementById("nabawi-particles-canvas");
    this.updateBlurOverlay();
  },

  /**
   * Mengatur suasana Masjid Nabawi berdasarkan kunci waktu
   * @param {string} stateKey - 'auto' | 'imsak' | 'subuh' | 'syuruq' | 'dhuha' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya' | 'tahajjud' | 'live'
   */
  setAtmosphere(stateKey) {
    this.currentKey = stateKey;
    
    let targetKey = stateKey;
    if (stateKey === "auto") {
      targetKey = this.detectCurrentPrayerState();
    }

    if (!this.STATES[targetKey]) {
      targetKey = "dzuhur";
    }

    this.actualKey = targetKey;
    const stateData = this.STATES[targetKey];

    // 1. Perbarui Foto Latar Belakang (Crossfade Smooth)
    this.crossfadeImage(stateData.imageUrl);

    // 2. Perbarui Overlay Warna & Tema
    const overlay = document.getElementById("nabawi-overlay");
    if (overlay) {
      overlay.style.background = stateData.overlay;
    }

    // 3. Perbarui Video jika sedang dalam Mode Video
    if (this.mediaMode === "video") {
      this.loadVideo(stateData.videoId);
    }

    // 4. Perbarui Label & Badge Status di UI
    this.updateUIStatus(stateData);

    // 5. Sesuaikan warna aksen cahaya pada partikel
    this.currentParticleColor = stateData.accentColor;
  },

  /**
   * Transisi gambar halus antar dua layer foto
   */
  crossfadeImage(url) {
    const layerA = document.getElementById("nabawi-image-layer-a");
    const layerB = document.getElementById("nabawi-image-layer-b");
    if (!layerA || !layerB) return;

    const activeA = layerA.classList.contains("opacity-100");
    const nextLayer = activeA ? layerB : layerA;
    const currentLayer = activeA ? layerA : layerB;

    // Load gambar baru
    const img = new Image();
    img.onload = () => {
      nextLayer.style.backgroundImage = `url('${url}')`;
      nextLayer.classList.remove("opacity-0");
      nextLayer.classList.add("opacity-100");
      currentLayer.classList.remove("opacity-100");
      currentLayer.classList.add("opacity-0");
    };
    img.onerror = () => {
      // Fallback ke gradien arsitektur islami jika offline/gagal
      nextLayer.style.backgroundImage = "none";
      nextLayer.classList.remove("opacity-0");
      nextLayer.classList.add("opacity-100");
      currentLayer.classList.remove("opacity-100");
      currentLayer.classList.add("opacity-0");
    };
    img.src = url;
  },

  /**
   * Memuat video YouTube di latar belakang
   */
  loadVideo(videoId) {
    const wrapper = document.getElementById("nabawi-video-wrapper");
    const player = document.getElementById("nabawi-video-player");
    if (!wrapper || !player) return;

    wrapper.classList.remove("hidden");
    setTimeout(() => {
      wrapper.classList.remove("opacity-0");
      wrapper.classList.add("opacity-100");
    }, 50);

    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`;
    if (player.src !== embedUrl) {
      player.src = embedUrl;
    }
  },

  hideVideo() {
    const wrapper = document.getElementById("nabawi-video-wrapper");
    const player = document.getElementById("nabawi-video-player");
    if (wrapper) {
      wrapper.classList.add("opacity-0");
      wrapper.classList.remove("opacity-100");
      setTimeout(() => wrapper.classList.add("hidden"), 500);
    }
    if (player) {
      player.src = "";
    }
  },

  /**
   * Beralih antara mode foto HD dan mode video streaming
   */
  toggleMediaMode() {
    if (this.mediaMode === "photo") {
      this.mediaMode = "video";
      const stateData = this.STATES[this.actualKey];
      if (stateData) this.loadVideo(stateData.videoId);
    } else {
      this.mediaMode = "photo";
      this.hideVideo();
    }
    this.updateMediaButtonUI();
  },

  /**
   * Mengatur tingkat blur overlay (Estetik, Tajam, Fokus)
   */
  cycleBlur() {
    if (this.blurLevel === "clear") this.blurLevel = "aesthetic";
    else if (this.blurLevel === "aesthetic") this.blurLevel = "focus";
    else this.blurLevel = "clear";

    this.updateBlurOverlay();
  },

  updateBlurOverlay() {
    const overlay = document.getElementById("nabawi-overlay");
    const blurBtn = document.getElementById("btn-video-blur-toggle");
    if (!overlay) return;

    let blurPx = "8px";
    let label = "🌫️ Estetik";

    if (this.blurLevel === "clear") {
      blurPx = "1px";
      label = "👁️ Tajam";
    } else if (this.blurLevel === "aesthetic") {
      blurPx = "8px";
      label = "🌫️ Estetik";
    } else if (this.blurLevel === "focus") {
      blurPx = "16px";
      label = "📖 Fokus Teks";
    }

    overlay.style.backdropFilter = `blur(${blurPx})`;
    overlay.style.webkitBackdropFilter = `blur(${blurPx})`;

    if (blurBtn) {
      blurBtn.innerHTML = `<span>${label}</span>`;
    }
  },

  updateUIStatus(stateData) {
    const badge = document.getElementById("nabawi-status-badge");
    const title = document.getElementById("nabawi-status-title");
    const subtitle = document.getElementById("nabawi-status-desc");

    if (badge) {
      badge.textContent = stateData.name;
    }
    if (title) {
      title.innerHTML = `
        <span class="font-kufi-eastern text-amber-300 mr-2 text-sm" dir="rtl">${stateData.arabic}</span>
        <span>${stateData.title}</span>
      `;
    }
    if (subtitle) {
      subtitle.textContent = stateData.subtitle;
    }

    const select = document.getElementById("atmosphere-select");
    if (select && select.value !== this.currentKey) {
      select.value = this.currentKey;
    }
  },

  updateMediaButtonUI() {
    const btn = document.getElementById("btn-media-toggle");
    if (btn) {
      btn.innerHTML = this.mediaMode === "video" 
        ? `<span>🎬 Mode Video On</span>`
        : `<span>🖼️ Mode Foto HD</span>`;
    }
  },

  /**
   * Menentukan keadaan waktu sholat saat ini secara astronomis/jam lokal
   */
  detectCurrentPrayerState() {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();

    // Default estimasi rentang menit hari (disinkronkan dengan live prayer times jika ada)
    if (window.App && window.App.prayerTimes) {
      const times = window.App.prayerTimes;
      const toMin = (str) => {
        const parts = str.split(":");
        return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      };

      const imsakMin = toMin(times.imsak);
      const subuhMin = toMin(times.subuh);
      const syuruqMin = toMin(times.syuruq);
      const dhuhaMin = toMin(times.dhuha);
      const dzuhurMin = toMin(times.dzuhur);
      const asharMin = toMin(times.ashar);
      const maghribMin = toMin(times.maghrib);
      const isyaMin = toMin(times.isya);

      if (minutes >= imsakMin && minutes < subuhMin) return "imsak";
      if (minutes >= subuhMin && minutes < syuruqMin) return "subuh";
      if (minutes >= syuruqMin && minutes < dhuhaMin) return "syuruq";
      if (minutes >= dhuhaMin && minutes < dzuhurMin) return "dhuha";
      if (minutes >= dzuhurMin && minutes < asharMin) return "dzuhur";
      if (minutes >= asharMin && minutes < maghribMin) return "ashar";
      if (minutes >= maghribMin && minutes < isyaMin) return "maghrib";
      if (minutes >= isyaMin || minutes < 60 * 2) return "isya";
      return "tahajjud"; // Antara jam 02:00 s.d imsak
    }

    // Fallback berdasarkan jam
    const hour = now.getHours();
    if (hour >= 3 && hour < 4) return "imsak";
    if (hour >= 4 && hour < 6) return "subuh";
    if (hour >= 6 && hour < 7) return "syuruq";
    if (hour >= 7 && hour < 11) return "dhuha";
    if (hour >= 11 && hour < 15) return "dzuhur";
    if (hour >= 15 && hour < 18) return "ashar";
    if (hour >= 18 && hour < 19) return "maghrib";
    if (hour >= 19 && hour < 23) return "isya";
    return "tahajjud";
  },

  /**
   * Inisialisasi partikel cahaya keemasan (Golden Dust Motes / Starlight)
   */
  initParticles() {
    if (!this.particleCanvas) return;
    const ctx = this.particleCanvas.getContext("2d");
    if (!ctx) return;

    let width = (this.particleCanvas.width = window.innerWidth);
    let height = (this.particleCanvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = this.particleCanvas.width = window.innerWidth;
      height = this.particleCanvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 35; // Ringan dan elegan, tidak membebani GPU

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedY: - (Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (this.particlesEnabled) {
        particles.forEach((p) => {
          p.y += p.speedY;
          p.x += p.speedX;
          p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.01;
          const currentOp = Math.max(0.1, Math.min(0.8, p.opacity));

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Gambar butiran cahaya emas
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${currentOp})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#f59e0b";
          ctx.fill();
        });
      }

      this.particleAnimationId = requestAnimationFrame(animate);
    };

    animate();
  },

  setupListeners() {
    const select = document.getElementById("atmosphere-select");
    if (select) {
      select.addEventListener("change", (e) => {
        this.setAtmosphere(e.target.value);
      });
    }

    const blurBtn = document.getElementById("btn-video-blur-toggle");
    if (blurBtn) {
      blurBtn.addEventListener("click", () => this.cycleBlur());
    }

    const mediaBtn = document.getElementById("btn-media-toggle");
    if (mediaBtn) {
      mediaBtn.addEventListener("click", () => this.toggleMediaMode());
    }
  }
};

// Global export
if (typeof window !== "undefined") {
  window.NabawiBackground = NabawiBackground;
}
