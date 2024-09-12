"""
Module for testing the recommendation system in the Vocabulo Quizz application.

This module uses the unittest framework to test the FastAPI endpoint for word recommendations.

Modules:
    unittest: Provides a framework for creating and running tests.
    pandas: Provides data structures and data analysis tools.
    fastapi.testclient: Provides a test client for FastAPI applications.
    core.database: Contains functions to interact with the database.
    core.model_loader: Contains functions to load machine learning models.
    api.main: Contains the FastAPI application instance.

Classes:
    TestRecommendations: A unittest.TestCase subclass for testing the recommendation system.

Author: Marianne Arrué
Date: 08/09/24
"""

import unittest
from fastapi.testclient import TestClient
from core.database import get_db_connection
from core.model_loader import load_model
from api.main import app


class TestRecommendations(unittest.TestCase):
    """
    A unittest.TestCase subclass for testing the recommendation system.

    This class contains test methods for testing the FastAPI endpoint for word recommendations.
    """

    @classmethod
    def setUpClass(cls):
        """
        Set up the test database connection, load the recommendation model, and create a test client.

        This method is called once before any test methods are executed.
        """

        cls.conn = get_db_connection()
        cls.model = load_model()
        cls.client = TestClient(app)

    @classmethod
    def tearDownClass(cls):
        """
        Close the test database connection.

        This method is called once after all test methods have been executed.
        """
        cls.conn.close()

    def test_model_loaded(self):
        """
        Test if the recommendation model is loaded correctly.

        This method verifies that the recommendation model is not None after being loaded.
        """
        self.assertIsNotNone(self.model, "The recommendation model was not loaded correctly.")

    def test_get_word_recommendations(self):
        """
        Test the get word recommendations endpoint.

        This method sends a POST request to the /get_recommendations endpoint with a valid user ID
        and verifies the response status code and content.
        """
        user_id = "ff96ac45-db30-4055-b12e-1b52555c66e8"
        response = self.client.post("/get_recommendations", json={"user_id": user_id})
        self.assertEqual(response.status_code, 200)
        recommendations = response.json()["recommendations"]

        self.assertIsInstance(recommendations, list)
        self.assertEqual(len(recommendations), 10)

        for rec in recommendations:
            self.assertIn('mot_id', rec)
            self.assertIn('mot', rec)
            self.assertIn('category', rec)
            self.assertIn('subcategory', rec)
            self.assertIn('niv_diff_id', rec)
            self.assertIn('recommendation_score', rec)

        # uniq word
        mot_ids = [rec['mot_id'] for rec in recommendations]
        self.assertEqual(len(set(mot_ids)), len(recommendations))
        # category
        categories = [rec['category'] for rec in recommendations]
        self.assertTrue('basique' in categories)
        # difficulty level
        niv_diff_ids = [rec['niv_diff_id'] for rec in recommendations]
        self.assertTrue(len(set(niv_diff_ids)) > 1)


if __name__ == '__main__':
    unittest.main()