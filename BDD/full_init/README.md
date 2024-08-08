# LSF App - Initialisation Complète de la Base de Données

Ce dossier contient tous les éléments nécessaires pour initialiser complètement la base de données LSF App
à partir de zéro. Cette configuration est principalement destinée aux administrateurs et aux développeurs 
qui ont besoin de comprendre ou de modifier la structure de base de la base de données.

## Structure du Dossier

```
full_init/
├── sql/
│   ├── 01_schema.sql
│   ├── 02_static_data.sql
│   ├── 03_import_data_csv.sql
│   └── ... (autres scripts SQL)
├── docker-compose.yml
├── .env.example
└── README.md (ce fichier)
```

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Accès aux fichiers de données (non inclus dans ce dépôt pour des raisons de sécurité et de taille)

## Configuration

1. Copiez `.env.example` vers `.env` et modifiez les valeurs selon vos besoins :
   ```
   cp .env.example .env
   ```

2. Placez les fichiers de données nécessaires (CSV, JSON, etc.) dans un dossier `data/` à la racine de `full_init/` (ce dossier n'est pas versionné).

## Initialisation de la Base de Données

1. Lancez les conteneurs Docker :
   ```
   docker-compose up -d
   ```

## Scripts SQL

Les scripts SQL dans le dossier `sql/` sont exécutés dans l'ordre alphabétique/numérique :

- `01_schema.sql` : Crée la structure de la base de données (tables, contraintes, etc.)
- `02_static_data.sql` : Insère les données statiques (catégories, etc.)
- `03_import_data_csv.sql` : Contient les instructions pour importer les données depuis les fichiers csv
- `04_import_freq.sql` : Importe des données de fréquences dans les livres, films, manuels scolaires de certains mots
- `05_import_list_by_echelon.sql`: Importe les listes de mots qui ont un échelon de Dubois Buyse défini
- `06_score_diff.sql`: Fonction pour calculer un score de difficulté pour chaque mot en fonction des données disponibles (échelon, fréquence, nombre de syllabes)
- `07_catégories_import.sql`: Création de catégories et sous catégories de mots via un json
- `08_create_user.sql`: Creation des différents utilisateurs pour la collaboration via la BDD

## Maintenance et Mises à Jour

Pour modifier la structure de la base de données ou les données initiales :

1. Modifiez les scripts SQL appropriés dans le dossier `sql/`
2. Relancez l'initialisation complète pour tester vos modifications
```
    docker-compose down -v
    docker-compose up -d
   ```

## Sécurité

- Le fichier `.env` contient des informations sensibles et ne doit jamais être commité dans le dépôt Git
- Les fichiers de données ne sont pas versionnés et doivent être gérés séparément de manière sécurisée

## Utilisation en Production

Cette configuration est principalement destinée au développement et aux tests. Pour une utilisation en production :

- Renforcez la sécurité des conteneurs Docker
- Utilisez des secrets Docker ou un gestionnaire de secrets pour les informations sensibles
- Configurez des sauvegardes régulières
- Mettez en place un monitoring approprié

## Support

Pour toute question ou problème concernant l'initialisation complète de la base de données, veuillez contacter l'équipe de développement.