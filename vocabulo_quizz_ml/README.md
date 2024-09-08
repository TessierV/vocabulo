# Vocabulo Quizz ML

This project is a containerized API for word recommendations using machine learning for the Vocabulo Quizz application.

## Prerequisites

- Docker
- Docker Compose

## Installation

1. Create a shared Docker network:
   ```
   docker network create shared_ml_network
   ```

2. Configure environment variables:
   Create a `.env` file in the project root with the necessary variables (see Configuration section).

## Configuration

Create a `.env` file in the project root with the following content:

```
POSTGRES_DB=your_db_name
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
DB_HOST=db
```

## Project Structure

- `api/`: Contains FastAPI endpoints
- `core/`: Main business logic and machine learning functions
- `models/`: ML models and configurations
- `tests/`: Unit and integration tests
- `utils/`: Utility functions and helpers
- `config.py`: Global project configuration
- `Dockerfile`: Instructions to build the Docker image
- `docker-compose.yml`: Docker services configuration

## Execution

To build and launch the API:

```
docker-compose build
docker-compose up -d
```

The API will be accessible at: `http://localhost:8000`

## API Usage

You can access the Swagger documentation of the API at: `http://localhost:8000/docs`

The main endpoint for word recommendations is:

```
POST /get_recommendations
{
  "user_id": "your-user-id-here"
}
```

## Tests

To run tests in the container:

```
docker-compose run --rm api python -m pytest
```

## Logs

To view API logs:

```
docker-compose logs api
```

## Stopping Services

To stop all services:

```
docker-compose down
```

## Contribution

Marianne Arrué

## Notes

- Ensure the Docker network `shared_ml_network` is created before launching services.
- The ML models are included in the container, so no local installation of additional ML libraries is required.
- The PostgreSQL database should be configured separately and connected to the same Docker network.
- This API is designed to work in conjunction with the main Vocabulo Quizz application.
