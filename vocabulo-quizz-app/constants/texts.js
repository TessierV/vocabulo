// src/constants/texts.js
import { interfaceIcons, themes } from '@/constants/svg';
import InterfaceSvg from '@/SVG/InterfaceSvg';

// home export text
export const home = {
    header: {
        title: 'Bienvenue',
    },
    slider: {
        slider1: {
            title: 'Bienvenue',
            description: 'Explorez des quizz pour enrichir votre vocabulaire au quotidien.',
        },
        slider2: {
            title: 'Bêta',
            description: 'Application en Développement Notre aventure ne fait que commencer !',
        },
        slider3: {
            title: 'Nouveauté',
            description: 'Faites fleurir vos connaissances ! Testez-vous avec notre nouveau quizz sur le thème des fleurs',
        },
    },
    section: {
        title: 'Exercice',
        row1: {
            text: 'Basique',
            route: '/category',
        },
        row2: {
            text: 'Hybride',
            route: '/game',
        },
        row3: {
            text: 'Personalisé',
            route: '/customize',
        },
        row4: {
            text: 'Random',
            route: '/random',
        },
    },
    section2: {
        title: 'Thèmatique',
        subtitle: 'Information',
        popup: {
            title: 'Information',
            text: 'Parcourez les thèmes, sélectionnez ceux qui vous intéressent, et plongez dans un monde d\'apprentissage adapté à vos besoins.',
            button: 'Fermer',
        },
    },
};

// Basic export text
export const basic = {
    header: {
        title: 'Basique',
    },
    slider: {
        slider1: {
            title: 'Basique',
            description: 'Plongez dans un monde de mots essentiels, accessible à tous',
        },
        slider2: {
            title: 'Annonce',
            description: 'Profitez des thèmes illustrés, variés comme Fleurs, Musique, et bien d\'autres à venir prochainement !',
        },
        slider3: {
            title: 'Nouveauté',
            description: 'Faites fleurir vos connaissances ! Testez-vous avec notre nouveau quizz sur le thème des fleurs',
        },
    },
    section: {
        textinput: 'Recherche un thème...',
        row1: 'Tout',
        row2: "Facile",
        row3: "Moyen",
        row4: "Difficile",
    },
    section2: {
        title: 'Thèmatique',
        title2: 'Bientôt',
        subtitle2: 'Information',
        popup2: {
            title: 'Information',
            text: 'Il n\'y a actuellement pas assez de mots dans cette catégorie.\n\nCependant, de nouveaux contenus sont en cours de préparation et devraient être disponibles prochainement.\n\nMerci de votre patience !',
            button: 'Fermer',
        },
        row: 'mots',

    },
    error: "Erreur : Aucune thématique trouvée",
    modal: {
        title: "Récapitulatif",
        subtitle: "Vous allez commencer avec ce thème :",
        descriptif: "",
        button: "Commencer",
    },
};

// Basic export text
export const ai = {
    header: {
        title: 'HybridRec',
    },
    slider: {
        slider1: {
            title: 'HybridRec',
            description: 'Bienvenue sur la page du Quiz IA personnalisé. Grâce à l\'intelligence artificielle, chaque quiz est adapté à ton niveau et à tes préférences d\'apprentissage.',
            button: 'En savoir plus',
        },
    },
    section: {
        title: 'n°',
    },

    modal: {
        title: "Récapitulatif",
        subtitle: "Vous allez commencer avec ce thème :",
        descriptif: "",
        button: "Commencer",
    },
    explanation: {
        title: "Explication",
        row1: {
            title: "Apprentissage personnalisé :",
            descrsiption: "Analyse ton historique et ajuste ton niveau.",
        },
        row2: {
            title: "Adaptation au contexte :",
            description: "Propose des mots selon l’heure et la saison.",
        },
        row3: {
            title: "Équilibre de difficulté :",
            description: "Ajuste la difficulté selon ton niveau.",
        },
        row4: {
            title: "Facteur de nouveauté :",
            description: "Introduit des mots nouveaux tout en révisant les anciens.",
        },
        row5: {
            title: "Feedback intégré :",
            description: "S’ajuste selon tes retours sur la difficulté.",
        },
        button: "Fermer",
    },

    saveButton: {
        title: "Reprendre le quiz",
        subtitle: "Expire à:",
    },

    renderQuestion: "Question",

    container: {
        title: "Reprendre le quizz",
        subtitle: "Expire à: ",
        errorsave: "Aucune progression enregistrée",
        errornosave: "Vous n'avez aucune progression enregistrée pour ce quiz.",
    },
};

