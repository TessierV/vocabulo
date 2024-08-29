# Vocabulo-junior ML

Ce projet est une API de traitement d'images et de texte pour l'application 
Vocabulo-junior.

## Prérequis

- Python 3.9+
- PostgreSQL 14.12
- Tesseract OCR tesseract v5

## Installation

1. Installez les dépendances :
   ```
   pip install -r requirements.txt
   ```

2. Installez Tesseract OCR :
   - Windows : Téléchargez depuis https://github.com/UB-Mannheim/tesseract/wiki

3. Configurez la base de données :
   - Ajoutez l'extension unaccent : `CREATE EXTENSION IF NOT EXISTS unaccent;`

4. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet

## Structure du projet

- `api/`: Contient les endpoints FastAPI
- `core/`: Logique métier principale
- `models/`: Modèles de ML et configurations
- `tests/`: Tests unitaires et d'intégration
- `config.py`: Configuration globale du projet

## Exécution

Pour lancer l'API :
```
uvicorn api.main:app --reload
```

## Tests

Pour exécuter les tests :
```
python -m unittest discover tests
```

## Contribution

Marianne Arrué 

