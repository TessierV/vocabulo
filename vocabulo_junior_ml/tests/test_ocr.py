"""
This module contains unit tests for the OCR functionalities.

The module includes the following functionalities:
- Testing the `perform_ocr` function to ensure it processes images correctly.
- Testing the handling of successful and failed OCR executions.
- Testing the handling of invalid images.

Dependencies:
- unittest: Unit testing framework.
- unittest.mock: Mocking library for unit tests.
- core.ocr: Module for OCR functions.
- PIL: Python Imaging Library for image processing.
- subprocess: Module for running subprocesses.

Classes:
- TestOCR: Contains unit tests for the OCR functionalities.

Functions:
- test_perform_ocr_success(self, mock_run): Tests the `perform_ocr` function with a successful OCR execution.
- test_perform_ocr_failure(self, mock_run): Tests the `perform_ocr` function with a failed OCR execution.
- test_perform_ocr_invalid_image(self): Tests the `perform_ocr` function with an invalid image.

Example usage:
    To run the tests, execute the module as a script:

    python -m unittest test_ocr.py

Author: Marianne Arrué
Date: 29/08/24
"""

import unittest
from unittest.mock import patch, MagicMock
from core.ocr import perform_ocr
from PIL import Image
import subprocess


class TestOCR(unittest.TestCase):
    """
        Contains unit tests for the OCR functionalities.

        Methods:
        - test_perform_ocr_success(self, mock_run): Tests the `perform_ocr` function with a successful OCR execution.
        - test_perform_ocr_failure(self, mock_run): Tests the `perform_ocr` function with a failed OCR execution.
        - test_perform_ocr_invalid_image(self): Tests the `perform_ocr` function with an invalid image.
    """

    @patch('core.ocr.subprocess.run')
    def test_perform_ocr_success(self, mock_run):
        """
            Tests the `perform_ocr` function with a successful OCR execution.

            This method simulates a successful execution of Tesseract and verifies the OCR output.
        """
        # Simulate a successful execution of Tesseract
        mock_run.return_value = MagicMock(stdout="Test OCR output", returncode=0)

        # Create a dummy image for the test
        image = Image.new('RGB', (100, 30), color=(73, 109, 137))

        result = perform_ocr(image)
        self.assertEqual(result, "Test OCR output")
        mock_run.assert_called_once()

    @patch('core.ocr.subprocess.run')
    def test_perform_ocr_failure(self, mock_run):
        """
            Tests the `perform_ocr` function with a failed OCR execution.

            This method simulates an error during the execution of Tesseract and verifies that an exception is raised.
        """
        # Simulate an error during the execution of Tesseract
        mock_run.side_effect = subprocess.CalledProcessError(1, 'cmd', stderr="Error")

        image = Image.new('RGB', (100, 30), color=(73, 109, 137))

        with self.assertRaises(ValueError) as context:
            perform_ocr(image)

        self.assertTrue("Error during Tesseract execution" in str(context.exception))

    def test_perform_ocr_invalid_image(self):
        """
            Tests the `perform_ocr` function with an invalid image.

            This method verifies that an exception is raised when an invalid image is provided.
        """
        # Test with an invalid image
        with self.assertRaises(ValueError) as context:
            perform_ocr(None)

        self.assertTrue("The provided image is not valid" in str(context.exception))


if __name__ == '__main__':
    unittest.main()
