"""
Module for generating word recommendations in the Vocabulo Quizz application.

This module provides functions to calculate user levels, get user feedback, calculate recommendation scores,
select diverse words, and generate word recommendations using a machine learning pipeline.

Modules:
    pandas: Provides data structures and data analysis tools.
    numpy: Provides support for large, multi-dimensional arrays and matrices.
    sqlalchemy: Provides SQLAlchemy for database connection and ORM.
    sklearn.pipeline: Provides the Pipeline class for chaining estimators.
    core.database: Contains functions to interact with the database.
    core.model_loader: Contains functions to load the machine learning model.
    xgboost: Provides the XGBoost machine learning library.
    logging: Provides a way to configure and use logging in the application.

Functions:
    get_user_level(user_id): Calculates the user's level based on their quiz scores.
    get_user_feedback(user_id): Retrieves user feedback on words.
    calculate_recommendation_score(row, user_level, basic_mastery, total_words_seen, user_feedback, is_new_user):
        Calculates the recommendation score for a word.
    select_diverse_words(df, num_words, basic_mastery, is_new_user): Selects a diverse set of words for recommendations.
    get_word_recommendations(user_id, pipeline, num_words): Generates word recommendations for a user.

Author: Marianne Arrué
Date: 07/09/24
"""


import pandas as pd
import numpy as np
from sqlalchemy import text
from sklearn.pipeline import Pipeline
from core.database import get_db_connection
from xgboost import XGBClassifier
import logging


# Logging configuration :
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def get_user_level(user_id):
    """
    Calculates the user's level based on their quiz scores.

    Args:
        user_id (str): The ID of the user.

    Returns:
        tuple: A tuple containing the user's level, basic mastery, total words seen, max echelon,
        and a boolean indicating if the user is new.
    """

    conn = get_db_connection()
    query = text("""
    SELECT 
        COALESCE(AVG(CASE WHEN sq.score THEN 1 ELSE 0 END), 0) as avg_score,
        COUNT(DISTINCT CASE WHEN c."name" = 'basique' THEN m.mot_id END) as basic_words_seen,
        COUNT(DISTINCT CASE WHEN c."name" = 'basique' AND sq.score THEN m.mot_id END) as basic_words_correct,
        COUNT(DISTINCT m.mot_id) as total_words_seen,
        MAX(e.echelon_id) as max_echelon
    FROM score_quiz sq
    JOIN quiz q ON sq.quiz_id = q.quiz_id
    JOIN mot m ON sq.mot_id = m.mot_id
    JOIN mot_categorie mc ON m.mot_id = mc.mot_id
    JOIN categorie c ON mc.categorie_id = c.categorie_id
    LEFT JOIN echelon_db e ON m.echelon_id = e.echelon_id
    WHERE q.user_id = :user_id
    """)

    result = conn.execute(query, {"user_id": user_id}).fetchone()
    conn.close()

    if result is None:
        return 1, 0, 0, None, True  #  Default values for a new user

    avg_score, basic_words_seen, basic_words_correct, total_words_seen, max_echelon = result

    basic_mastery = basic_words_correct / basic_words_seen if basic_words_seen > 0 else 0
    level = min(5, max(1, int(avg_score * 5) + 1))  # Level 1 to 5
    is_new_user = total_words_seen < 10

    return level, basic_mastery, total_words_seen, max_echelon, is_new_user


def get_user_feedback(user_id):
    """
    Retrieves user feedback on words.

    Args:
        user_id (str): The ID of the user.

    Returns:
        dict: A dictionary containing the feedback for each word.
    """

    conn = get_db_connection()
    query = text("""
    SELECT m.mot_id, em.scale
    FROM eval_mot em
    JOIN quiz q ON em.quiz_id = q.quiz_id
    JOIN mot m ON em.mot_id = m.mot_id
    WHERE q.user_id = :user_id
    """)

    result = conn.execute(query, {"user_id": user_id})
    feedback = {row.mot_id: row.scale for row in result}
    conn.close()
    return feedback


