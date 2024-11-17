# Fantastic Tribble

This project leverages **Docker Compose** to manage multiple services, including the frontend, backend, database, and Nginx. Follow the instructions below to set up and run the project.

## Prerequisites

Before starting, ensure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Environment Configuration

This project requires environment variables to be configured for each service. Below are the required `.env` files and their contents:

### 1. Backend .env
Create a file named `backend-container/.env` with the following contents:

```
# Backend Environment Variables
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
DEBUG=True
SQL_ENGINE=django.db.backends.postgresql
SECRET_KEY=django-insecure-lj@ibn3led43!#rf61!^(cn+=lzp
SQL_DATABASE_NAME=database1
SQL_DATABASE_USER=user1
SQL_DATABASE_USER_PASSWORD=password1
SQL_HOST=db
SQL_PORT=5432
```

### 2. Database .env

Create a file named `postgres-container/.env` with the following contents:
```
# PostgreSQL Environment Variables
POSTGRES_PASSWORD=password1
POSTGRES_DB=database1
POSTGRES_USER=user1
```

## Running the Project

Follow these steps to build and run the project:

1. Clone the repository
```
git clone https://github.com/amasyaska/fantastic-tribble.git
cd fantastic-tribble
```
2. Ensure all .env files are created and placed in the appropriate directories as described above.

3. Build and start the containers:
```
docker-compose up --build
```
4. Access the services:
  - Frontend: http://localhost:3000
  - Backend (via Nginx): http://localhost:8080
  - Database: Accessible internally at db:5432.

## Stopping the Containers

To stop all running containers, use the following command:
```
docker-compose down
```
## Troubleshooting

- If containers fail to start:
  - Ensure .env files are correctly set up.
  - Check for port conflicts with other running services.

- To remove all containers, volumes, and images:
  ```
  docker-compose down --volumes --rmi all
  ```
## Project Structure

Here’s an overview of the project structure:

```
├── docker-compose.yaml
├── frontend-container/
│   ├── Dockerfile
│   ├── .env
├── backend-container/
│   ├── Dockerfile
│   ├── .env
├── postgres-container/
│   ├── .env
├── nginx-container/
│   ├── Dockerfile
└── README.md
```
