const surahs = [
    { number: 1, name: "الفاتحة", ayahs: 7 },
    { number: 2, name: "البقرة", ayahs: 286 },
    { number: 3, name: "آل عمران", ayahs: 200 },
    { number: 4, name: "النساء", ayahs: 176 },
    { number: 5, name: "المائدة", ayahs: 120 },
    { number: 6, name: "الأنعام", ayahs: 165 },
    { number: 7, name: "الأعراف", ayahs: 206 },
    { number: 8, name: "الأنفال", ayahs: 75 },
    { number: 9, name: "التوبة", ayahs: 129 },
    { number: 10, name: "يونس", ayahs: 109 },
    { number: 11, name: "هود", ayahs: 123 },
    { number: 12, name: "يوسف", ayahs: 111 },
    { number: 13, name: "الرعد", ayahs: 43 },
    { number: 14, name: "إبراهيم", ayahs: 52 },
    { number: 15, name: "الحجر", ayahs: 99 },
    { number: 16, name: "النحل", ayahs: 128 },
    { number: 17, name: "الإسراء", ayahs: 111 },
    { number: 18, name: "الكهف", ayahs: 110 },
    { number: 19, name: "مريم", ayahs: 98 },
    { number: 20, name: "طه", ayahs: 135 },
    { number: 21, name: "الأنبياء", ayahs: 112 },
    { number: 22, name: "الحج", ayahs: 78 },
    { number: 23, name: "المؤمنون", ayahs: 118 },
    { number: 24, name: "النور", ayahs: 64 },
    { number: 25, name: "الفرقان", ayahs: 77 },
    { number: 26, name: "الشعراء", ayahs: 227 },
    { number: 27, name: "النمل", ayahs: 93 },
    { number: 28, name: "القصص", ayahs: 88 },
    { number: 29, name: "العنكبوت", ayahs: 69 },
    { number: 30, name: "الروم", ayahs: 60 },
    { number: 31, name: "لقمان", ayahs: 34 },
    { number: 32, name: "السجدة", ayahs: 30 },
    { number: 33, name: "الأحزاب", ayahs: 73 },
    { number: 34, name: "سبأ", ayahs: 54 },
    { number: 35, name: "فاطر", ayahs: 45 },
    { number: 36, name: "يس", ayahs: 83 },
    { number: 37, name: "الصافات", ayahs: 182 },
    { number: 38, name: "ص", ayahs: 88 },
    { number: 39, name: "الزمر", ayahs: 75 },
    { number: 40, name: "غافر", ayahs: 85 },
    { number: 41, name: "فصلت", ayahs: 54 },
    { number: 42, name: "الشورى", ayahs: 53 },
    { number: 43, name: "الزخرف", ayahs: 89 },
    { number: 44, name: "الدخان", ayahs: 59 },
    { number: 45, name: "الجاثية", ayahs: 37 },
    { number: 46, name: "الأحقاف", ayahs: 35 },
    { number: 47, name: "محمد", ayahs: 38 },
    { number: 48, name: "الفتح", ayahs: 29 },
    { number: 49, name: "الحجرات", ayahs: 18 },
    { number: 50, name: "ق", ayahs: 45 },
    { number: 51, name: "الذاريات", ayahs: 60 },
    { number: 52, name: "الطور", ayahs: 49 },
    { number: 53, name: "النجم", ayahs: 62 },
    { number: 54, name: "القمر", ayahs: 55 },
    { number: 55, name: "الرحمن", ayahs: 78 },
    { number: 56, name: "الواقعة", ayahs: 96 },
    { number: 57, name: "الحديد", ayahs: 29 },
    { number: 58, name: "المجادلة", ayahs: 22 },
    { number: 59, name: "الحشر", ayahs: 24 },
    { number: 60, name: "الممتحنة", ayahs: 13 },
    { number: 61, name: "الصف", ayahs: 14 },
    { number: 62, name: "الجمعة", ayahs: 11 },
    { number: 63, name: "المنافقون", ayahs: 11 },
    { number: 64, name: "التغابن", ayahs: 18 },
    { number: 65, name: "الطلاق", ayahs: 12 },
    { number: 66, name: "التحريم", ayahs: 12 },
    { number: 67, name: "الملك", ayahs: 30 },
    { number: 68, name: "القلم", ayahs: 52 },
    { number: 69, name: "الحاقة", ayahs: 52 },
    { number: 70, name: "المعارج", ayahs: 44 },
    { number: 71, name: "نوح", ayahs: 28 },
    { number: 72, name: "الجن", ayahs: 28 },
    { number: 73, name: "المزمل", ayahs: 20 },
    { number: 74, name: "المدثر", ayahs: 56 },
    { number: 75, name: "القيامة", ayahs: 40 },
    { number: 76, name: "الإنسان", ayahs: 31 },
    { number: 77, name: "المرسلات", ayahs: 50 },
    { number: 78, name: "النبأ", ayahs: 40 },
    { number: 79, name: "النازعات", ayahs: 46 },
    { number: 80, name: "عبس", ayahs: 42 },
    { number: 81, name: "التكوير", ayahs: 29 },
    { number: 82, name: "الانفطار", ayahs: 19 },
    { number: 83, name: "المطففين", ayahs: 36 },
    { number: 84, name: "الانشقاق", ayahs: 25 },
    { number: 85, name: "البروج", ayahs: 22 },
    { number: 86, name: "الطارق", ayahs: 17 },
    { number: 87, name: "الأعلى", ayahs: 19 },
    { number: 88, name: "الغاشية", ayahs: 26 },
    { number: 89, name: "الفجر", ayahs: 30 },
    { number: 90, name: "البلد", ayahs: 20 },
    { number: 91, name: "الشمس", ayahs: 15 },
    { number: 92, name: "الليل", ayahs: 21 },
    { number: 93, name: "الضحى", ayahs: 11 },
    { number: 94, name: "الشرح", ayahs: 8 },
    { number: 95, name: "التين", ayahs: 8 },
    { number: 96, name: "العلق", ayahs: 19 },
    { number: 97, name: "القدر", ayahs: 5 },
    { number: 98, name: "البينة", ayahs: 8 },
    { number: 99, name: "الزلزلة", ayahs: 8 },
    { number: 100, name: "العاديات", ayahs: 11 },
    { number: 101, name: "القارعة", ayahs: 11 },
    { number: 102, name: "التكاثر", ayahs: 8 },
    { number: 103, name: "العصر", ayahs: 3 },
    { number: 104, name: "الهمزة", ayahs: 9 },
    { number: 105, name: "الفيل", ayahs: 5 },
    { number: 106, name: "قريش", ayahs: 4 },
    { number: 107, name: "الماعون", ayahs: 7 },
    { number: 108, name: "الكوثر", ayahs: 3 },
    { number: 109, name: "الكافرون", ayahs: 6 },
    { number: 110, name: "النصر", ayahs: 3 },
    { number: 111, name: "المسد", ayahs: 5 },
    { number: 112, name: "الإخلاص", ayahs: 4 },
    { number: 113, name: "الفلق", ayahs: 5 },
    { number: 114, name: "الناس", ayahs: 6 }
];