def calculate_recommendation_score(row, user_level, basic_mastery, total_words_seen, user_feedback, is_new_user):
    """
    Calculates the recommendation score for a word.

    Args:
        row (pd.Series): A row from the DataFrame containing word data.
        user_level (int): The user's level.
        basic_mastery (float): The user's basic mastery level.
        total_words_seen (int): The total number of words seen by the user.
        user_feedback (dict): The user's feedback on words.
        is_new_user (bool): Whether the user is new.

    Returns:
        float: The recommendation score for the word.
    """

    prediction = row['prediction']
    difficulty = row['niv_diff_id']
    times_seen = row['times_seen']
    days_since_last_seen = row['days_since_last_seen']
    is_basic = row['category'] == 'basique'
    frequence = row['frequence']

    difficulty_factor = 1 - abs(difficulty - user_level) / max(user_level, 5)
    novelty = 1 / (times_seen + 1)
    recency = 1 / (days_since_last_seen + 1)
    difficulty_score = 1 - (frequence / 100) if frequence is not None and frequence != 0 else 0.5
    basic_bonus = 1.5 + (1 - basic_mastery) if is_basic else 1

    feedback_factor = 1
    if row['mot_id'] in user_feedback:
        if user_feedback[row['mot_id']] == 'trop facile':
            feedback_factor = 0.8
        elif user_feedback[row['mot_id']] == 'trop difficile':
            feedback_factor = 1.2

    experience_factor = 1 / (total_words_seen + 1)
    prediction_factor = 1 - prediction

    score = (
                    difficulty_factor * 0.2 +
                    novelty * 0.2 +
                    recency * 0.1 +
                    difficulty_score * 0.2 +
                    prediction_factor * 0.2 +
                    experience_factor * 0.1
            ) * basic_bonus * feedback_factor

    if is_new_user:
        if is_basic:
            score *= 1.5
        if difficulty <= 2:
            score *= 1.3

    return score


def select_diverse_words(df, num_words, basic_mastery, is_new_user):
    """
    Selects a diverse set of words for recommendations.

    Args:
        df (pd.DataFrame): The DataFrame containing word data.
        num_words (int): The number of words to select.
        basic_mastery (float): The user's basic mastery level.
        is_new_user (bool): Whether the user is new.

    Returns:
        pd.DataFrame: A DataFrame containing the selected words.
    """

    # Group by word_id and aggregate the other columns
    df_grouped = df.groupby('mot_id').agg({
        'mot': 'first',
        'category': lambda x: list(set(x)),
        'subcategory': lambda x: list(set(x)),
        'niv_diff_id': 'first',
        'url_sign': 'first',
        'url_def': 'first',
        'recommendation_score': 'max'
    }).reset_index()

    num_basic_words = max(5, int(num_words * 0.5)) if is_new_user else max(3, int(num_words * 0.3))
    num_other_words = num_words - num_basic_words

    # Filter level 3 words for new users
    if is_new_user:
        df_grouped = df_grouped[df_grouped['niv_diff_id'] <= 2]

    # Adding a random factor
    df_grouped['random_factor'] = np.random.rand(len(df_grouped))
    df_grouped['final_score'] = df_grouped['recommendation_score'] * 0.7 + df_grouped['random_factor'] * 0.3

    # Select basic words
    basic_words = df_grouped[df_grouped['category'].apply(lambda x: 'basique' in x)].nlargest(num_basic_words,
                                                                                              'final_score')

    # Select other words
    other_words = df_grouped[~df_grouped['mot_id'].isin(basic_words['mot_id'])].nlargest(num_other_words, 'final_score')

    # Combining and mixing results
    recommended_words = pd.concat([basic_words, other_words]).sample(frac=1)

    return recommended_words


