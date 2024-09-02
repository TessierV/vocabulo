"""
This module provides the functionality to clean, normalize, and process text, as well as retrieve word information
 from a database.

The module includes the following functionalities:
- Cleaning OCR text by preserving specific expressions and removing extra spaces.
- Normalizing text by converting it to NFC form and replacing specific character sequences.
- Retrieving word information from the database.
- Choosing the best definition for a word based on context and difficulty.
- Processing text to extract word information and definitions.
- Analyzing a token and deciding its lemma, part-of-speech, and function.

Dependencies:
- re: Module for regular expressions.
- unicodedata: Module for Unicode character database.
- sqlalchemy: SQL toolkit and Object-Relational Mapping (ORM) library for Python.
- core.database: Module for connecting to the database.
- utils.helpers: Module for helper functions.
- models.nlp_models: Module for NLP models and embeddings.
- sklearn: Library for machine learning, used for cosine similarity.

Functions:
- clean_ocr_text(text): Cleans OCR text by preserving specific expressions and removing extra spaces.
- normalize_text(text): Normalizes text by converting it to NFC form and replacing specific character sequences.
- get_word_info(word, lemma, gramm_id, connection): Retrieves word information from the database.
- choose_best_definition(word, context, definitions, pos, target_difficulty): Chooses the best definition for
a word based on context and difficulty.
- process_text(text, target_difficulty): Processes text to extract word information and definitions.
- get_context(doc, token, window): Gets the context of a token within a specified window.
- compare_and_decide(token, doc): Analyzes a token and decides its lemma, part-of-speech, and function.
- create_word_result(word, lemma, pos, function, definition, url, confidence, difficulty): Creates a dictionary
containing word result information.
- determine_function(token): Determines the grammatical function of a token.

Example usage:
    To clean OCR text, call the `clean_ocr_text` function:

    cleaned_text = clean_ocr_text(ocr_text)

    This will return the cleaned text, which can then be used for further processing.

Author: Marianne Arrué
Date: 29/08/24
"""

import re
import unicodedata
from sqlalchemy import text
from core.database import connect_to_db
from utils.helpers import map_pos_to_gramm_id
from models.nlp_models import get_camembert_embedding, nlp
from sklearn.metrics.pairwise import cosine_similarity


def clean_ocr_text(text):
    """
        Clean OCR text by preserving specific expressions and removing extra spaces.

    This function replaces specific expressions with placeholders, removes extra spaces,
    and then restores the original expressions.

    :param
        text (str): The OCR text to clean
    :return:
        str: The cleaned text.
    """
    preserve_expressions = ["jusqu'à", "jusqu'au", "d'un", "d'une", "l'on", "qu'il", "qu'elle", "s'il", "s'ils",
                            "bien que", "après que", "auprès de", "tout à coup", "tout de suite", "à peine",
                            "de plus en plus", "de moins en moins", "de temps en temps", "au fur et à mesure",
                            "tout à fait", "vis-à-vis", "au-dessus de", "au-dessous de", "face à", "quant à"]

    for i, expr in enumerate(preserve_expressions):
        text = re.sub(rf'\b{expr}\b', f'PRESERVE_{i}', text)

    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\s([,.!?:;])', r'\1', text)

    for i, expr in enumerate(preserve_expressions):
        text = text.replace(f'PRESERVE_{i}', expr)

    return text.strip()


def normalize_text(text):
    """
        Normalize text by converting it to NFC form and replacing specific character sequences.

    :param
            text (str): The text to normalize.

    :return:
            str: The normalized text.
    """
    normalized = unicodedata.normalize('NFC', text)
    replacements = {
        'Ã©': 'é', 'Ã¨': 'è', 'Ã ': 'à', 'Ã¢': 'â', 'Ã®': 'î',
        'Ã´': 'ô', 'Ã»': 'û', 'Ã§': 'ç', 'Ã‰': 'É', 'Ãˆ': 'È',
        'Ã€': 'À', 'Ã‚': 'Â', 'ÃŽ': 'Î', 'Ã"': 'Ô', 'Ã›': 'Û',
        'Ã‡': 'Ç'
    }
    for old, new in replacements.items():
        normalized = normalized.replace(old, new)
    return normalized