const reciters = {
    abdulbasit: { name: "عبد الباسط عبد الصمد", base: "https://server8.mp3quran.net/afs/" },
    husary: { name: "محمود خليل الحصري", base: "https://server8.mp3quran.net/hausi/" },
    muayqili: { name: "عبدالرحمن العوسى (المعيقلي)", base: "https://server8.mp3quran.net/hsas/" },
    minshawi: { name: "محمد صديق المنشاوى", base: "https://server8.mp3quran.net/menshawi128/" },
    ajamy: { name: "سعد الغامدي (العجمي)", base: "https://server8.mp3quran.net/a_gmady/" },
    tablawi: { name: "أحمد بن علي العجمي (الطبلاوي)", base: "https://server8.mp3quran.net/ahmedajamy/" },
    rifat: { name: "محمد رفعت", base: "https://server8.mp3quran.net/mrifaat/" }
};

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
        benefit: "كانت يقرأهما النبي ﷺ كل ليلة حين يأوي إلى فراشه، وكان يقرأ في كفه فينفث عليهما فيقرأ بهما"
    },
    {
        title: "سورة الإخلاص",
        text: "قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        source: "الإخلاص: 1-4",
        benefit: "من قرأها three مرات حين يصبح وحين يمسي كفته من كل شيء"
    },
    {
        title: "آية من سورة البقرة",
        text: "وَإِلَـهُكُمْ إِلَـهٌ وَاحِدٌ لاَّ إِلَـهَ إِلاَّ هُوَ الرَّحْمَنُ الرَّحِيمُ",
        source: "البقرة: 163",
        benefit: "إذا قرأها في дома لم يدخله شيطان"
    },
    {
        title: "من أدعية الاستخارة",
        text: "اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلاَ أَقْدِرُ، وَتَعْلَمُ وَلاَ أَعْلَمُ، وَأَنْتَ عَلاَّمُ الْغُيُوبِ",
        source: "رواه البخاري",
        benefit: "الاستخارة هي سؤال الله تعالى أن يختار لعبده ما هو خير له"
    },
    {
        title: "أدعية مأثورة من القرآن",
        text: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ\nرَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ\nرَبَّنَا أَفْرِغْ عَلَيْنَا صَبْراً وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ\nرَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
        source: "مختلفة من القرآن الكريم",
        benefit: "من أدعية القرآن الكريم المأثورة التي كان النبي ﷺ يدعو بها"
    }
];

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
    }
];

