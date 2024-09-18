FROM python:3.9

# Install dependence
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-fra \
    libtesseract-dev

# WORKDIR in container
WORKDIR /app
COPY . /app
ENV PYTHONPATH=/app

# copy file and load requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# spacy install + load model
RUN python -m spacy download fr_core_news_lg

# copy all files in container
COPY . .requirements


# command to run API
CMD ["python", "-m", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]