"""
Module for testing the loading of machine learning models in the Vocabulo Quizz application.

This module uses the joblib library to load the preprocessor and classifier models from the specified directory.

Modules:
    joblib: Provides functions for serializing and deserializing Python objects.
    os: Provides a way of using operating system dependent functionality.

Functions:
    test_model_loading(): Tests the loading of the preprocessor and classifier models.

Author: Marianne Arrué
Date: 08/09/24
"""

import joblib
import os

OUTPUT_DIR = '../models'

def test_model_loading():
    """
    Tests the loading of the preprocessor and classifier models.

    This function attempts to load the preprocessor and classifier models from the specified directory
    and prints their types if successful. If there is an error during loading, it prints the error message.

    Returns:
        bool: True if both models are loaded successfully, False otherwise.
    """
    try:
        preprocessor = joblib.load(os.path.join(OUTPUT_DIR, 'preprocessor.joblib'))
        classifier = joblib.load(os.path.join(OUTPUT_DIR, 'classifier.joblib'))
        print("Preprocessor loaded :", type(preprocessor))
        print("Classifier loaded:", type(classifier))
        return True
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return False

if __name__ == "__main__":
    if test_model_loading():
        print("Model loaded successfully.")
    else:
        print("Model loading failed.")