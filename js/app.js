/**
 * app.js
 * Pusat Pengendali Aplikasi Adzan "Cahaya Diatas Cahaya"
 * 
 * Mengintegrasikan:
 * - Jam Real-Time & Countdown Presisi
 * - Penanggalan Masehi & Hijriyah (+/- koreksi rukyat)
 * - Jadwal Sholat Kemenag RI (9 Waktu)
 * - Mutiara Hikmah (Hadits, Atsar Sahabat, Nasehat Ulama)
 * - Tipografi Khot Kuffi Murabba & Khot Kuffi Eastern
 * - Visual Latar Belakang Suasana Masjid Nabawi per Waktu Sholat
 * - Audio Adzan & Doa Setelah Adzan
 * - Tasbih Digital & Asmaul Husna
 */

const App = {
  selectedCity: null,
  currentPrayerTimes: null,
  activePrayerKey: null,
  nextPrayer: null,
  activeQuotePrayer: "subuh",
  currentQuoteIndex: 0,
  quoteFilter: "all",
  theme: "dark",

  init() {
    this.initTheme();
    this.initKufiSystem();
    this.initLocation();
    this.initHijriCalendar();
    this.initQuotesSection();
    this.initAudioPlayer();
    this.initNabawiBackground();
    this.initIslamicFeatures();
    this.initModals();
    this.setupEventListeners();

    // Jalankan timer jam & countdown setiap detik
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    // Perbarui jadwal secara berkala
    this.updatePrayerTimes();
  },

  /* ==========================================================================
     1. TEMA & TIPOGRAFI KUFI
     ========================================================================== */
  initTheme() {
    try {
      const savedTheme = localStorage.getItem("cahaya_theme");
      if (savedTheme) this.theme = savedTheme;
    } catch (e) {}
    document.documentElement.setAttribute("data-theme", this.theme);
    this.updateThemeButton();
  },

  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", this.theme);
    try {
      localStorage.setItem("cahaya_theme", this.theme);
    } catch (e) {}
    this.updateThemeButton();
  },

  updateThemeButton() {
    const btn = document.getElementById("btn-toggle-theme");
    if (!btn) return;
    if (this.theme === "dark") {
      btn.innerHTML = `<svg class="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
      btn.title = "Beralih ke Mode Terang";
    } else {
      btn.innerHTML = `<svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
      btn.title = "Beralih ke Mode Gelap";
    }
  },

  initKufiSystem() {
    if (window.KufiArt) {
      window.KufiArt.init();
    }
  },

  cycleKufiStyle() {
    if (!window.KufiArt) return;
    const current = window.KufiArt.currentStyle;
    let next = "hybrid";
    if (current === "hybrid") next = "eastern";
    else if (current === "eastern") next = "murabba";
    else next = "hybrid";

    window.KufiArt.applyStyle(next);
    this.showToast(`Tipografi: ${document.getElementById("current-kufi-style-label")?.textContent || next}`);
    this.renderActiveQuote();
    this.renderPrayerCards();
  },

  /* ==========================================================================
     2. LOKASI, KOTA & GPS
     ========================================================================== */
  initLocation() {
    const select = document.getElementById("city-select");
    if (!select) return;

    select.innerHTML = "";
    PrayerCalc.CITIES.forEach((city) => {
      const opt = document.createElement("option");
      opt.value = city.id;
      opt.textContent = `${city.name} (${city.province})`;
      select.appendChild(opt);
    });

    // Muat lokasi tersimpan
    let savedCityId = "jkt";
    try {
      const saved = localStorage.getItem("selected_city_id");
      if (saved && PrayerCalc.CITIES.find(c => c.id === saved)) {
        savedCityId = saved;
      }
    } catch (e) {}

    select.value = savedCityId;
    this.selectedCity = PrayerCalc.CITIES.find(c => c.id === savedCityId) || PrayerCalc.CITIES[0];
    this.updateQiblaDisplay();
  },

  setCity(cityId) {
    const city = PrayerCalc.CITIES.find(c => c.id === cityId);
    if (!city) return;
    this.selectedCity = city;
    try {
      localStorage.setItem("selected_city_id", cityId);
    } catch (e) {}

    this.updateQiblaDisplay();
    this.updatePrayerTimes();
  },

  detectGPS() {
    if (!("geolocation" in navigator)) {
      alert("Perangkat Anda tidak mendukung fitur geolokasi GPS.");
      return;
    }

    const badge = document.getElementById("data-source-badge");
    if (badge) badge.textContent = "Mencari GPS...";

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        
        // Estimasi timezone Indonesia
        let tz = 7;
        if (lng >= 115 && lng < 125) tz = 8;
        else if (lng >= 125) tz = 9;

        this.selectedCity = {
          id: "gps",
          name: "Lokasi GPS Anda",
          lat,
          lng,
          tz,
          province: "Koordinat Presisi"
        };

        const locLabel = document.getElementById("current-location-label");
        if (locLabel) {
          locLabel.textContent = `📍 Koordinat: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }

        this.updateQiblaDisplay();
        this.updatePrayerTimes();
        this.showToast("📍 Lokasi GPS berhasil diselaraskan!");
      },
      (err) => {
        alert("Gagal mendeteksi lokasi GPS. Pastikan izin lokasi telah aktif.");
        if (badge) badge.textContent = "Standar Kemenag RI";
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  },

  updateQiblaDisplay() {
    if (!this.selectedCity) return;
    const qibla = PrayerCalc.getQiblaDirection(this.selectedCity.lat, this.selectedCity.lng);
    const dist = PrayerCalc.getDistanceToKaaba(this.selectedCity.lat, this.selectedCity.lng);

    const degEl = document.getElementById("qibla-degree");
    const arrow = document.getElementById("qibla-compass-arrow");
    const distEl = document.getElementById("qibla-distance");

    if (degEl) degEl.textContent = `${qibla}°`;
    if (arrow) arrow.style.transform = `rotate(${qibla}deg)`;
    if (distEl) distEl.textContent = `${dist.toLocaleString("id-ID")} km ke Ka'bah`;
  },

  /* ==========================================================================
     3. PENANGGALAN MASEHI & HIJRIYAH
     ========================================================================== */
  initHijriCalendar() {
    this.renderDates();
  },

  renderDates() {
    const now = new Date();
    const masehi = HijriCalendar.getMasehiDate(now);
    const hijri = HijriCalendar.getHijriDate(now);

    const masehiEl = document.getElementById("masehi-date");
    const hijriEl = document.getElementById("hijri-date");
    const hijriArEl = document.getElementById("hijri-date-ar");
    const corrEl = document.getElementById("hijri-adj-val");
    const eventBadge = document.getElementById("special-islamic-event-badge");

    if (masehiEl) masehiEl.textContent = masehi.formatted;
    if (hijriEl) hijriEl.textContent = hijri.formattedId;
    if (hijriArEl) hijriArEl.textContent = hijri.formattedAr;
    if (corrEl) {
      const sign = hijri.correction > 0 ? "+" : "";
      corrEl.textContent = `${sign}${hijri.correction}`;
    }

    if (eventBadge) {
      if (hijri.specialEvent) {
        eventBadge.classList.remove("hidden");
        eventBadge.innerHTML = `
          <span class="font-bold">${hijri.specialEvent.badge}</span>: 
          <span>${hijri.specialEvent.title}</span>
        `;
        eventBadge.title = hijri.specialEvent.desc;
      } else {
        eventBadge.classList.add("hidden");
      }
    }
  },

  adjustHijri(delta) {
    const current = HijriCalendar.getCorrection();
    HijriCalendar.setCorrection(current + delta);
    this.renderDates();
    this.showToast(`Koreksi Hijriyah: ${HijriCalendar.getCorrection() > 0 ? "+" : ""}${HijriCalendar.getCorrection()} Hari`);
  },

  /* ==========================================================================
     4. JAM REAL-TIME & JADWAL SHOLAT
     ========================================================================== */
  updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");

    const clockEl = document.getElementById("live-clock");
    const secEl = document.getElementById("live-seconds");

    if (clockEl) clockEl.textContent = `${h}:${m}`;
    if (secEl) secEl.textContent = s;

    // Perbarui countdown menuju sholat berikutnya
    this.updateCountdown(now);
  },

  async updatePrayerTimes() {
    if (!this.selectedCity) return;
    const now = new Date();

    // 1. Hitung langsung secara lokal (Jean Meeus Offline Engine)
    const offlineTimes = PrayerCalc.calculate(
      now,
      this.selectedCity.lat,
      this.selectedCity.lng,
      this.selectedCity.tz
    );

    this.prayerTimes = offlineTimes;
    this.renderPrayerCards();

    const locLabel = document.getElementById("current-location-label");
    if (locLabel && this.selectedCity.id !== "gps") {
      locLabel.textContent = `${this.selectedCity.name}, ${this.selectedCity.province}`;
    }

    // 2. Coba sync dengan API online jika terhubung
    try {
      const onlineTimes = await PrayerCalc.fetchOnlineTimes(
        now,
        this.selectedCity.lat,
        this.selectedCity.lng,
        this.selectedCity.tz
      );
      if (onlineTimes) {
        this.prayerTimes = onlineTimes;
        this.renderPrayerCards();
        const badge = document.getElementById("data-source-badge");
        if (badge) badge.textContent = onlineTimes.source;
      }
    } catch (e) {}

    // Perbarui suasana latar belakang jika mode otomatis
    if (window.NabawiBackground && NabawiBackground.currentKey === "auto") {
      NabawiBackground.setAtmosphere("auto");
    }
  },

  renderPrayerCards() {
    const container = document.getElementById("prayer-cards-container");
    if (!container || !this.prayerTimes) return;

    const prayers = [
      { key: "imsak", name: "Imsak", ar: "الإمْسَاك", icon: "🌙" },
      { key: "subuh", name: "Subuh", ar: "الفَجْر", icon: "🌅" },
      { key: "syuruq", name: "Syuruq", ar: "الشُّرُوق", icon: "✨" },
      { key: "dhuha", name: "Dhuha", ar: "الضُّحَى", icon: "☀️" },
      { key: "dzuhur", name: "Dzuhur", ar: "الظُّهْر", icon: "☀️" },
      { key: "ashar", name: "Ashar", ar: "العَصْر", icon: "⛅" },
      { key: "maghrib", name: "Maghrib", ar: "المَغْرِب", icon: "🌇" },
      { key: "isya", name: "Isya", ar: "العِشَاء", icon: "🌌" },
      { key: "tahajjud", name: "Tahajjud", ar: "التَّهَجُّد", icon: "🌟" }
    ];

    container.innerHTML = "";

    prayers.forEach((p) => {
      const timeVal = this.prayerTimes[p.key] || "--:--";
      const card = document.createElement("div");
      card.className = `prayer-card rounded-2xl p-3.5 flex flex-col justify-between text-center cursor-pointer transition-all duration-300`;
      card.id = `card-prayer-${p.key}`;

      // Ambil tulisan Kufi Murabba atau Eastern
      const kufiName = window.KufiArt ? window.KufiArt.getPrayerKufi(p.key) || p.ar : p.ar;

      card.innerHTML = `
        <div>
          <div class="text-xl mb-1">${p.icon}</div>
          <div class="font-kufi-eastern text-xs text-amber-300/80 mb-0.5" dir="rtl">${kufiName}</div>
          <div class="text-xs font-bold text-slate-200 tracking-wide uppercase">${p.name}</div>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-700/40">
          <div class="text-base sm:text-lg font-mono font-extrabold text-emerald-400">${timeVal}</div>
        </div>
      `;

      card.addEventListener("click", () => {
        this.selectQuotePrayer(p.key);
        // Scroll halus ke seksi hadits
        document.getElementById("hadits-section")?.scrollIntoView({ behavior: "smooth" });
      });

      container.appendChild(card);
    });

    this.updateActivePrayerHighlight();
  },

  updateActivePrayerHighlight() {
    if (!this.prayerTimes) return;
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();

    const toMins = (str) => {
      if (!str || str === "--:--") return -1;
      const parts = str.split(":");
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    };

    const keys = ["imsak", "subuh", "syuruq", "dhuha", "dzuhur", "ashar", "maghrib", "isya"];
    let active = "isya";
    let nextKey = "imsak";

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const m = toMins(this.prayerTimes[k]);
      if (m !== -1 && currentMins >= m) {
        active = k;
        nextKey = keys[(i + 1) % keys.length];
      }
    }

    // Hapus kelas aktif sebelumnya
    document.querySelectorAll(".prayer-card").forEach((c) => {
      c.classList.remove("active-prayer-card", "next-prayer-card");
    });

    // Pasang highlight
    document.getElementById(`card-prayer-${active}`)?.classList.add("active-prayer-card");
    document.getElementById(`card-prayer-${nextKey}`)?.classList.add("next-prayer-card");

    this.activePrayerKey = active;
    this.nextPrayer = {
      key: nextKey,
      time: this.prayerTimes[nextKey]
    };
  },

  updateCountdown(now) {
    if (!this.prayerTimes) return;
    this.updateActivePrayerHighlight();

    if (!this.nextPrayer || !this.nextPrayer.time) return;

    const parts = this.nextPrayer.time.split(":");
    let targetHours = parseInt(parts[0], 10);
    let targetMins = parseInt(parts[1], 10);

    let targetDate = new Date(now);
    targetDate.setHours(targetHours, targetMins, 0, 0);

    if (targetDate <= now) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const diffMs = targetDate - now;
    const diffSecs = Math.floor(diffMs / 1000);

    const h = Math.floor(diffSecs / 3600);
    const m = Math.floor((diffSecs % 3600) / 60);
    const s = diffSecs % 60;

    const cdEl = document.getElementById("next-prayer-countdown");
    const nameEl = document.getElementById("next-prayer-name");
    const targetTimeEl = document.getElementById("next-prayer-target-time");
    const bar = document.getElementById("prayer-progress-bar");

    const prayerNameCapital = this.nextPrayer.key.charAt(0).toUpperCase() + this.nextPrayer.key.slice(1);

    if (nameEl) nameEl.textContent = prayerNameCapital;
    if (targetTimeEl) targetTimeEl.textContent = this.nextPrayer.time;
    if (cdEl) {
      cdEl.textContent = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    // Efek ketika tepat 00:00:00 (Waktu Sholat Tiba)
    if (diffSecs === 0) {
      if (window.AdzanAudioPlayer) {
        window.AdzanAudioPlayer.playAdzan(this.nextPrayer.key);
        window.AdzanAudioPlayer.sendNotification(this.nextPrayer.key, this.nextPrayer.time);
      }
    }

    // Progress bar (asumsi rentang rata-rata 3.5 jam)
    if (bar) {
      const maxSpanSecs = 4 * 3600;
      const progress = Math.max(5, Math.min(100, 100 - (diffSecs / maxSpanSecs) * 100));
      bar.style.width = `${progress}%`;
    }
  },

  /* ==========================================================================
     5. MUTIARA HIKMAH (HADITS, SAHABAT, ULAMA)
     ========================================================================== */
  initQuotesSection() {
    this.renderPrayerPills();
    this.selectQuotePrayer("subuh");
  },

  renderPrayerPills() {
    const container = document.getElementById("quote-prayer-pills");
    if (!container) return;

    const list = [
      { key: "subuh", label: "🌅 Subuh" },
      { key: "syuruq", label: "✨ Syuruq" },
      { key: "dhuha", label: "☀️ Dhuha" },
      { key: "dzuhur", label: "☀️ Dzuhur" },
      { key: "ashar", label: "⛅ Ashar" },
      { key: "maghrib", label: "🌇 Maghrib" },
      { key: "isya", label: "🌌 Isya" },
      { key: "tahajjud", label: "🌟 Tahajjud" },
      { key: "imsak", label: "🌙 Imsak" }
    ];

    container.innerHTML = "";
    list.forEach((item) => {
      const btn = document.createElement("button");
      btn.className = `px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
        this.activeQuotePrayer === item.key
          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
          : "bg-slate-900/80 text-slate-300 border-slate-700 hover:border-amber-400/50"
      }`;
      btn.textContent = item.label;
      btn.id = `pill-quote-${item.key}`;
      btn.addEventListener("click", () => this.selectQuotePrayer(item.key));
      container.appendChild(btn);
    });
  },

  selectQuotePrayer(prayerKey) {
    this.activeQuotePrayer = prayerKey;
    this.currentQuoteIndex = 0;

    // Update styling pills
    document.querySelectorAll("#quote-prayer-pills button").forEach((b) => {
      b.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border bg-slate-900/80 text-slate-300 border-slate-700 hover:border-amber-400/50";
    });
    const activePill = document.getElementById(`pill-quote-${prayerKey}`);
    if (activePill) {
      activePill.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20";
    }

    this.renderActiveQuote();
  },

  getFilteredQuotes() {
    const all = PRAYER_QUOTES[this.activeQuotePrayer] || PRAYER_QUOTES.subuh;
    if (this.quoteFilter === "all") return all;
    return all.filter((q) => q.category === this.quoteFilter);
  },

  renderActiveQuote() {
    const quotes = this.getFilteredQuotes();
    if (!quotes || quotes.length === 0) return;

    if (this.currentQuoteIndex >= quotes.length) this.currentQuoteIndex = 0;
    const item = quotes[this.currentQuoteIndex];

    const badge = document.getElementById("quote-badge-category");
    const arabic = document.getElementById("quote-arabic");
    const trans = document.getElementById("quote-translation");
    const narr = document.getElementById("quote-narrator");
    const src = document.getElementById("quote-source");
    const note = document.getElementById("quote-note");

    const categoryNames = {
      hadits: "📖 Hadits Nabi ﷺ",
      sahabat: "🛡️ Atsar Sahabat Nabi",
      ulama: "💎 Mutiara Ulama"
    };

    if (badge) {
      badge.textContent = categoryNames[item.category] || "Mutiara Hikmah";
    }

    if (arabic) {
      arabic.textContent = item.arabic;
      // Gunakan kelas Kufi yang aktif
      arabic.className = "kufi-dynamic-text text-2xl md:text-3xl font-medium text-amber-200 text-right my-5 leading-loose";
    }

    if (trans) trans.textContent = `"${item.translation}"`;
    if (narr) narr.textContent = item.narrator;
    if (src) src.textContent = item.source;
    if (note) note.innerHTML = `💡 <span class="font-bold">Tadabbur:</span> ${item.note}`;
  },

  nextQuote() {
    const quotes = this.getFilteredQuotes();
    this.currentQuoteIndex = (this.currentQuoteIndex + 1) % quotes.length;
    this.renderActiveQuote();
  },

  copyCurrentQuote() {
    const quotes = this.getFilteredQuotes();
    const item = quotes[this.currentQuoteIndex];
    if (!item) return;

    const copyText = `✨ *Mutiara Waktu ${this.activeQuotePrayer.toUpperCase()}* ✨\n\n${item.arabic}\n\n"${item.translation}"\n\n👤 ${item.narrator}\n📚 ${item.source}\n💡 ${item.note}\n\n_Disalin dari Aplikasi Adzan: Cahaya Diatas Cahaya_`;

    navigator.clipboard.writeText(copyText).then(() => {
      this.showToast("📋 Kutipan berhasil disalin ke papan klip!");
    }).catch(() => {
      this.showToast("Gagal menyalin teks.");
    });
  },

  readQuoteAloud() {
    const quotes = this.getFilteredQuotes();
    const item = quotes[this.currentQuoteIndex];
    if (!item || !("speechSynthesis" in window)) {
      this.showToast("Browser tidak mendukung fitur audio pembaca suara.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(item.translation);
    utterance.lang = "id-ID";
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    this.showToast("🔊 Membaca terjemahan hadits...");
  },

  /* ==========================================================================
     6. AUDIO ADZAN, LATAR BELAKANG & FITUR ISLAMI
     ========================================================================== */
  initAudioPlayer() {
    if (window.AdzanAudioPlayer) {
      window.AdzanAudioPlayer.init();
    }
  },

  initNabawiBackground() {
    if (window.NabawiBackground) {
      window.NabawiBackground.init();
      window.NabawiBackground.setAtmosphere("auto");
    }
  },

  initIslamicFeatures() {
    if (window.IslamicFeatures) {
      window.IslamicFeatures.init();
    }
  },

  initModals() {
    // Render teks Doa Setelah Adzan di modal
    const doaModal = document.getElementById("doa-adzan-modal");
    if (doaModal && window.IslamicFeatures) {
      const doa = IslamicFeatures.DOA_SETELAH_ADZAN;
      document.getElementById("modal-doa-arabic").textContent = doa.arabic;
      document.getElementById("modal-doa-latin").textContent = doa.latin;
      document.getElementById("modal-doa-meaning").textContent = `"${doa.meaning}"`;
      document.getElementById("modal-doa-virtue").textContent = doa.virtue;
    }

    // Render Ayat An-Nur 35 di modal
    const nurModal = document.getElementById("nur-ayat-modal");
    if (nurModal && window.IslamicFeatures) {
      const ayat = IslamicFeatures.AYAT_AN_NUR;
      document.getElementById("modal-nur-arabic").textContent = ayat.arabic;
      document.getElementById("modal-nur-meaning").textContent = ayat.meaning;
      document.getElementById("modal-nur-tadabbur").textContent = ayat.tadabbur;
    }
  },

  showDoaModal() {
    const modal = document.getElementById("doa-adzan-modal");
    if (modal) modal.classList.remove("hidden");
  },

  closeDoaModal() {
    const modal = document.getElementById("doa-adzan-modal");
    if (modal) modal.classList.add("hidden");
    if (window.AdzanAudioPlayer) window.AdzanAudioPlayer.stopDoaAfterAdzan();
  },

  showNurAyatModal() {
    const modal = document.getElementById("nur-ayat-modal");
    if (modal) modal.classList.remove("hidden");
  },

  closeNurAyatModal() {
    const modal = document.getElementById("nur-ayat-modal");
    if (modal) modal.classList.add("hidden");
  },

  showKufiShowcaseModal() {
    const modal = document.getElementById("kufi-showcase-modal");
    if (modal) modal.classList.remove("hidden");
  },

  closeKufiShowcaseModal() {
    const modal = document.getElementById("kufi-showcase-modal");
    if (modal) modal.classList.add("hidden");
  },

  /* ==========================================================================
     7. EVENT LISTENERS & UI HELPERS
     ========================================================================== */
  setupEventListeners() {
    // Tombol Ganti Tema
    document.getElementById("btn-toggle-theme")?.addEventListener("click", () => this.toggleTheme());

    // Tombol Ganti Gaya Kufi
    document.getElementById("btn-cycle-kufi")?.addEventListener("click", () => this.cycleKufiStyle());
    document.getElementById("btn-open-kufi-modal")?.addEventListener("click", () => this.showKufiShowcaseModal());

    // Tombol Tadabbur Ayat Cahaya
    document.getElementById("btn-open-nur-ayat")?.addEventListener("click", () => this.showNurAyatModal());

    // Pilihan Kota & GPS
    document.getElementById("city-select")?.addEventListener("change", (e) => this.setCity(e.target.value));
    document.getElementById("btn-gps")?.addEventListener("click", () => this.detectGPS());

    // Koreksi Hijriyah
    document.getElementById("btn-hijri-minus")?.addEventListener("click", () => this.adjustHijri(-1));
    document.getElementById("btn-hijri-plus")?.addEventListener("click", () => this.adjustHijri(1));

    // Audio Adzan Controls
    document.getElementById("btn-mute")?.addEventListener("click", () => {
      const isMuted = window.AdzanAudioPlayer ? window.AdzanAudioPlayer.toggleMute() : false;
      const btn = document.getElementById("btn-mute");
      if (btn) btn.innerHTML = isMuted ? "🔇" : "🔊";
    });

    document.getElementById("adzan-voice-select")?.addEventListener("change", (e) => {
      if (window.AdzanAudioPlayer) window.AdzanAudioPlayer.setSource(e.target.value);
    });

    document.getElementById("volume-slider")?.addEventListener("input", (e) => {
      if (window.AdzanAudioPlayer) window.AdzanAudioPlayer.setVolume(e.target.value);
      const label = document.getElementById("volume-val-label");
      if (label) label.textContent = `${Math.round(e.target.value * 100)}%`;
    });

    document.getElementById("btn-test-adzan")?.addEventListener("click", () => {
      if (window.AdzanAudioPlayer) window.AdzanAudioPlayer.togglePlayTest();
    });

    // Mutiara Quotes Controls
    document.getElementById("quote-category-filter")?.addEventListener("change", (e) => {
      this.quoteFilter = e.target.value;
      this.currentQuoteIndex = 0;
      this.renderActiveQuote();
    });

    document.getElementById("btn-next-quote")?.addEventListener("click", () => this.nextQuote());
    document.getElementById("btn-copy-quote")?.addEventListener("click", () => this.copyCurrentQuote());
    document.getElementById("btn-read-quote")?.addEventListener("click", () => this.readQuoteAloud());

    // Modal Doa Setelah Adzan Controls
    document.getElementById("btn-close-doa-modal")?.addEventListener("click", () => this.closeDoaModal());
    document.getElementById("btn-play-doa-audio")?.addEventListener("click", () => {
      if (window.AdzanAudioPlayer) window.AdzanAudioPlayer.playDoaAfterAdzan();
    });

    // Modal Nur Ayat Controls
    document.getElementById("btn-close-nur-modal")?.addEventListener("click", () => this.closeNurAyatModal());

    // Modal Kufi Controls
    document.getElementById("btn-close-kufi-modal")?.addEventListener("click", () => this.closeKufiShowcaseModal());

    // Izin Notifikasi
    document.getElementById("btn-req-notification")?.addEventListener("click", () => {
      if ("Notification" in window) {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            document.getElementById("notification-banner")?.classList.add("hidden");
            this.showToast("🔔 Izin notifikasi waktu sholat telah aktif!");
          }
        });
      }
    });

    if ("Notification" in window && Notification.permission === "granted") {
      document.getElementById("notification-banner")?.classList.add("hidden");
    }
  },

  showToast(message) {
    const toast = document.getElementById("copy-toast");
    if (!toast) return;
    toast.querySelector("span:last-child").textContent = message;
    toast.classList.remove("opacity-0", "translate-y-2", "pointer-events-none");
    toast.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0");
      toast.classList.add("opacity-0", "translate-y-2", "pointer-events-none");
    }, 2800);
  }
};

// Start application on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

// Global Export
if (typeof window !== "undefined") {
  window.App = App;
}