// Basic export text
export const dictionary = {
    header: {
        title: 'Dictionnaire',
    },
    slider: {
        slider1: {
            title: 'Dictionnaire :',
            description: 'Plongez dans un monde de mots essentiels, accessibles à tous',
            button: 'En savoir plus',
        },
        slider2: {
            title: 'Palette',
            description: 'Changement de palette pour des adaptée aux Daltoniens',
            button: 'En savoir plus',
        },
    },
    input: "Rechercher un mot...",
    wordSuggestion: {
        none: "Pas de suggestions trouvées",
        suggestion: " Suggestions : ",
        therme: "Therme : ",
    },
    card: {
        def: "Définition:",
        url_sign: "Signe",
        url_def: "Définition LSF",
    },
};


export const texts = {
    sectionTitle: {
        icons: interfaceIcons.question,
    },

    homeScreen: {
        bigTitle: {
            title: 'Bonjour',
            text: 'User',
        },
        slider: {
            weeklyOverview: {
                title: 'Semainier',
                popup: {
                    title: 'Semainier',
                    text: 'Le "Semainier" est un récapitulatif hebdomadaire des objectifs atteints',
                    button: 'Fermer',
                },

                icons: {
                    /*past: interfaceIcons.gradient.shell,*/
                    past: interfaceIcons.gradient.fishbone,
                    futur: interfaceIcons.gradient.fish,
                    today: interfaceIcons.gradient.poulpi,
                },
            },
            dailyGoals: {
                title: 'Objectif du jour',
                popup: {
                    title: 'À propos',
                    text: 'Ceci est une explication détaillée apparaissant dans le pop-up Home Slider 2 lorsque vous cliquez sur l`\'icône.',
                    button: 'Fermer',
                },
                column: {
                    firstColumn: 'Finis',
                    secondColumn: 'Facile',
                    thirdColumn: 'Moyen',
                    fourColumn: 'Difficile',
                },

            },
        },
        section: {
            title: 'Exercice',
            text: 'aide',
            popup: {
                title: 'À propos',
                text: 'Ceci est une explication détaillée apparaissant dans le pop-up Home Exercice lorsque vous cliquez sur l`\'icône.',
                button: 'Fermer',
            },

            categoryGrid: {
                column1: {
                    title: 'Categorie',
                    svg: interfaceIcons.category,
                    route: '/category',
                },
                column2: {
                    title: 'Personnalisé',
                    svg: interfaceIcons.personalized,
                    route: '/customize',
                },
                column3: {
                    title: 'Aléatoire',
                    svg: interfaceIcons.random,
                    route: '/random',
                },
                column4: {
                    title: 'Dictionnaire',
                    svg: interfaceIcons.dictionary,
                    route: '/dictionary',
                },
            },
        },

        section_second: {
            title: 'Populaire',
            text: 'aide',
            popup: {
                title: 'À propos',
                text: 'Ceci est une explication détaillée apparaissant dans le pop-up Home Populaire lorsque vous cliquez sur l`\'icône.',
                button: 'Fermer',
            },

        },
    },

    categoryScreen: {
        selectDifficulty: {
            title: 'Difficulté',
            popup: {
                title: 'Difficulter',
                text: 'Ceci est une explication détaillée apparaissant dans le pop-up difficulté lorsque vous cliquez sur l`\'icône.',
                button: 'Fermer',
            },
            levelDifficulty: {
                easy: {
                    svg: interfaceIcons.gradient.starsOne,
                    textLabel: 'Facile',
                    level: 'Easy',
                },
                middle: {
                    svg: interfaceIcons.gradient.starsTwo,
                    textLabel: 'Moyen',
                    level: 'Middle',
                },
                hard: {
                    svg: interfaceIcons.gradient.starsThird,
                    textLabel: 'Difficile',
                    level: 'Hard',
                },
                all: {
                    textLabel: 'Tout',
                    level: 'All',
                },
            },

        },

        Category: {
            title: 'Catégories',
            text: 'aide',
            popup: {
                title: 'Categories',
                text: 'Ceci est une explication détaillée apparaissant dans le pop-up categorie lorsque vous cliquez sur l`\'icône.',
                button: 'Fermer',
            },
        },

    },

    profilScreen: {
        banner: {
            title: 'Titre Profil bannière',
            text: 'Je suis le texte de la bannière Profil',
            popup: {
                title: 'À propos',
                text: 'Ceci est une explication détaillée apparaissant dans le pop-up Profil lorsque vous cliquez sur l`\'icône.',
                button: 'Fermer',
            },
        },
        section: {
            title: 'Profil Titre Section',
            editProfile: "Profil modification",
            changePassword: "Changer de mot de passe",
        },
    },

    parameterScreen: {
        banner: {
            title: 'Titre Parametres bannière',
            text: 'Je suis le texte de la bannière Parametres',
            popup: {
                title: 'À propos',
                text: 'Ceci est une explication détaillée apparaissant dans le pop-up Paramètres lorsque vous cliquez sur l`\'icône.',
                button: 'Fermer',
            },
        },
        section: {
            title: 'Profil',
            editProfile: "Modifier le profil",
            changePassword: "Modifier le mot de passe",
        },

        section_second: {
            title: 'Personnalisation',
            themeLight: "Thème clair",
            themeDark: "Thème sombre",
            sizeText: "Taille de texte",
        },

        section_third: {
            title: 'Settings',
            ask: "FAQ",
            contact: "Contactez-nous",
            version: "Version",
        },
    },

    categories: [
        {
            id: 11,
            icon: themes.work,
            textLabel: 'Bureau',
            difficulty: 'easy',
            ratio: '50/100',
            route: '/game',
        },
        {
            id: 10,
            icon: themes.organ,
            textLabel: 'Organe',
            difficulty: 'hard',
            ratio: '70/100',
            route: '/game',
        },
        {
            id: 9,
            icon: themes.car,
            textLabel: 'Véhicules',
            difficulty: 'easy',
            ratio: '70/100',
            route: '/game',
        },
        {
            id: 8,
            icon: themes.vegetables,
            textLabel: 'Légumes',
            difficulty: 'middle',
            ratio: '70/100',
            route: '/game',
        },
        {
            id: 7,
            icon: themes.umbrella,
            textLabel: 'Temps',
            difficulty: 'middle',
            ratio: '70/100',
            route: '/game',
        },
        {
            id: 6,
            icon: themes.breakfast,
            textLabel: 'Matin',
            difficulty: 'easy',
            ratio: '70/100',
            route: '/game',
        },
        {
            id: 5,
            icon: themes.gardening,
            textLabel: 'Jardin',
            difficulty: 'hard',
            ratio: '50/100',
            route: '/random',
        },
        {
            id: 4,
            icon: themes.alimentation,
            textLabel: 'Alimentation',
            difficulty: 'easy',
            ratio: '70/100',
            route: '/game',
        },
        {
            id: 3,
            icon: themes.umbrella,
            textLabel: 'Temps',
            difficulty: 'hard',
            ratio: '70/100',
            route: '/game',
        },
        {
            id: 2,
            icon: themes.bed,
            textLabel: 'Chambre',
            difficulty: 'middle',
            ratio: '50/100',
            route: '/game',
        },
        {
            id: 1,
            icon: themes.coffeeLatte,
            textLabel: 'Barista',
            difficulty: 'easy',
            ratio: '100/100',
            route: '/random', // Mise à jour de la route pour Barista
        },
    ],
};
