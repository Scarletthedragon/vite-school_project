import { ref, computed } from 'vue'

export const currentLanguage = ref(localStorage.getItem('language') || 'lv')

export const translations = {
  lv: {
    // Common
    footer: '© 2025 Rīgas Valsts Tehnikums. Š. Tērmane - Programmēšanas tehniķis',
    language: 'Valoda',
    
    // Navigation
    home: 'Sākums',
    about: 'Misijas',
    technical: 'Tehniskā informācija',
    contact: 'Kontakti',
    
    // Home Page
    heroTitle: '🐉 Dragons Den',
    heroSubtitle: 'Spēlē, mācies un trenē prasmes katru dienu.',
    playNow: 'Spēlēt tagad',
    chooseSection: '🧭 Izvēlies sadaļu',
    
    // About Page
    gameLibraryTitle: '🎮 Spēļu bibliotēka',
    gameLibrarySubtitle: 'Izvēlies sev piemērotu spēli un trenē prasmes katru dienu.',
    howItWorks: '🚀 Kā tas strādā?',
    chooseQuest: 'Izvēlies misiju',
    questDesc: 'Katram līmenim ir sava tēma un uzdevums.',
    playAndLearn: 'Spēlē un mācies',
    learnDesc: 'Spēles trenē loģiku, matemātiku un valodu.',
    earnRewards: 'Iegūsti balvas',
    rewardsDesc: 'Punkti atver jaunus līmeņus un nozīmītes.',
    achievements: '🏅 Sasniegumi',
    fireChampion: '🔥 Uguns čempions — 5 pareizi pēc kārtas',
    iceTactician: '❄️ Ledus taktiķis — 3 misijas bez kļūdām',
    lightningMind: '⚡ Zibens prāts — pabeigta viktorīna zem 60 sekundēm',
    forTeachers: '👨‍🏫 Skolotājiem un vecākiem',
    teachersDesc: 'Dragons Den palīdz mācīties spēlējoties. Katrs uzdevums ir veidots tā, lai bērni praktiski izmēģinātu jaunas prasmes un uzreiz redzētu rezultātu.',
    contactForClassRoom: 'Sazināties par klases kontu',
    
    // Technical Page
    missionsTitle: '📘 Mācību misijas',
    missionsSubtitle: 'Soli pa solim uz prasmju līmeņa celšanu.',
    chooseMission: '🗺️ Izvēlies misiju',
    learningPath: '🎯 Mācību ceļš',
    beginner: '1. Iesācējs',
    beginnerDesc: 'Vienkārši uzdevumi ar tūlītēju atgriezenisko saiti.',
    skilled: '2. Prasmīgais',
    skilledDesc: 'Apvieno vairākas prasmes vienā misijā.',
    master: '3. Meistars',
    masterDesc: 'Izpildi izaicinājumus ar laika limitu un bonusiem.',
    gameTips: '💡 Padomi spēlei',
    startMission: 'Sākt misiju',
    codeStart: 'Koda starts',
    codeStartSummary: 'Iemācies komandu secību un izpildi vienkāršu algoritmu.',
    codeSteps1: 'Ievieto 3 soļus pareizā secībā',
    codeSteps2: 'Nopelni 10 punktus',
    codeSteps3: 'Atbloķē nākamo misiju',
    mathRace: 'Matemātikas trase',
    mathRaceSummary: 'Atrisini uzdevumus, lai saglabātu ātrumu.',
    mathSteps1: 'Pareizi atbildi uz 5 uzdevumiem',
    mathSteps2: 'Izvēlies īsāko ceļu',
    mathSteps3: 'Sasniedz finišu',
    languageMagic: 'Valodas burvestība',
    languageMagicSummary: 'Veido vārdus no burtiem un uzkrāj mana kristālus.',
    langSteps1: 'Izveido 3 vārdus',
    langSteps2: 'Izmanto bonus burtu',
    langSteps3: 'Nopelni nozīmīti',
    easy: 'Viegli',
    medium: 'Vidēji',
    
    // Contact Page
    contactTitle: '📧 Kontakti',
    contactSubtitle: 'Sazinieties ar mums jebkuru jautājumu gadījumā.',
    name: 'Vārds',
    email: 'E-pasts',
    subject: 'Temats',
    message: 'Ziņojums',
    send: 'Nosūtīt',
    nameRequired: 'Vārds ir obligāts!',
    emailRequired: 'E-pasts ir obligāts!',
    invalidEmail: 'E-pasta adrese nav derīga!',
    subjectRequired: 'Temats ir obligāts!',
    messageRequired: 'Ziņojums ir obligāts!',
    failedToSend: 'Neizdevās nosūtīt ziņojumu.',
    messageSent: 'Paldies! Ziņojums nosūtīts.',
    
    // Quiz
    logicMaze: 'Loģikas Labirints',
    learnSteps: 'Mācies plānot soļus un atrisini labirinta uzdevumus.',
    robotChallenge: 'Robotu Izaicinājums',
    programRobot: 'Programmē robotu ar komandām un savāc enerģiju.',
    colorCode: 'Krāsu Kods',
    mixColors: 'Sajauc krāsas, lai atbloķētu noslēpumus.',
    mathMission: 'Matemātikas Misija',
    solveQuests: 'Atrisini īsos uzdevumus un uzkrāj punktus.',
    geoJourney: 'Ģeogrāfijas Ceļojums',
    recognizeCountries: 'Atpazīsti valstis un atklāj jaunas vietas.',
    wordHero: 'Vārdu Varonis',
    buildWords: 'Veido vārdus un uzlabo valodas prasmes.',
    whichCommand: 'Kura komanda atkārto darbību vairākas reizes?',
    whatIs8Plus6: 'Cik ir 8 + 6?',
    oceanCountry: 'Kura ir okeāna valsts?',
    playGame: 'Spēlēt',
    gameComingSoon: 'Spēle tiek sagatavota! Drīzumā būs pieejama 🎮'
  },
  en: {
    // Common
    footer: '© 2025 Riga State Technical School. Š. Tērmane - Programming Technician',
    language: 'Language',
    
    // Navigation
    home: 'Home',
    about: 'Missions',
    technical: 'Technical',
    contact: 'Contact',
    
    // Home Page
    heroTitle: '🐉 Dragons Den',
    heroSubtitle: 'Play, learn, and develop skills every day.',
    playNow: 'Play Now',
    chooseSection: '🧭 Choose a Section',
    
    // About Page
    gameLibraryTitle: '🎮 Game Library',
    gameLibrarySubtitle: 'Choose a game that suits you and develop skills every day.',
    howItWorks: '🚀 How It Works',
    chooseQuest: 'Choose a Quest',
    questDesc: 'Each level has its own theme and task.',
    playAndLearn: 'Play and Learn',
    learnDesc: 'Games develop logic, math, and language skills.',
    earnRewards: 'Earn Rewards',
    rewardsDesc: 'Points unlock new levels and badges.',
    achievements: '🏅 Achievements',
    fireChampion: '🔥 Fire Champion — 5 correct in a row',
    iceTactician: '❄️ Ice Tactician — 3 missions without mistakes',
    lightningMind: '⚡ Lightning Mind — Complete quiz under 60 seconds',
    forTeachers: '👨‍🏫 For Teachers and Parents',
    teachersDesc: 'Dragons Den helps learning through play. Each task is designed so children can practically try new skills and see results immediately.',
    contactForClassRoom: 'Contact About Class Accounts',
    
    // Technical Page
    missionsTitle: '📘 Learning Missions',
    missionsSubtitle: 'Step by step towards improving skills.',
    chooseMission: '🗺️ Choose a Mission',
    learningPath: '🎯 Learning Path',
    beginner: '1. Beginner',
    beginnerDesc: 'Simple tasks with immediate feedback.',
    skilled: '2. Skilled',
    skilledDesc: 'Combine multiple skills in one mission.',
    master: '3. Master',
    masterDesc: 'Complete challenges with time limits and bonuses.',
    gameTips: '💡 Game Tips',
    startMission: 'Start Mission',
    codeStart: 'Code Start',
    codeStartSummary: 'Learn command sequences and execute simple algorithms.',
    codeSteps1: 'Arrange 3 steps in the correct order',
    codeSteps2: 'Earn 10 points',
    codeSteps3: 'Unlock the next mission',
    mathRace: 'Math Race',
    mathRaceSummary: 'Solve tasks to maintain speed.',
    mathSteps1: 'Answer 5 questions correctly',
    mathSteps2: 'Choose the shortest path',
    mathSteps3: 'Reach the finish line',
    languageMagic: 'Language Magic',
    languageMagicSummary: 'Make words from letters and collect mana crystals.',
    langSteps1: 'Create 3 words',
    langSteps2: 'Use the bonus letter',
    langSteps3: 'Earn a badge',
    easy: 'Easy',
    medium: 'Medium',
    
    // Contact Page
    contactTitle: '📧 Contact Us',
    contactSubtitle: 'Get in touch with any questions.',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    nameRequired: 'Name is required!',
    emailRequired: 'Email is required!',
    invalidEmail: 'Invalid email address!',
    subjectRequired: 'Subject is required!',
    messageRequired: 'Message is required!',
    failedToSend: 'Failed to send message.',
    messageSent: 'Thank you! Message sent.',
    
    // Quiz
    logicMaze: 'Logic Maze',
    learnSteps: 'Learn to plan steps and solve maze puzzles.',
    robotChallenge: 'Robot Challenge',
    programRobot: 'Program a robot with commands and collect energy.',
    colorCode: 'Color Code',
    mixColors: 'Mix colors to unlock secrets.',
    mathMission: 'Math Mission',
    solveQuests: 'Solve quick tasks and earn points.',
    geoJourney: 'Geography Journey',
    recognizeCountries: 'Recognize countries and discover new places.',
    wordHero: 'Word Hero',
    buildWords: 'Build words and improve language skills.',
    whichCommand: 'Which command repeats an action multiple times?',
    whatIs8Plus6: 'What is 8 + 6?',
    oceanCountry: 'Which is a country with an ocean?',
    playGame: 'Play',
    gameComingSoon: 'Game is being prepared! Coming soon 🎮'
  }
}

export const t = (key) => {
  return translations[currentLanguage.value][key] || key
}

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }
}
