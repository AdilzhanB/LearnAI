import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language resources
const resources: any = {
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
        dailyChallenge: 'Daily Challenge',
        startNewLesson: 'Start New Lesson',
        reviewProgress: 'Review Progress',
        viewRoadmap: 'View Roadmap',
        viewFullRoadmap: 'View Full Roadmap',
        learningPath: 'Learning Path',
        recommendedForYou: 'Recommended for You',
        recentActivity: 'Recent Activity',
        viewAllActivity: 'View All Activity',
        continueLearning: 'Continue Learning',
        quickActions: 'Quick Actions',
        learningStats: 'Learning Stats',
        totalHours: 'Total Hours',
        avgSessionTime: 'Avg Session Time',
        completionRate: 'Completion Rate',
        viewAll: 'View All',
        globalRank: 'Global Rank',
        dayStreak: 'Day Streak',
        points: 'Points',
        learningTime: 'Learning Time',
        weeklyProgress: 'Weekly Progress',
        achievementUnlocked: 'Achievement Unlocked!',
        startLearning: 'Start Learning',
        continueAlgorithm: 'Continue'
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
        exercises: 'Practice Exercises',
        resources: 'Additional Resources',
        startLearning: 'Start Learning',
        description: 'Description',
        learningObjectives: 'Learning Objectives',
        applications: 'Applications',
        prerequisites: 'Prerequisites',
        interactiveVisualization: 'Interactive Visualization',
        mathematicalFoundation: 'Mathematical Foundation',
        keyFormulas: 'Key Formulas',
        keyConcepts: 'Key Concepts',
        practiceExercises: 'Practice Exercises',
        additionalResources: 'Additional Resources',
        relatedAlgorithms: 'Related Algorithms',
        algorithmStats: 'Algorithm Statistics',
        popularity: 'Popularity',
        completionRate: 'Completion Rate',
        lastUpdated: 'Last Updated',
        completion: 'Completion',
        timeSpent: 'Time Spent'
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
        cancel: 'Cancel',
        confirm: 'Confirm',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        view: 'View',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        export: 'Export',
        import: 'Import',
        download: 'Download',
        upload: 'Upload',
        copy: 'Copy',
        paste: 'Paste',
        cut: 'Cut',
        undo: 'Undo',
        redo: 'Redo',
        refresh: 'Refresh',
        reset: 'Reset',
        clear: 'Clear',
        close: 'Close',
        open: 'Open',
        maximize: 'Maximize',
        minimize: 'Minimize',
        play: 'Play',
        pause: 'Pause',
        stop: 'Stop',
        nextStep: 'Next Step',
        previousStep: 'Previous Step',
        restart: 'Restart',
        continue: 'Continue',
        start: 'Start',
        finish: 'Finish',
        complete: 'Complete',
        incomplete: 'Incomplete',
        progress: 'Progress',
        status: 'Status',
        priority: 'Priority',
        category: 'Category',
        tags: 'Tags',
        rating: 'Rating',
        reviews: 'Reviews',
        comments: 'Comments',
        feedback: 'Feedback',
        help: 'Help',
        support: 'Support',
        documentation: 'Documentation',
        tutorial: 'Tutorial',
        guide: 'Guide',
        example: 'Example',
        demo: 'Demo',
        preview: 'Preview',
        settings: 'Settings',
        preferences: 'Preferences',
        profile: 'Profile',
        account: 'Account',
        login: 'Login',
        logout: 'Logout',
        register: 'Register',
        signup: 'Sign Up',
        signin: 'Sign In',
        username: 'Username',
        password: 'Password',
        email: 'Email',
        name: 'Name',
        firstName: 'First Name',
        lastName: 'Last Name',
        phone: 'Phone',
        address: 'Address',
        country: 'Country',
        city: 'City',
        zipCode: 'ZIP Code',
        language: 'Language',
        theme: 'Theme',
        notifications: 'Notifications',
        privacy: 'Privacy',
        security: 'Security',
        terms: 'Terms',
        conditions: 'Conditions',
        policy: 'Policy',
        about: 'About',
        contact: 'Contact',
        version: 'Version',
        license: 'License',
        copyright: 'Copyright',
        allRightsReserved: 'All Rights Reserved',
        backToAlgorithms: 'Back to Algorithms',
        startExercise: 'Start Exercise'
      },
      
      // Errors
      errors: {
        generic: 'An error occurred. Please try again.',
        networkError: 'Network error. Please check your connection.',
        notFound: 'Page not found.',
        unauthorized: 'You are not authorized to access this page.',
        forbidden: 'Access denied.',
        serverError: 'Server error. Please try again later.',
        validationError: 'Please check your input and try again.',
        algorithmNotFound: 'Algorithm Not Found',
        algorithmNotFoundDesc: 'The algorithm you are looking for could not be found.'
      },
      
      // Success messages
      success: {
        saved: 'Successfully saved!',
        updated: 'Successfully updated!',
        deleted: 'Successfully deleted!',
        created: 'Successfully created!',
        uploaded: 'Successfully uploaded!',
        downloaded: 'Successfully downloaded!',
        copied: 'Successfully copied!',
        sent: 'Successfully sent!',
        loggedIn: 'Successfully logged in!',
        loggedOut: 'Successfully logged out!',
        registered: 'Successfully registered!'
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
        dailyChallenge: 'Дневной вызов',
        startNewLesson: 'Начать новый урок',
        reviewProgress: 'Просмотр прогресса',
        viewRoadmap: 'Просмотр дорожной карты',
        viewFullRoadmap: 'Полная дорожная карта',
        learningPath: 'Путь обучения',
        recommendedForYou: 'Рекомендуется для вас',
        recentActivity: 'Недавняя активность',
        viewAllActivity: 'Посмотреть всю активность',
        continueLearning: 'Продолжить обучение',
        quickActions: 'Быстрые действия',
        learningStats: 'Статистика обучения',
        totalHours: 'Общее время',
        avgSessionTime: 'Среднее время сессии',
        completionRate: 'Процент завершения',
        viewAll: 'Посмотреть все',
        globalRank: 'Глобальный рейтинг',
        dayStreak: 'Дневная серия',
        points: 'Очки',
        learningTime: 'Время обучения',
        weeklyProgress: 'Недельный прогресс',
        achievementUnlocked: 'Достижение разблокировано!',
        startLearning: 'Начать обучение',
        continueAlgorithm: 'Продолжить'
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
        mathematics: 'Математическая основа',
        examples: 'Примеры',
        exercises: 'Практические упражнения',
        resources: 'Дополнительные ресурсы',
        startLearning: 'Начать обучение',
        description: 'Описание',
        learningObjectives: 'Цели обучения',
        applications: 'Применения',
        prerequisites: 'Предварительные условия',
        interactiveVisualization: 'Интерактивная визуализация',
        mathematicalFoundation: 'Математическая основа',
        keyFormulas: 'Ключевые формулы',
        keyConcepts: 'Ключевые концепции',
        practiceExercises: 'Практические упражнения',
        additionalResources: 'Дополнительные ресурсы',
        relatedAlgorithms: 'Связанные алгоритмы',
        algorithmStats: 'Статистика алгоритма',
        popularity: 'Популярность',
        completionRate: 'Процент завершения',
        lastUpdated: 'Последнее обновление',
        completion: 'Завершение',
        timeSpent: 'Время потрачено'
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
        success: 'Успешно',
        cancel: 'Отменить',
        confirm: 'Подтвердить',
        save: 'Сохранить',
        edit: 'Редактировать',
        delete: 'Удалить',
        view: 'Просмотреть',
        back: 'Назад',
        next: 'Далее',
        previous: 'Предыдущий',
        search: 'Поиск',
        filter: 'Сүзгі',
        sort: 'Сортировать',
        export: 'Экспорт',
        import: 'Импорт',
        download: 'Скачать',
        upload: 'Загрузить',
        copy: 'Копировать',
        paste: 'Вставить',
        cut: 'Вырезать',
        undo: 'Отменить',
        redo: 'Повторить',
        refresh: 'Обновить',
        reset: 'Сбросить',
        clear: 'Очистить',
        close: 'Закрыть',
        open: 'Открыть',
        maximize: 'Развернуть',
        minimize: 'Свернуть',
        play: 'Воспроизвести',
        pause: 'Пауза',
        stop: 'Стоп',
        nextStep: 'Следующий шаг',
        previousStep: 'Предыдущий шаг',
        restart: 'Перезапустить',
        continue: 'Продолжить',
        start: 'Начать',
        finish: 'Закончить',
        complete: 'Завершить',
        incomplete: 'Не завершено',
        progress: 'Прогресс',
        status: 'Статус',
        priority: 'Приоритет',
        category: 'Категория',
        tags: 'Теги',
        rating: 'Рейтинг',
        reviews: 'Отзывы',
        comments: 'Комментарии',
        feedback: 'Обратная связь',
        help: 'Помощь',
        support: 'Поддержка',
        documentation: 'Документация',
        tutorial: 'Учебник',
        guide: 'Руководство',
        example: 'Пример',
        demo: 'Демо',
        preview: 'Предпросмотр',
        settings: 'Настройки',
        preferences: 'Предпочтения',
        profile: 'Профиль',
        account: 'Аккаунт',
        login: 'Вход',
        logout: 'Выход',
        register: 'Регистрация',
        signup: 'Регистрация',
        signin: 'Вход',
        username: 'Имя пользователя',
        password: 'Пароль',
        email: 'Электронная почта',
        name: 'Имя',
        firstName: 'Имя',
        lastName: 'Фамилия',
        phone: 'Телефон',
        address: 'Адрес',
        country: 'Страна',
        city: 'Город',
        zipCode: 'Почтовый индекс',
        language: 'Язык',
        theme: 'Тема',
        notifications: 'Уведомления',
        privacy: 'Конфиденциальность',
        security: 'Безопасность',
        terms: 'Условия',
        conditions: 'Условия',
        policy: 'Политика',
        about: 'О нас',
        contact: 'Контакт',
        version: 'Версия',
        license: 'Лицензия',
        copyright: 'Авторские права',
        allRightsReserved: 'Все права защищены',
        backToAlgorithms: 'Назад к алгоритмам',
        startExercise: 'Начать упражнение'
      },
      
      // Errors
      errors: {
        generic: 'Произошла ошибка. Пожалуйста, попробуйте еще раз.',
        networkError: 'Ошибка сети. Пожалуйста, проверьте подключение.',
        notFound: 'Страница не найдена.',
        unauthorized: 'У вас нет прав доступа к этой странице.',
        forbidden: 'Доступ запрещен.',
        serverError: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
        validationError: 'Пожалуйста, проверьте ваши данные и попробуйте еще раз.',
        algorithmNotFound: 'Алгоритм не найден',
        algorithmNotFoundDesc: 'Алгоритм, который вы ищете, не найден.'
      },
      
      // Success messages
      success: {
        saved: 'Успешно сохранено!',
        updated: 'Успешно обновлено!',
        deleted: 'Успешно удалено!',
        created: 'Успешно создано!',
        uploaded: 'Успешно загружено!',
        downloaded: 'Успешно скачано!',
        copied: 'Успешно скопировано!',
        sent: 'Успешно отправлено!',
        loggedIn: 'Успешный вход!',
        loggedOut: 'Успешный выход!',
        registered: 'Успешная регистрация!'
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
        dailyChallenge: 'Күнделікті сын-тегеурін',
        startNewLesson: 'Жаңа сабақ бастау',
        reviewProgress: 'Прогрессті қарау',
        viewRoadmap: 'Жол картасын қарау',
        viewFullRoadmap: 'Толық жол картасы',
        learningPath: 'Оқу жолы',
        recommendedForYou: 'Сізге ұсынылады',
        recentActivity: 'Соңғы әрекеттер',
        viewAllActivity: 'Барлық әрекеттерді қарау',
        continueLearning: 'Оқуды жалғастыру',
        quickActions: 'Жылдам әрекеттер',
        learningStats: 'Оқу статистикасы',
        totalHours: 'Жалпы уақыт',
        avgSessionTime: 'Орташа сессия уақыты',
        completionRate: 'Аяқтау пайызы',
        viewAll: 'Барлығын қарау',
        globalRank: 'Жаһандық рейтинг',
        dayStreak: 'Күндік серия',
        points: 'Ұпайлар',
        learningTime: 'Оқу уақыты',
        weeklyProgress: 'Апталық прогресс',
        achievementUnlocked: 'Жетістік ашылды!',
        startLearning: 'Оқуды бастау',
        continueAlgorithm: 'Жалғастыру'
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
        exercises: 'Практикалық жаттығулар',
        resources: 'Қосымша ресурстар',
        startLearning: 'Оқуды бастау',
        description: 'Сипаттама',
        learningObjectives: 'Оқыту мақсаттары',
        applications: 'Қолданылуы',
        prerequisites: 'Алдын ала талаптар',
        interactiveVisualization: 'Интерактивті визуализация',
        mathematicalFoundation: 'Математикалық негіз',
        keyFormulas: 'Негізгі формулалар',
        keyConcepts: 'Негізгі концепциялар',
        practiceExercises: 'Практикалық жаттығулар',
        additionalResources: 'Қосымша ресурстар',
        relatedAlgorithms: 'Ұқсас алгоритмдер',
        algorithmStats: 'Алгоритм статистикасы',
        popularity: 'Популярлық',
        completionRate: 'Аяқтау пайызы',
        lastUpdated: 'Соңғы жаңарту',
        completion: 'Аяқтау',
        timeSpent: 'Жұмсалған уақыт'
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
        cancel: 'Бас тарту',
        confirm: 'Растау',
        save: 'Сақтау',
        edit: 'Өңдеу',
        delete: 'Жою',
        view: 'Көру',
        back: 'Артқа',
        next: 'Келесі',
        previous: 'Алдыңғы',
        search: 'Іздеу',
        filter: 'Сүзгі',
        sort: 'Сұрыптау',
        export: 'Экспорт',
        import: 'Импорт',
        download: 'Жүктеу',
        upload: 'Жүктеу',
        copy: 'Көшіру',
        paste: 'Қою',
        cut: 'Кесіп алу',
        undo: 'Артқа қайтару',
        redo: 'Алға қайтару',
        refresh: 'Жаңарту',
        reset: 'Бастапқы қалпына келтіру',
        clear: 'Тазалау',
        close: 'Жабу',
        open: 'Ашу',
        maximize: 'Үлкейту',
        minimize: 'Кішірейту',
        play: 'Ойнату',
        pause: 'Тоқтату',
        stop: 'Стоп',
        nextStep: 'Келесі қадам',
        previousStep: 'Алдыңғы қадам',
        restart: 'Қайта бастау',
        continue: 'Жалғастыру',
        start: 'Бастау',
        finish: 'Аяқтау',
        complete: 'Аяқтау',
        incomplete: 'Незавершенный',
        progress: 'Прогресс',
        status: 'Мәртебе',
        priority: 'Приоритет',
        category: 'Санат',
        tags: 'Тэгтер',
        rating: 'Бағалау',
        reviews: 'Пікірлер',
        comments: 'Пікірлер',
        feedback: 'Кері байланыс',
        help: 'Көмек',
        support: 'Қолдау',
        documentation: 'Құжаттама',
        tutorial: 'Оқыту',
        guide: 'Нұсқаулық',
        example: 'Мысал',
        demo: 'Демо',
        preview: 'Алдын ала қарау',
        settings: 'Баптаулар',
        preferences: 'Таңдаулар',
        profile: 'Профиль',
        account: 'Аккаунт',
        login: 'Кіру',
        logout: 'Шығу',
        register: 'Тіркелу',
        signup: 'Аккаунт құру',
        signin: 'Кіру',
        username: 'Пайдаланушы аты',
        password: 'Пароль',
        email: 'Email',
        name: 'Аты',
        firstName: 'Аты',
        lastName: 'Тегі',
        phone: 'Телефон',
        address: 'Мекенжай',
        country: 'Ел',
        city: 'Қала',
        zipCode: 'Почта индексі',
        language: 'Тіл',
        theme: 'Тема',
        notifications: 'Хабарламалар',
        privacy: 'Жекелік',
        security: 'Қауіпсіздік',
        terms: 'Шарттар',
        conditions: 'Жағдайлар',
        policy: 'Саясат',
        about: 'Біз туралы',
        contact: 'Байланыс',
        version: 'Нұсқа',
        license: 'Лицензия',
        copyright: 'Авторлық құқық',
        allRightsReserved: 'Барлық құқықтар қорғалған',
        backToAlgorithms: 'Алгоритмдерге оралу',
        startExercise: 'Жаттығуды бастау'
      },
      
      // Errors
      errors: {
        generic: 'Қате орын алды. Қайталап көріңіз.',
        networkError: 'Желілік қате. Қосылымыңызды тексеріңіз.',
        notFound: 'Бет табылмады.',
        unauthorized: 'Сізде осы бетке кіруге рұқсат жоқ.',
        forbidden: 'Кіруге тыйым салынған.',
        serverError: 'Серверде қате пайда болды. Кейінірек қайталап көріңіз.',
        validationError: 'Кірісіңізді тексеріңіз және қайтадан көріңіз.',
        algorithmNotFound: 'Алгоритм табылмады',
        algorithmNotFoundDesc: 'Сіз іздеп отырған алгоритм табылмады.'
      },
      
      // Success messages
      success: {
        saved: 'Сәтті сақталды!',
        updated: 'Сәтті жаңартылды!',
        deleted: 'Сәтті жойылды!',
        created: 'Сәтті құрылды!',
        uploaded: 'Сәтті жүктелді!',
        downloaded: 'Сәтті жүктелді!',
        copied: 'Сәтті көшірілді!',
        sent: 'Сәтті жіберілді!',
        loggedIn: 'Сәтті кірді!',
        loggedOut: 'Сәтті шықты!',
        registered: 'Сәтті тіркелді!'
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
