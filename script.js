// ==================== SURAH DATA ====================
const surahs = [
    { number: 1, name: "الفاتحة", englishName: "Al-Fatiha", ayahs: 7 },
    { number: 2, name: "البقرة", englishName: "Al-Baqarah", ayahs: 286 },
    { number: 3, name: "آل عمران", englishName: "Aal-Imran", ayahs: 200 },
    { number: 4, name: "النساء", englishName: "An-Nisa", ayahs: 176 },
    { number: 5, name: "المائدة", englishName: "Al-Maidah", ayahs: 120 },
    { number: 6, name: "الأنعام", englishName: "Al-Anam", ayahs: 165 },
    { number: 7, name: "الأعراف", englishName: "Al-Araf", ayahs: 206 },
    { number: 8, name: "الأنفال", englishName: "Al-Anfal", ayahs: 75 },
    { number: 9, name: "التوبة", englishName: "At-Tawbah", ayahs: 129 },
    { number: 10, name: "يونس", englishName: "Yunus", ayahs: 109 },
    { number: 11, name: "هود", englishName: "Hud", ayahs: 123 },
    { number: 12, name: "يوسف", englishName: "Yusuf", ayahs: 111 },
    { number: 13, name: "الرعد", englishName: "Ar-Rad", ayahs: 43 },
    { number: 14, name: "إبراهيم", englishName: "Ibrahim", ayahs: 52 },
    { number: 15, name: "الحجر", englishName: "Al-Hijr", ayahs: 99 },
    { number: 16, name: "النحل", englishName: "An-Nahl", ayahs: 128 },
    { number: 17, name: "الإسراء", englishName: "Al-Isra", ayahs: 111 },
    { number: 18, name: "الكهف", englishName: "Al-Kahf", ayahs: 110 },
    { number: 19, name: "مريم", englishName: "Maryam", ayahs: 98 },
    { number: 20, name: "طه", englishName: "Taha", ayahs: 135 },
    { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", ayahs: 112 },
    { number: 22, name: "الحج", englishName: "Al-Hajj", ayahs: 78 },
    { number: 23, name: "المؤمنون", englishName: "Al-Muminun", ayahs: 118 },
    { number: 24, name: "النور", englishName: "An-Nur", ayahs: 64 },
    { number: 25, name: "الفرقان", englishName: "Al-Furqan", ayahs: 77 },
    { number: 26, name: "الشعراء", englishName: "Ash-Shuara", ayahs: 227 },
    { number: 27, name: "النمل", englishName: "An-Naml", ayahs: 93 },
    { number: 28, name: "القصص", englishName: "Al-Qasas", ayahs: 88 },
    { number: 29, name: "العنكبوت", englishName: "Al-Ankabut", ayahs: 69 },
    { number: 30, name: "الروم", englishName: "Ar-Rum", ayahs: 60 },
    { number: 31, name: "لقمان", englishName: "Luqman", ayahs: 34 },
    { number: 32, name: "السجدة", englishName: "As-Sajdah", ayahs: 30 },
    { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", ayahs: 73 },
    { number: 34, name: "سبأ", englishName: "Saba", ayahs: 54 },
    { number: 35, name: "فاطر", englishName: "Fatir", ayahs: 45 },
    { number: 36, name: "يس", englishName: "Ya-Sin", ayahs: 83 },
    { number: 37, name: "الصافات", englishName: "As-Saffat", ayahs: 182 },
    { number: 38, name: "ص", englishName: "Sad", ayahs: 88 },
    { number: 39, name: "الزمر", englishName: "Az-Zumar", ayahs: 75 },
    { number: 40, name: "غافر", englishName: "Ghafir", ayahs: 85 },
    { number: 41, name: "فصلت", englishName: "Fussilat", ayahs: 54 },
    { number: 42, name: "الشورى", englishName: "Ash-Shura", ayahs: 53 },
    { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", ayahs: 89 },
    { number: 44, name: "الدخان", englishName: "Ad-Dukhan", ayahs: 59 },
    { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", ayahs: 37 },
    { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", ayahs: 35 },
    { number: 47, name: "محمد", englishName: "Muhammad", ayahs: 38 },
    { number: 48, name: "الفتح", englishName: "Al-Fath", ayahs: 29 },
    { number: 49, name: "الحجرات", englishName: "Al-Hujurat", ayahs: 18 },
    { number: 50, name: "ق", englishName: "Qaf", ayahs: 45 },
    { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", ayahs: 60 },
    { number: 52, name: "الطور", englishName: "At-Tur", ayahs: 49 },
    { number: 53, name: "النجم", englishName: "An-Najm", ayahs: 62 },
    { number: 54, name: "القمر", englishName: "Al-Qamar", ayahs: 55 },
    { number: 55, name: "الرحمن", englishName: "Ar-Rahman", ayahs: 78 },
    { number: 56, name: "الواقعة", englishName: "Al-Waqiah", ayahs: 96 },
    { number: 57, name: "الحديد", englishName: "Al-Hadid", ayahs: 29 },
    { number: 58, name: "المجادلة", englishName: "Al-Mujadilah", ayahs: 22 },
    { number: 59, name: "الحشر", englishName: "Al-Hashr", ayahs: 24 },
    { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", ayahs: 13 },
    { number: 61, name: "الصف", englishName: "As-Saf", ayahs: 14 },
    { number: 62, name: "الجمعة", englishName: "Al-Jumuah", ayahs: 11 },
    { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", ayahs: 11 },
    { number: 64, name: "التغابن", englishName: "At-Taghabun", ayahs: 18 },
    { number: 65, name: "الطلاق", englishName: "At-Talaq", ayahs: 12 },
    { number: 66, name: "التحريم", englishName: "At-Tahrim", ayahs: 12 },
    { number: 67, name: "الملك", englishName: "Al-Mulk", ayahs: 30 },
    { number: 68, name: "القلم", englishName: "Al-Qalam", ayahs: 52 },
    { number: 69, name: "الحاقة", englishName: "Al-Haqqah", ayahs: 52 },
    { number: 70, name: "المعارج", englishName: "Al-Maarij", ayahs: 44 },
    { number: 71, name: "نوح", englishName: "Nuh", ayahs: 28 },
    { number: 72, name: "الجن", englishName: "Al-Jinn", ayahs: 28 },
    { number: 73, name: "المزمل", englishName: "Al-Muzzammil", ayahs: 20 },
    { number: 74, name: "المدثر", englishName: "Al-Muddaththir", ayahs: 56 },
    { number: 75, name: "القيامة", englishName: "Al-Qiyamah", ayahs: 40 },
    { number: 76, name: "الإنسان", englishName: "Al-Insan", ayahs: 31 },
    { number: 77, name: "المرسلات", englishName: "Al-Mursalat", ayahs: 50 },
    { number: 78, name: "النبأ", englishName: "An-Naba", ayahs: 40 },
    { number: 79, name: "النازعات", englishName: "An-Naziat", ayahs: 46 },
    { number: 80, name: "عبس", englishName: "Abasa", ayahs: 42 },
    { number: 81, name: "التكوير", englishName: "At-Takwir", ayahs: 29 },
    { number: 82, name: "الانفطار", englishName: "Al-Infitar", ayahs: 19 },
    { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", ayahs: 36 },
    { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", ayahs: 25 },
    { number: 85, name: "البروج", englishName: "Al-Buruj", ayahs: 22 },
    { number: 86, name: "الطارق", englishName: "At-Tariq", ayahs: 17 },
    { number: 87, name: "الأعلى", englishName: "Al-Ala", ayahs: 19 },
    { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", ayahs: 26 },
    { number: 89, name: "الفجر", englishName: "Al-Fajr", ayahs: 30 },
    { number: 90, name: "البلد", englishName: "Al-Balad", ayahs: 20 },
    { number: 91, name: "الشمس", englishName: "Ash-Shams", ayahs: 15 },
    { number: 92, name: "الليل", englishName: "Al-Layl", ayahs: 21 },
    { number: 93, name: "الضحى", englishName: "Ad-Duha", ayahs: 11 },
    { number: 94, name: "الشرح", englishName: "Ash-Sharh", ayahs: 8 },
    { number: 95, name: "التين", englishName: "At-Tin", ayahs: 8 },
    { number: 96, name: "العلق", englishName: "Al-Alaq", ayahs: 19 },
    { number: 97, name: "القدر", englishName: "Al-Qadr", ayahs: 5 },
    { number: 98, name: "البينة", englishName: "Al-Bayyinah", ayahs: 8 },
    { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", ayahs: 8 },
    { number: 100, name: "العاديات", englishName: "Al-Adiyat", ayahs: 11 },
    { number: 101, name: "القارعة", englishName: "Al-Qariah", ayahs: 11 },
    { number: 102, name: "التكاثر", englishName: "At-Takathur", ayahs: 8 },
    { number: 103, name: "العصر", englishName: "Al-Asr", ayahs: 3 },
    { number: 104, name: "الهمزة", englishName: "Al-Humazah", ayahs: 9 },
    { number: 105, name: "الفيل", englishName: "Al-Fil", ayahs: 5 },
    { number: 106, name: "قريش", englishName: "Quraysh", ayahs: 4 },
    { number: 107, name: "الماعون", englishName: "Al-Maun", ayahs: 7 },
    { number: 108, name: "الكوثر", englishName: "Al-Kawthar", ayahs: 3 },
    { number: 109, name: "الكافرون", englishName: "Al-Kafirun", ayahs: 6 },
    { number: 110, name: "النصر", englishName: "An-Nasr", ayahs: 3 },
    { number: 111, name: "المسد", englishName: "Al-Masad", ayahs: 5 },
    { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", ayahs: 4 },
    { number: 113, name: "الفلق", englishName: "Al-Falaq", ayahs: 5 },
    { number: 114, name: "الناس", englishName: "An-Nas", ayahs: 6 }
];

// ==================== RECITER DATA ====================
const reciters = {
    abdulbasit: { name: "عبد الباسط عبد الصمد", base: "https://server7.mp3quran.net/basit/" },
    husary: { name: "محمود خليل الحصري", base: "https://server8.mp3quran.net/husr/" },
    muayqili: { name: "عبدالرحمن العوسى (المعيقلي)", base: "https://server8.mp3quran.net/muayqili/" },
    minshawi: { name: "محمد صديق المنشاوى", base: "https://server10.mp3quran.net/menshawi128/" },
    ajamy: { name: "أحمد بن علي العجمي", base: "https://server8.mp3quran.net/ajamy/" },
    tablawi: { name: "أحمد بن علي العجمي (الطبلاوي)", base: "https://server8.mp3quran.net/ahmedajamy/" },
    rifat: { name: "محمد رفعت", base: "https://server8.mp3quran.net/rifat/" }
};

// ==================== AZKAR DATA ====================
const azkarMorning = [
    { text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ", count: 1, source: "رواه مسلم" },
    { text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ", count: 1, source: "رواه الترمذي" },
    { text: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ", count: 1, source: "رواه البخاري" },
    { text: "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لاَ إِلَـهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", count: 4, source: "رواه أبو داود" },
    { text: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", count: 1, source: "رواه أبو داود" },
    { text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3, source: "رواه أبو داود والترمذي" },
    { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَـهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَـهَ إِلاَّ أَنْتَ", count: 3, source: "رواه أبو داود" },
    { text: "حَسْبِيَ اللَّهُ لاَ إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 7, source: "رواه أبو داود" },
    { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 100, source: "رواه مسلم" },
    { text: "لاَ إِلَـهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", count: 10, source: "رواه البخاري ومسلم" },
    { text: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", count: 100, source: "رواه البخاري ومسلم" },
    { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي", count: 1, source: "رواه أبو داود" },
    { text: "يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ أَبَداً", count: 1, source: "رواه الحاكم" },
    { text: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَـهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ", count: 1, source: "رواه الترمذي" },
    { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ", count: 1, source: "رواه أبو داود" }
];

const azkarEvening = [
    { text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ", count: 1, source: "رواه مسلم" },
    { text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ", count: 1, source: "رواه الترمذي" },
    { text: "اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ", count: 1, source: "رواه البخاري" },
    { text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلاَئِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لاَ إِلَـهَ إِلاَّ أَنْتَ وَحْدَكَ لاَ شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ", count: 4, source: "رواه أبو داود" },
    { text: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لاَ شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ", count: 1, source: "رواه أبو داود" },
    { text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3, source: "رواه أبو داود والترمذي" },
    { text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لاَ إِلَـهَ إِلاَّ أَنْتَ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لاَ إِلَـهَ إِلاَّ أَنْتَ", count: 3, source: "رواه أبو داود" },
    { text: "حَسْبِيَ اللَّهُ لاَ إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", count: 7, source: "رواه أبو داود" },
    { text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", count: 3, source: "رواه مسلم" },
    { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ وَمِنْ خَلْفِي وَعَنْ يَمِينِي وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي", count: 1, source: "رواه أبو داود" },
    { text: "يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلاَ تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ أَبَداً", count: 1, source: "رواه الحاكم" },
    { text: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَوَاتِ وَالأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لاَ إِلَـهَ إِلاَّ أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءاً أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ", count: 1, source: "رواه الترمذي" },
    { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ", count: 1, source: "رواه أبو داود" }
];

const azkarLeaving = [
    { text: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ", count: 1, source: "رواه أبو داود والترمذي" },
    { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ", count: 1, source: "رواه أبو داود" },
    { text: "بِسْمِ اللَّهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", count: 3, source: "رواه أبو داود والترمذي" },
    { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ. اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ", count: 1, source: "رواه أبو داود والترمذي" },
    { text: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْماً كَثِيراً وَلاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدَكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ", count: 1, source: "رواه البخاري" },
    { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", count: 3, source: "رواه مسلم" },
    { text: "اللَّهُمَّ حَبِّبْ إِلَيْنَا الإِيمَانَ وَزَيِّنْهُ فِي قُلُوبِنَا، وَكَرِّهْ إِلَيْنَا الْكُفْرَ وَالْفُسُوقَ وَالْعِصْيَانَ، وَاجْعَلْنَا مِنَ الرَّاشِدِينَ، اللَّهُمَّ تَوَفَّنَا مُسْلِمِينَ وَأَحْيِنَا مُسْلِمِينَ وَأَلْحِقْنَا بِالصَّالِحِينَ غَيْرَ خَزَايَا وَلاَ مَفْتُونِينَ", count: 1, source: "رواه الترمذي" },
    { text: "اللَّهُمَّ اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ، فَإِنَّ كَثِيراً مِنَ الْعِبَادِ يَصُدُّنَا الْجَبَرُوتُ، وَالدَّيْنُ، وَالْفَقْرُ، اللَّهُمَّ إِنَّا نَسْتَعِينُكَ بِعِزَّتِكَ الَّتِي لاَ تُقَهَرُ، وَنَسْتَغْفِرُكَ الَّذِي لاَ تُرَدُّ الْمَطَالِبُ إِلَيْهِ", count: 1, source: "رواه ابن حبان" },
    { text: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلاَ أَقْدِرُ، وَتَعْلَمُ وَلاَ أَعْلَمُ، وَأَنْتَ عَلاَّمُ الْغُيُوبِ", count: 1, source: "رواه البخاري" }
];

// ==================== RUQYAH DATA ====================
const ruqyahData = [
    {
        title: "آية الكرسي",
        text: "اللَّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        source: "البقرة: 255",
        benefit: "من قرأها حين يصبح أُجير من الجن حتى يمسي، ومن قرأها حين يمسي أُجير من الجن حتى يصبح"
    },
    {
        title: "المعوذتان",
        text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَـهِ النَّاسِ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ",
        source: "الفلق والناس",
        benefit: "كان يقرأهما النبي ﷺ كل ليلة حين يأوي إلى فراشه"
    },
    {
        title: "سورة الإخلاص",
        text: "قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        source: "الإخلاص: 1-4",
        benefit: "من قرأها ثلاث مرات حين يصبح وحين يمسي كفته من كل شيء"
    },
    {
        title: "سورة الفلق",
        text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        source: "الفلق: 1-5",
        benefit: " Protection from evil eye and envy"
    },
    {
        title: "سورة الناس",
        text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَـهِ النَّاسِ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ",
        source: "الناس: 1-6",
        benefit: "Protection from whisperings of Shaytan"
    },
    {
        title: "آية من سورة البقرة",
        text: "وَإِلَـهُكُمْ إِلَـهٌ وَاحِدٌ لاَّ إِلَـهَ إِلاَّ هُوَ الرَّحْمَنُ الرَّحِيمُ",
        source: "البقرة: 163",
        benefit: "إذا قرأها في дома لم يدخله شيطان"
    },
    {
        title: "آية من سورة البقرة - طه",
        text: "وَقُلْ رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ وَاجْعَ لِي مِن لَّدُنْكَ سُلْطَانًا نَّصِيرًا",
        source: "طه: 115-116",
        benefit: "دعاء مأثور للدخول والخروج بالصدق"
    },
    {
        title: "من أدعية الاستخارة",
        text: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلاَ أَقْدِرُ، وَتَعْلَمُ وَلاَ أَعْلَمُ، وَأَنْتَ عَلاَّمُ الْغُيُوبِ",
        source: "رواه البخاري",
        benefit: "الاستخارة هي سؤال الله تعالى أن يختار لعبده ما هو خير له"
    },
    {
        title: "أدعية قرآنية مأثورة",
        text: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ\nرَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ\nرَبَّنَا أَفْرِغْ عَلَيْنَا صَبْراً وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ\nرَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
        source: "مختلفة من القرآن الكريم",
        benefit: "من أدعية القرآن الكريم المأثورة التي كان النبي ﷺ يدعو بها"
    }
];

// ==================== DUA DATA ====================
const duaData = [
    {
        title: "دعاء الاستفتاح",
        text: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ",
        source: "رواه البخاري ومسلم"
    },
    {
        title: "دعاء النبي ﷺ في الصلاة",
        text: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلاَ يُقْضَى عَلَيْكَ، وَإِنَّهُ لاَ يَذِلُّ مَنْ وَالَيْتَ، وَلاَ يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ",
        source: "رواه أبو داود"
    },
    {
        title: "دعاء دخول المسجد",
        text: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        source: "رواه مسلم"
    },
    {
        title: "دعاء الخروج من المسجد",
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        source: "رواه مسلم"
    },
    {
        title: "دعاء لبس الثوب",
        text: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
        source: "رواه أبو داود والترمذي"
    },
    {
        title: "دعاء دخول المنزل",
        text: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
        source: "رواه أبو داود"
    },
    {
        title: "دعاء الخروج من المنزل",
        text: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
        source: "رواه أبو داود والترمذي"
    },
    {
        title: "دعاء السفر",
        text: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالأَهْلِ",
        source: "رواه مسلم"
    },
    {
        title: "دعاء الرجوع من السفر",
        text: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
        source: "رواه مسلم"
    },
    {
        title: "دعاء الاستيقاظ من النوم",
        text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        source: "رواه البخاري"
    },
    {
        title: "دعاء النوم",
        text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        source: "رواه البخاري"
    },
    {
        title: "دعاء دخول الخلاء",
        text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
        source: "رواه البخاري ومسلم"
    },
    {
        title: "دعاء الخروج من الخلاء",
        text: "غُفْرَانَكَ",
        source: "رواه البخاري ومسلم"
    },
    {
        title: "دعاء الهم والحزن",
        text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        source: "رواه أبو داود"
    },
    {
        title: "دعاء الكرب",
        text: "لاَ إِلَـهَ إِلاَّ اللَّهُ الْعَظِيمُ الْحَلِيمُ، لاَ إِلَـهَ إِلاَّ اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لاَ إِلَـهَ إِلاَّ اللَّهُ رَبُّ السَّمَوَاتِ وَرَبُّ الأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ",
        source: "رواه البخاري ومسلم"
    },
    {
        title: "دعاء الاستغفار",
        text: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
        source: "رواه أبو داود"
    }
];

// ==================== MUSHAF NATIQ STATE ====================
let mushafCurrentReciter = 'ar.alafasy';
let mushafCurrentSurah = null;
let mushafIsPlaying = false;
let mushafAyahs = [];
let mushafCurrentAyahIndex = 0;
const mushafAudio = document.getElementById('mushafAudio');

// ==================== AUDIO PLAYER STATE ====================
let currentReciter = 'abdulbasit';
let currentSurah = null;
let isPlaying = false;
const audio = document.getElementById('mainAudio');

// ==================== INITIALIZATION ====================
function init() {
    populateSurahSelects();
    renderAzkar();
    renderRuqyah();
    renderDua();
    initPrayerTimes();
    initNavigation();
    initScrollTop();
    updateClock();
    setInterval(updateClock, 1000);
    setInterval(checkPrayerTime, 60000);
}

// ==================== UTILITY FUNCTIONS ====================
function formatTime(sec) {
    if (isNaN(sec) || sec === undefined || sec === null) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
}

function populateSurahSelects() {
    const mushafSelect = document.getElementById('mushafSurah');
    const audioSelect = document.getElementById('audioSurah');
    const pdfSelect = document.getElementById('surahSelect');
    surahs.forEach(function(surah) {
        if (mushafSelect) {
            var opt1 = document.createElement('option');
            opt1.value = surah.number;
            opt1.textContent = surah.number + ' - ' + surah.name + ' (' + surah.englishName + ')';
            mushafSelect.appendChild(opt1);
        }
        if (audioSelect) {
            var opt2 = document.createElement('option');
            opt2.value = surah.number;
            opt2.textContent = surah.number + ' - ' + surah.name;
            audioSelect.appendChild(opt2);
        }
        if (pdfSelect) {
            var opt3 = document.createElement('option');
            opt3.value = surah.number;
            opt3.textContent = surah.number + ' - ' + surah.name;
            pdfSelect.appendChild(opt3);
        }
    });
}

// ==================== MUSHAF NATIQ (SPEAKING QURAN) ====================
function onMushafReciterChange() {
    var sel = document.getElementById('mushafReciter');
    mushafCurrentReciter = sel.value;
    var label = document.getElementById('mushafReciterLabel');
    if (label) label.textContent = sel.options[sel.selectedIndex].text;
}

function loadMushafAyahs() {
    var sel = document.getElementById('mushafSurah');
    var surahNum = parseInt(sel.value);
    if (!surahNum) return;

    mushafCurrentSurah = surahNum;
    var surah = surahs.find(function(s) { return s.number === surahNum; });
    var container = document.getElementById('ayahsContainer');
    container.innerHTML = '<div class="ayahs-loading"><i class="fas fa-spinner fa-spin"></i> <span>جارٍ تحميل الآيات...</span></div>';

    var url = 'https://api.alquran.cloud/v1/surah/' + surahNum + '/' + mushafCurrentReciter;
    fetch(url)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.code !== 200) throw new Error('API Error');
            mushafAyahs = data.data.ayahs;
            mushafCurrentAyahIndex = 0;
            renderAyahs(mushafAyahs, surah);
            document.getElementById('mushafNowPlaying').textContent = surah.number + ' - ' + surah.name;
            var reciterName = document.getElementById('mushafReciter').options[document.getElementById('mushafReciter').selectedIndex].text;
            document.getElementById('mushafReciterLabel').textContent = reciterName;
            document.getElementById('mushafPlayer').classList.add('active');

            mushafAudio.src = mushafAyahs[0].audio;
            mushafAudio.load();
        })
        .catch(function(err) {
            console.error('Mushaf fetch error:', err);
            container.innerHTML = '<div class="ayahs-loading"><i class="fas fa-exclamation-triangle"></i> <span>حدث خطأ أثناء تحميل الآيات. حاول مرة أخرى.</span></div>';
        });
}

function renderAyahs(ayahs, surah) {
    var container = document.getElementById('ayahsContainer');
    var html = '<div class="surah-header-bismillah">';
    if (mushafCurrentSurah !== 1 && mushafCurrentSurah !== 9) {
        html += '<div class="bismillah-ayah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>';
    }
    html += '</div>';
    ayahs.forEach(function(ayah, index) {
        html += '<div class="ayah-item" id="ayah-' + index + '" data-index="' + index + '">';
        html += '<span class="ayah-number-circle">' + ayah.numberInSurah + '</span>';
        html += '<span class="ayah-text">' + ayah.text + '</span>';
        html += '</div>';
    });
    container.innerHTML = html;
}

function toggleMushafPlay() {
    if (mushafAyahs.length === 0) return;

    if (mushafIsPlaying) {
        mushafAudio.pause();
        mushafIsPlaying = false;
    } else {
        if (mushafCurrentAyahIndex >= mushafAyahs.length) {
            mushafCurrentAyahIndex = 0;
        }
        mushafAudio.src = mushafAyahs[mushafCurrentAyahIndex].audio;
        mushafAudio.load();
        mushafAudio.play().catch(function(e) { console.log('Mushaf play error:', e); });
        mushafIsPlaying = true;
    }
    updateMushafPlayBtn();
}

function updateMushafPlayBtn() {
    var icon = document.getElementById('mushafPlayIcon');
    if (icon) {
        icon.className = mushafIsPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
}

function seekMushaf(e) {
    if (mushafAudio.duration) {
        var rect = e.currentTarget.getBoundingClientRect();
        var pct = (e.clientX - rect.left) / rect.width;
        if (pct < 0) pct = 0;
        if (pct > 1) pct = 1;
        mushafAudio.currentTime = pct * mushafAudio.duration;
    }
}

function changeMushafVolume() {
    var vol = document.getElementById('mushafVolume').value;
    mushafAudio.volume = vol / 100;
}

// Mushaf audio events
mushafAudio.addEventListener('timeupdate', function() {
    if (mushafAudio.duration) {
        var pct = (mushafAudio.currentTime / mushafAudio.duration) * 100;
        document.getElementById('mushafProgressBar').style.width = pct + '%';
        document.getElementById('mushafCurrentTime').textContent = formatTime(mushafAudio.currentTime);
        document.getElementById('mushafDuration').textContent = formatTime(mushafAudio.duration);
    }
});

mushafAudio.addEventListener('ended', function() {
    // Highlight current ayah briefly before moving on
    var currentEl = document.getElementById('ayah-' + mushafCurrentAyahIndex);
    if (currentEl) {
        currentEl.classList.remove('active');
        currentEl.classList.add('completed');
    }

    mushafCurrentAyahIndex++;

    if (mushafCurrentAyahIndex < mushafAyahs.length) {
        // Play next ayah
        mushafAudio.src = mushafAyahs[mushafCurrentAyahIndex].audio;
        mushafAudio.load();
        mushafAudio.play().catch(function(e) { console.log('Mushaf ayah play error:', e); });
        scrollToAyah(mushafCurrentAyahIndex);
    } else {
        // Surah finished
        mushafIsPlaying = false;
        mushafCurrentAyahIndex = 0;
        updateMushafPlayBtn();
        document.getElementById('mushafCurrentTime').textContent = '0:00';
        document.getElementById('mushafDuration').textContent = '0:00';
        document.getElementById('mushafProgressBar').style.width = '0%';
    }
});

mushafAudio.addEventListener('play', function() {
    mushafIsPlaying = true;
    updateMushafPlayBtn();
    highlightCurrentAyah();
});

mushafAudio.addEventListener('pause', function() {
    mushafIsPlaying = false;
    updateMushafPlayBtn();
});

function highlightCurrentAyah() {
    // Remove all active states
    document.querySelectorAll('.ayah-item.active').forEach(function(el) {
        el.classList.remove('active');
    });
    var currentEl = document.getElementById('ayah-' + mushafCurrentAyahIndex);
    if (currentEl) {
        currentEl.classList.add('active');
    }
}

function scrollToAyah(index) {
    highlightCurrentAyah();
    var ayahEl = document.getElementById('ayah-' + index);
    if (ayahEl) {
        ayahEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ==================== AUDIO PLAYER ====================
function onAudioReciterChange() {
    var sel = document.getElementById('audioReciter');
    currentReciter = sel.value;
    document.getElementById('currentReciterName').textContent = reciters[currentReciter].name;
}

function playAudioSurah() {
    var sel = document.getElementById('audioSurah');
    var surahNum = parseInt(sel.value);
    if (!surahNum) return;

    currentSurah = surahNum;
    var surah = surahs.find(function(s) { return s.number === surahNum; });
    var padded = String(surahNum).padStart(3, '0');
    var url = reciters[currentReciter].base + padded + '.mp3';

    document.getElementById('nowPlaying').textContent = surah.number + ' - ' + surah.name;
    audio.src = url;
    audio.load();
    audio.play().then(function() {
        isPlaying = true;
        updatePlayBtn();
    }).catch(function(e) { console.log('Audio play error:', e); });

    audio.onloadedmetadata = function() {
        document.getElementById('audioDuration').textContent = formatTime(audio.duration);
    };
}

function togglePlay() {
    if (!audio.src || audio.src === window.location.href) {
        // No audio loaded, play first surah
        var sel = document.getElementById('audioSurah');
        if (sel && sel.value) {
            playAudioSurah();
        } else {
            playAudioSurahById(1);
        }
        return;
    }
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play().catch(function(e) { console.log('Audio play error:', e); });
    }
    isPlaying = !isPlaying;
    updatePlayBtn();
}

function playAudioSurahById(num) {
    var sel = document.getElementById('audioSurah');
    if (sel) sel.value = num;
    currentSurah = num;
    var surah = surahs.find(function(s) { return s.number === num; });
    var padded = String(num).padStart(3, '0');
    var url = reciters[currentReciter].base + padded + '.mp3';

    document.getElementById('nowPlaying').textContent = surah.number + ' - ' + surah.name;
    audio.src = url;
    audio.load();
    audio.play().then(function() {
        isPlaying = true;
        updatePlayBtn();
    }).catch(function(e) { console.log('Audio play error:', e); });
}

function updatePlayBtn() {
    var icon = document.getElementById('playIcon');
    if (icon) {
        icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
}

function seekAudio(e) {
    if (audio.duration) {
        var rect = e.currentTarget.getBoundingClientRect();
        var pct = (e.clientX - rect.left) / rect.width;
        if (pct < 0) pct = 0;
        if (pct > 1) pct = 1;
        audio.currentTime = pct * audio.duration;
    }
}

function changeVolume() {
    var vol = document.getElementById('volumeSlider').value;
    audio.volume = vol / 100;
}

// Audio events
audio.addEventListener('timeupdate', function() {
    if (audio.duration) {
        var pct = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressBar').style.width = pct + '%';
        document.getElementById('audioCurrentTime').textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', function() {
    document.getElementById('audioDuration').textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', function() {
    // Auto-advance to next surah
    var nextNum = currentSurah + 1;
    if (nextNum <= 114) {
        playAudioSurahById(nextNum);
        var audioSel = document.getElementById('audioSurah');
        if (audioSel) audioSel.value = nextNum;
    } else {
        isPlaying = false;
        updatePlayBtn();
    }
});

audio.addEventListener('play', function() {
    isPlaying = true;
    updatePlayBtn();
});

audio.addEventListener('pause', function() {
    isPlaying = false;
    updatePlayBtn();
});

// ==================== AZKAR ====================
function renderAzkar() {
    renderAzkarList('azkarMorning', azkarMorning);
    renderAzkarList('azkarEvening', azkarEvening);
    renderAzkarList('azkarLeaving', azkarLeaving);
}

function renderAzkarList(containerId, data) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var html = '';
    data.forEach(function(z, i) {
        html += '<div class="zikr-card">';
        html += '<div class="zikr-text">' + z.text + '</div>';
        html += '<div class="zikr-meta"><span class="zikr-source"><i class="fas fa-bookmark"></i> ' + z.source + '</span>';
        html += '<span class="zikr-count-label">التكرار: ' + z.count + '</span></div>';
        html += '<div class="zikr-action">';
        html += '<button class="zikr-count-btn" data-max="' + z.count + '" onclick="countZikr(this, ' + z.count + ')">' + z.count + '</button>';
        html += '</div>';
        html += '</div>';
    });
    container.innerHTML = html;
}

function countZikr(btn, max) {
    var current = parseInt(btn.textContent);
    if (current > 1) {
        btn.textContent = current - 1;
        btn.style.transform = 'scale(1.2)';
        setTimeout(function() { btn.style.transform = ''; }, 200);
    } else {
        btn.textContent = '✓';
        btn.classList.add('completed');
        btn.style.transform = 'scale(1.3)';
        setTimeout(function() { btn.style.transform = ''; }, 200);
    }
}

function showAzkarTab(tab, el) {
    document.querySelectorAll('.azkar-tab').forEach(function(t) { t.classList.remove('active'); });
    el.classList.add('active');

    document.getElementById('azkarMorning').classList.add('hidden');
    document.getElementById('azkarEvening').classList.add('hidden');
    document.getElementById('azkarLeaving').classList.add('hidden');

    if (tab === 'morning') {
        document.getElementById('azkarMorning').classList.remove('hidden');
    } else if (tab === 'evening') {
        document.getElementById('azkarEvening').classList.remove('hidden');
    } else if (tab === 'leaving') {
        document.getElementById('azkarLeaving').classList.remove('hidden');
    }
}

// ==================== RUQYAH ====================
function renderRuqyah() {
    var container = document.getElementById('ruqyahList');
    if (!container) return;
    var html = '';
    ruqyahData.forEach(function(r) {
        html += '<div class="ruqyah-card">';
        html += '<h3>' + r.title + '</h3>';
        html += '<div class="verse-text">' + r.text.replace(/\n/g, '<br>') + '</div>';
        html += '<div class="verse-source"><i class="fas fa-bookmark"></i> ' + r.source + '</div>';
        if (r.benefit) {
            html += '<div class="ruqyah-benefit"><i class="fas fa-star"></i> ' + r.benefit + '</div>';
        }
        html += '</div>';
    });
    container.innerHTML = html;
}

// ==================== DUA ====================
function renderDua() {
    var container = document.getElementById('duaList');
    if (!container) return;
    var html = '';
    duaData.forEach(function(d) {
        html += '<div class="dua-card">';
        html += '<h3>' + d.title + '</h3>';
        html += '<div class="dua-text">' + d.text.replace(/\n/g, '<br>') + '</div>';
        html += '<div class="dua-source"><i class="fas fa-bookmark"></i> ' + d.source + '</div>';
        html += '</div>';
    });
    container.innerHTML = html;
}

// ==================== PRAYER TIMES ====================
function initPrayerTimes() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(pos) {
                var lat = pos.coords.latitude;
                var lon = pos.coords.longitude;
                fetchPrayerTimes(lat, lon);
                getLocationName(lat, lon);
            },
            function(err) {
                // Default to Cairo
                fetchPrayerTimes(30.0444, 31.2357);
                document.getElementById('locationText').textContent = 'القاهرة، مصر (افتراضي)';
            },
            { timeout: 10000 }
        );
    } else {
        fetchPrayerTimes(30.0444, 31.2357);
        document.getElementById('locationText').textContent = 'القاهرة، مصر (افتراضي)';
    }
}

function fetchPrayerTimes(lat, lon) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var dateStr = dd + '-' + mm + '-' + yyyy;

    var url = 'https://api.aladhan.com/v1/timings/' + dateStr + '?latitude=' + lat + '&longitude=' + lon + '&method=5&shafpiaq=1';

    fetch(url)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            displayPrayerTimes(data.data);
        })
        .catch(function(err) {
            console.error('Prayer times error:', err);
        });
}

function displayPrayerTimes(data) {
    var prayers = [
        { name: 'الفجر', time: data.timings.Fajr, icon: 'fa-cloud-sun' },
        { name: 'الشروق', time: data.timings.Sunrise, icon: 'fa-sun' },
        { name: 'الظهر', time: data.timings.Dhuhr, icon: 'fa-sun' },
        { name: 'العصر', time: data.timings.Asr, icon: 'fa-cloud-sun' },
        { name: 'المغرب', time: data.timings.Maghrib, icon: 'fa-moon' },
        { name: 'العشاء', time: data.timings.Isha, icon: 'fa-star' }
    ];

    var grid = document.getElementById('prayerGrid');
    var html = '';
    prayers.forEach(function(p) {
        html += '<div class="prayer-card" data-time="' + p.time + '">';
        html += '<div class="prayer-icon"><i class="fas ' + p.icon + '"></i></div>';
        html += '<div class="prayer-name">' + p.name + '</div>';
        html += '<div class="prayer-time-display">' + formatPrayerTime(p.time) + '</div>';
        html += '</div>';
    });
    grid.innerHTML = html;

    checkPrayerTime();
}

function formatPrayerTime(time) {
    if (!time) return '';
    var parts = time.split(':');
    var hour = parseInt(parts[0]);
    var min = parts[1];
    var ampm = hour >= 12 ? 'م' : 'ص';
    var h12 = hour > 12 ? hour - 12 : hour;
    if (h12 === 0) h12 = 12;
    return h12 + ':' + min + ' ' + ampm;
}

function checkPrayerTime() {
    var now = new Date();
    var nowMinutes = now.getHours() * 60 + now.getMinutes();
    var cards = document.querySelectorAll('.prayer-card');
    var nextFound = false;

    cards.forEach(function(card) {
        card.classList.remove('active');
        var time = card.dataset.time;
        if (!time) return;

        var parts = time.split(':').map(Number);
        var prayerMinutes = parts[0] * 60 + parts[1];

        if (!nextFound && prayerMinutes > nowMinutes) {
            card.classList.add('active');
            nextFound = true;
            var diff = prayerMinutes - nowMinutes;
            var prayerName = card.querySelector('.prayer-name').textContent;
            document.getElementById('nextPrayer').innerHTML = '<i class="fas fa-hourglass-half"></i> التالية: ' + prayerName + ' بعد ' + diff + ' دقيقة';
        }
    });

    if (!nextFound) {
        document.getElementById('nextPrayer').innerHTML = '<i class="fas fa-check-circle"></i> مرت على جميع الصلوات اليومية';
    }
}

function getLocationName(lat, lon) {
    fetch('https://api.aladhan.com/v1/timings/19-07-2026?latitude=' + lat + '&longitude=' + lon + '&method=5')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            var meta = data.data && data.data.meta;
            if (meta && meta.timezone) {
                document.getElementById('locationText').textContent = meta.timezone;
            } else {
                document.getElementById('locationText').textContent = 'موقعك الحالي';
            }
        })
        .catch(function() {
            document.getElementById('locationText').textContent = 'موقعك الحالي';
        });
}

// ==================== CLOCK ====================
function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var ampm = h >= 12 ? 'م' : 'ص';
    h = h % 12;
    if (h === 0) h = 12;
    var hStr = String(h).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    var currentTimeEl = document.getElementById('currentTime');
    if (currentTimeEl) {
        currentTimeEl.innerHTML = '<i class="fas fa-clock"></i> ' + hStr + ':' + m + ':' + s + ' ' + ampm;
    }
}

// ==================== NAVIGATION ====================
function initNavigation() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', function() {
            links.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-links a').forEach(function(l) { l.classList.remove('active'); });
            link.classList.add('active');
            if (links) links.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        var sections = document.querySelectorAll('section[id]');
        var current = '';
        sections.forEach(function(section) {
            var top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== SCROLL TO TOP ====================
function initScrollTop() {
    var btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== PDF ====================
function openMushafPdf() {
    var sel = document.getElementById('surahSelect');
    var surahNum = parseInt(sel.value);
    if (!surahNum) surahNum = 1;
    var padded = String(surahNum).padStart(3, '0');
    var pdfUrl = 'https://www.mp3quran.net/api3/files/mp3/mini_mushaf/' + padded + '.pdf';
    document.getElementById('quranPdfFrame').src = pdfUrl;
}

// ==================== SEARCH ====================
function filterSurahs() {
    var query = document.getElementById('surahSearch');
    if (!query) return;
    var val = query.value.trim();
    var items = document.querySelectorAll('.surah-item');
    items.forEach(function(item) {
        var name = item.dataset.name || '';
        var num = item.dataset.number || '';
        var match = name.includes(val) || num.includes(val);
        item.style.display = match ? 'flex' : 'none';
    });
}

// ==================== START ====================
document.addEventListener('DOMContentLoaded', init);
