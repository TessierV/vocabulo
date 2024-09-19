"""
This module provides the functionality to perform Optical Character Recognition (OCR) on images using a finetuned Tesseract model.

The module includes the following functionalities:
- Saving the image to a temporary file.
- Running Tesseract OCR on the saved image to extract text.
- Handling errors during the OCR process.

Dependencies:
- os: Module for interacting with the operating system.
- subprocess: Module for running subprocesses.
- config: Module for loading Tesseract configuration parameters.

Functions:
- perform_ocr(image): Performs OCR on the provided image and returns the extracted text.

Example usage:
    To perform OCR on an image, call the `perform_ocr` function:

    extracted_text = perform_ocr(image)

    This will return the text extracted from the image.

Author: Marianne Arrué
Date: 29/08/24
"""

import os
import subprocess
from config import TESSERACT_CMD, TESSDATA_PREFIX, FINETUNED_MODEL


def perform_ocr(image):
    """
        Perform Optical Character Recognition (OCR) on the provided image.

    This function saves the image to a temporary file and uses Tesseract
    to extract text from it.
    The extracted text is then returned.

    :param image: (Image): The image to perform OCR on.

    :return: str: The text extracted from the image.

    :raises:
            ValueError: If the image is not valid or if there is an error during OCR processing.
    """
    if image is None:
        raise ValueError("The provided image is not valid")

    temp_image_path = "temp_image.png"
    try:
        # Save the image to a temporary file
        image.save(temp_image_path)

        # Run Tesseract OCR on the saved image
        result = subprocess.run(
            [TESSERACT_CMD,
             temp_image_path,
             'stdout',
             '-l',
             FINETUNED_MODEL,
             '--oem',
             '3',
             '--psm',
             '3'],
            capture_output=True,
            text=True,
            encoding='utf-8',
            check=True,
            env=dict(os.environ, TESSDATA_PREFIX=TESSDATA_PREFIX)
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        raise ValueError(f"Error during Tesseract execution : {e.stderr}")
    except Exception as e:
        raise ValueError(f"Unexpected error during OCR : {str(e)}")
    finally:
        # Remove the temporary image file
        if os.path.exists(temp_image_path):
            os.remove(temp_image_path)
