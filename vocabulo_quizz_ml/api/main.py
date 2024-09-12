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

Author: Marianne Arrué
Date: 07/09/24
"""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from uuid import UUID
from core.recommendations import get_word_recommendations
from core.model_loader import load_model
from utils.helpers import user_exists
import logging
from jose import JWTError, jwt

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI()

# JWT configuration
SECRET_KEY = "your_secret_key"  # Replace with your actual secret key
ALGORITHM = "HS256"

# OAuth2 setup
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserRequest(BaseModel):
    """
    Pydantic model for user request.

    Attributes:
        user_id (str): The ID of the user making the request.
    """
    user_id: str

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Extracts and validates the current user from the provided JWT token.

    Args:
        token (str): The JWT token provided by the user for authentication.

    Returns:
        str: The user ID extracted from the token if the token is valid and the user exists.

    Raises:
        HTTPException: If the token is invalid, expired, or the user does not exist.
    """
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return user_id


@app.post("/get_recommendations")
async def get_recommendations(request: UserRequest, current_user: str = Depends(get_current_user)):
    """
    Endpoint to get word recommendations for a user.

    Args:
        request (UserRequest): The request object containing the user ID.
        current_user (str): The authenticated user's ID.

    Returns:
        dict: A dictionary containing the recommendations or if the user is not authorized.

    Raises:
        HTTPException: If there is an error generating recommendations.
    """
    logger.info(f"Received recommendation request for user: {request.user_id}")
    try:
        # validate user ID
        user_id = UUID(request.user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")

    # Check if the authenticated user matches the requested user
    if request.user_id != current_user:
        raise HTTPException(status_code=403, detail="Not authorized to access this user's data")

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