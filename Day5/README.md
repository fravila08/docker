# Lesson: Deploying a Full Stack Application with Django API and Vite React.js on Ubuntu EC2

## Introduction

In this lesson, we will learn how to deploy a full-stack application consisting of a Django API with a PostgreSQL database and a Vite React.js front end on an Ubuntu EC2 instance. We will cover the fundamentals of how the internet works, how to set up an Ubuntu EC2 instance with a PEM certificate, and how to configure and deploy the Django API and Vite React.js projects using Docker Compose and Nginx. Additionally, we'll explore Gunicorn and Nginx in detail and add an HTTPS certificate to secure the deployed project using Certbot.

## Table of Contents

1. Understanding a Deployed Site on the Internet
   - How the Internet Works: HTTP, IP Addresses, and DNS
   - Domain Names and DNS Resolution

2. Setting Up Ubuntu EC2 Instance with PEM Certificate
   - Creating an Ubuntu EC2 t2.micro Instance
   - Managing PEM Certificates for SSH Access
   - Connecting to EC2 Instance via SSH

3. Configuring Django API and Vite React.js Projects
   - Django API Configuration
   - Vite React.js Configuration
   - Handling CORS (Cross-Origin Resource Sharing)

4. Building Docker Compose for Full Stack Application
   - Defining Docker Compose File
   - Deploying PostgreSQL Database
   - Configuring Nginx for URL Routing
   - Running Django API with Gunicorn

5. Adding HTTPS Certificate with Certbot
   - Installing Certbot on Ubuntu EC2 Instance
   - Obtaining SSL Certificate for Domain
   - Configuring Nginx with SSL Certificate

## 1. Understanding a Deployed Site on the Internet

### How the Internet Works: HTTP, IP Addresses, and DNS

Before we dive into deployment, let's understand the basics of how the internet works. The Internet is a global network of interconnected computers that communicate through various protocols. HTTP (Hypertext Transfer Protocol) is the foundation of data communication on the web. When a user accesses a website, their browser sends an HTTP request to a server's IP address.

### Domain Names and DNS Resolution

IP addresses are numerical representations of server locations. To make it easier for users to access websites, domain names (e.g., www.example.com) are used as human-readable addresses. Domain Name System (DNS) translates domain names to IP addresses. DNS resolution is the process of finding the IP address associated with a domain name.

## 2. Setting Up Ubuntu EC2 Instance with PEM Certificate

### Creating an Ubuntu EC2 t2.micro Instance

To deploy our application, we need an Ubuntu EC2 instance. We'll create an `t2.micro` instance using the AWS Management Console and generate a PEM certificate for SSH access.

1. Sign in to your AWS Management Console.
2. Navigate to EC2 Dashboard and click "Launch Instance."
3. Choose "Ubuntu Server 20.04 LTS" as the instance type.
4. Select "t2.micro" as the instance size and follow the prompts to configure the instance.
5. In the "Security Group" settings, open ports 22 (SSH), 80 (HTTP), and 443 (HTTPS).
6. Launch the instance and download the PEM certificate.

### Managing PEM Certificates for SSH Access

Keep your PEM certificate securely, as it provides access to your EC2 instance. To use the PEM certificate, set appropriate permissions:

```bash
chmod 400 your-aws.pem
```

### Connecting to EC2 Instance via SSH

To connect to the EC2 instance via SSH, use the following command:

```bash
ssh -i your-aws.pem ubuntu@your-ec2-instance-public-ip
```

Replace `your-aws.pem` with the actual PEM certificate file and `your-ec2-instance-public-ip` with the EC2 instance's public IP address.

## 3. Configuring Django API and Vite React.js Projects

### Django API Configuration

Configure your Django API project to use environment variables for database settings, static files, and allowed hosts. Ensure the `DEBUG` setting is set to `False` for production.

1. Update `settings.py`:

```python
# settings.py

import os

# Allow all hosts in production (replace with your domain in production)
ALLOWED_HOSTS = ['*']

# Database settings using environment variables
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'mydb'),
        'USER': os.environ.get('DB_USER', 'myuser'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'mypassword'),
        'HOST': os.environ.get('DB_HOST', 'db'),  # Use the Docker service name
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# Other settings...
```

2. Use environment variables for static and media files in `settings.py`:

