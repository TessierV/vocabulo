"""
Module for database connection in the Vocabulo Quizz application.

This module provides a function to establish a connection to the PostgreSQL database using SQLAlchemy.

Modules:
    sqlalchemy: Provides SQLAlchemy for database connection and ORM.
    config: Contains the database configuration parameters.

Functions:
    get_db_connection(): Establishes and returns a connection to the PostgreSQL database.

Author: Marianne Arrué
Date: 07/09/24
"""

from sqlalchemy import create_engine
from config import DB_PARAMS

print(DB_PARAMS)


def get_db_connection():
    """
    Establishes and returns a connection to the PostgreSQL database.

    Constructs the connection string using the database parameters from the config module,
    creates the SQLAlchemy engine, and establishes a connection to the database.

    Returns:
        sqlalchemy.engine.base.Connection: A connection object to interact with the database.

    Raises:
        Exception: If there is an error during the connection process.
    """
    try:
        # Construct the connection string
        conn_string = f"postgresql://{DB_PARAMS['user']}:{DB_PARAMS['password']}@{DB_PARAMS['host']}:{DB_PARAMS['port']}/{DB_PARAMS['dbname']}"
        print(conn_string)
        # Create the SQLAlchemy engine
        engine = create_engine(conn_string)
        conn = engine.connect()
        print("Successful connection to the database.")
        return conn
    except Exception as e:
        print(f"Error connecting to the database : {e}")
        raise