"""
Module for testing the database connection and queries in the Vocabulo Quizz application.

This module uses the unittest framework to test the database connection, session creation, and specific queries.

Modules:
    unittest: Provides a framework for creating and running tests.
    sqlalchemy: Provides SQLAlchemy for database connection and ORM.
    core.database: Contains functions to interact with the database.
    config: Contains the database configuration parameters.

Classes:
    TestDatabase: A unittest.TestCase subclass for testing the database connection and queries.

Author: Marianne Arrué
Date: 08/09/24
"""
import unittest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from core.database import get_db_connection
from config import DB_PARAMS


class TestDatabase(unittest.TestCase):
    """
    A unittest.TestCase subclass for testing the database connection and queries.

    This class contains test methods for testing the database connection, session creation, and specific queries.
    """

    def setUp(self):
        """
        Set up the test database connection and session.

        This method is called before each test method to initialize the database connection and session.
        """
        self.engine = create_engine(
            f"postgresql://{DB_PARAMS['user']}:{DB_PARAMS['password']}@{DB_PARAMS['host']}:{DB_PARAMS['port']}/{DB_PARAMS['dbname']}_test")
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    def test_database_connection(self):
        """
        Test the database connection.

        This method tests the connection to the database by calling the get_db_connection function.
        """
        connection = get_db_connection()
        self.assertIsNotNone(connection)

    def test_session_creation(self):
        """
        Test the session creation.

        This method tests the creation of a session using the SQLAlchemy sessionmaker.
        """
        session = self.SessionLocal()
        self.assertIsNotNone(session)
        session.close()

    def test_user_level(self):
        """
        Test the user level query.

        This method tests the query that retrieves the user's level based on their quiz scores.
        """
        user_id="27f23ffc-a449-460b-a216-86b4dd41f6ef"
        query = """
            SELECT 
                COALESCE(AVG(CASE WHEN sq.score THEN 1 ELSE 0 END), 0) as avg_score,
                COUNT(DISTINCT CASE WHEN c.name = 'basique' THEN m.mot_id END) as basic_words_seen,
                COUNT(DISTINCT CASE WHEN c.name = 'basique' AND sq.score THEN m.mot_id END) as basic_words_correct,
                COUNT(DISTINCT m.mot_id) as total_words_seen,
                MAX(e.echelon_id) as max_echelon
            FROM score_quiz sq
            JOIN quiz q ON sq.quiz_id = q.quiz_id
            JOIN mot m ON sq.mot_id = m.mot_id
            JOIN mot_categorie mc ON m.mot_id = mc.mot_id
            JOIN categorie c ON mc.categorie_id = c.categorie_id
            LEFT JOIN echelon_db e ON m.echelon_id = e.echelon_id
            WHERE q.user_id = :user_id
            """
        connection = get_db_connection()
        result = connection.execute(text(query), {'user_id': user_id}).fetchone()
        print(result)
        self.assertIsNotNone(result)

    def test_word(self):
        """
        Test the word query.

        This method tests the query that retrieves word details based on the word text.
        """
        word="papa"
        query= """
            SELECT
                mot_id,
                mot,
                niv_diff_id,
                frequence,
                gramm_id
            FROM
                mot
            WHERE 
                mot = :word;
            """
        connection = get_db_connection()
        result = connection.execute(text(query), {'word': word}).fetchone()
        print(result)
        self.assertIsNotNone(result)


    def tearDown(self):
        """
        Clean up after tests.

        This method is called after each test method to dispose of the database engine.
        """
        self.engine.dispose()


if __name__ == '__main__':
    unittest.main()