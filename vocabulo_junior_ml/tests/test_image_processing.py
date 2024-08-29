"""
This module contains unit tests for the image processing functionalities.

The module includes the following functionalities:
- Generating an in-memory image for testing.
- Testing the handling of different image formats (JPEG, HEIC, invalid formats).
- Testing the resizing of images that exceed the maximum size.

Dependencies:
- unittest: Unit testing framework.
- PIL: Python Imaging Library for image processing.
- io: Core library for handling input and output.
- core.image_processing: Module for image processing functions.
- config: Configuration module for application settings.

Classes:
- TestImageProcessing: Contains unit tests for image processing functionalities.

Functions:
- setUp(self): Sets up the in-memory image for testing.
- test_handle_image_format_jpeg(self): Tests processing a JPEG image.
- test_handle_image_format_heic(self): Tests processing a HEIC image.
- test_handle_image_format_invalid(self): Tests processing an unsupported image format.
- test_resize_image(self): Tests resizing the image if it exceeds the maximum size.
- tearDown(self): Cleans up after tests.

Example usage:
    To run the tests, execute the module as a script:

    python -m unittest test_image_processing.py

Author: Marianne Arrué
Date: 29/08/24
"""

import unittest
from PIL import Image
import io
from core import image_processing
from config import MAX_IMAGE_SIZE


class TestImageProcessing(unittest.TestCase):
    """
        Contains unit tests for the image processing functionalities.

        Methods:
        - setUp(self): Sets up the in-memory image for testing.
        - test_handle_image_format_jpeg(self): Tests processing a JPEG image.
        - test_handle_image_format_heic(self): Tests processing a HEIC image.
        - test_handle_image_format_invalid(self): Tests processing an unsupported image format.
        - test_resize_image(self): Tests resizing the image if it exceeds the maximum size.
        - tearDown(self): Cleans up after tests.
    """

    def setUp(self):
        """
            Sets up the in-memory image for testing.

            This method generates an in-memory image for testing purposes.
        """
        # Generate an in-memory image for testing
        self.image_data = io.BytesIO()
        self.image = Image.new('RGB', (100, 100), color='red')
        self.image.save(self.image_data, format='JPEG')
        self.image_data.seek(0)  # Reset stream position

    def test_handle_image_format_jpeg(self):
        """
        Tests processing a JPEG image.

        This method verifies that the `handle_image_format` function correctly processes a JPEG image.
        """
        image = image_processing.handle_image_format(self.image_data.getvalue())
        self.assertIsInstance(image, Image.Image, "The returned object is not an instance of PIL.Image.Image")
        self.assertEqual(image.mode, 'RGB', "The image is not in RGB mode")
        self.assertEqual(image.size, (100, 100), "The image size is not correct")

    def test_handle_image_format_heic(self):
        """
        Tests processing a HEIC image (simulated here with a JPEG image).

        This method verifies that the `handle_image_format` function correctly processes a HEIC image.
        """
        heic_file_path = './images/sample.HEIC'
        with open(heic_file_path, 'rb') as f:
            heic_image_data = f.read()
        image = image_processing.handle_image_format(heic_image_data)
        self.assertIsInstance(image, Image.Image, "The returned object is not an instance of PIL.Image.Image")
        self.assertEqual(image.mode, 'RGB', "The image is not in RGB mode")
        self.assertGreater(image.size[0], 0, "The width of the image is incorrect")
        self.assertGreater(image.size[1], 0, "The height of the image is incorrect")

    def test_handle_image_format_invalid(self):
        """
        Tests processing an unsupported image format.

        This method verifies that the `handle_image_format` function raises a ValueError for unsupported image formats.
        """
        with self.assertRaises(ValueError):
            image_processing.handle_image_format(b'invalid image data')

    def test_resize_image(self):
        """
        Tests resizing the image if it exceeds the maximum size.

        This method verifies that the `handle_image_format` function correctly resizes an image that exceeds the maximum size.
        """
        large_image = Image.new('RGB', (2000, 2000), color='blue')
        with io.BytesIO() as buffer:
            large_image.save(buffer, format='JPEG')
            buffer.seek(0)
            image = image_processing.handle_image_format(buffer.read())
            self.assertLessEqual(max(image.size), MAX_IMAGE_SIZE, "The image was not resized correctly")

    def tearDown(self):
        """
            Cleans up after tests.

            This method is a placeholder for any cleanup operations after each test.
        """
        pass


if __name__ == '__main__':
    unittest.main()
