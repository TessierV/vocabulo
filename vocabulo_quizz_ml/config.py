"""
This module contains the configuration settings for the VocabuloQuizz application.

The module includes the following configurations:
- Database connection parameters.

Dependencies:
- os: Provides a way of using operating system dependent functionality.
- dotenv: Loads environment variables from a .env file.

Variables:
- DB_PARAMS (dict): Contains the database connection parameters.

Example usage:
    To access the database parameters, import the module and use the `DB_PARAMS` variable:

    from config import DB_PARAMS

    dbname = DB_PARAMS['dbname']
    user = DB_PARAMS['user']

Author: Marianne Arrué
Date: 05/09/25
"""

import os
from dotenv import load_dotenv

# load environment variable
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

# BDD configuration
DB_PARAMS = {
    'dbname': os.getenv('POSTGRES_DB'),  # Base name
    'user': os.getenv('POSTGRES_USER'),  # User name
    'password': os.getenv('POSTGRES_PASSWORD'),  # Password
    'host': os.getenv('DB_HOST', 'db'),  # Host
    'port': '5432'  # Port
}

# Chemin du modèle
MODEL_PATH_PREFIX = os.path.abspath(os.path.join(os.path.dirname(__file__), "models"))