def get_word_info(word, lemma, gramm_id, connection):
    """
    Retrieve word information from the database.

    This function queries the database for information about a word or its lemma,
    including its definition, grammatical category, and associated URLs.

    :param
            word (str): The word to look up.
            lemma (str): The lemma of the word.
            gramm_id (int): The grammatical ID of the word.
            connection: The database connection.

    :return:
            list: A list of dictionaries containing word information.

    """
    query = text("""
    SELECT m.mot_id, m.mot, m.definition, ls.url_sign, ls.url_def, gc.name as gram_cat, m.gramm_id, m.niv_diff_id
    FROM mot m
    LEFT JOIN lsf_signe ls ON m.mot_id = ls.mot_id
    LEFT JOIN grammatical_cat gc ON m.gramm_id = gc.gramm_id
    WHERE (unaccent(lower(m.mot)) = unaccent(lower(:word)) OR unaccent(lower(m.mot)) = unaccent(lower(:lemma))) 
    AND m.definition IS NOT NULL AND m.definition != ''
    AND m.gramm_id = :gramm_id
    AND (m.gramm_id = :gramm_id OR :gramm_id = 0)
    """)
    results = connection.execute(query, {"word": word, "lemma": lemma, "gramm_id": gramm_id}).fetchall()
    return [row._asdict() for row in results]


def choose_best_definition(word, context, definitions, pos, target_difficulty=2):
    """
        Choose the best definition for a word based on context and difficulty.

    This function selects the most appropriate definition for a word by comparing
    the context embedding with the definition embeddings and considering the target difficulty.

    :param
        word (str): The word to define.
        context (str): The context in which the word appears.
        definitions (list): A list of possible definitions.
        pos (str): The part-of-speech tag of the word.
        target_difficulty (int, optional): The target difficulty level. Defaults to 2.

    :return:
            tuple: The best definition and its confidence score.

    """

    if not definitions:
        return None, 0.0

    correct_pos_definitions = [d for d in definitions if d['gramm_id'] == map_pos_to_gramm_id(pos)]

    if not correct_pos_definitions:
        return None, 0.0

    if len(correct_pos_definitions) == 1:
        return correct_pos_definitions[0], 1.0

    context_embedding = get_camembert_embedding(context)
    scores = []

    for definition in correct_pos_definitions:
        def_embedding = get_camembert_embedding(definition['definition'])
        similarity = cosine_similarity([context_embedding], [def_embedding])[0][0]
        difficulty_score = 1 - (abs(definition['niv_diff_id'] - target_difficulty) / 3)
        combined_score = 0.7 * similarity + 0.3 * difficulty_score
        scores.append((definition, combined_score))

    scores.sort(key=lambda x: x[1], reverse=True)
    best_definition, best_score = scores[0]
    confidence_score = 1.0 if len(scores) == 1 else (best_score - scores[1][1]) / best_score

    return best_definition, confidence_score


