# Lesson: Deploying a Django API Project with PostgreSQL Database using Docker

## Introduction to Docker and Django

Docker is a platform that simplifies the process of creating, deploying, and running applications in containers. Containers provide an isolated environment that packages the application along with its dependencies, ensuring consistency and portability across different environments.

Django is a popular Python web framework for building web applications and APIs. In this lesson, we'll learn how to deploy a Django API project connected to a PostgreSQL database using Docker.

## Prerequisites

Before proceeding with this lesson, make sure you have the following:

- Basic knowledge of Django and Python.
- Docker installed on your local machine. You can download Docker from the [official website](https://www.docker.com/get-started)

## Objectives

By the end of this lesson, you should be able to:

1. Create a Dockerfile to define the configuration of the Django application container.
2. Build a Docker image from the Dockerfile.
3. Set up a PostgreSQL database container and connect it to the Django API container.
4. Use basic Docker commands to manage containers effectively.
5. Deploy and run the Django API project connected to the PostgreSQL database using Docker.

## Concepts and Steps

### Docker Basics

#### 1. Dockerfile

A Dockerfile is a text file that contains a set of instructions to build a Docker image. The image serves as a blueprint for creating containers. Each instruction in the Dockerfile defines a layer in the image, and Docker uses caching to optimize the build process.

#### 2. Docker Image

A Docker image is a read-only template that includes the application code and all its dependencies. It is created from the Dockerfile and serves as the foundation for running containers.

#### 3. Docker Container

A Docker container is an instance of a Docker image that runs as a separate, isolated process. Containers provide an environment where the application can run consistently, regardless of the host system.

### Step 1: Configure Django Project

Before we proceed with Docker, make sure your Django API project is configured to work with PostgreSQL.

Update the Django settings to use PostgreSQL as the database backend:

```python
# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
        'USER': 'myuser',
        'PASSWORD': 'mypassword',
        'HOST': 'db',  # The hostname of the PostgreSQL container (will be explained later)
        'PORT': '5432',
    }
}
```

### Step 2: Create the Dockerfile

Now, let's create a Dockerfile to define the configuration of the Django API container.

Create a new file named `Dockerfile` in the root directory of your Django API project. Open the `Dockerfile` and add the following content:

```Dockerfile
# Use the official Python base image
FROM python:3.9

# Set environment variables for the Django application
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory inside the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    postgresql-client

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the entire Django project to the container
COPY . .

# Expose port 8000 for Django development server
EXPOSE 8000

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

#### Explanation:

- `FROM python:3.9`: This line sets the base image for our Docker image, using the official Python image.

- `ENV PYTHONDONTWRITEBYTECODE 1`: Prevents Python from writing `.pyc` files to improve startup time.

- `ENV PYTHONUNBUFFERED 1`: Ensures that Python output is sent straight to the terminal without being buffered.

- `WORKDIR /app`: Sets the working directory inside the container to `/app`.

- `RUN apt-get update && apt-get install -y --no-install-recommends gcc postgresql-client`: Installs system dependencies required for PostgreSQL.

- `COPY requirements.txt .`: Copies the `requirements.txt` file from the host machine to the container's working directory.

- `RUN pip install --upgrade pip && pip install -r requirements.txt`: Installs Python dependencies from `requirements.txt`.

- `COPY . .`: Copies the entire Django project from the host machine to the container's working directory.

- `EXPOSE 8000`: Exposes port 800

0 on the container to allow access to the Django development server.

- `CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]`: Specifies the command to run when the container starts, which starts the Django development server.

### Step 3: Build the Docker Image

With the Dockerfile in place, we can now build the Docker image for our Django API project.

Open the terminal, navigate to the root directory of your Django API project (where the `Dockerfile` is located), and run the following command:

```bash
docker build -t my-django-api .
```

#### Explanation:

- `docker build`: This is the command to build a Docker image.
- `-t my-django-api`: The `-t` flag is used to tag the image with a name (in this case, `my-django-api`).

This command will build the Docker image `my-django-api` using the Dockerfile located in the current directory.

### Step 4: Run the Django API Container

Now that both the Docker images are built and the PostgreSQL container is running, we can create and run a Docker container for the Django API project and connect it to the PostgreSQL database.

Run the following command:

```bash
docker run -d -p 8000:8000 --name my-django-app --link my-postgres-db:db my-django-api
```

#### Explanation:

- `docker run`: This command creates and runs a Docker container based on the `my-django-api` image.
- `-d`: The `-d` flag runs the container in detached mode, which means it runs in the background.
- `-p 8000:8000`: The `-p` flag maps port 8000 from the container to port 8000 on your local machine, allowing you to access the Django API at `localhost:8000`.
- `--name my-django-app`: The `--name` flag assigns a name (`my-django-app`) to the container for easier identification.
- `--link my-postgres-db:db`: Links the Django API container to the PostgreSQL container with the name `my-postgres-db` and an alias `db`. This allows the Django API container to access the PostgreSQL database.
- `my-django-api`: The name of the Docker image to use when creating the container.

### Step 5: Migrations & Fixtures

The PostgreSQL database and Django API containers are now linked together but our migrations are not reflected on the database. We will have to enter the Django API container and migrate our migrations from our Django project

```bash
docker exec -it my-django-app python manage.py migrate
```

Now that all of our migrations are within our database let's finally load any fixture data we may have to ensure our api is working properly.

```bash
docker exec -it my-django-app python manage.py loaddata list.json
docker exec -it my-django-app python manage.py loaddata task.json
docker exec -it my-django-app python manage.py loaddata subtasks.json
```

### Step 6: Access the Django API

Congratulations! Your Django API project connected to the PostgreSQL database is now running in a Docker container and is accessible at `localhost:8000` on your local machine.

You can interact with the Django API and perform API requests using tools like `curl` or Postman.

### Step 7: Exiting the Docker Container

If you want to stop the Docker container, you can use the `docker stop` command. First, find the container ID or name:

```bash
docker ps
```

Locate the container ID or name in the output. Then, stop the container:

```bash
docker stop my-django-app
```

## Conclusion

In this lesson, you've learned how to deploy a Django API project connected to a PostgreSQL database using Docker. You've seen the essential Docker commands, what each command does, and how to set up the Django project to work with Docker.

Docker simplifies the deployment process and ensures consistency and portability across various environments. Now you can use Docker to deploy and manage Django applications with ease. Happy coding!
