/**
 * hijri.js
 * Konversi Penanggalan Hijriyah & Masehi Akurat
 * Aplikasi "Cahaya Diatas Cahaya"
 * 
 * Fitur:
 * 1. Kalender Umm Al-Qura (Standar Kemenag & Internasional)
 * 2. Kalibrasi Rukyatul Hilal Sidang Isbat (+/- 2 hari)
 * 3. Teks Arab dalam Aksara Khot Kuffi Eastern & Murabba
 * 4. Deteksi Otomatis Hari-Hari Istimewa Islam (Ayyamul Bidh, Puasa Senin-Kamis, Ramadhan, Idul Fitri, dll.)
 */

const HijriCalendar = {
  monthsId: [
    "Muharram",
    "Shafar",
    "Rabi'ul Awwal",
    "Rabi'ul Akhir",
    "Jumadil Awwal",
    "Jumadil Akhir",
    "Rajab",
    "Sya'ban",
    "Ramadhan",
    "Syawwal",
    "Dzulqa'dah",
    "Dzulhijjah"
  ],

  monthsAr: [
    "مُحَرَّم",
    "صَفَر",
    "رَبِيع الأَوَّل",
    "رَبِيع الآخِر",
    "جُمَادَى الأُولَى",
    "جُمَادَى الآخِرَة",
    "رَجَب",
    "شَعْبَان",
    "رَمَضَان",
    "شَوَّال",
    "ذُو القَعْدَة",
    "ذُو الحِجَّة"
  ],

  daysId: [
    "Ahad",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu"
  ],

  daysAr: [
    "الأَحَد",
    "الاِثْنَيْن",
    "الثُّلَاثَاء",
    "الأَرْبِعَاء",
    "الخَمِيس",
    "الجُمُعَة",
    "السَّبْت"
  ],

  // Angka Arab
  arabicDigits: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"],

  toArabicDigits(num) {
    return String(num).replace(/[0-9]/g, (d) => this.arabicDigits[d]);
  },

  // Offset koreksi rukyatul hilal (-2 sampai +2 hari)
  correctionDays: 0,

  setCorrection(days) {
    this.correctionDays = Math.max(-2, Math.min(2, parseInt(days, 10) || 0));
    try {
      localStorage.setItem("hijri_correction_val", this.correctionDays);
    } catch (e) {}
  },

  getCorrection() {
    try {
      const saved = localStorage.getItem("hijri_correction_val");
      if (saved !== null) {
        this.correctionDays = parseInt(saved, 10) || 0;
      }
    } catch (e) {}
    return this.correctionDays;
  },

  /**
   * Konversi Date Masehi ke Hijriyah dengan koreksi rukyat
   */
  getHijriDate(date = new Date()) {
    const corr = this.getCorrection();
    const adjustedDate = new Date(date.getTime() + corr * 86400000);

    let hDay, hMonth, hYear;

    // Coba Intl DateTimeFormat (Islamic Umm al-Qura)
    try {
      const formatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      });
      const parts = formatter.formatToParts(adjustedDate);
      
      parts.forEach(p => {
        if (p.type === "day") hDay = parseInt(p.value, 10);
        if (p.type === "month") hMonth = parseInt(p.value, 10) - 1;
        if (p.type === "year") hYear = parseInt(p.value, 10);
      });
    } catch (e) {
      // Fallback algoritma astronomis
      const fb = this.astronomicalHijri(adjustedDate);
      hDay = fb.day;
      hMonth = fb.month;
      hYear = fb.year;
    }

    if (isNaN(hDay) || isNaN(hMonth) || isNaN(hYear)) {
      const fb = this.astronomicalHijri(adjustedDate);
      hDay = fb.day;
      hMonth = fb.month;
      hYear = fb.year;
    }

    const dayOfWeek = adjustedDate.getDay();
    const monthNameId = this.monthsId[hMonth] || "Hijriyah";
    const monthNameAr = this.monthsAr[hMonth] || "";
    const dayNameId = this.daysId[dayOfWeek];
    const dayNameAr = this.daysAr[dayOfWeek];

    // Deteksi hari istimewa Islam
    const specialEvent = this.detectSpecialEvent(hDay, hMonth, dayOfWeek);

    return {
      day: hDay,
      month: hMonth + 1,
      year: hYear,
      dayNameId,
      dayNameAr,
      monthNameId,
      monthNameAr,
      formattedId: `${hDay} ${monthNameId} ${hYear} H`,
      formattedAr: `${this.toArabicDigits(hDay)} ${monthNameAr} ${this.toArabicDigits(hYear)} هـ`,
      specialEvent,
      correction: corr
    };
  },

  /**
   * Format Masehi Lengkap
   */
  getMasehiDate(date = new Date()) {
    const monthsId = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const dayName = this.daysId[date.getDay()];
    const day = date.getDate();
    const monthName = monthsId[date.getMonth()];
    const year = date.getFullYear();

    return {
      dayName,
      day,
      monthName,
      year,
      formatted: `${dayName}, ${day} ${monthName} ${year} M`
    };
  },

  /**
   * Deteksi Hari-Hari Penuh Berkah dalam Islam
   */
  detectSpecialEvent(day, monthIndex, dayOfWeek) {
    // Puasa Sunnah Pekanan
    const isSenin = dayOfWeek === 1;
    const isKamis = dayOfWeek === 4;
    const isJumat = dayOfWeek === 5;

    // Ayyamul Bidh (13, 14, 15 setiap bulan hijriyah)
    if ([13, 14, 15].includes(day) && monthIndex !== 8) { // Bukan Ramadhan
      return {
        badge: "✨ Ayyamul Bidh",
        title: `Puasa Sunnah Ayyamul Bidh (Hari ke-${day - 12})`,
        desc: "Pahala puasa 3 hari setiap bulan bernilai seperti puasa setahun penuh."
      };
    }

    // Hari Jum'at Sayyidul Ayyam
    if (isJumat) {
      return {
        badge: "🕌 Sayyidul Ayyam",
        title: "Hari Jum'at Penuh Berkah",
        desc: "Perbanyak shalawat atas Nabi ﷺ, membaca QS. Al-Kahfi, dan mencari waktu mustajab di ashar."
      };
    }

    // Puasa Senin / Kamis
    if (isSenin) {
      return {
        badge: "🌿 Sunnah Senin",
        title: "Anjuran Puasa Sunnah Senin",
        desc: "Hari diperlihatkannya amalan kepada Allah dan hari kelahiran Rasulullah ﷺ."
      };
    }
    if (isKamis) {
      return {
        badge: "🌿 Sunnah Kamis",
        title: "Anjuran Puasa Sunnah Kamis",
        desc: "Hari diangkatnya catatan amalan hamba ke hadirat Allah Ta'ala."
      };
    }

    // Hari-hari besar Islam per bulan
    const m = monthIndex; // 0 = Muharram, ..., 11 = Dzulhijjah
    if (m === 0 && day === 1) return { badge: "🎉 1 Muharram", title: "Tahun Baru Islam 1 Muharram", desc: "Awal lembaran tahun baru dengan muhasabah dan amalan shalih." };
    if (m === 0 && day === 9) return { badge: "🌙 Tasu'a", title: "Puasa Tasu'a (9 Muharram)", desc: "Menyelisihi kebiasaan ahli kitab sebelum puasa Asyura." };
    if (m === 0 && day === 10) return { badge: "⭐ Asyura", title: "Puasa Asyura (10 Muharram)", desc: "Menghapuskan dosa-dosa setahun yang lalu." };
    if (m === 2 && day === 12) return { badge: "🌹 Maulid Nabi", title: "Peringatan Maulid Nabi ﷺ (12 Rabi'ul Awwal)", desc: "Mengenang akhlak mulia dan keteladanan agung Rasulullah ﷺ." };
    if (m === 6 && day === 27) return { badge: "🌌 Isra Mi'raj", title: "Peringatan Isra' & Mi'raj", desc: "Perjalanan agung Rasulullah ﷺ dan pensyariatan shalat lima waktu." };
    if (m === 7 && day === 15) return { badge: "🌕 Nisfu Sya'ban", title: "Malam Nisfu Sya'ban", desc: "Waktu penyerahan amalan tahunan dan limpahan ampunan Allah." };
    if (m === 8) {
      if (day === 1) return { badge: "🌙 Awal Ramadhan", title: "Marhaban ya Ramadhan!", desc: "Bulan suci yang penuh ampunan, rahmat, dan keberkahan." };
      if (day === 17) return { badge: "📖 Nuzulul Qur'an", title: "Malam Nuzulul Qur'an (17 Ramadhan)", desc: "Malam pertama kali diturunkannya mukjizat Al-Qur'an Al-Karim." };
      if (day >= 21) return { badge: "🌟 10 Malam Terakhir", title: "Memburu Lailatul Qadar", desc: "Menghidupkan malam dengan i'tikaf, tarawih, tilawah, dan doa." };
      return { badge: "🌙 Ramadhan Berkah", title: `Ramadhan Hari ke-${day}`, desc: "Tingkatkan sedekah, tilawah, dan shalat berjamaah di masjid." };
    }
    if (m === 9 && day === 1) return { badge: "🎊 Idul Fitri", title: "Hari Raya Idul Fitri 1 Syawwal", desc: "Taqabbalallahu minna wa minkum, hari kemenangan dan silaturrahim." };
    if (m === 11 && day === 9) return { badge: "🏔️ Hari Arafah", title: "Hari Arafah (9 Dzulhijjah)", desc: "Puasa Arafah menghapuskan dosa setahun lalu dan setahun mendatang." };
    if (m === 11 && day === 10) return { badge: "🐑 Idul Adha", title: "Hari Raya Idul Adha (10 Dzulhijjah)", desc: "Hari raya kurban dan meneladani ketundukan Nabi Ibrahim AS." };
    if (m === 11 && [11, 12, 13].includes(day)) return { badge: "🥩 Hari Tasyrik", title: `Hari Tasyrik ke-${day - 10} Dzulhijjah`, desc: "Hari makan, minum, dan banyak berdzikir mengingat Allah." };

    return null;
  },

  /**
   * Algoritma Astronomis Fallback Hijriyah
   */
  astronomicalHijri(date) {
    const jd = PrayerCalc.getJulianDate(date);
    let l = Math.floor(jd) - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    let m = Math.floor((24 * l) / 709);
    let d = l - Math.floor((709 * m) / 24);
    let y = 30 * n + j - 30;

    return {
      day: Math.max(1, Math.min(30, d)),
      month: Math.max(0, Math.min(11, m - 1)),
      year: y
    };
  }
};

// Global export
if (typeof window !== "undefined") {
  window.HijriCalendar = HijriCalendar;
}