def get_word_recommendations(user_id: str, pipeline, num_words: int = 10):
    """
    Generates word recommendations for a user.

    Args:
        user_id (str): The ID of the user.
        pipeline (Pipeline): The machine learning pipeline for generating predictions.
        num_words (int): The number of words to recommend.

    Returns:
        list: A list of dictionaries containing the recommended words and their details.

    Raises:
        Exception: If there is an error during the recommendation process.
    """

    logger.debug(f"Début de get_word_recommendations pour user_id: {user_id}")
    conn = get_db_connection()
    try:

        user_level, basic_mastery, total_words_seen, max_echelon, is_new_user = get_user_level(user_id)
        user_feedback = get_user_feedback(user_id)

        query = text("""
        SELECT m.mot_id, m.mot, m.niv_diff_id, COALESCE(m.frequence, 0) as frequence, m.gramm_id, ls.url_def, ls.url_sign, 
                c."name" as category,
                sc."name" as subcategory,
                e.echelon_id,
                COALESCE(diff.freqfilms, 0) as freqfilms, 
                COALESCE(diff.freqlivres, 0) as freqlivres, 
                COALESCE(diff.nbr_syll, 0) as nbr_syll, 
                COALESCE(diff.cp_cm2_sfi, 0) as cp_cm2_sfi,
                COALESCE(uwh.times_correct, 0) as times_correct,
                COALESCE(uwh.times_seen, 0) as times_seen,
                COALESCE(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - uwh.last_seen)) / 86400, 9999) as days_since_last_seen,
                CURRENT_TIMESTAMP as current_time
            FROM mot m
            LEFT JOIN lsf_signe ls ON m.mot_id = ls.mot_id
            LEFT JOIN mot_categorie mc ON m.mot_id = mc.mot_id
            LEFT JOIN categorie c ON mc.categorie_id = c.categorie_id
            LEFT JOIN mot_subcategory ms ON m.mot_id = ms.mot_id
            LEFT JOIN subcategory sc ON ms.subcat_id = sc.subcat_id
            LEFT JOIN echelon_db e ON m.echelon_id = e.echelon_id
            LEFT JOIN diff_ortho diff ON m.mot_id = diff.mot_id
            LEFT JOIN user_word_history uwh ON uwh.user_id = :user_id AND uwh.mot_id = m.mot_id
            WHERE ls.url_sign != 'Non spécifié' OR ls.url_def != 'Non spécifié'
        """)

        df = pd.read_sql(query, conn, params={"user_id": user_id})
        conn.close()

        df['hour'] = pd.to_datetime(df['current_time']).dt.hour
        df['day_of_week'] = pd.to_datetime(df['current_time']).dt.dayofweek
        df['month'] = pd.to_datetime(df['current_time']).dt.month

        for col in ['hour', 'day_of_week', 'month']:
            max_val = 24 if col == 'hour' else 7 if col == 'day_of_week' else 12
            df[f'{col}_sin'] = np.sin(2 * np.pi * df[col] / max_val)
            df[f'{col}_cos'] = np.cos(2 * np.pi * df[col] / max_val)

        if is_new_user:
            df['times_seen'] = 0
            df['times_correct'] = 0
            df['days_since_last_seen'] = 9999


        df['user_feedback'] = 'Bien'
        X_pred = df.drop(['mot_id', 'mot', 'current_time', 'url_sign', 'url_def'], axis=1)

        logger.debug(f"X_pred columns : {X_pred.columns.tolist()}")
        logger.debug(f"Number of columns in X_pred: {len(X_pred.columns)}")
        logger.debug(f"Data types in X_pred : \n{X_pred.dtypes}")

        for col in X_pred.columns:
            unique_values = X_pred[col].unique()
            logger.debug(f"Unique values for {col}: {unique_values}")
            logger.debug(f"Number of unique values for {col}: {len(unique_values)}")

        logger.info(f"Type of pipeline received : {type(pipeline)}")
        if not isinstance(pipeline, Pipeline):
            raise ValueError("The pipeline is not an instance of sklearn.pipeline.Pipeline")

        if not isinstance(pipeline.named_steps['classifier'], XGBClassifier):
            raise ValueError("The classifier in the pipeline is not an instance of XGBClassifier")

        try:
            probabilities = pipeline.predict_proba(X_pred)[:, 1]
        except Exception as e:
            logger.error(f"Prediction error : {str(e)}")
            logger.error(f"Form of X_pred : {X_pred.shape}")
            raise

        df['prediction'] = probabilities
        df['recommendation_score'] = df.apply(
            lambda row: calculate_recommendation_score(row, user_level, basic_mastery, total_words_seen, user_feedback,
                                                       is_new_user),
            axis=1
        )

        recommended_words = select_diverse_words(df, num_words, basic_mastery, is_new_user)
        # Format result
        result = recommended_words.apply(lambda row: {
            'mot_id': row['mot_id'],
            'mot': row['mot'],
            'category': ', '.join(row['category']),
            'subcategory': ', '.join(row['subcategory']),
            'niv_diff_id': row['niv_diff_id'],
            'url_sign': row['url_sign'],
            'url_def': row['url_def'],
            'recommendation_score': row['recommendation_score']
        }, axis=1).tolist()

        return result
    except Exception as e:
        logger.error(f"Error in get_word_recommendations: {str(e)}", exc_info=True)
        raise
    finally:
        conn.close()
