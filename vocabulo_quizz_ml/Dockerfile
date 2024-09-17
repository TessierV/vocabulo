FROM python:3.9-slim

WORKDIR /app

# Copier les fichiers de requirements et installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le dossier models explicitement
COPY ./models /app/models

# Copier le reste des fichiers
COPY . .

# Définir le PYTHONPATH
ENV PYTHONPATH=/app

EXPOSE 8000

# Commande pour exécuter l'API
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]