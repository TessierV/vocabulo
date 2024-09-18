"""
This module contains unit tests for database connection and query execution.

The module includes the following functionalities:
- Testing the connection to the database.
- Testing the execution of a simple SQL query.

Dependencies:
- unittest: Unit testing framework.
- core.database: Module for connecting to the database.
- sqlalchemy.exc: Module for SQLAlchemy exceptions.
- sqlalchemy: SQL toolkit and Object-Relational Mapping (ORM) library for Python.

Classes:
- TestDatabaseConnection: Contains unit tests for database connection.
- TestDatabaseQuery: Contains unit tests for executing SQL queries.

Functions:
- setUp(self): Sets up the database engine for the tests.
- test_connect_to_db(self): Tests the connection to the database.
- tearDown(self): Disposes of the database engine after tests.
- test_execute_query(self): Tests the execution of a simple SQL query.

Example usage:
    To run the tests, execute the module as a script:

    python -m unittest test_database.py

Author: Marianne Arrué
Date: 29/08/24
"""

import unittest
from core.database import connect_to_db
from sqlalchemy.exc import OperationalError
from sqlalchemy import text


class TestDatabaseConnection(unittest.TestCase):
    """
        Contains unit tests for database connection.

        Methods:
        - setUp(self): Sets up the database engine for the tests.
        - test_connect_to_db(self): Tests the connection to the database.
        - tearDown(self): Disposes of the database engine after tests.
    """

    def setUp(self):
        """
            Sets up the database engine for the tests.

            This method initializes the database engine to None before each test.
        """
        self.engine = None

    def test_connect_to_db(self):
        """
        Tests the connection to the database.

        This method attempts to establish a connection to the database and verifies that the connection is successful.
        """
        try:
            # Establishing a connection to the database
            self.engine = connect_to_db()
            self.assertIsNotNone(self.engine, "The connection to the database could not be established.")
        except OperationalError as e:
            self.fail(f"Database connection failed : {e}")
        except Exception as e:
            self.fail(f"Unexpected error when connecting to the database : {e}")

    def tearDown(self):
        """
            Disposes of the database engine after tests.

            This method disposes of the database engine to clean up resources after each test.
        """
        if self.engine:
            self.engine.dispose()


class TestDatabaseQuery(unittest.TestCase):
    """
        Contains unit tests for executing SQL queries.

        Methods:
        - setUp(self): Sets up the database engine for the tests.
        - test_execute_query(self): Tests the execution of a simple SQL query.
        - tearDown(self): Disposes of the database engine after tests.
    """

    def setUp(self):
        """
            Sets up the database engine for the tests.

            This method initializes the database engine to None before each test.
        """
        self.engine = None

    def test_execute_query(self):
        """
        Tests the execution of a simple SQL query.

        This method attempts to execute a simple SQL query and verifies that the query returns the expected results.
        """
        query = text("SELECT * FROM mot WHERE mot = 'maman';")
        try:
            #  Establishing a connection to the database
            self.engine = connect_to_db()
            self.assertIsNotNone(self.engine, "The connection to the database could not be established.")

            # Check whether the connection is open and execute a simple request
            with self.engine.connect() as connection:
                result = connection.execute(query)
                # Check that at least one line is returned
                row = result.fetchone()
                self.assertIsNotNone(row, "The SQL query did not return any results.")
                print(row)  # Display the result to see what is returned

        except OperationalError as e:
            self.fail(f"SQL query execution fails : {e}")
        except Exception as e:
            self.fail(f"Unexpected error when executing SQL query : {e}")

    def tearDown(self):
        """
            Disposes of the database engine after tests.

            This method disposes of the database engine to clean up resources after each test.
        """
        if self.engine:
            self.engine.dispose()


if __name__ == '__main__':
    unittest.main()
