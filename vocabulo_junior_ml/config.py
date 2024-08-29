"""
This module contains the configuration settings for the VocabuloKid application.

The module includes the following configurations:
- Database connection parameters.
- Tesseract OCR settings.
- Other application settings.

Dependencies:
- os: Provides a way of using operating system dependent functionality.
- dotenv: Loads environment variables from a .env file.

Variables:
- DB_PARAMS (dict): Contains the database connection parameters.
- TESSERACT_CMD (str): Path to the Tesseract executable.
- TESSDATA_PREFIX (str): Path to the OCR fine-tuned model.
- FINETUNED_MODEL (str): Name of the fine-tuned model.
- MAX_IMAGE_SIZE (int): Maximum size for images.

Example usage:
    To access the database parameters, import the module and use the `DB_PARAMS` variable:

    from config import DB_PARAMS

    dbname = DB_PARAMS['dbname']
    user = DB_PARAMS['user']

Author: Marianne Arrué
Date: 29/08/24
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
    'host': 'localhost',  # Host
    'port': '5432'  # Port
}

# Tesseract configuration
TESSERACT_CMD = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # path executable Tesseract
TESSDATA_PREFIX = os.path.abspath(os.path.join(os.path.dirname(__file__), "models"))  # path ocr fine-tuned model
FINETUNED_MODEL = "fra"  # name fine-tuned model

# other configurations
MAX_IMAGE_SIZE = 1600  # max size for image