def process_text(text, target_difficulty=1):
    """
    Process text to extract word information and definitions.

    This function processes the input text, extracts word information, and retrieves
    the best definitions from the database based on context and target difficulty.

    :param
        text (str): The text to process.
        target_difficulty (int, optional): The target difficulty level. Defaults to 1.

    :return:
        list: A list of dictionaries containing sentence and word information.

    """
    engine = connect_to_db()
    results = []

    context_words = {'le', 'la', 'les', 'un', 'une', 'des', 'au', 'aux', 'du', 'et', 'à', 'de'}
    lsf_relevant_words = {'dans', 'sur', 'pour', 'avec', 'sans', 'avant', 'après', 'devant', 'derrière'}
    compound_words = ["jusqu'à", "jusqu'au", "bien que", "parce que", "alors que", "autour de", "en face de",
                      "à cause de", "grâce à", "en dépit de", "à côté de", "loin de", "quant à", "près de",
                      "au-delà de", "en dessous de", "tandis que", "pour que", "afin que", "de sorte que",
                      "si bien que", "quoique", "puisque", "dès que", "à moins que", "tant que", "tout à coup",
                      "tout de suite", "à peine", "de plus en plus", "de moins en moins", "de temps en temps",
                      "au fur et à mesure", "au bout de", "à partir de", "tout à fait", "vis-à-vis", "au-dessus de",
                      "au-dessous de", "qu'en dira-t-on", "quant à", "quant-à-soi", "quart-de-rond", "quart-monde",
                      "quatre-heures", "quatre-quarts", "quatre-saisons", "que dalle!", "quelque chose", "en effet",
                      "En effet"]

    with engine.connect() as connection:
        doc = nlp(text)
        skip_next_token = False

        for sent in doc.sents:
            sentence_results = []
            for i, token in enumerate(sent):
                if skip_next_token:
                    skip_next_token = False
                    continue

                word = token.text
                analysis = compare_and_decide(token, doc)
                lemma = analysis['lemma']
                pos = analysis['pos']

                compound_word = None
                for compound in compound_words:
                    if text[token.idx:].startswith(compound):
                        compound_word = compound
                        break

                if compound_word:
                    word = compound_word
                    lemma = compound_word.lower()
                    pos = "COMPOUND"
                    function = "locution"
                    skip_next_token = True
                else:
                    function = analysis['function']

                if 'skip_next' in analysis and analysis['skip_next']:
                    skip_next_token = True

                gramm_id = map_pos_to_gramm_id(pos)

                if word.lower() in context_words:
                    sentence_results.append({
                        'word': word,
                        'lemma': lemma,
                        'pos': pos,
                        'function': function,
                        'definition': 'Mot de contexte',
                        'url': 'Non applicable',
                        'confidence': 1.0
                    })
                elif word.lower() in lsf_relevant_words or pos in ["VERB", "NOUN", "ADJ", "ADV", "PROPN"]:
                    word_data = get_word_info(lemma, lemma, gramm_id, connection)
                    if word_data:
                        best_match, confidence_score = choose_best_definition(lemma, str(sent), word_data, pos,
                                                                              target_difficulty)
                        if best_match:
                            url = best_match['url_sign'] or best_match['url_def'] or 'Pas de signe/définition URL'
                            sentence_results.append({
                                'word': word,
                                'lemma': lemma,
                                'pos': pos,
                                'function': function,
                                'definition': best_match['definition'],
                                'url': url,
                                'difficulty': best_match['niv_diff_id'],
                                'confidence': confidence_score
                            })
                    else:
                        sentence_results.append({
                            'word': word,
                            'lemma': lemma,
                            'pos': pos,
                            'function': function,
                            'definition': 'Non trouvé dans la BDD',
                            'url': 'Non disponible',
                            'confidence': 0.0
                        })
                else:
                    sentence_results.append({
                        'word': word,
                        'lemma': lemma,
                        'pos': pos,
                        'function': function,
                        'definition': 'Mot grammatical',
                        'url': 'Non applicable',
                        'confidence': 1.0
                    })

            results.append({
                'sentence': str(sent),
                'words': sentence_results
            })

        return results


def get_context(doc, token, window=3):
    """
    Get the context of a token within a specified window.

    This function retrieves the surrounding tokens of a given token within a specified window size.

    :param
        doc: The spaCy document containing the token.
        token: The token for which to get the context.
        window (int, optional): The size of the context window. Defaults to 3.

    :return:
            spacy.tokens.Span: The context span.

    """
    start = max(token.i - window, 0)
    end = min(token.i + window + 1, len(doc))
    return doc[start:end]


