"""
This module serves as the entry point for the Vocabulo-quizz application.

It uses Uvicorn to run the FastAPI application defined in the `api.main` module.

Dependencies:
- uvicorn: ASGI server for serving FastAPI applications.
- api.main: The FastAPI application instance.

Example usage:
    To start the application, run this module directly:

    python main.py

Author: Marianne Arrué
Date: 05/09/24
"""

import uvicorn
from api.main import app
import logging
import sys

# Configuration du logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('app.log')
    ]
)


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
    logger = logging.getLogger(__name__)
