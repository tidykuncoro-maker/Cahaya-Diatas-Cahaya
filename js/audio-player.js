/**
 * audio-player.js
 * Manajemen Audio Adzan, Doa Setelah Adzan, & Efek Suara Islami
 * Aplikasi "Cahaya Diatas Cahaya"
 * 
 * Fitur:
 * 1. Pilihan Muadzin Terkenal (Madinah, Makkah, Al-Aqsa, Kairo, Khusus Subuh)
 * 2. Audio Doa Setelah Adzan (Arab, Latin, Terjemah, Audio)
 * 3. Offline Web Audio Synthesizer (Adzan tetap berbunyi saat tanpa kuota/internet)
 * 4. Efek Suara Tasbih Digital (Klik butir tasbih kayu syahdu)
 * 5. Notifikasi Desktop Otomatis
 */

const AdzanAudioPlayer = {
  audioElement: null,
  doaAudioElement: null,
  audioCtx: null,
  isPlaying: false,
  volume: 0.8,
  isMuted: false,

  // Sumber Audio Adzan Berkualitas Tinggi
  ADZAN_SOURCES: {
    madinah: {
      name: "Adzan Madinah Al-Munawwarah (Masjid Nabawi)",
      url: "https://www.islamcan.com/audio/adhan/azan2.mp3",
      muadzin: "Muadzin Masjid Nabawi"
    },
    makkah: {
      name: "Adzan Makkah Al-Mukarramah (Masjidil Haram)",
      url: "https://www.islamcan.com/audio/adhan/azan1.mp3",
      muadzin: "Syaikh Ali Mulla (Masjidil Haram)"
    },
    alaqsa: {
      name: "Adzan Masjid Al-Aqsa (Al-Quds)",
      url: "https://www.islamcan.com/audio/adhan/azan3.mp3",
      muadzin: "Muadzin Al-Haram Al-Qudsi"
    },
    mesir: {
      name: "Adzan Kairo (Mesir)",
      url: "https://www.islamcan.com/audio/adhan/azan7.mp3",
      muadzin: "Gaya Khas Kairo"
    },
    subuh: {
      name: "Adzan Khusus Subuh (Ash-shalatu khairun minan naum)",
      url: "https://www.islamcan.com/audio/adhan/azan2.mp3",
      muadzin: "Khas Fajar Madinah"
    }
  },

  // Audio Doa Setelah Adzan
  DOA_AUDIO_URL: "https://download.quranicaudio.com/misc/dua_after_adhan.mp3",

  currentSourceKey: "madinah",

  init() {
    this.audioElement = new Audio();
    this.audioElement.preload = "none";
    this.audioElement.volume = this.volume;

    this.doaAudioElement = new Audio();
    this.doaAudioElement.preload = "none";
    this.doaAudioElement.src = this.DOA_AUDIO_URL;
    this.doaAudioElement.volume = this.volume;

    // Muat preferensi tersimpan
    try {
      const savedVol = localStorage.getItem("adzan_volume");
      if (savedVol !== null) this.volume = parseFloat(savedVol);
      const savedMute = localStorage.getItem("adzan_muted");
      if (savedMute !== null) this.isMuted = savedMute === "true";
      const savedSrc = localStorage.getItem("adzan_source");
      if (savedSrc && this.ADZAN_SOURCES[savedSrc]) this.currentSourceKey = savedSrc;
    } catch (e) {}

    this.audioElement.volume = this.isMuted ? 0 : this.volume;
    this.doaAudioElement.volume = this.isMuted ? 0 : this.volume;

    this.audioElement.addEventListener("ended", () => {
      this.isPlaying = false;
      this.triggerStateChange();
      // Buka modal Doa Setelah Adzan
      if (window.App && window.App.showDoaModal) {
        window.App.showDoaModal();
      }
    });

    this.audioElement.addEventListener("error", () => {
      console.warn("Audio URL tidak dapat dimuat, beralih ke nada bel sintetis offline.");
      this.playOfflineSynthesizedAdzan();
    });
  },

  setSource(key) {
    if (this.ADZAN_SOURCES[key]) {
      this.currentSourceKey = key;
      try {
        localStorage.setItem("adzan_source", key);
      } catch (e) {}
    }
  },

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, parseFloat(val)));
    if (!this.isMuted) {
      if (this.audioElement) this.audioElement.volume = this.volume;
      if (this.doaAudioElement) this.doaAudioElement.volume = this.volume;
    }
    try {
      localStorage.setItem("adzan_volume", this.volume);
    } catch (e) {}
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) this.audioElement.volume = this.isMuted ? 0 : this.volume;
    if (this.doaAudioElement) this.doaAudioElement.volume = this.isMuted ? 0 : this.volume;
    try {
      localStorage.setItem("adzan_muted", this.isMuted);
    } catch (e) {}
    return this.isMuted;
  },

  /**
   * Putar adzan untuk waktu sholat tertentu
   * @param {string} prayerName - 'subuh', 'dzuhur', dll.
   */
  playAdzan(prayerName = "dzuhur") {
    if (this.isMuted) return;

    let sourceKey = this.currentSourceKey;
    if (prayerName === "subuh" && this.ADZAN_SOURCES.subuh) {
      sourceKey = "subuh";
    }

    const source = this.ADZAN_SOURCES[sourceKey] || this.ADZAN_SOURCES.madinah;

    try {
      this.audioElement.src = source.url;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.triggerStateChange();
          })
          .catch((err) => {
            console.warn("Autoplay ditahan browser atau offline, memutar nada nada lokal.", err);
            this.playOfflineSynthesizedAdzan();
          });
      }
    } catch (e) {
      this.playOfflineSynthesizedAdzan();
    }
  },

  stopAdzan() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    this.isPlaying = false;
    this.triggerStateChange();
  },

  togglePlayTest() {
    if (this.isPlaying) {
      this.stopAdzan();
    } else {
      this.playAdzan("dzuhur");
    }
  },

  playDoaAfterAdzan() {
    if (this.doaAudioElement) {
      this.doaAudioElement.currentTime = 0;
      this.doaAudioElement.play().catch(e => console.log("Doa audio play prevented"));
    }
  },

  stopDoaAfterAdzan() {
    if (this.doaAudioElement) {
      this.doaAudioElement.pause();
      this.doaAudioElement.currentTime = 0;
    }
  },

  /**
   * Generator Suara Adzan Sintetis (Web Audio API)
   * Berfungsi 100% offline tanpa file audio eksternal
   */
  playOfflineSynthesizedAdzan() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) this.audioCtx = new AudioContext();

      const ctx = this.audioCtx;
      if (ctx.state === "suspended") ctx.resume();

      // Melodi Adzan Hijaz Islami (Frekuensi nada: D4, Eb4, F#4, G4, A4, Bb4, C5, D5)
      const notes = [
        { f: 293.66, d: 1.5, g: 0.3 }, // D4 - Allaahu
        { f: 369.99, d: 2.0, g: 0.4 }, // F#4 - Akbar
        { f: 392.00, d: 2.2, g: 0.4 }, // G4 - Allaahu
        { f: 293.66, d: 2.8, g: 0.3 }, // D4 - Akbar
      ];

      let startTime = ctx.currentTime + 0.1;
      this.isPlaying = true;
      this.triggerStateChange();

      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(note.f, startTime);

        // Harmoni lembut (Overtones tabung resonansi)
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(note.g * this.volume, startTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.d);

        startTime += note.d + 0.2;
      });

      setTimeout(() => {
        this.isPlaying = false;
        this.triggerStateChange();
      }, (startTime - ctx.currentTime) * 1000);

    } catch (e) {
      console.warn("Web Audio API error", e);
    }
  },

  /**
   * Efek Suara Tasbih Kayu (Wooden Bead Click)
   */
  playTasbihClick() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) this.audioCtx = new AudioContext();

      const ctx = this.audioCtx;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15 * this.volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  },

  triggerStateChange() {
    const btn = document.getElementById("btn-test-adzan");
    const indicator = document.getElementById("audio-status-indicator");

    if (btn) {
      if (this.isPlaying) {
        btn.innerHTML = `
          <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Hentikan Adzan</span>
        `;
        btn.classList.add("bg-amber-600", "hover:bg-amber-500");
        btn.classList.remove("bg-emerald-600", "hover:bg-emerald-500");
      } else {
        btn.innerHTML = `
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Tes Suara Adzan</span>
        `;
        btn.classList.remove("bg-amber-600", "hover:bg-amber-500");
        btn.classList.add("bg-emerald-600", "hover:bg-emerald-500");
      }
    }

    if (indicator) {
      if (this.isPlaying) indicator.classList.remove("hidden");
      else indicator.classList.add("hidden");
    }
  },

  sendNotification(prayerName, timeStr) {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      const namesMap = {
        subuh: "Waktu Subuh Telah Tiba",
        syuruq: "Matahari Telah Terbit (Syuruq)",
        dhuha: "Waktu Dhuha Telah Tiba",
        dzuhur: "Waktu Dzuhur Telah Tiba",
        ashar: "Waktu Ashar Telah Tiba",
        maghrib: "Waktu Maghrib Telah Tiba",
        isya: "Waktu Isya Telah Tiba",
        imsak: "Waktu Imsak Telah Tiba"
      };

      const title = namesMap[prayerName] || `Waktu ${prayerName} Telah Tiba`;
      const body = `Pukul ${timeStr} WIB. Mari segerakan wudhu dan penuhi panggilan Allah. "Cahaya Diatas Cahaya"`;

      try {
        new Notification(title, {
          body,
          icon: "assets/icons/icon-192.png",
          badge: "assets/icons/icon-192.png"
        });
      } catch (e) {}
    }
  }
};

// Global export
if (typeof window !== "undefined") {
  window.AdzanAudioPlayer = AdzanAudioPlayer;
}