let currentReciter = 'abdulbasit';
let currentSurah = null;
let isPlaying = false;
const audio = document.getElementById('mainAudio');

function init() {
    populateSurahSelect();
    renderSurahList();
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

function populateSurahSelect() {
    const select = document.getElementById('surahSelect');
    surahs.forEach(surah => {
        const option = document.createElement('option');
        option.value = surah.number;
        option.textContent = `${surah.number} - ${surah.name}`;
        select.appendChild(option);
    });
}

function openQuranPdf() {
    const surahNum = document.getElementById('surahSelect').value;
    const pageNum = getPageForSurah(parseInt(surahNum));
    const pdfUrl = `https://cdn.islamic.network/quran/images-surah-mp3/alafasy_128kbps/${String(surahNum).padStart(3, '0')}.mp3`;
    document.getElementById('quranPdfFrame').src = `https://quran.com/`;
}

function getPageForSurah(surahNum) {
    const pages = [1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14];
    return pages[surahNum - 1] || 1;
}

function renderSurahList() {
    const container = document.getElementById('surahList');
    container.innerHTML = surahs.map(s => `
        <div class="surah-item" onclick="playSurah(${s.number}, '${s.name}')" data-name="${s.name}" data-number="${s.number}">
            <div class="surah-number">${s.number}</div>
            <span class="surah-name">${s.name}</span>
        </div>
    `).join('');
}

function filterSurahs() {
    const query = document.getElementById('surahSearch').value;
    const items = document.querySelectorAll('.surah-item');
    items.forEach(item => {
        const name = item.dataset.name;
        const num = item.dataset.number;
        const match = name.includes(query) || num.includes(query);
        item.style.display = match ? 'flex' : 'none';
    });
}

function selectReciter(el) {
    document.querySelectorAll('.reciter-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    currentReciter = el.dataset.reciter;
    document.getElementById('currentReciterName').textContent = reciters[currentReciter].name;
    if (currentSurah) {
        playSurah(currentSurah, document.querySelector('.surah-item.active .surah-name')?.textContent || '');
    }
}

function playSurah(num, name) {
    currentSurah = num;
    const padded = String(num).padStart(3, '0');
    const url = `${reciters[currentReciter].base}${padded}.mp3`;
    
    document.querySelectorAll('.surah-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.surah-item[data-number="${num}"]`)?.classList.add('active');
    
    document.getElementById('nowPlaying').textContent = name;
    audio.src = url;
    audio.load();
    audio.play().then(() => {
        isPlaying = true;
        updatePlayBtn();
    }).catch(e => console.log('Audio play error:', e));
    
    audio.ontimeupdate = updateProgress;
    audio.onloadedmetadata = () => {
        document.getElementById('duration').textContent = formatTime(audio.duration);
    };
    audio.onended = () => {
        isPlaying = false;
        updatePlayBtn();
        const nextNum = num + 1;
        if (nextNum <= 114) {
            const nextSurah = surahs.find(s => s.number === nextNum);
            if (nextSurah) playSurah(nextNum, nextSurah.name);
        }
    };
}

function togglePlay() {
    if (!currentSurah) {
        playSurah(1, 'الفاتحة');
        return;
    }
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayBtn();
}

function updatePlayBtn() {
    const icon = document.getElementById('playIcon');
    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

function updateProgress() {
    if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progressBar').style.width = pct + '%';
        document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
    }
}

function seekAudio(e) {
    if (audio.duration) {
        const rect = e.target.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
    }
}

function changeVolume() {
    audio.volume = document.getElementById('volumeSlider').value / 100;
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function renderAzkar() {
    renderAzkarList('azkarMorning', azkarMorning);
    renderAzkarList('azkarEvening', azkarEvening);
    renderAzkarList('azkarLeaving', azkarLeaving);
}

function renderAzkarList(containerId, data) {
    const container = document.getElementById(containerId);
    container.innerHTML = data.map((z, i) => `
        <div class="zikr-card">
            <div class="zikr-text">${z.text}</div>
            <div class="zikr-source">${z.source}</div>
            <div class="zikr-count">
                <span>التكرار: ${z.count}</span>
                <button class="zikr-count-btn" onclick="countZikr(this, ${z.count})">${z.count}</button>
            </div>
        </div>
    `).join('');
}

function countZikr(btn, max) {
    let current = parseInt(btn.textContent);
    if (current > 1) {
        btn.textContent = current - 1;
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = '', 200);
    } else {
        btn.textContent = '✓';
        btn.style.background = 'var(--gold)';
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => btn.style.transform = '', 200);
    }
}

function showAzkarTab(tab) {
    document.querySelectorAll('.azkar-tab').forEach(t => t.classList.remove('active'));
    event.target.closest('.azkar-tab').classList.add('active');
    
    document.getElementById('azkarMorning').classList.add('hidden');
    document.getElementById('azkarEvening').classList.add('hidden');
    document.getElementById('azkarLeaving').classList.add('hidden');
    
    if (tab === 'morning') document.getElementById('azkarMorning').classList.remove('hidden');
    else if (tab === 'evening') document.getElementById('azkarEvening').classList.remove('hidden');
    else if (tab === 'leaving') document.getElementById('azkarLeaving').classList.remove('hidden');
}

function renderRuqyah() {
    const container = document.getElementById('ruqyahList');
    container.innerHTML = ruqyahData.map(r => `
        <div class="ruqyah-card">
            <h3>${r.title}</h3>
            <div class="verse-text">${r.text}</div>
            <div class="verse-source">${r.source}</div>
            ${r.benefit ? `<p style="margin-top: 10px; color: var(--primary-green); font-weight: 600;">${r.benefit}</p>` : ''}
        </div>
    `).join('');
}

function renderDua() {
    const container = document.getElementById('duaList');
    container.innerHTML = duaData.map(d => `
        <div class="dua-card">
            <h3>${d.title}</h3>
            <div class="dua-text">${d.text}</div>
            <div class="dua-meaning">${d.source}</div>
        </div>
    `).join('');
}

async function initPrayerTimes() {
    try {
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
        });
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        await fetchPrayerTimes(lat, lon);
        getLocationName(lat, lon);
    } catch (e) {
        fetchPrayerTimes(30.0444, 31.2357);
        document.getElementById('locationText').textContent = 'القاهرة، مصر (افتراضي)';
    }
}

