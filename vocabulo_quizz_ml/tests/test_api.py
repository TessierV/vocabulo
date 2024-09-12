"""
Module for testing the API endpoints of the Vocabulo Quizz application.

This module uses the unittest framework to test the FastAPI endpoints for health check and word
recommendations.

Modules:
    unittest: Provides a framework for creating and running tests.
    unittest.mock: Provides support for mocking objects in tests.
    fastapi.testclient: Provides a test client for FastAPI applications.
    api.main: Contains the FastAPI application instance.
    json: Provides functions for working with JSON data.
    requests: Provides functions for making HTTP requests.
    logging: Provides a way to configure and use logging in the application.

Classes:
    TestAPI: A unittest.TestCase subclass for testing the API endpoints.

Author: Marianne Arrué
Date: 08/09/24
"""

import unittest
from unittest.mock import patch
from fastapi.testclient import TestClient
from api.main import app
import json
import requests
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class TestAPI(unittest.TestCase):
    """
    A unittest.TestCase subclass for testing the API endpoints.

    This class contains test methods for the health check endpoint and the word recommendations endpoint.
    """

    def setUp(self):
        """
        Set up the test client for the FastAPI application.

        This method is called before each test method to initialize the test client.
        """
        self.client = TestClient(app)

    def test_health_check(self):
        """
          Test the health check endpoint.

          This method sends a GET request to the /health endpoint and verifies the response status
          code and content.
          """
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "healthy"})

    def test_get_recommendations(self):
        """
        Test the get recommendations endpoint.

        This method sends a POST request to the /get_recommendations endpoint with a valid user ID
        and verifies the response status code and content.
        """
        response = self.client.post("/get_recommendations",
                                    json={"user_id": "1e34bff7-8f44-496b-aed5-ecb19ea96eb0"})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("recommendations", data)
        self.assertIsInstance(data["recommendations"], list)
        self.assertTrue(len(data["recommendations"]) > 0)
        # Verify the structure of a recommendation
        recommendation = data["recommendations"][0]
        self.assertIn("mot_id", recommendation)
        self.assertIn("mot", recommendation)
        self.assertIn("category", recommendation)

    def test_api(self):
        """
        Test the API endpoint using the requests library.

        This method sends a POST request to the /get_recommendations endpoint with a valid user ID
        and logs the response status and content.
        """
        url = "http://localhost:8000/get_recommendations"
        user_id = "40d16861-1706-4a84-a68a-3a6e40dd68e6"

        payload = json.dumps({
            "user_id": user_id
        })
        headers = {
            'Content-Type': 'application/json'
        }

        try:
            response = requests.post(url, headers=headers, data=payload)
            response.raise_for_status()  # Raise an exception for HTTP 4xx or 5xx status codes

            logger.info("Success !")
            logger.info(json.dumps(response.json(), indent=2))
        except requests.exceptions.RequestException as e:
            logger.error(f"Error during the request : {str(e)}")
            if hasattr(e, 'response') and e.response is not None:
                logger.error(f"Response status : {e.response.status_code}")
                logger.error(f"Response content : {e.response.text}")

    def test_get_recommendations_invalid_user_id(self):
        """
        Test the get recommendations endpoint with an invalid user ID.

        This method sends a POST request to the /get_recommendations endpoint with an invalid user ID
        and verifies the response status code and content.
        """
        response = self.client.post("/get_recommendations", json={"user_id": "invalid-id"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("detail", response.json())
        self.assertIn("Invalid user ID", response.json()["detail"])

    @patch('api.main.get_word_recommendations')
    @patch('api.main.user_exists')
    def test_get_recommendations_db_unavailable(self, mock_user_exists, mock_get_recommendations):
        """
         Test the get recommendations endpoint when the database is unavailable.

         This method mocks the user_exists and get_word_recommendations functions to simulate a database error
         and verifies the response status code and content.
         """
        mock_user_exists.return_value = True  # Simulate that the user exists
        mock_get_recommendations.side_effect = Exception("Database unavailable")
        response = self.client.post("/get_recommendations", json={"user_id": "123e4567-e89b-12d3-a456-426614174000"})
        self.assertEqual(response.status_code, 500)
        self.assertIn("detail", response.json())
        self.assertEqual("Internal server error", response.json()["detail"])

    def test_get_recommendations_nonexistent_user(self):
        """
        Test the get recommendations endpoint with a nonexistent user.

        This method sends a POST request to the /get_recommendations endpoint with a valid UUID format
        but a nonexistent user ID and verifies the response status code and content.
        """
        # Valid UUID format, but not valid existing user
        nonexistent_user_id = "123e4567-e89b-12d3-a456-426614174000"
        response = self.client.post("/get_recommendations", json={"user_id": nonexistent_user_id})
        self.assertEqual(response.status_code, 404)
        self.assertIn("detail", response.json())
        self.assertEqual("User not found", response.json()["detail"])

    def test_get_recommendations_invalid_uuid(self):
        """
        Test the get recommendations endpoint with an invalid UUID format.

        This method sends a POST request to the /get_recommendations endpoint with an invalid UUID format
        and verifies the response status code and content.
        """
        invalid_user_id = "not-a-valid-uuid"
        response = self.client.post("/get_recommendations", json={"user_id": invalid_user_id})
        self.assertEqual(response.status_code, 400)
        self.assertIn("detail", response.json())
        self.assertEqual("Invalid user ID format", response.json()["detail"])


if __name__ == '__main__':
    unittest.main()
