"""
This module provides the functionality to connect to a PostgreSQL database using SQLAlchemy.

The module includes the following functionalities:
- Constructing the connection string using database parameters from the configuration.
- Creating and returning an SQLAlchemy engine connected to the specified database.

Dependencies:
- sqlalchemy: SQL toolkit and Object-Relational Mapping (ORM) library for Python.
- config: Module for loading database configuration parameters from environment variables.

Functions:
- connect_to_db(): Creates and returns an SQLAlchemy engine connected to the database.

Example usage:
    To connect to the database, call the `connect_to_db` function:

    engine = connect_to_db()

    This will return an SQLAlchemy engine that can be used to interact with the database.

Author: Marianne Arrué
Date: 29/08/24
"""

from sqlalchemy import create_engine
from config import DB_PARAMS


def connect_to_db():
    """Create and return a connection to the database.

    This function constructs the connection string using the database
    parameters
    from the configuration and creates an SQLAlchemy engine.

    :returns:
        engine: An SQLAlchemy engine connected to the specified database.

    :raises:
        ValueError: If there is an error creating the database engine.
"""
    try:
        # Construct the connection string
        conn_string = f"postgresql://{DB_PARAMS['user']}:{DB_PARAMS['password']}@{DB_PARAMS['host']}:{DB_PARAMS['port']}/{DB_PARAMS['dbname']}"

        # Create the SQLAlchemy engine
        engine = create_engine(conn_string)
        return engine
    except Exception as e:
        raise ValueError(f"Error connecting to the database: {str(e)}")
