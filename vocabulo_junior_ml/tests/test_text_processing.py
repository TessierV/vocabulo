"""
This module contains unit tests for the text processing functionalities.

The module includes the following functionalities:
- Testing the `clean_ocr_text` function to ensure it preserves specific phrases and punctuation.
- Testing the `normalize_text` function to ensure it converts accented characters correctly.
- Testing the `get_word_info` function to ensure it retrieves word information from the database.
- Testing the `choose_best_definition` function to ensure it selects the best definition
based on context and part of speech.

Dependencies:
- unittest: Unit testing framework.
- unittest.mock: Mocking library for unit tests.
- core.text_processing: Module for text processing functions.
- core.database: Module for database connection.

Classes:
- TestTextProcessing: Contains unit tests for text processing functionalities.

Functions:
- setUp(self): Sets up the test environment before each test method.
- test_clean_ocr_text(self): Tests the `clean_ocr_text` function.
- test_normalize_text(self): Tests the `normalize_text` function.
- test_get_word_info(self, mock_connect_to_db): Tests the `get_word_info` function.
- test_choose_best_definition(self): Tests the `choose_best_definition` function.

Example usage:
    To run the tests, execute the module as a script:

    python -m unittest test_text_processing.py

Author: Marianne Arrué
Date: 29/08/24
"""

import unittest
from unittest.mock import Mock, patch, MagicMock
from core.text_processing import clean_ocr_text, normalize_text, get_word_info, choose_best_definition
from core.database import connect_to_db


class TestTextProcessing(unittest.TestCase):
    """
    Test suite for text processing functions.

    This class contains unit tests for various text processing functions
    used in the VocabuloKid application.
    """

    def setUp(self):
        """
            Set up the test environment before each test method.

            This method establishes a connection to the test database and
            creates a mock engine for testing purposes.
        """
        self.engine = connect_to_db()
        self.mock_engine = Mock()

    def test_clean_ocr_text(self):
        """
            Test the clean_ocr_text function.

            This test ensures that the OCR text cleaning function correctly
            preserves specific phrases and punctuation.
        """
        text = "jusqu'à l'on qu'il s'il bien que"
        expected = "jusqu'à l'on qu'il s'il bien que"
        self.assertEqual(clean_ocr_text(text), expected)

    def test_normalize_text(self):
        """
            Test the normalize_text function.

            This test verifies that the text normalization function correctly
            converts accented characters to their non-accented equivalents.
        """
        text = "Ã© Ã¨ Ã "
        expected = "é è à"
        self.assertEqual(normalize_text(text), expected)

    @patch('core.text_processing.connect_to_db')
    def test_get_word_info(self, mock_connect_to_db):
        """
            Test the get_word_info function.

            This test checks if the function correctly retrieves word information
            from the database, including its definition, grammatical category,
            and associated URLs.

            Args:
                mock_connect_to_db (MagicMock): A mock object for the database connection.
        """
        with self.engine.connect() as connexion:
            # Test data
            word = "maman"
            lemma = "maman"
            gramm_id = 1

            # Call the function
            result = get_word_info(word, lemma, gramm_id, connexion)

            # Assert the result
            self.assertIsInstance(result, list)
            self.assertGreater(len(result), 0)
            self.assertEqual(result[0]['mot'], 'maman')
            self.assertEqual(result[0]['definition'],
                             'terme affectueux employé par les enfants pour désigner leur mère.')
            self.assertEqual(result[0]['gram_cat'], 'nom')
            self.assertEqual(result[0]['url_sign'],
                             'https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/maman_nf_1_2.mp4')
            self.assertEqual(result[0]['url_def'],
                             'https://elix-lsf.s3.rbx.io.cloud.ovh.net/spip_videos/87_maman_1__nf_1td001-encoded.mp4')

    def test_choose_best_definition(self):
        """
            Test the choose_best_definition function.

            This test verifies that the function correctly selects the best
            definition for a given word based on context and part of speech.
        """
        word = "test"
        context = "Ceci est un contexte de test."
        definitions = [
            {
                'definition': 'Une procédure destinée à établir la qualité, la performance '
                              'ou la fiabilité de quelque chose.',
                'gramm_id': 1, 'niv_diff_id': 2}]
        pos = "NOUN"
        best_definition, confidence_score = choose_best_definition(word, context, definitions, pos)
        self.assertIsNotNone(best_definition)
        self.assertGreater(confidence_score, 0)


if __name__ == '__main__':
    unittest.main()
