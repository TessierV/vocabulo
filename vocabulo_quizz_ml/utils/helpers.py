"""
Module for utility helper functions in the Vocabulo Quizz application.

This module provides utility functions for setting up logging and measuring the execution time of functions.

Modules:
    logging: Provides a way to configure and use logging in the application.
    functools: Provides higher-order functions that act on or return other functions.
    time: Provides various time-related functions.
    core.database: Contains functions to interact with the database.
    sqlalchemy: Provides SQLAlchemy for database connection and ORM.

Functions:
    setup_logger(name): Sets up and returns a logger with the specified name.
    timeit(func): A decorator that measures the execution time of a function.
    user_exists(user_id): Checks if a user exists in the database.

Author: Marianne Arrué
Date: 07/09/24
"""

import logging
from functools import wraps
from core.database import get_db_connection
from sqlalchemy import text
import time

def setup_logger(name):
    """
    Sets up and returns a logger with the specified name.

    Configures the logger to use the INFO level and sets up a stream handler with a specific format.

    Args:
        name (str): The name of the logger.

    Returns:
        logging.Logger: The configured logger.
    """

    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger

def timeit(func):
    """
    A decorator that measures the execution time of a function.

    Logs the execution time of the decorated function using the logger configured with the module name.

    Args:
        func (function): The function to be decorated.

    Returns:
        function: The wrapped function with execution time measurement.
    """

    @wraps(func)
    def timeit_wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        total_time = end_time - start_time
        logger = setup_logger(__name__)
        logger.info(f'Function {func.__name__} Took {total_time:.4f} seconds')
        return result
    return timeit_wrapper

def user_exists(user_id: str) -> bool:
    """
    Checks if a user exists in the database.

    This function queries the database to check if a user with the specified user ID exists.

    Args:
        user_id (str): The ID of the user to check.

    Returns:
        bool: True if the user exists, False otherwise.
    """
    conn = get_db_connection()
    query = text("SELECT COUNT(*) FROM authentication WHERE user_id = :user_id")
    result = conn.execute(query, {"user_id": user_id}).scalar()
    conn.close()
    return result > 0