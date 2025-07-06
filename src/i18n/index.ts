import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        algorithms: 'Algorithms',
        roadmap: 'Roadmap',
        progress: 'Progress',
        chat: 'AI Chat',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout'
      },
      
      // Home/Dashboard
      dashboard: {
        welcome: 'Welcome to AI Algorithms Academy',
        subtitle: 'Master Deep Learning & Machine Learning through Interactive Visualizations',
        startJourney: 'Start Your Learning Journey',
        continueLesson: 'Continue Lesson',
        totalAlgorithms: 'Total Algorithms',
        completedLessons: 'Completed Lessons',
        currentStreak: 'Current Streak',
        weeklyGoal: 'Weekly Goal',
        featuredAlgorithms: 'Featured Algorithms',
        recentProgress: 'Recent Progress',
        achievements: 'Achievements',
        dailyChallenge: 'Daily Challenge'
      },
      
      // Algorithms
      algorithms: {
        title: 'AI Algorithms Collection',
        categories: {
          deepLearning: 'Deep Learning',
          machineLearning: 'Machine Learning',
          neuralNetworks: 'Neural Networks',
          reinforcement: 'Reinforcement Learning',
          computer_vision: 'Computer Vision',
          nlp: 'Natural Language Processing',
          optimization: 'Optimization',
          statistical: 'Statistical Methods'
        },
        difficulty: {
          beginner: 'Beginner',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
          expert: 'Expert'
        },
        status: {
          notStarted: 'Not Started',
          inProgress: 'In Progress',
          completed: 'Completed',
          locked: 'Locked'
        },
        filters: {
          all: 'All',
          category: 'Category',
          difficulty: 'Difficulty',
          status: 'Status',
          search: 'Search algorithms...'
        }
      },
      
      // Algorithm Details
      algorithmDetail: {
        overview: 'Overview',
        visualization: 'Visualization',
        code: 'Code Implementation',
        mathematics: 'Mathematical Background',
        examples: 'Examples',
        quiz: 'Quiz',
        discussion: 'Discussion',
        
        // Sections
        description: 'Description',
        applications: 'Applications',
        advantages: 'Advantages',
        disadvantages: 'Disadvantages',
        complexity: 'Time & Space Complexity',
        prerequisites: 'Prerequisites',
        
        // Actions
        startLearning: 'Start Learning',
        continueLesson: 'Continue Lesson',
        resetProgress: 'Reset Progress',
        markComplete: 'Mark as Complete',
        bookmark: 'Bookmark',
        share: 'Share',
        
        // Progress
        progress: 'Progress',
        timeSpent: 'Time Spent',
        accuracy: 'Accuracy',
        attempts: 'Attempts'
      },
      
      // Roadmap
      roadmap: {
        title: 'Learning Roadmap',
        subtitle: 'Your personalized path to AI mastery',
        phases: {
          foundations: 'Foundations',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
          specialization: 'Specialization',
          research: 'Research Level'
        },
        estimatedTime: 'Estimated Time',
        prerequisites: 'Prerequisites',
        skills: 'Skills You\'ll Learn',
        projects: 'Projects',
        customizeRoadmap: 'Customize Roadmap',
        myRoadmap: 'My Roadmap'
      },
      
      // Progress
      progress: {
        title: 'Learning Progress',
        overview: 'Overview',
        statistics: 'Statistics',
        achievements: 'Achievements',
        streaks: 'Streaks',
        
        // Stats
        totalTimeSpent: 'Total Time Spent',
        algorithmsCompleted: 'Algorithms Completed',
        quizzesCompleted: 'Quizzes Completed',
        currentLevel: 'Current Level',
        experiencePoints: 'Experience Points',
        globalRank: 'Global Rank',
        
        // Achievements
        achievementUnlocked: 'Achievement Unlocked!',
        viewAllAchievements: 'View All Achievements',
        
        // Time periods
        today: 'Today',
        thisWeek: 'This Week',
        thisMonth: 'This Month',
        allTime: 'All Time'
      },
      
      // AI Chat
      chat: {
        title: 'AI Learning Assistant',
        placeholder: 'Ask me anything about algorithms, concepts, or your learning journey...',
        examples: {
          explain: 'Explain how neural networks work',
          help: 'Help me understand backpropagation',
          quiz: 'Quiz me on machine learning concepts',
          roadmap: 'Create a personalized learning roadmap for me'
        },
        thinking: 'Thinking...',
        error: 'Sorry, I encountered an error. Please try again.',
        clearChat: 'Clear Chat',
        exportChat: 'Export Chat'
      },
      
      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        warning: 'Warning',
        info: 'Info',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        close: 'Close',
        next: 'Next',
        previous: 'Previous',
        finish: 'Finish',
        retry: 'Retry',
        refresh: 'Refresh',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        export: 'Export',
        import: 'Import',
        
        // Time
        seconds: 'seconds',
        minutes: 'minutes',
        hours: 'hours',
        days: 'days',
        weeks: 'weeks',
        months: 'months',
        years: 'years',
        
        // Difficulty
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
        veryHard: 'Very Hard'
      },
      
      // Authentication
      auth: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        signInWithGoogle: 'Sign in with Google',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        forgotPassword: 'Forgot Password?',
        dontHaveAccount: 'Don\'t have an account?',
        alreadyHaveAccount: 'Already have an account?',
        createAccount: 'Create Account',
        resetPassword: 'Reset Password',
        
        // Errors
        invalidEmail: 'Invalid email address',
        passwordTooShort: 'Password must be at least 6 characters',
        passwordsDontMatch: 'Passwords don\'t match',
        userNotFound: 'User not found',
        wrongPassword: 'Wrong password',
        emailAlreadyInUse: 'Email already in use',
        tooManyRequests: 'Too many requests. Please try again later.',
        
        // Success
        accountCreated: 'Account created successfully!',
        signInSuccessful: 'Sign in successful!',
        passwordResetSent: 'Password reset email sent!'
      }
    }
  },
  
  ru: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Главная',
        algorithms: 'Алгоритмы',
        roadmap: 'Дорожная карта',
        progress: 'Прогресс',
        chat: 'ИИ Чат',
        profile: 'Профиль',
        settings: 'Настройки',
        logout: 'Выход'
      },
      
      // Home/Dashboard
      dashboard: {
        welcome: 'Добро пожаловать в Академию ИИ Алгоритмов',
        subtitle: 'Изучайте глубокое обучение и машинное обучение через интерактивные визуализации',
        startJourney: 'Начать обучение',
        continueLesson: 'Продолжить урок',
        totalAlgorithms: 'Всего алгоритмов',
        completedLessons: 'Завершенные уроки',
        currentStreak: 'Текущая серия',
        weeklyGoal: 'Недельная цель',
        featuredAlgorithms: 'Рекомендуемые алгоритмы',
        recentProgress: 'Недавний прогресс',
        achievements: 'Достижения',
        dailyChallenge: 'Дневной вызов'
      },
      
      // Algorithms
      algorithms: {
        title: 'Коллекция ИИ Алгоритмов',
        categories: {
          deepLearning: 'Глубокое обучение',
          machineLearning: 'Машинное обучение',
          neuralNetworks: 'Нейронные сети',
          reinforcement: 'Обучение с подкреплением',
          computer_vision: 'Компьютерное зрение',
          nlp: 'Обработка естественного языка',
          optimization: 'Оптимизация',
          statistical: 'Статистические методы'
        },
        difficulty: {
          beginner: 'Начинающий',
          intermediate: 'Средний',
          advanced: 'Продвинутый',
          expert: 'Эксперт'
        },
        status: {
          notStarted: 'Не начато',
          inProgress: 'В процессе',
          completed: 'Завершено',
          locked: 'Заблокировано'
        },
        filters: {
          all: 'Все',
          category: 'Категория',
          difficulty: 'Сложность',
          status: 'Статус',
          search: 'Поиск алгоритмов...'
        }
      },
      
      // Algorithm Details
      algorithmDetail: {
        overview: 'Обзор',
        visualization: 'Визуализация',
        code: 'Реализация кода',
        mathematics: 'Математические основы',
        examples: 'Примеры',
        quiz: 'Викторина',
        discussion: 'Обсуждение',
        
        // Sections
        description: 'Описание',
        applications: 'Применения',
        advantages: 'Преимущества',
        disadvantages: 'Недостатки',
        complexity: 'Временная и пространственная сложность',
        prerequisites: 'Предварительные требования',
        
        // Actions
        startLearning: 'Начать изучение',
        continueLesson: 'Продолжить урок',
        resetProgress: 'Сбросить прогресс',
        markComplete: 'Отметить как выполненное',
        bookmark: 'Закладка',
        share: 'Поделиться',
        
        // Progress
        progress: 'Прогресс',
        timeSpent: 'Время изучения',
        accuracy: 'Точность',
        attempts: 'Попытки'
      },
      
      // Roadmap
      roadmap: {
        title: 'Дорожная карта обучения',
        subtitle: 'Ваш персональный путь к мастерству ИИ',
        phases: {
          foundations: 'Основы',
          intermediate: 'Средний уровень',
          advanced: 'Продвинутый',
          specialization: 'Специализация',
          research: 'Исследовательский уровень'
        },
        estimatedTime: 'Примерное время',
        prerequisites: 'Предварительные требования',
        skills: 'Навыки, которые вы изучите',
        projects: 'Проекты',
        customizeRoadmap: 'Настроить дорожную карту',
        myRoadmap: 'Моя дорожная карта'
      },
      
      // Progress
      progress: {
        title: 'Прогресс обучения',
        overview: 'Обзор',
        statistics: 'Статистика',
        achievements: 'Достижения',
        streaks: 'Серии',
        
        // Stats
        totalTimeSpent: 'Общее время обучения',
        algorithmsCompleted: 'Завершенные алгоритмы',
        quizzesCompleted: 'Завершенные викторины',
        currentLevel: 'Текущий уровень',
        experiencePoints: 'Очки опыта',
        globalRank: 'Глобальный рейтинг',
        
        // Achievements
        achievementUnlocked: 'Достижение разблокировано!',
        viewAllAchievements: 'Посмотреть все достижения',
        
        // Time periods
        today: 'Сегодня',
        thisWeek: 'На этой неделе',
        thisMonth: 'В этом месяце',
        allTime: 'За все время'
      },
      
      // AI Chat
      chat: {
        title: 'ИИ Помощник по обучению',
        placeholder: 'Спросите меня что-нибудь об алгоритмах, концепциях или вашем пути обучения...',
        examples: {
          explain: 'Объясните, как работают нейронные сети',
          help: 'Помогите понять обратное распространение',
          quiz: 'Проверьте меня по концепциям машинного обучения',
          roadmap: 'Создайте персональную дорожную карту обучения для меня'
        },
        thinking: 'Думаю...',
        error: 'Извините, произошла ошибка. Пожалуйста, попробуйте еще раз.',
        clearChat: 'Очистить чат',
        exportChat: 'Экспортировать чат'
      },
      
      // Common
      common: {
        loading: 'Загрузка...',
        error: 'Ошибка',
        success: 'Успех',
        warning: 'Предупреждение',
        info: 'Информация',
        save: 'Сохранить',
        cancel: 'Отмена',
        delete: 'Удалить',
        edit: 'Редактировать',
        view: 'Просмотр',
        close: 'Закрыть',
        next: 'Далее',
        previous: 'Назад',
        finish: 'Завершить',
        retry: 'Повторить',
        refresh: 'Обновить',
        search: 'Поиск',
        filter: 'Фильтр',
        sort: 'Сортировка',
        export: 'Экспорт',
        import: 'Импорт',
        
        // Time
        seconds: 'секунд',
        minutes: 'минут',
        hours: 'часов',
        days: 'дней',
        weeks: 'недель',
        months: 'месяцев',
        years: 'лет',
        
        // Difficulty
        easy: 'Легко',
        medium: 'Средне',
        hard: 'Сложно',
        veryHard: 'Очень сложно'
      },
      
      // Authentication
      auth: {
        signIn: 'Войти',
        signUp: 'Зарегистрироваться',
        signOut: 'Выйти',
        signInWithGoogle: 'Войти через Google',
        email: 'Email',
        password: 'Пароль',
        confirmPassword: 'Подтвердить пароль',
        forgotPassword: 'Забыли пароль?',
        dontHaveAccount: 'Нет аккаунта?',
        alreadyHaveAccount: 'Уже есть аккаунт?',
        createAccount: 'Создать аккаунт',
        resetPassword: 'Сбросить пароль',
        
        // Errors
        invalidEmail: 'Неверный email адрес',
        passwordTooShort: 'Пароль должен быть не менее 6 символов',
        passwordsDontMatch: 'Пароли не совпадают',
        userNotFound: 'Пользователь не найден',
        wrongPassword: 'Неверный пароль',
        emailAlreadyInUse: 'Email уже используется',
        tooManyRequests: 'Слишком много запросов. Попробуйте позже.',
        
        // Success
        accountCreated: 'Аккаунт успешно создан!',
        signInSuccessful: 'Вход выполнен успешно!',
        passwordResetSent: 'Письмо для сброса пароля отправлено!'
      }
    }
  },
  
  kz: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Басты бет',
        algorithms: 'Алгоритмдер',
        roadmap: 'Жол картасы',
        progress: 'Прогресс',
        chat: 'АИ Чат',
        profile: 'Профиль',
        settings: 'Баптаулар',
        logout: 'Шығу'
      },
      
      // Home/Dashboard
      dashboard: {
        welcome: 'АИ Алгоритмдер Академиясына қош келдіңіз',
        subtitle: 'Интерактивті визуализация арқылы терең оқыту мен машиналық оқытуды үйреніңіз',
        startJourney: 'Оқу сапарын бастау',
        continueLesson: 'Сабақты жалғастыру',
        totalAlgorithms: 'Барлық алгоритмдер',
        completedLessons: 'Аяқталған сабақтар',
        currentStreak: 'Ағымдағы серия',
        weeklyGoal: 'Апталық мақсат',
        featuredAlgorithms: 'Ұсынылған алгоритмдер',
        recentProgress: 'Соңғы прогресс',
        achievements: 'Жетістіктер',
        dailyChallenge: 'Күнделікті сын-тегеурін'
      },
      
      // Algorithms
      algorithms: {
        title: 'АИ Алгоритмдер жинағы',
        categories: {
          deepLearning: 'Терең оқыту',
          machineLearning: 'Машиналық оқыту',
          neuralNetworks: 'Нейрон желілері',
          reinforcement: 'Нығайтумен оқыту',
          computer_vision: 'Компьютерлік көру',
          nlp: 'Табиғи тілді өңдеу',
          optimization: 'Оңтайландыру',
          statistical: 'Статистикалық әдістер'
        },
        difficulty: {
          beginner: 'Бастаушы',
          intermediate: 'Орташа',
          advanced: 'Жоғары',
          expert: 'Сарапшы'
        },
        status: {
          notStarted: 'Басталмаған',
          inProgress: 'Орындалуда',
          completed: 'Аяқталған',
          locked: 'Құлыпталған'
        },
        filters: {
          all: 'Барлығы',
          category: 'Санат',
          difficulty: 'Қиындық',
          status: 'Мәртебе',
          search: 'Алгоритмдерді іздеу...'
        }
      },
      
      // Algorithm Details
      algorithmDetail: {
        overview: 'Шолу',
        visualization: 'Визуализация',
        code: 'Код жүзеге асыру',
        mathematics: 'Математикалық негіздер',
        examples: 'Мысалдар',
        quiz: 'Викторина',
        discussion: 'Талқылау',
        
        // Sections
        description: 'Сипаттама',
        applications: 'Қолданылуы',
        advantages: 'Артықшылықтары',
        disadvantages: 'Кемшіліктері',
        complexity: 'Уақыт пен орын күрделілігі',
        prerequisites: 'Алдын ала талаптар',
        
        // Actions
        startLearning: 'Оқуды бастау',
        continueLesson: 'Сабақты жалғастыру',
        resetProgress: 'Прогрессті тастау',
        markComplete: 'Аяқталған деп белгілеу',
        bookmark: 'Бетбелгі',
        share: 'Бөлісу',
        
        // Progress
        progress: 'Прогресс',
        timeSpent: 'Жұмсалған уақыт',
        accuracy: 'Дәлдік',
        attempts: 'Әрекеттер'
      },
      
      // Roadmap
      roadmap: {
        title: 'Оқу жол картасы',
        subtitle: 'АИ шеберлігіне апаратын жеке жолыңыз',
        phases: {
          foundations: 'Негіздер',
          intermediate: 'Орташа деңгей',
          advanced: 'Жоғары деңгей',
          specialization: 'Мамандандыру',
          research: 'Зерттеу деңгейі'
        },
        estimatedTime: 'Болжамды уақыт',
        prerequisites: 'Алдын ала талаптар',
        skills: 'Үйренетін дағдылар',
        projects: 'Жобалар',
        customizeRoadmap: 'Жол картасын баптау',
        myRoadmap: 'Менің жол картам'
      },
      
      // Progress
      progress: {
        title: 'Оқу прогресі',
        overview: 'Шолу',
        statistics: 'Статистика',
        achievements: 'Жетістіктер',
        streaks: 'Сериялар',
        
        // Stats
        totalTimeSpent: 'Жалпы жұмсалған уақыт',
        algorithmsCompleted: 'Аяқталған алгоритмдер',
        quizzesCompleted: 'Аяқталған викториналар',
        currentLevel: 'Ағымдағы деңгей',
        experiencePoints: 'Тәжірибе ұпайлары',
        globalRank: 'Жаһандық рейтинг',
        
        // Achievements
        achievementUnlocked: 'Жетістік ашылды!',
        viewAllAchievements: 'Барлық жетістіктерді көру',
        
        // Time periods
        today: 'Бүгін',
        thisWeek: 'Осы аптада',
        thisMonth: 'Осы айда',
        allTime: 'Барлық уақыт'
      },
      
      // AI Chat
      chat: {
        title: 'АИ Оқыту көмекшісі',
        placeholder: 'Алгоритмдер, тұжырымдамалар немесе оқу жолы туралы сұрақ қойыңыз...',
        examples: {
          explain: 'Нейрон желілері қалай жұмыс істейтінін түсіндіріңіз',
          help: 'Кері таралуды түсінуге көмектесіңіз',
          quiz: 'Машиналық оқыту тұжырымдамалары бойынша тексеріңіз',
          roadmap: 'Маған жеке оқу жол картасын жасаңыз'
        },
        thinking: 'Ойланып жатыр...',
        error: 'Кешіріңіз, қате орын алды. Қайталап көріңіз.',
        clearChat: 'Чатты тазалау',
        exportChat: 'Чатты экспорттау'
      },
      
      // Common
      common: {
        loading: 'Жүктелуде...',
        error: 'Қате',
        success: 'Сәттілік',
        warning: 'Ескерту',
        info: 'Ақпарат',
        save: 'Сақтау',
        cancel: 'Бас тарту',
        delete: 'Жою',
        edit: 'Өңдеу',
        view: 'Көру',
        close: 'Жабу',
        next: 'Келесі',
        previous: 'Алдыңғы',
        finish: 'Аяқтау',
        retry: 'Қайталау',
        refresh: 'Жаңарту',
        search: 'Іздеу',
        filter: 'Сүзгі',
        sort: 'Сұрыптау',
        export: 'Экспорт',
        import: 'Импорт',
        
        // Time
        seconds: 'секунд',
        minutes: 'минут',
        hours: 'сағат',
        days: 'күн',
        weeks: 'апта',
        months: 'ай',
        years: 'жыл',
        
        // Difficulty
        easy: 'Оңай',
        medium: 'Орташа',
        hard: 'Қиын',
        veryHard: 'Өте қиын'
      },
      
      // Authentication
      auth: {
        signIn: 'Кіру',
        signUp: 'Тіркелу',
        signOut: 'Шығу',
        signInWithGoogle: 'Google арқылы кіру',
        email: 'Email',
        password: 'Пароль',
        confirmPassword: 'Парольді растау',
        forgotPassword: 'Парольді ұмыттыңыз ба?',
        dontHaveAccount: 'Аккаунт жоқ па?',
        alreadyHaveAccount: 'Аккаунт бар ма?',
        createAccount: 'Аккаунт құру',
        resetPassword: 'Парольді қалпына келтіру',
        
        // Errors
        invalidEmail: 'Қате email мекенжайы',
        passwordTooShort: 'Пароль кемінде 6 символдан тұруы керек',
        passwordsDontMatch: 'Парольдер сәйкес келмейді',
        userNotFound: 'Пайдаланушы табылмады',
        wrongPassword: 'Қате пароль',
        emailAlreadyInUse: 'Email қолданыста',
        tooManyRequests: 'Тым көп сұрау. Кейінірек қайталаңыз.',
        
        // Success
        accountCreated: 'Аккаунт сәтті құрылды!',
        signInSuccessful: 'Кіру сәтті аяқталды!',
        passwordResetSent: 'Парольді қалпына келтіру хаты жіберілді!'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    },
  });

export default i18n;
