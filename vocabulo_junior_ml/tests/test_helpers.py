"""
This module contains unit tests for the NLP models.

The module includes the following functionalities:
- Testing the `get_camembert_embedding` function to ensure it returns the correct type and shape.

Dependencies:
- unittest: Unit testing framework.
- models.nlp_models: Module for NLP models and embeddings.
- torch: Library for tensor computation and deep learning.

Classes:
- TestNLPModels: Contains unit tests for the NLP models.

Functions:
- test_get_camembert_embedding(self): Tests the `get_camembert_embedding` function to ensure it returns the correct type and shape.

Example usage:
    To run the tests, execute the module as a script:

    python -m unittest test_helpers.py

Author: Marianne Arrué
Date: 29/08/24
"""

import unittest
from models.nlp_models import get_camembert_embedding
import torch


class TestNLPModels(unittest.TestCase):
    """
        Contains unit tests for the NLP models.

        Methods:
        - test_get_camembert_embedding(self): Tests the `get_camembert_embedding` function to ensure it returns the correct type and shape.
    """

    def test_get_camembert_embedding(self):
        """
            Tests the `get_camembert_embedding` function to ensure it returns the correct type and shape.

            This method verifies that the embedding returned by the `get_camembert_embedding` function is a torch.Tensor and has the expected shape.
        """
        sentence = "This is a test sentence."
        embedding = get_camembert_embedding(sentence)
        self.assertIsInstance(embedding, torch.Tensor)
        self.assertEqual(embedding.shape[0], 768)  # Assuming CamemBERT base model with 768 hidden units


if __name__ == '__main__':
    unittest.main()
