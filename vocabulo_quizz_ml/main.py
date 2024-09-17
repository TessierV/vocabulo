"""
This module provides the main API endpoints for the Vocabulo Quizz application using FastAPI.

Modules:
    fastapi: Provides the FastAPI framework for building the API.
    pydantic: Provides data validation and settings management using Python type annotations.
    core.recommendations: Contains functions to generate word recommendations.
    core.model_loader: Contains functions to load the machine learning model.
    logging: Provides a way to configure and use logging in the application.

Classes:
    UserRequest: A Pydantic model representing the user request.

Functions:
    get_recommendations(request: UserRequest): Endpoint to get word recommendations for a user.
    health_check(): Health check endpoint to verify if the service is running.

Author: Marianne ArruÃ©
Date: 07/09/24
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from uuid import UUID
from core.recommendations import get_word_recommendations
from core.model_loader import load_model
from utils.helpers import user_exists
import logging

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI()

class UserRequest(BaseModel):
    """
    Pydantic model for user request.

    Attributes:
        user_id (str): The ID of the user making the request.
    """
    user_id: str

@app.post("/get_recommendations")
async def get_recommendations(request: UserRequest):
    """
    Endpoint to get word recommendations for a user.

    Args:
        request (UserRequest): The request object containing the user ID.

    Returns:
        dict: A dictionary containing the recommendations.

    Raises:
        HTTPException: If there is an error generating recommendations.
    """
    logger.info(f"Received recommendation request for user: {request.user_id}")
    try:
        # validate user ID
        user_id = UUID(request.user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    # Check if user exists
    logger.info(f"Checking if user exists: {user_id}")
    if not user_exists(str(user_id)):
        logger.warning(f"User not found: {user_id}")
        raise HTTPException(status_code=404, detail="User not found")
    logger.info(f"User found, generating recommendations: {user_id}")

    try:
        pipeline = load_model()
        logger.info("Model loaded and pipeline created successfully")

        recommendations = get_word_recommendations(request.user_id, pipeline)
        logger.info(f"Generated recommendations for user {request.user_id}")

        return {"recommendations": recommendations}
    except Exception as e:
        logger.exception(f"Error generating recommendations for user {request.user_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/health")
async def health_check():
    """
    Health check endpoint to verify if the service is running.

    Returns:
        dict: A dictionary containing the status of the service.
    """
    return {"status": "healthy"}
