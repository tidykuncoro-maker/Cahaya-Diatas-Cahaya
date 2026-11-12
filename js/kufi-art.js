/**
 * kufi-art.js
 * Modul Kaligrafi Khot Kuffi Murabba (Square Kufic) & Khot Kuffi Eastern
 * Khusus Aplikasi "Cahaya Diatas Cahaya"
 */

const KufiArt = {
  currentStyle: "hybrid", // "hybrid" | "eastern" | "murabba"

  // Seni Kaligrafi Geometris SVG Khot Kuffi Murabba
  SVGS: {
    // 1. "نُورٌ عَلَىٰ نُورٍ" (Cahaya Diatas Cahaya) dalam Kuffi Murabba Geometris
    nurunAlaNur: `
      <svg class="svg-kufi-frame" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="نور على نور - Cahaya Diatas Cahaya">
        <defs>
          <linearGradient id="goldGradientNur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fde047" />
            <stop offset="50%" stop-color="#fbbf24" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
          <filter id="glowNur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <!-- Border Ornamen Kuffi Geometris -->
        <rect x="4" y="4" width="392" height="92" fill="none" stroke="rgba(251, 191, 36, 0.4)" stroke-width="2" stroke-dasharray="8 4" />
        <rect x="8" y="8" width="384" height="84" fill="none" stroke="rgba(52, 211, 153, 0.25)" stroke-width="1" />
        
        <!-- Sudut Aksen Kufi Persegi -->
        <rect x="4" y="4" width="10" height="10" fill="#fbbf24" opacity="0.8" />
        <rect x="386" y="4" width="10" height="10" fill="#fbbf24" opacity="0.8" />
        <rect x="4" y="86" width="10" height="10" fill="#fbbf24" opacity="0.8" />
        <rect x="386" y="86" width="10" height="10" fill="#fbbf24" opacity="0.8" />

        <!-- Teks Kuffi Murabba Stylized Grid Matrix -->
        <g fill="url(#goldGradientNur)" filter="url(#glowNur)">
          <!-- نُورٌ عَلَىٰ نُورٍ rendered with precision Kufic paths & typography -->
          <text x="200" y="58" font-family="'Reem Kufi Fun', 'Noto Kufi Arabic', monospace" font-size="34" font-weight="900" text-anchor="middle" letter-spacing="4" dir="rtl">
            نُـورٌ عَـلَـىٰ نُـورٍ
          </text>
        </g>
        <!-- Subtitle Latin Estetik -->
        <text x="200" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" text-anchor="middle" fill="#94a3b8" letter-spacing="6">
          CAHAYA DIATAS CAHAYA • QS. AN-NUR: 35
        </text>
      </svg>
    `,

    // 2. "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" dalam Kuffi Murabba
    bismillah: `
      <svg class="svg-kufi-frame" viewBox="0 0 500 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="بسم الله الرحمن الرحيم">
        <defs>
          <linearGradient id="goldGradBismillah" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#34d399" />
            <stop offset="50%" stop-color="#fef08a" />
            <stop offset="100%" stop-color="#fbbf24" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="496" height="76" rx="8" fill="rgba(6, 78, 59, 0.25)" stroke="rgba(251, 191, 36, 0.35)" stroke-width="1.5" />
        <text x="250" y="48" font-family="'Reem Kufi', 'Noto Kufi Arabic', monospace" font-size="26" font-weight="800" text-anchor="middle" fill="url(#goldGradBismillah)" letter-spacing="3" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </text>
      </svg>
    `,

    // 3. Medali Kufi Murabba: "الله" & "محمد"
    medallionAllah: `
      <svg viewBox="0 0 100 100" class="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="92" height="92" rx="12" fill="rgba(16, 185, 129, 0.15)" stroke="#fbbf24" stroke-width="2" />
        <rect x="10" y="10" width="80" height="80" rx="8" fill="none" stroke="rgba(52, 211, 153, 0.3)" stroke-width="1" />
        <text x="50" y="62" font-family="'Reem Kufi', monospace" font-size="34" font-weight="900" text-anchor="middle" fill="#fbbf24" dir="rtl">الله</text>
      </svg>
    `,

    medallionMuhammad: `
      <svg viewBox="0 0 100 100" class="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="92" height="92" rx="12" fill="rgba(16, 185, 129, 0.15)" stroke="#34d399" stroke-width="2" />
        <rect x="10" y="10" width="80" height="80" rx="8" fill="none" stroke="rgba(251, 191, 36, 0.3)" stroke-width="1" />
        <text x="50" y="62" font-family="'Reem Kufi', monospace" font-size="28" font-weight="900" text-anchor="middle" fill="#34d399" dir="rtl">مُحَمَّد</text>
      </svg>
    `,

    // Nama-Nama Waktu Sholat dalam Kuffi Murabba Persegi
    prayerKufiNames: {
      imsak: "الإمْسَاك",
      subuh: "الفَجْر",
      syuruq: "الشُّرُوق",
      dhuha: "الضُّحَى",
      dzuhur: "الظُّهْر",
      ashar: "العَصْر",
      maghrib: "المَغْرِب",
      isya: "العِشَاء",
      tahajjud: "التَّهَجُّد"
    }
  },

  init() {
    // Muat preferensi khot tersimpan
    try {
      const saved = localStorage.getItem("kufi_style_pref");
      if (saved && ["hybrid", "eastern", "murabba"].includes(saved)) {
        this.currentStyle = saved;
      }
    } catch (e) {}

    this.applyStyle(this.currentStyle);
  },

  /**
   * Mengatur mode kaligrafi Arab aplikasi
   * @param {"hybrid" | "eastern" | "murabba"} style 
   */
  applyStyle(style) {
    this.currentStyle = style;
    try {
      localStorage.setItem("kufi_style_pref", style);
    } catch (e) {}

    document.documentElement.setAttribute("data-kufi-style", style);

    // Update label / tombol pemilih jika ada
    const labelEl = document.getElementById("current-kufi-style-label");
    if (labelEl) {
      if (style === "hybrid") labelEl.textContent = "Harmonis (Murabba + Eastern)";
      else if (style === "eastern") labelEl.textContent = "Khot Kuffi Eastern (المشرقي)";
      else if (style === "murabba") labelEl.textContent = "Khot Kuffi Murabba (المربع)";
    }
  },

  /**
   * Mengembalikan kaligrafi SVG Nurun 'Ala Nur
   */
  getNurunAlaNurSVG() {
    return this.SVGS.nurunAlaNur;
  },

  /**
   * Mengembalikan nama sholat dalam kaligrafi Kufi
   */
  getPrayerKufi(prayerKey) {
    return this.SVGS.prayerKufiNames[prayerKey] || "";
  }
};

// Global export
if (typeof window !== "undefined") {
  window.KufiArt = KufiArt;
}
