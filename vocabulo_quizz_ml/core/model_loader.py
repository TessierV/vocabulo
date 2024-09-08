"""
Module for loading the machine learning model in the Vocabulo Quizz application.

This module provides a function to load the preprocessor and classifier models using joblib and create a pipeline.

Modules:
    os: Provides a way of using operating system dependent functionality.
    joblib: Provides lightweight pipelining in Python.
    sklearn.pipeline: Provides the Pipeline class for chaining estimators.
    config: Contains the model path configuration parameters.
    logging: Provides a way to configure and use logging in the application.

Functions:
    load_model(): Loads the preprocessor and classifier models and creates a pipeline.

Author: Marianne Arrué
Date: 07/09/24
"""

import os
import joblib
from sklearn.pipeline import Pipeline
from config import MODEL_PATH_PREFIX
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_model():
    """
    Loads the preprocessor and classifier models and creates a pipeline.

    Attempts to load the preprocessor and classifier models from the specified paths,
    creates a pipeline with the loaded models, and returns the pipeline.

    Returns:
        sklearn.pipeline.Pipeline: A pipeline object containing the preprocessor and classifier.

    Raises:
        Exception: If there is an error during the model loading process.
    """
    logger.info(f"Attempt to load the model from : {MODEL_PATH_PREFIX}")

    try:
        logging.info(f"Loading the preprocessor from {os.path.join(MODEL_PATH_PREFIX, 'preprocessor.joblib')}")
        preprocessor = joblib.load(os.path.join(MODEL_PATH_PREFIX, 'preprocessor.joblib'))
        logging.info(f"Preprocessor loaded : {type(preprocessor)}")

        logging.info(f"Loading the classifier from {os.path.join(MODEL_PATH_PREFIX, 'classifier.joblib')}")
        classifier = joblib.load(os.path.join(MODEL_PATH_PREFIX, 'classifier.joblib'))
        logging.info(f"Classifier loaded : {type(classifier)}")

        pipeline = Pipeline([
            ('preprocessor', preprocessor),
            ('classifier', classifier)
        ])
        logging.info(f"Pipeline created :  {type(pipeline)}")
        return pipeline
    except Exception as e:
        logger.error(f"Error when loading the model : {e}", exc_info=True)
        raise