def compare_and_decide(token, doc):
    """
       Analyze a token and decide its lemma, part-of-speech, and function.

    This function analyzes a token within its context, determines its lemma, part-of-speech,
    and grammatical function, and applies specific rules for special cases.

    :param
        token: The token to analyze.
        doc: The spaCy document containing the token.

    :return:
            dict: A dictionary containing the word, lemma, part-of-speech, and function.
    """
    word = token.text
    context = get_context(doc, token)
    context_text = ' '.join([t.text for t in context])
    lemma = token.lemma_
    pos = token.pos_
    function = token.dep_

    # Check if the previous token is "se" or "s'" for pronominal verbs
    if pos == 'VERB' and token.i > 0:
        previous_token = doc[token.i - 1]
        if previous_token.text.lower() in ["se", "s'"]:
            # Concaténer "se " ou "s'" au lemme
            if previous_token.text == "s'":
                lemma = f"{previous_token.text.lower()}{lemma}"
                word = f"{previous_token.text}{word}"
            else:
                lemma = f"{previous_token.text.lower()} {lemma}"
                word = f"{previous_token.text} {word}"
        next_token = doc[token.i + 1]
        if next_token.text.lower() in ["de", "d'"]:
            lemma = f"{lemma} de"
            word = f"{word} de"
            print(f"[DEBUG] Verbe pronominal avec préposition détecté: {word} | Lemme: {lemma}")

    # Check for past participles
    if pos == 'VERB' and token.morph.get('VerbForm') == ['Part']:
        previous_token = doc[token.i - 1] if token.i > 0 else None
        if previous_token and previous_token.lemma_ == 'être':
            return {
                'word': word,
                'lemma': lemma,
                'pos': 'VERB',
                'function': 'participe passé'
            }

    # Correct for irregular verbs
    if pos == 'VERB' and lemma.endswith('er') and word in ['dire', 'faire', 'être', 'avoir']:
        lemma = word

    # Special handling for "jusqu'"
    if word.lower() == "jusqu'":
        next_token = doc[token.i + 1] if token.i + 1 < len(doc) else None
        if next_token and next_token.text in ["à", "au"]:
            word = f"jusqu'{next_token.text.lower()}"
            combined = f"jusqu'{next_token.text}"
            return {'word': word, 'lemma': combined, 'pos': 'ADP', 'function': 'case', 'skip_next': True}

    # Get CamemBERT embeddings
    word_embedding = get_camembert_embedding(word)
    context_embedding = get_camembert_embedding(context_text)

    # Calculate similarity
    similarity = cosine_similarity([word_embedding], [context_embedding])[0][0]

    # Single token analysis
    doc_single = nlp(word)
    single_analysis = {
        'lemma': doc_single[0].lemma_,
        'pos': doc_single[0].pos_
    }

    # Check consistency between POS and grammatical function
    if pos == 'VERB' and function in ['obj', 'nsubj', 'iobj', 'dobj']:
        pos = 'NOUN'
        lemma = word.lower()
        if lemma.endswith('s') and not lemma.endswith('ss'):  # évite les mots comme "tasse"
            lemma = lemma[:-1]
    elif pos == 'NOUN' and function == 'ROOT':
        pos = 'VERB'

    # Special handling for personal pronouns
    if pos == 'PRON' and lemma in ['il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles']:
        return {'word': word, 'lemma': lemma, 'pos': 'PRON', 'function': 'pronom personnel'}

    # Corrections for specific words
    if word.lower() in ['mer', 'rivière']:
        return {'word': word, 'lemma': word.lower(), 'pos': 'NOUN', 'function': function}

    # Handling verbs
    if pos == 'VERB':
        if lemma != word.lower():
            pass
        elif word.lower().endswith(('e', 'es', 'ent')):
            lemma = f"{word.lower()[:-1]}er"

    # Use CamemBERT similarity for ambiguous cases
    elif similarity > 0.8:
        pass
    else:
        lemma = single_analysis['lemma']

    return {'word': word, 'lemma': lemma, 'pos': pos, 'function': function}


def create_word_result(word, lemma, pos, function, definition, url, confidence, difficulty=None):
    """
            Create a dictionary containing word result information.

    :param
        word (str): The word.
        lemma (str): The lemma of the word.
        pos (str): The part-of-speech tag of the word.
        function (str): The grammatical function of the word.
        definition (str): The definition of the word.
        url (str): The URL associated with the word.
        confidence (float): The confidence score of the definition.
        difficulty (int, optional): The difficulty level of the word. Defaults to None.

    :return:
            dict: A dictionary containing word result information.
    """

    result = {
        'word': word,
        'lemma': lemma,
        'pos': pos,
        'function': function,
        'definition': definition,
        'url': url,
        'confidence': confidence
    }
    if difficulty is not None:
        result['difficulty'] = difficulty
    return result


def determine_function(token):
    """
        Determine the grammatical function of a token.

    :param
            token: The token to analyze.

    :return:
            str: The grammatical function of the token.
    """
    if token.dep_ == "nsubj":
        return "sujet"
    elif token.dep_ == "ROOT" and token.pos_ == "VERB":
        return "verbe principal"
    elif token.dep_ == "dobj":
        return "objet direct"
    elif token.dep_ == "iobj":
        return "objet indirect"
    elif token.pos_ == "ADJ":
        return "adjectif"
    elif token.pos_ == "ADV":
        return "adverbe"
    else:
        return token.dep_
