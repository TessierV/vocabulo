"""
This module serves as the entry point for the Vocabulo-junior application.

It uses Uvicorn to run the FastAPI application defined in the `api.main` module.

Dependencies:
- uvicorn: ASGI server for serving FastAPI applications.
- api.main: The FastAPI application instance.

Example usage:
    To start the application, run this module directly:

    python main.py

Author: Marianne Arrué
Date: 29/08/24
"""

import uvicorn
from api.main import app

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
