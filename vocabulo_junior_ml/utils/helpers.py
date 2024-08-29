"""
This module contains helper functions for various utilities used in the VocabuloKid application.

The module includes the following functionalities:
- Mapping part-of-speech (POS) tags to grammatical IDs.

Dependencies:
- typing: Provides type hints for the function signatures.

Functions:
- map_pos_to_gramm_id(pos: str) -> int: Maps a part-of-speech (POS) tag to a grammatical ID.

Example usage:
    To use the `map_pos_to_gramm_id` function, import the module and call the function with a POS tag:

    from utils.helpers import map_pos_to_gramm_id

    gramm_id = map_pos_to_gramm_id('NOUN')
    print(gramm_id)  # Output: 1

Author: Marianne Arrué
Date: 29/08/24
"""

from typing import Dict


def map_pos_to_gramm_id(pos: str) -> int:
    """
    Maps a part-of-speech (POS) tag to a grammatical ID.

    :param :
        pos (str): The part-of-speech (POS) tag.

    returns:
        int: The corresponding grammatical ID.
    """
    mapping: Dict[str, int] = {
        'NOUN': 1,  # noun
        'VERB': 2,  # verb
        'ADJ': 3,  # adjective
        'ADP': 4,  # adposition
        'DET': 5,  # determiner
        'PRON': 6,  # pronoun
        'PROPN': 7,  # proper noun
        'ADV': 8,  # adverb
        'CCONJ': 9,  # coordinating conjunction
        'SCONJ': 9,  # subordinating conjunction
        'INTJ': 10  # interjection
    }
    return mapping.get(pos)
