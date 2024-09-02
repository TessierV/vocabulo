"""
This module provides the functionality to obtain embeddings for sentences using the CamemBERT model.

The module includes the following functionalities:
- Loading the SpaCy model for French language processing.
- Loading the CamemBERT tokenizer and model.
- Obtaining the CamemBERT embedding for a given sentence.

Dependencies:
- spacy: Library for advanced natural language processing.
- transformers: Library for state-of-the-art natural language processing models.
- torch: Library for tensor computation and deep learning.

Functions:
- get_camembert_embedding(sentence): Obtains the CamemBERT embedding for a given sentence.

Example usage:
    To obtain the embedding for a sentence, call the `get_camembert_embedding` function:

    embedding = get_camembert_embedding(sentence)

    This will return the embedding of the sentence as a torch.Tensor.

Author: Marianne Arrué
Date: 29/08/24
"""

import spacy
from transformers import CamembertTokenizer, CamembertModel
import torch

nlp = spacy.load("fr_core_news_lg")

camembert_tokenizer = CamembertTokenizer.from_pretrained("camembert-base")
camembert_model = CamembertModel.from_pretrained("camembert-base")


def get_camembert_embedding(sentence: str) -> torch.Tensor:
    """
    Obtain the CamemBERT embedding for a given sentence.

    This function tokenizes the input sentence using the CamemBERT tokenizer,
    passes the tokens through the CamemBERT model, and returns the mean of the
    last hidden state as the sentence embedding.

    :param:
        sentence (str): The sentence to encode.

    :returns:
        torch.Tensor: The embedding of the sentence.
    """
    # Tokenize the input sentence
    inputs = camembert_tokenizer(sentence, return_tensors="pt", truncation=True, max_length=512)

    # Get the model outputs without computing gradients
    with torch.no_grad():
        outputs = camembert_model(**inputs)

    # Return the mean of the last hidden state as the sentence embedding
    return outputs.last_hidden_state.mean(dim=1).squeeze()
