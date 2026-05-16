import { ref, computed } from 'vue'

export const currentLanguage = ref(localStorage.getItem('language') || 'lv')

export const translations = {
  lv: {
    // Common
    footer: '© 2025 Dragons Den',
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
    
    // Leaderboard
    leaderboardTitle: '🏆 Rezultātu tabula',
    yourPoints: 'Tavi punkti:',
    playerColumn: 'Lietotājs',
    pointsColumn: 'Punkti',
    noPointsYet: 'Nav punktu vēl.',

    // Message Board
    messageBoardTitle: '📌 Ziņojumu dēlis',
    messageBoardDesc: 'Atver sānjoslu, lai atstātu ziņu mums un citiem lietotājiem.',
    openMessageBoard: 'Atvērt ziņojumu dēli',
    messageBoardSidebar: 'Ziņojumu dēlis',
    post: 'Publicēt',
    noMessages: 'Pagaidām ziņu nav.',
    missions: 'Misijas',
    openList: 'Atvērt sarakstu',
    gameZone: '🎮 Spēļu zona',
    yourGames: '🎮 Tavas spēles',
    yourGamesDesc: 'Spēlē spēles un pabeidz misijas, lai nopelnītu vairāk punktu!',

    // Profile Page
    profileTitle: '👤 Lietotāja profils',
    profileSubtitle: 'Tava konta informācija',
    profileInfo: 'Profila informācija',
    points: 'Punkti',
    accountType: 'Konta veids',
    accountActions: 'Konta darbības',
    logout: '🚪 Iziet',
    
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
    gameComingSoon: 'Spēle tiek sagatavota! Drīzumā būs pieejama 🎮',
  },
  en: {
    // Common
    footer: '© 2025 Dragons Den',
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
    
    // Leaderboard
    leaderboardTitle: '🏆 Leaderboard',
    yourPoints: 'Your points:',
    playerColumn: 'Player',
    pointsColumn: 'Points',
    noPointsYet: 'No points yet.',

    // Message Board
    messageBoardTitle: '📌 Message Board',
    messageBoardDesc: 'Open the sidebar to leave a message for us and other users.',
    openMessageBoard: 'Open message board',
    messageBoardSidebar: 'Message Board',
    post: 'Post',
    noMessages: 'No messages yet.',
    missions: 'Missions',
    openList: 'Open list',
    gameZone: '🎮 Game Zone',
    yourGames: '🎮 Your Games',
    yourGamesDesc: 'Play games and complete missions to earn more points!',

    // Profile Page
    profileTitle: '👤 User Profile',
    profileSubtitle: 'Your account information',
    profileInfo: 'Profile Information',
    points: 'Points',
    accountType: 'Account Type',
    accountActions: 'Account Actions',
    logout: '🚪 Logout',
    
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
    gameComingSoon: 'Game is being prepared! Coming soon 🎮',
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
