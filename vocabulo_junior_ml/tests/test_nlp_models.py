"""
This module contains unit tests for the NLP models.

The module includes the following functionalities:
- Testing the loading of the spaCy model.
- Testing the loading of the CamemBERT tokenizer and model.
- Testing the `get_camembert_embedding` function with various inputs.

Dependencies:
- unittest: Unit testing framework.
- models.nlp_models: Module for NLP models and embeddings.
- torch: Library for tensor computation and deep learning.
- spacy: Library for advanced natural language processing.

Classes:
- TestNLPModels: Contains unit tests for the NLP models.

Functions:
- test_spacy_model_loaded(self): Tests that the spaCy model is loaded correctly.
- test_camembert_tokenizer_loaded(self): Tests that the CamemBERT tokenizer is loaded correctly.
- test_camembert_model_loaded(self): Tests that the CamemBERT model is loaded correctly.
- test_get_camembert_embedding(self): Tests the `get_camembert_embedding` function to ensure it returns
a tensor of the correct shape.
- test_get_camembert_embedding_empty_string(self): Tests the `get_camembert_embedding`
function with an empty string.
- test_get_camembert_embedding_long_text(self): Tests the `get_camembert_embedding` function
 with a long text.
- test_get_camembert_embedding_special_characters(self): Tests the `get_camembert_embedding`
function with special characters.
- test_get_camembert_embedding_consistency(self): Tests that the `get_camembert_embedding`
function returns consistent results.

Example usage:
    To run the tests, execute the module as a script:

    python -m unittest test_nlp_models.py

Author: Marianne Arrué
Date: 29/08/24
"""

import unittest
from models.nlp_models import get_camembert_embedding, camembert_model, camembert_tokenizer, nlp
import torch
import spacy


class TestNLPModels(unittest.TestCase):
    """
    Unit tests for the NLP models.

    Methods:
    - test_spacy_model_loaded(self): Tests that the spaCy model is loaded correctly.
    - test_camembert_tokenizer_loaded(self): Tests that the CamemBERT tokenizer is loaded correctly.
    - test_camembert_model_loaded(self): Tests that the CamemBERT model is loaded correctly.
    - test_get_camembert_embedding(self): Tests the `get_camembert_embedding` function to ensure it returns a tensor of
    the correct shape.
    - test_get_camembert_embedding_empty_string(self): Tests the `get_camembert_embedding`
    function with an empty string.
    - test_get_camembert_embedding_long_text(self): Tests the `get_camembert_embedding` function with a long text.
    - test_get_camembert_embedding_special_characters(self): Tests the `get_camembert_embedding` function with special
     characters.
    - test_get_camembert_embedding_consistency(self): Tests that the `get_camembert_embedding` function returns
    consistent results.
    """

    def test_spacy_model_loaded(self):
        """
        Test that the spaCy model is loaded correctly.
        """
        self.assertIsInstance(nlp, spacy.language.Language)
        self.assertEqual(nlp.meta['lang'], 'fr')

    def test_camembert_tokenizer_loaded(self):
        """
        Test that the CamemBERT tokenizer is loaded correctly.
        """
        self.assertIsNotNone(camembert_tokenizer)
        self.assertEqual(camembert_tokenizer.name_or_path, 'camembert-base')

    def test_camembert_model_loaded(self):
        """
        Test that the CamemBERT model is loaded correctly.
        """
        self.assertIsNotNone(camembert_model)
        self.assertEqual(camembert_model.name_or_path, 'camembert-base')

    def test_get_camembert_embedding(self):
        """
        Test the get_camembert_embedding function to ensure it returns a tensor
        of the correct shape.
        """
        sentence = "Ceci est une phrase de test."
        embedding = get_camembert_embedding(sentence)
        self.assertIsInstance(embedding, torch.Tensor)
        self.assertEqual(embedding.shape[0], 768)

    def test_get_camembert_embedding_empty_string(self):
        """
        Test the get_camembert_embedding function with an empty string.
        """
        sentence = ""
        embedding = get_camembert_embedding(sentence)
        self.assertIsInstance(embedding, torch.Tensor)
        self.assertEqual(embedding.shape[0], 768)

    def test_get_camembert_embedding_long_text(self):
        """
        Test the get_camembert_embedding function with a long text.
        """
        long_text = " ".join(["Ceci est un long texte."] * 100)
        embedding = get_camembert_embedding(long_text)
        self.assertIsInstance(embedding, torch.Tensor)
        self.assertEqual(embedding.shape[0], 768)

    def test_get_camembert_embedding_special_characters(self):
        """
        Test the get_camembert_embedding function with special characters.
        """
        sentence = "L'été, où les cigales chantent à 30°C !"
        embedding = get_camembert_embedding(sentence)
        self.assertIsInstance(embedding, torch.Tensor)
        self.assertEqual(embedding.shape[0], 768)

    def test_get_camembert_embedding_consistency(self):
        """
        Test that the get_camembert_embedding function returns consistent results.
        """
        sentence = "La constance est la clé."
        embedding1 = get_camembert_embedding(sentence)
        embedding2 = get_camembert_embedding(sentence)
        self.assertTrue(torch.allclose(embedding1, embedding2))


if __name__ == '__main__':
    unittest.main()
