// src/constants/texts.js
import {interfaceIcons, themes} from '@/constants/svg';


export const texts = {
    sectionTitle:{
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

        Category:{
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
            ratio: '30/100',
            route: '/random', // Mise à jour de la route pour Barista
        },
    ],
};
