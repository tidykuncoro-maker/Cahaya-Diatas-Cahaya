/**
 * quotes-data.js
 * Basis Data Hadits Shahih, Atsar Sahabat, dan Mutiara Nasehat Ulama
 * Terupdate & Khusus Diselaraskan untuk Aplikasi "Cahaya Diatas Cahaya"
 * 
 * Ditampilkan dalam Tipografi Khot Kuffi Eastern & Kuffi Murabba
 * Dilengkapi Terjemahan, Takhrij/Sanad, Perawi, dan Penjelasan Tadabbur
 */

const PRAYER_QUOTES = {
  imsak: [
    {
      category: "hadits",
      arabic: "تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً",
      translation: "Makan sahurlah kalian, karena sesungguhnya di dalam makan sahur itu terdapat keberkahan.",
      source: "HR. Bukhari no. 1923 & Muslim no. 1095",
      narrator: "Rasulullah ﷺ (dari Anas bin Malik رضي الله عنه)",
      note: "Keberkahan sahur meliputi berkah fisik (kekuatan menahan lapar) dan berkah ruhani (mengikuti sunnah dan waktu mustajab memohon ampunan)."
    },
    {
      category: "hadits",
      arabic: "السَّحُورُ أَكْلُهُ بَرَكَةٌ فَلَا تَدَعُوهُ وَلَوْ أَنْ يَجْرَعَ أَحَدُكُمْ جُرْعَةً مِنْ مَاءٍ فَإِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى الْمُتَسَحِّرِينَ",
      translation: "Sahur itu makanan yang penuh berkah, maka janganlah kalian meninggalkannya walau hanya seteguk air. Sesungguhnya Allah dan para malaikat-Nya bershalawat kepada orang-orang yang bersahur.",
      source: "HR. Ahmad no. 11086 (Sanad Hasan)",
      narrator: "Rasulullah ﷺ (dari Abu Sa'id Al-Khudri رضي الله عنه)",
      note: "Waktu sahur dan menjelang fajar adalah waktu istighfar yang sangat utama sebagaimana dipuji Allah dalam QS. Adz-Dzariyat: 18."
    },
    {
      category: "sahabat",
      arabic: "تَسَحَّرْنَا مَعَ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ ثُمَّ قَامَ إِلَى الصَّلَاةِ، كَمْ كَانَ بَيْنَ الْأَذَانِ وَالسَّحُورِ؟ قَالَ: قَدْرُ خَمْسِينَ آيَةً",
      translation: "Kami sahur bersama Nabi ﷺ kemudian beliau bangkit untuk shalat. Ditanyakan: 'Berapa lama jarak antara adzan dan sahur?' Zaid bin Tsabit menjawab: 'Kira-kira bacaan 50 ayat Al-Qur'an.'",
      source: "HR. Bukhari no. 1921 & Muslim no. 1097",
      narrator: "Atsar Zaid bin Tsabit رضي الله عنه",
      note: "Mengakhirkan sahur mendekati fajar adalah sunnah utama yang dicontohkan para sahabat Nabi."
    },
    {
      category: "ulama",
      arabic: "الْبَرَكَةُ فِي السَّحُورِ تَحْصُلُ بِجِهَاتٍ مُتَعَدِّدَةٍ؛ مِنْهَا اتِّبَاعُ السُّنَّةِ، وَمُخَالَفَةُ أَهْلِ الْكِتَابِ، وَالتَّقَوِّي بِهِ عَلَى الْعِبَادَةِ",
      translation: "Keberkahan sahur didapatkan dari banyak segi; di antaranya mengikuti Sunnah Nabi, membedakan diri dari ahli kitab, dan menguatkan badan untuk menjalankan ibadah.",
      source: "Fathul Bari (Syarah Shahih Al-Bukhari)",
      narrator: "Al-Hafizh Ibnu Hajar Al-Asqalani رحمه الله",
      note: "Nasehat ulama tentang pentingnya memanfaatkan waktu imsak dan sahur dengan kesadaran ibadah dan dzikir."
    }
  ],

  subuh: [
    {
      category: "hadits",
      arabic: "رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا",
      translation: "Dua rakaat fajar (shalat sunnah qabliyah Subuh) lebih baik daripada dunia seisinya.",
      source: "HR. Muslim no. 725",
      narrator: "Rasulullah ﷺ (dari Aisyah radhiyallahu 'anha)",
      note: "Jika shalat sunnah pengiringnya saja bernilai melebihi seluruh kekayaan dunia, bayangkan betapa agungnya pahala shalat fardhu Subuh itu sendiri."
    },
    {
      category: "hadits",
      arabic: "مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ",
      translation: "Barangsiapa yang mengerjakan shalat pada dua waktu dingin (yakni Subuh dan Ashar), maka ia akan masuk surga.",
      source: "HR. Bukhari no. 574 & Muslim no. 635",
      narrator: "Rasulullah ﷺ (dari Abu Musa Al-Asy'ari رضي الله عنه)",
      note: "Dinamakan Al-Bardain karena dilaksanakan pada waktu hawa sedang sejuk di awal pagi dan penghujung sore."
    },
    {
      category: "hadits",
      arabic: "مَنْ صَلَّى الصُّبْحَ فَهُوَ فِي ذِمَّةِ اللَّهِ، فَلَا يَطْلُبَنَّكُمُ اللَّهُ مِنْ ذِمَّتِهِ بِشَيْءٍ",
      translation: "Barangsiapa yang menunaikan shalat Subuh, maka ia berada dalam jaminan perlindungan Allah. Maka janganlah kalian sampai dituntut oleh Allah karena melanggar jaminan-Nya.",
      source: "HR. Muslim no. 657",
      narrator: "Rasulullah ﷺ (dari Jundub bin Abdillah رضي الله عنه)",
      note: "Memulai hari dengan shalat Subuh berjamaah memberikan benteng perlindungan ilahi sepanjang hari hingga terbenam matahari."
    },
    {
      category: "sahabat",
      arabic: "لَأَنْ أَشْهَدَ صَلَاةَ الصُّبْحِ فِي جَمَاعَةٍ أَحَبُّ إِلَيَّ مِنْ أَنْ أَقُومَ لَيْلَةً",
      translation: "Sungguh, kehadiranku pada shalat Subuh secara berjamaah lebih aku cintai daripada shalat sunnah sepanjang malam suntuk.",
      source: "Mushannaf Ibnu Abi Syaibah & Al-Muwatta'",
      narrator: "Amirul Mukminin Umar bin Al-Khattab رضي الله عنه",
      note: "Menegaskan bahwa kewajiban shalat fardhu berjamaah di masjid memiliki kedudukan yang jauh lebih agung di mata sahabat."
    },
    {
      category: "sahabat",
      arabic: "لَقَدْ رَأَيْتُنَا وَمَا يَتَخَلَّفُ عَنْهَا إِلَّا مُنَافِقٌ مَعْلُومُ النِّفَاقِ",
      translation: "Sungguh dahulu kami memandang bahwa tidak ada seorang pun yang meninggalkan shalat berjamaah (khususnya Subuh dan Isya) melainkan orang munafik yang sudah jelas kemunafikannya.",
      source: "HR. Muslim no. 654",
      narrator: "Abdullah bin Mas'ud رضي الله عنه",
      note: "Komitmen para sahabat dalam menjaga shalat Subuh di masjid nabawi di bawah pimpinan Rasulullah ﷺ."
    },
    {
      category: "ulama",
      arabic: "نَوْمُ الصُّبْحَةِ يَمْنَعُ الرِّزْقَ، لِأَنَّ ذَلِكَ وَقْتٌ تُقْسَمُ فِيهِ الْأَرْزَاقُ وَتَنْزِلُ فِيهِ الْبَرَكَةُ",
      translation: "Tidur di waktu pagi setelah Subuh dapat menghalangi datangnya rezeki, karena waktu tersebut adalah saat dibagikannya rezeki dan diturunkannya keberkahan.",
      source: "Zadul Ma'ad fi Hadyi Khairil Ibad",
      narrator: "Imam Ibnul Qayyim Al-Jauziyyah رحمه الله",
      note: "Para ulama salaf membenci tidur setelah shalat Subuh hingga matahari terbit, mereka mengisinya dengan dzikir dan membaca Al-Qur'an."
    },
    {
      category: "ulama",
      arabic: "يَا بُنَيَّ، لَا تَكُنِ الدِّيكُ أَكْيَسَ مِنْكَ، يُنَادِي بِالسَّحَرِ وَأَنْتَ نَائِمٌ",
      translation: "Wahai anakku, jangan sampai seekor ayam jantan lebih cerdas daripada dirimu; ia berkokok di waktu sahur membangunkan manusia, sementara engkau masih terlelap tidur.",
      source: "Hilyatul Auliya'",
      narrator: "Al-Hasan Al-Bashri رحمه الله",
      note: "Peringatan penuh kasih untuk bangun menyambut panggilan fajar dan meraih keteduhan jiwa."
    }
  ],

  syuruq: [
    {
      category: "hadits",
      arabic: "مَنْ صَلَّى الْغَدَاةَ فِي جَمَاعَةٍ ثُمَّ قَعَدَ يَذْكُرُ اللَّهَ حَتَّى تَطْلُعَ الشَّمْسُ ثُمَّ صَلَّى رَكْعَتَيْنِ كَانَتْ لَهُ كَأَجْرِ حَجَّةٍ وَعُمْرَةٍ تَامَّةٍ تَامَّةٍ تَامَّةٍ",
      translation: "Barangsiapa shalat Subuh berjamaah, kemudian duduk berdzikir kepada Allah hingga matahari terbit, lalu shalat dua rakaat (Isyraq), baginya pahala seperti haji dan umrah, sempurna, sempurna, sempurna.",
      source: "HR. At-Tirmidzi no. 586 (Derajat Hasan)",
      narrator: "Rasulullah ﷺ (dari Anas bin Malik رضي الله عنه)",
      note: "Pahala haji dan umrah yang sempurna bagi hamba yang menghidupkan waktu antara fajar hingga matahari terbit dengan dzikir."
    },
    {
      category: "sahabat",
      arabic: "كَانَ رَسُولُ اللَّهِ إِذَا صَلَّى الْفَجْرَ جَلَسَ فِي مُصَلَّاهُ حَتَّى تَطْلُعَ الشَّمْسُ حَسَنًا",
      translation: "Rasulullah ﷺ apabila selesai melaksanakan shalat Subuh, beliau tetap duduk di tempat shalatnya hingga matahari terbit dengan terang benderang.",
      source: "HR. Muslim no. 670",
      narrator: "Jabir bin Samurah رضي الله عنه",
      note: "Tradisi harian manusia paling mulia ﷺ di Masjid Nabawi yang sarat berkah dan ketentraman."
    },
    {
      category: "ulama",
      arabic: "هَذِهِ غَدْوَتِي، لَوْ لَمْ أَتَغَدَّهَا سَقَطَتْ قُوَّتِي",
      translation: "Duduk berdzikir di pagi hari ini adalah sarapan jiwaku. Seandainya aku tidak bersarapan dengannya, niscaya runtuhlah seluruh kekuatanku.",
      source: "Al-Wabilush Shayyib",
      narrator: "Syaikhul Islam Ibnu Taimiyyah رحمه الله",
      note: "Dzikir pagi adalah sumber ketahanan batin seorang mukmin dalam mengarungi ujian kehidupan."
    }
  ],

  dhuha: [
    {
      category: "hadits",
      arabic: "يُصْبِحُ عَلَى كُلِّ سُلَامَى مِنْ أَحَدِكُمْ صَدَقَةٌ... وَيُجْزِئُ مِنْ ذَلِكَ رَكْعَتَانِ يَرْكَعُهُمَا مِنَ الضُّحَى",
      translation: "Setiap persendian dari salah seorang di antara kalian pada setiap pagi wajib disedekahi... Dan semua itu cukup digantikan dengan mengerjakan dua rakaat shalat Dhuha.",
      source: "HR. Muslim no. 720",
      narrator: "Rasulullah ﷺ (dari Abu Dzar Al-Ghifari رضي الله عنه)",
      note: "Tubuh manusia memiliki 360 persendian, dan 2 rakaat shalat Dhuha mencukupi sedekah syukur atas seluruh persendian tersebut."
    },
    {
      category: "sahabat",
      arabic: "أَوْصَانِي خَلِيلِي صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ بِثَلَاثٍ: صِيَامِ ثَلَاثَةِ أَيَّامٍ مِنْ كُلِّ شَهْرٍ، وَرَكْعَتَيْ الضُّحَى، وَأَنْ أُوتِرَ قَبْلَ أَنْ أَنَامَ",
      translation: "Kekasihku (Rasulullah ﷺ) mewasiatkan kepadaku tiga hal: berpuasa tiga hari setiap bulan, dua rakaat shalat Dhuha, dan mengerjakan shalat Witir sebelum tidur.",
      source: "HR. Bukhari no. 1981 & Muslim no. 721",
      narrator: "Abu Hurairah رضي الله عنه",
      note: "Wasiat emas Nabi ﷺ yang senantiasa dijaga oleh para sahabat sepanjang hayat mereka."
    },
    {
      category: "ulama",
      arabic: "صَلَاةُ الضُّحَى صَلَاةُ الْأَوَّابِينَ، وَالْأَوَّابُ هُوَ الرَّجَّاعُ إِلَى اللَّهِ تَعَالَى كُلَّمَا غَفَلَ أَوْ أَذْنَبَ",
      translation: "Shalat Dhuha adalah shalat kaum Awwabin (orang-orang yang gemar bertaubat). Awwab adalah orang yang selalu kembali kepada Allah Ta'ala setiap kali ia lalai atau berbuat dosa.",
      source: "Syarah Shahih Muslim",
      narrator: "Imam An-Nawawi رحمه الله",
      note: "Waktu paling afdhal untuk shalat Dhuha adalah saat anak unta kepanasan di padang pasir (ketika matahari mulai meninggi hangat)."
    }
  ],

  dzuhur: [
    {
      category: "hadits",
      arabic: "إِنَّهَا سَاعَةٌ تُفْتَحُ فِيهَا أَبْوَابُ السَّمَاءِ، فَأُحِبُّ أَنْ يَصْعَدَ لِي فِيهَا عَمَلٌ صَالِحٌ",
      translation: "Sesungguhnya waktu setelah tergelincirnya matahari (waktu Dzuhur) adalah saat dibukanya pintu-pintu langit, maka aku senang bila amalan shalihku diangkat pada waktu tersebut.",
      source: "HR. At-Tirmidzi no. 478 (Shahih)",
      narrator: "Rasulullah ﷺ (dari Abdullah bin As-Sa'ib رضي الله عنه)",
      note: "Nabi ﷺ sangat menjaga 4 rakaat sebelum Dzuhur (qabliyah) karena keutamaan dibukanya pintu langit dan terkabulnya doa."
    },
    {
      category: "hadits",
      arabic: "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ: الصَّلَاةُ عَلَى وَقْتِهَا، ثُمَّ بِرُّ الْوَالِدَيْنِ، ثُمَّ الْجِهَادُ فِي سَبِيلِ اللَّهِ",
      translation: "Amalan yang paling dicintai oleh Allah adalah: Shalat tepat pada waktunya, kemudian berbakti kepada kedua orang tua, kemudian berjihad di jalan Allah.",
      source: "HR. Bukhari no. 527 & Muslim no. 85",
      narrator: "Rasulullah ﷺ (dari Abdullah bin Mas'ud رضي الله عنه)",
      note: "Menyegerakan shalat di awal waktu di tengah kesibukan siang adalah bukti kejujuran cinta seorang hamba kepada Rabbnya."
    },
    {
      category: "sahabat",
      arabic: "كَانَ رَسُولُ اللَّهِ إِذَا زَالَتِ الشَّمْسُ صَلَّى أَرْبَعًا قَبْلَ الظُّهْرِ، وَيَقُولُ: إِنَّهَا سَاعَةُ رَحْمَةٍ",
      translation: "Rasulullah ﷺ apabila matahari tergelincir, beliau mengerjakan empat rakaat sebelum shalat Dzuhur, seraya bersabda: 'Ini adalah saat diturunkannya rahmat.'",
      source: "Sunan Abu Dawud no. 1270",
      narrator: "Ali bin Abi Thalib رضي الله عنه",
      note: "Para sahabat berlomba memanfaatkan ketenangan waktu zawal di tengah riuhnya urusan dunia."
    },
    {
      category: "ulama",
      arabic: "إِذَا سَمِعْتَ الْمُؤَذِّنَ يُنَادِي فَقَطِّعْ عَنْكَ كُلَّ أَمْرٍ مِنْ أُمُورِ الدُّنْيَا، وَأَقْبِلْ عَلَى اللَّهِ بِقَلْبِكَ وَجَوَارِحِكَ",
      translation: "Jika engkau mendengar muadzin mengumandangkan adzan, maka putuskanlah segala urusan duniamu, dan menghadaplah kepada Allah dengan segenap hati dan ragamu.",
      source: "Al-Hilyah fi Thabaqatil Auliya'",
      narrator: "Sufyan Ats-Tsauri رحمه الله",
      note: "Peringatan agar tidak membiarkan kesibukan perniagaan atau pekerjaan menunda panggilan shalat Dzuhur."
    }
  ],

  ashar: [
    {
      category: "hadits",
      arabic: "مَنْ تَرَكَ صَلَاةَ الْعَصْرِ فَقَدْ حَبِطَ عَمَلُهُ",
      translation: "Barangsiapa yang meninggalkan shalat Ashar (dengan sengaja), maka sungguh telah gugur (terhapus) seluruh amal kebaikannya.",
      source: "HR. Bukhari no. 553",
      narrator: "Rasulullah ﷺ (dari Buraidah bin Al-Hushaib رضي الله عنه)",
      note: "Peringatan keras bagi siapa saja yang lalai terhadap shalat Ashar karena keletihan sore atau kesibukan pulang kerja."
    },
    {
      category: "hadits",
      arabic: "الَّذِي تَفُوتُهُ صَلَاةُ الْعَصْرِ، كَأَنَّمَا وُتِرَ أَهْلَهُ وَمَالَهُ",
      translation: "Orang yang terlewat shalat Ashar (hingga habis waktunya), seakan-akan ia telah kehilangan seluruh keluarga dan hartanya.",
      source: "HR. Bukhari no. 552 & Muslim no. 626",
      narrator: "Rasulullah ﷺ (dari Abdullah bin Umar رضي الله عنهما)",
      note: "Perumpamaan betapa dahsyatnya kerugian orang yang menyia-nyiakan waktu Ashar."
    },
    {
      category: "hadits",
      arabic: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ",
      translation: "Peliharalah semua shalat(mu), dan (peliharalah) shalat wustha (yakni shalat Ashar). Berdirilah untuk Allah (dalam shalatmu) dengan khusyuk.",
      source: "QS. Al-Baqarah: 238 & Shahih Muslim no. 627",
      narrator: "Firman Allah Ta'ala & Atsar Sahabat Ali bin Abi Thalib",
      note: "Mayoritas ulama sahabat sepakat bahwa Shalatul Wustha adalah Shalat Ashar."
    },
    {
      category: "sahabat",
      arabic: "لَا حَظَّ فِي الْإِسْلَامِ لِمَنْ تَرَكَ الصَّلَاةَ",
      translation: "Tidak ada bagian apa pun dalam Islam bagi orang yang meninggalkan shalat.",
      source: "Thabaqat Ibni Sa'ad & Al-Muwatta'",
      narrator: "Amirul Mukminin Umar bin Al-Khattab رضي الله عنه",
      note: "Diucapkan Umar saat beliau terluka parah namun tetap mengutamakan menunaikan shalat di penghujung hari."
    },
    {
      category: "ulama",
      arabic: "الْوَقْتُ كَالسَّيْفِ إِنْ لَمْ تَقْطَعْهُ قَطَعَكَ، وَنَفْسُكَ إِنْ لَمْ تَشْغَلْهَا بِالْحَقِّ شَغَلَتْكَ بِالْبَاطِلِ",
      translation: "Waktu itu laksana pedang; jika engkau tidak memotongnya maka ia yang akan memotongmu. Dan jiwamu jika tidak engkau sibukkan dengan kebenaran, ia akan menyibukkanmu dengan kebatilan.",
      source: "Siyar A'lam An-Nubala'",
      narrator: "Imam Asy-Syafi'i رحمه الله",
      note: "Waktu Ashar adalah tanda berlalunya hari, pengingat bahwa usia manusia semakin mendekati garis akhir."
    }
  ],

  maghrib: [
    {
      category: "hadits",
      arabic: "لَا يَزَالُ النَّاسُ بِخَيْرٍ مَا عَجَّلُوا الْفِطْرَ وَأَخَّرُوا السَّحُورَ",
      translation: "Manusia akan senantiasa berada dalam kebaikan selama mereka menyegerakan berbuka (ketika Maghrib tiba) dan mengakhirkan sahur.",
      source: "HR. Bukhari no. 1957 & Muslim no. 1098",
      narrator: "Rasulullah ﷺ (dari Sahl bin Sa'ad رضي الله عنه)",
      note: "Menyegerakan shalat Maghrib di awal waktu adalah anjuran kuat para ulama karena rentang waktunya yang lebih pendek."
    },
    {
      category: "hadits",
      arabic: "إِذَا كَانَ جُنْحُ اللَّيْلِ أَوْ أَمْسَيْتُمْ فَكُفُّوا صِبْيَانَكُمْ، فَإِنَّ الشَّيَاطِينَ تَنْتَشِرُ حِينَئِذٍ",
      translation: "Jika malam mulai menjelang atau senja telah tiba (waktu Maghrib), maka tahanlah anak-anak kalian di dalam rumah, karena setan bertebaran pada saat itu.",
      source: "HR. Bukhari no. 3280 & Muslim no. 2012",
      narrator: "Rasulullah ﷺ (dari Jabir bin Abdillah رضي الله عنه)",
      note: "Sunnah Nabi ﷺ saat senja: menahan anak di dalam rumah, menutup pintu dan bejana dengan membaca bismillah."
    },
    {
      category: "sahabat",
      arabic: "مَا نَدِمْتُ عَلَى شَيْءٍ نَدَمِي عَلَى يَوْمٍ غَرَبَتْ شَمْسُهُ، نَقَصَ فِيهِ أَجَلِي، وَلَمْ يَزْدَدْ فِيهِ عَمَلِي",
      translation: "Tidak ada sesuatu pun yang aku sesali sebagaimana penyesalanku pada suatu hari di mana mataharinya telah tenggelam, usiaku berkurang, namun amalku tidak bertambah.",
      source: "Shifatush Shafwah",
      narrator: "Abdullah bin Mas'ud رضي الله عنه",
      note: "Mutiara renungan di saat matahari tenggelam di ufuk barat menyongsong Maghrib."
    },
    {
      category: "ulama",
      arabic: "إِذَا غَرَبَتِ الشَّمْسُ فَرِحْتُ بِالظَّلَامِ لِأَنَّهُ وَقْتُ الْخَلْوَةِ بِرَبِّي وَمُنَاجَاتِهِ بِمَا فِي قَلْبِي",
      translation: "Apabila matahari telah terbenam, aku merasa gembira dengan datangnya kegelapan malam, karena malam adalah saat menyendiri bersama Rabbku dan mencurahkan isi hati kepada-Nya.",
      source: "Hilyatul Auliya'",
      narrator: "Al-Fudhail bin 'Iyadh رحمه الله",
      note: "Bagi para kekasih Allah, tenggelamnya matahari Maghrib adalah awal jamuan terindah bersama Sang Pencipta."
    }
  ],

  isya: [
    {
      category: "hadits",
      arabic: "مَنْ صَلَّى الْعِشَاءَ فِي جَمَاعَةٍ فَكَأَنَّمَا قَامَ نِصْفَ اللَّيْلِ، وَمَنْ صَلَّى الصُّبْحَ فِي جَمَاعَةٍ فَكَأَنَّمَا صَلَّى اللَّيْلَ كُلَّهُ",
      translation: "Barangsiapa shalat Isya secara berjamaah, maka seakan-akan ia telah shalat selama separuh malam. Dan barangsiapa shalat Subuh berjamaah, maka seakan-akan ia shalat sepanjang malam suntuk.",
      source: "HR. Muslim no. 656",
      narrator: "Rasulullah ﷺ (dari Utsman bin Affan رضي الله عنه)",
      note: "Pahala agung bagi orang yang menutup harinya dengan shalat Isya berjamaah."
    },
    {
      category: "hadits",
      arabic: "كَانَ رَسُولُ اللَّهِ يَكْرَهُ النَّوْمَ قَبْلَ الْعِشَاءِ وَالْحَدِيثَ بَعْدَهَا",
      translation: "Rasulullah ﷺ membenci tidur sebelum shalat Isya dan membenci obrolan (yang sia-sia) setelah melaksanakannya.",
      source: "HR. Bukhari no. 568 & Muslim no. 647",
      narrator: "Rasulullah ﷺ (dari Abu Barzah رضي الله عنه)",
      note: "Agar tidak terlewat shalat Isya, dan agar setelah Isya seorang muslim dapat segera beristirahat untuk bangun qiyamullail."
    },
    {
      category: "sahabat",
      arabic: "أَفْضَلُ الْأَعْمَالِ: أَدَاءُ فَرَائِضِ اللَّهِ، وَالْوَرَعُ عَنْ مَحَارِمِ اللَّهِ، وَصِدْقُ النِّيَّةِ فِيمَا عِنْدَ اللَّهِ",
      translation: "Amalan yang paling utama adalah: Menunaikan kewajiban-kewajiban Allah (shalat fardhu), bersikap wara' dari hal-hal yang diharamkan Allah, dan ketulusan niat mengharap ridha di sisi Allah.",
      source: "Mawa'izh Ash-Shahabah",
      narrator: "Amirul Mukminin Umar bin Al-Khattab رضي الله عنه",
      note: "Pesan agar setiap muslim menjaga komitmen shalat fardhu hingga waktu terakhir shalat harian."
    },
    {
      category: "ulama",
      arabic: "مَنْ بَاتَ عَلَى طَهَارَةٍ بَعْدَ صَلَاةِ الْعِشَاءِ كَانَ فِي حِرَاسَةِ الْمَلَائِكَةِ حَتَّى يُصْبِحَ",
      translation: "Barangsiapa yang tidur dalam keadaan berwudhu setelah shalat Isya, niscaya ia berada dalam penjagaan para malaikat yang mendoakannya hingga pagi hari.",
      source: "Adab An-Naum - Al-Ghazali",
      narrator: "Imam Al-Ghazali رحمه الله",
      note: "Adab menutup hari: berwudhu sebelum tidur, membaca doa dan dzikir perlindungan, berniat bangun sholat malam."
    }
  ],

  tahajjud: [
    {
      category: "hadits",
      arabic: "يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الآخِرُ يَقُولُ: مَنْ يَدْعُونِي فَأَسْتَجِيبَ لَهُ، مَنْ يَسْأَلُنِي فَأُعْطِيَهُ، مَنْ يَسْتَغْفِرُنِي فَأَغْفِرَ لَهُ",
      translation: "Rabb kita Tabaraka wa Ta'ala turun ke langit dunia setiap malam pada sepertiga malam terakhir seraya berfirman: 'Siapa yang berdoa kepada-Ku akan Aku kabulkan, siapa yang meminta kepada-Ku akan Aku beri, dan siapa yang memohon ampunan kepada-Ku niscaya Aku ampuni.'",
      source: "HR. Bukhari no. 1145 & Muslim no. 758",
      narrator: "Rasulullah ﷺ (dari Abu Hurairah رضي الله عنه)",
      note: "Waktu sepertiga malam terakhir adalah puncak waktu mustajab untuk bermunajat dan memohon ampun."
    },
    {
      category: "hadits",
      arabic: "أَفْضَلُ الصَّلَاةِ بَعْدَ الْفَرِيضَةِ: صَلَاةُ اللَّيْلِ",
      translation: "Shalat yang paling utama setelah shalat fardhu adalah shalat malam (qiyamullail/tahajjud).",
      source: "HR. Muslim no. 1163",
      narrator: "Rasulullah ﷺ (dari Abu Hurairah رضي الله عنه)",
      note: "Tahajjud adalah mahkota ibadah sunnah yang senantiasa dijaga oleh para Nabi dan orang-orang shalih."
    },
    {
      category: "sahabat",
      arabic: "لَوْ طَهُرَتْ قُلُوبُكُمْ مَا شَبِعَتْ مِنْ كَلَامِ رَبِّكُمْ",
      translation: "Seandainya hati kalian suci dan bersih, niscaya kalian tidak akan pernah merasa kenyang (puas) dari membaca dan merenungi Kalamullah (Al-Qur'an di malam hari).",
      source: "Az-Zuhd karya Imam Ahmad",
      narrator: "Utsman bin Affan رضي الله عنه",
      note: "Ketenangan hati sahabat Nabi ketika menghidupkan malam dengan membaca ayat-ayat Al-Qur'an."
    },
    {
      category: "ulama",
      arabic: "سِهَامُ اللَّيْلِ لَا تُخْطِئُ، وَلَكِنْ لَهَا أَمَدٌ وَلِلْأَمَدِ انْقِضَاءٌ",
      translation: "Doa di keheningan malam (Tahajjud) laksana anak panah yang tak pernah meleset dari sasaran; ia pasti mengenai sasaran, namun ia memiliki waktu yang telah ditetapkan.",
      source: "Diwan Al-Imam Asy-Syafi'i",
      narrator: "Imam Asy-Syafi'i رحمه الله",
      note: "Optimisme dan keyakinan dalam memanjatkan doa di sepertiga malam terakhir."
    }
  ]
};

// Global export
if (typeof window !== "undefined") {
  window.PRAYER_QUOTES = PRAYER_QUOTES;
}
