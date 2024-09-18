"""
This module contains unit tests for the FastAPI application endpoints.

The module includes the following functionalities:
- Setting up the test client for the FastAPI application.
- Testing the `/process-image/` endpoint to ensure it processes images correctly.

Dependencies:
- unittest: Unit testing framework.
- fastapi.testclient: Test client for FastAPI applications.
- os: Module for interacting with the operating system.
- api.main: FastAPI application instance.

Classes:
- TestAPI: Contains unit tests for the FastAPI application.

Functions:
- setUp(self): Sets up the test client and test image path.
- test_process_image_endpoint(self): Tests the `/process-image/` endpoint to ensure
 it processes images correctly.

Example usage:
    To run the tests, execute the module as a script:

    python -m unittest test_api.py

Author: Marianne Arrué
Date: 29/08/24
"""

import unittest
from fastapi.testclient import TestClient
from api.main import app
import os


class TestAPI(unittest.TestCase):
    """
        Contains unit tests for the FastAPI application.

        Methods:
        - setUp(self): Sets up the test client and test image path.
        - test_process_image_endpoint(self): Tests the `/process-image/` endpoint to
        ensure it processes images correctly.
    """

    def setUp(self):
        """
            Sets up the test client and test image path.

            This method initializes the TestClient for the FastAPI application and
            sets the path for the test image.
        """
        self.client = TestClient(app)
        self.test_image_path = os.path.join(os.path.dirname(__file__), 'images',
                                            'test_image.png')

    def test_process_image_endpoint(self):
        """
            Tests the `/process-image/` endpoint to ensure it processes images correctly.

            This method sends a POST request to the `/process-image/` endpoint with a test image and verifies
            the response.
        """
        if not os.path.exists(self.test_image_path):
            self.fail(f"Test image not found : {self.test_image_path}")

        with open(self.test_image_path, "rb") as image_file:
            response = self.client.post(
                "/process-image/",
                files={"file": ("test_image.png", image_file, "image/png")}
            )

        self.assertEqual(response.status_code, 200, f"Unexpected response: {response.content}")

        json_response = response.json()
        self.assertIn('original_text', json_response)
        self.assertIn('processed_results', json_response)


if __name__ == "__main__":
    unittest.main()