async function fetchPrayerTimes(lat, lon) {
    try {
        const today = new Date();
        const dateStr = `${String(today.getDate()).padStart(2,'0')}-${String(today.getMonth()+1).padStart(2,'0')}-${today.getFullYear()}`;
        const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lon}&method=5&shafpiaq=1`);
        const data = await res.json();
        displayPrayerTimes(data.data);
    } catch (e) {
        console.error('Prayer times error:', e);
    }
}

function displayPrayerTimes(data) {
    const prayers = [
        { name: 'الفجر', time: data.timings.Fajr, icon: 'fa-cloud-sun' },
        { name: 'الشروق', time: data.timings.Sunrise, icon: 'fa-sun' },
        { name: 'الظهر', time: data.timings.Dhuhr, icon: 'fa-sun' },
        { name: 'العصر', time: data.timings.Asr, icon: 'fa-cloud-sun' },
        { name: 'المغرب', time: data.timings.Maghrib, icon: 'fa-moon' },
        { name: 'العشاء', time: data.timings.Isha, icon: 'fa-star' }
    ];

    const grid = document.getElementById('prayerGrid');
    grid.innerHTML = prayers.map(p => `
        <div class="prayer-card" data-time="${p.time}">
            <div class="prayer-icon"><i class="fas ${p.icon}"></i></div>
            <div class="prayer-name">${p.name}</div>
            <div class="prayer-time">${formatPrayerTime(p.time)}</div>
            <div class="prayer-arabic">${p.time}</div>
        </div>
    `).join('');

    checkPrayerTime();
}

function formatPrayerTime(time) {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'م' : 'ص';
    const h12 = hour > 12 ? hour - 12 : hour;
    return `${h12}:${m} ${ampm}`;
}

function checkPrayerTime() {
    const now = new Date();
    const cards = document.querySelectorAll('.prayer-card');
    let nextFound = false;
    
    cards.forEach(card => {
        card.classList.remove('active');
        const time = card.dataset.time;
        if (!time) return;
        
        const [h, m] = time.split(':').map(Number);
        const prayerDate = new Date(now);
        prayerDate.setHours(h, m, 0, 0);
        
        if (!nextFound && prayerDate > now) {
            card.classList.add('active');
            nextFound = true;
            const diff = prayerDate - now;
            const min = Math.floor(diff / 60000);
            document.getElementById('nextPrayer').innerHTML = 
                `<i class="fas fa-hourglass-half"></i> التالية: ${card.querySelector('.prayer-name').textContent} بعد ${min} دقيقة`;
        }
    });

    if (!nextFound) {
        document.getElementById('nextPrayer').innerHTML = '<i class="fas fa-check-circle"></i> مرت على جميع الصلوات اليومية';
    }
}

async function getLocationName(lat, lon) {
    try {
        const res = await fetch(`https://api.aladhan.com/v1/timings/19-07-2026?latitude=${lat}&longitude=${lon}&method=5`);
        const data = await res.json();
        const meta = data.data?.meta;
        if (meta) {
            document.getElementById('locationText').textContent = `${meta.timezone || 'موقعك الحالي'}`;
        }
    } catch (e) {
        document.getElementById('locationText').textContent = 'موقعك الحالي';
    }
}

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('currentTime').innerHTML = `<i class="fas fa-clock"></i> ${h}:${m}:${s}`;
    
    const prayerCards = document.querySelectorAll('.prayer-card');
    prayerCards.forEach(card => {
        card.classList.remove('active');
        const time = card.dataset.time;
        if (!time) return;
        const [ph, pm] = time.split(':').map(Number);
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        const prayerMinutes = ph * 60 + pm;
        if (Math.abs(nowMinutes - prayerMinutes) < 15) {
            card.classList.add('active');
        }
    });
}

function initNavigation() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    
    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            links.classList.remove('active');
        });
    });
    
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
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

document.addEventListener('DOMContentLoaded', init);