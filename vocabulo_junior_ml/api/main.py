"""
This module provides the main API endpoints for processing images using FastAPI.

The module includes the following functionalities:
- Handling image uploads and processing them.
- Performing OCR (Optical Character Recognition) on the uploaded images.
- Cleaning and normalizing the extracted text.
- Processing the normalized text to extract meaningful information.

Dependencies:
- FastAPI: A modern, fast (high-performance), web framework for building APIs with Python 3.6+.
- core.image_processing: Module for handling image format conversions and validations.
- core.ocr: Module for performing OCR on images.
- core.text_processing: Module for cleaning, normalizing, and processing text.

Endpoints:
- POST /process-image/: Endpoint to process an uploaded image file and return the extracted and processed text.

Example usage:
    To use this API, send a POST request to the /process-image/ endpoint with an image file.
    The response will contain the original text extracted from the image and the processed results.

Author: Marianne Arrué
Date: 29/08/24
"""


from fastapi import FastAPI, File, UploadFile, HTTPException
from core.image_processing import handle_image_format
from core.ocr import perform_ocr
from core.text_processing import clean_ocr_text, normalize_text, process_text
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request

app = FastAPI()

@app.middleware("http")
async def debug_request(request: Request, call_next):
    print(f"Request: {request.method} {request.url}")
    print(f"Headers: {request.headers}")
    response = await call_next(request)
    return response


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],  # Assurez-vous que POST est inclus
    allow_headers=["*"],
)

@app.post("/process-image/")
async def process_image(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    print(f"Content-Type: {file.content_type}")
    """
        Endpoint to process an uploaded image file

    :param file: The image uploaded by the user

    :returns: a dictionary containing the original text extracted
        from the image and the processed results
    """
    contents = await file.read()

    try:
        # Handle image format
        image = handle_image_format(contents)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error has occurred: {str(e)}")

    try:
        # Perform OCR on the image
        text = perform_ocr(image)
        # Clean the OCR text
        text_clean = clean_ocr_text(text)
        # Normalize the cleaned text
        text_norm = normalize_text(text_clean)

        # Process the normalized text
        processed_results = process_text(text_norm)

        return {"original_text": text, "processed_results": processed_results}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during image processing :  {str(e)}")
