"""
This module provides the functionality to handle and process image files.

The module includes the following functionalities:
- Handling the format of uploaded image files.
- Converting HEIC files to a supported format if necessary.
- Resizing images that exceed the maximum allowed size.

Dependencies:
- PIL: Python Imaging Library for opening, manipulating, and saving many different image file formats.
- pillow\_heif: Library for handling HEIC image files.
- config: Module for loading configuration parameters such as the maximum image size.

Functions:
- handle\_image\_format(file\_content): Handles the format of the uploaded image file and returns the processed image.
- resize\_image(image): Resizes the image if it exceeds the maximum allowed size.

Example usage:
    To handle and process an uploaded image file, call the `handle_image_format` function:

    processed_image = handle_image_format(file_content)

    This will return the processed image, which can then be used for further processing.

Author: Marianne Arrué
Date: 29/08/24
"""

from PIL import Image, UnidentifiedImageError
import io
import pillow_heif
from config import MAX_IMAGE_SIZE


def handle_image_format(file_content):
    """
        Handle the format of the uploaded image file.

        This function attempts to open the image using Pillow.
         If Pillow cannot identify the image, it tries to process
         it as a HEIC file. The image is then converted to RGB if
         necessary and resized.

    :param file_content: (bytes): The content of the uploaded image file.

    :return: Image: The processed image.

    :raises:
        ValueError: If the image format is not supported or if there is an error opening the image.
    """
    image = None
    try:
        # Try to open the image with Pillow
        image = Image.open(io.BytesIO(file_content))
    except UnidentifiedImageError:
        # If Pillow cannot identify the image, try to process it as HEIC
        try:
            heif_file = pillow_heif.read_heif(io.BytesIO(file_content))
            image = Image.frombytes(
                heif_file.mode,
                heif_file.size,
                heif_file.data,
                "raw",
                heif_file.mode,
                heif_file.stride,
            )
        except Exception as e:
            raise ValueError(f"Image format not supported : {str(e)}")
    except Exception as e:
        raise ValueError(f"Error opening image : {str(e)}")

    if image is None:
        raise ValueError("Unable to create a valid image from the file supplied")

    # Convert the image to RGB if it is in RGBA mode
    if image.mode == 'RGBA':
        image = image.convert('RGB')

    # Resize the image if necessary
    image = resize_image(image)

    return image


def resize_image(image):
    """
        Resize the image if it exceeds the maximum size.

    :param image: (Image): The image to be resized.

    :return: Image: The resized image.
    """
    width, height = image.size
    if max(width, height) > MAX_IMAGE_SIZE:
        scale = MAX_IMAGE_SIZE / max(width, height)
        new_width = int(width * scale)
        new_height = int(height * scale)
        image = image.resize((new_width, new_height))
    return image