```python
# settings.py

# Static and media files settings
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

### Vite React.js Configuration

Update your Vite React.js project's `vite.config.js` file to use the correct public path and production mode settings.

1. Update `vite.config.js`:

```javascript
// vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({
  // Set public path for production (replace with your domain in production)
  base: '/',

  // Other Vite configurations...
});
```

### Handling CORS (Cross-Origin Resource Sharing)

To allow the React front end to communicate with the Django API, set up CORS configuration in Django settings to whitelist the React front end's domain.

1. Install `django-cors-headers`:

```bash
pip install django-cors-headers
```

2. Update `settings.py`:

```python
# settings.py

INSTALLED_APPS = [
    # Other apps...
    'corsheaders',
]

MIDDLEWARE = [
    # Other middlewares...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

# Allow React front end domain for CORS (replace with your React front end domain)
CORS_ALLOWED_ORIGINS = [
    'http://your-react-front-end-domain.com',
]
```

## 4. Building Docker Compose for Full Stack Application

### Defining Docker Compose File

Create a `docker-compose.yml` file in the root of your project to define the services.

1. Create `docker-compose.yml`:

```yaml
# docker-compose.yml

version: '3'

services:
  django-api:
    build:
      context: ./django_api_project
    expose:
      - 8000
    environment:
      - DB_NAME=mydb
      - DB_USER=myuser
      - DB_PASSWORD=mypassword
      - DB_HOST=db
      - DB_PORT=5432
    # Other Django API configurations...

  react-app:
    build:
      context: ./vite_react_app
    expose:
      - 80
    # Other Vite React.js configurations...

  db:
    image: postgres:latest
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES

_USER=myuser
      - POSTGRES_PASSWORD=mypassword
    volumes:
      - db-data:/var/lib/postgresql/data

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - django-api
      - react-app

volumes:
  db-data:
```

### Deploying PostgreSQL Database

Add the PostgreSQL service to the Docker Compose file. Set the environment variables for the database name, user, and password.

1. Ensure your Django API project uses the environment variables for the database settings.

### Configuring Nginx for URL Routing

Set up an Nginx service in Docker Compose to handle URL routing. Use `location` blocks to route requests to different services based on URL patterns.

1. Create an Nginx configuration file (`default.conf`) in a folder named `nginx` at the root of your project:

```nginx
# default.conf

server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or EC2 instance public IP

    location /api/ {
        proxy_pass http://django-api:8000/;
    }

    location / {
        proxy_pass http://react-app/;
    }
}
```

### Running Django API with Gunicorn

Configure the Django API service to use Gunicorn as the WSGI server for production.

1. Ensure your Django API project includes Gunicorn in the `requirements.txt`.

2. Update the Dockerfile for the Django API project (`django_api_project/Dockerfile`):

```Dockerfile
# Django API Dockerfile

# ...

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "my_django_api.wsgi:application"]
```

## 5. Adding HTTPS Certificate with Certbot

### Installing Certbot on Ubuntu EC2 Instance

1. Connect to your Ubuntu EC2 instance via SSH.

2. Install Certbot and the Nginx plugin:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

### Obtaining SSL Certificate for Domain

1. Run Certbot to obtain an SSL certificate for your domain:

```bash
sudo certbot --nginx -d your-domain.com
```

Follow the prompts and choose whether to redirect HTTP traffic to HTTPS.

### Configuring Nginx with SSL Certificate

1. Certbot automatically updates Nginx configuration with SSL settings. Verify the SSL configuration in your Nginx `default.conf`:

```nginx
# default.conf

server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or EC2 instance public IP

    location /api/ {
        proxy_pass http://django-api:8000/;
    }

    location / {
        proxy_pass http://react-app/;
    }

    # SSL Settings
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem
}
```

## Conclusion

Congratulations! You've learned how to deploy a full-stack application with Django API and Vite React.js on an Ubuntu EC2 instance. We covered the basics of how the internet works, setting up an Ubuntu EC2 instance with a PEM certificate, configuring Django and Vite React.js projects, and using Docker Compose and Nginx for deployment. Additionally, we explored Gunicorn and Nginx in detail and added an HTTPS certificate to secure the deployed project using Certbot.

Remember to secure your Ubuntu EC2 instance and update your DNS settings to point to your EC2 instance's public IP for a fully functioning deployed application. Happy coding!