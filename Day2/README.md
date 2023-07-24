# Lesson: Deploying a Simple Vite + React.js Project in a Docker Container

## Introduction to Docker

Docker is a powerful platform that allows developers to create, deploy, and run applications in containers. Containers are lightweight, isolated environments that package the application code, runtime, libraries, and dependencies. Docker provides consistency across different environments, making it easier to deploy applications with ease.

In this lesson, we will learn how to deploy a simple Vite + React.js project in a Docker container, which will be bound to port 80 on your local machine. We'll cover Docker's basic commands, what each command means, how to interact with Docker containers, and the purpose of each section in the Dockerfile.

## Prerequisites

Before proceeding with this lesson, make sure you have the following:

- Basic knowledge of Vite, React.js, and JavaScript.
- Docker installed on your local machine. You can download Docker from the [official website](https://www.docker.com/get-started)

## Objectives

By the end of this lesson, you should be able to:

1. Understand what Docker is and its role in application deployment.
2. Create a Dockerfile to define the container's configuration.
3. Build a Docker image from the Dockerfile.
4. Run a Docker container to host the Vite + React.js project on port 80.
5. Use basic Docker commands to manage containers effectively.
6. Configure the Vite + React.js project to run in the Docker container.

## Concepts and Steps

### What is Docker?

Docker is an open-source platform that simplifies the process of building, shipping, and running applications as lightweight containers. Containers are isolated environments that contain everything needed to run an application, including code, runtime, system tools, libraries, and settings. Docker enables seamless deployment across various environments, from development to production.

### Docker Basics

#### 1. Dockerfile

A Dockerfile is a text file that contains a set of instructions to build a Docker image. The image serves as a blueprint for creating containers. Each instruction in the Dockerfile defines a layer in the image, and Docker uses caching to optimize the build process.

#### 2. Docker Image

A Docker image is a read-only template that includes the application code and all its dependencies. It is created from the Dockerfile and serves as the foundation for running containers.

#### 3. Docker Container

A Docker container is an instance of a Docker image that runs as a separate, isolated process. Containers provide an environment where the application can run consistently, regardless of the host system.

### Step 1: Configure Vite + React.js Project

Before we build the Docker image, we need to configure the Vite + React.js project to run on a specific port. By default, Vite runs on port 3000 in development mode. To set a different port, update your Vite configuration.

Open the `vite.config.js` (or `vite.config.ts`) file in the root of your Vite + React.js project. Locate the `server` section and update the `port` setting to the desired port (e.g., 4173):

```javascript
// vite.config.js (or vite.config.ts)
export default defineConfig({
  server: {
    host:'0.0.0.0',
    port: 4173,
  },
  plugins:[react()]
});
```

### Step 2: Create the Dockerfile

Now, let's create the Dockerfile to define the configuration of the Docker container.

Create a new file named `Dockerfile` in the root directory of your Vite + React.js project. Open the `Dockerfile` and add the following content:

```Dockerfile
# Use the official Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /front_end

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the production version of the Vite + React.js project
RUN npm run build

# Expose port 4173 to allow external access
EXPOSE 4173

# Start the Vite server to serve the built project
CMD ["npm", "run", "serve"]
```

#### Explanation:

- `FROM node:latest`: This line sets the base image for our Docker image. We're using the official Node.js image as our base.

- `WORKDIR /app`: Sets the working directory inside the container to `/app`.

- `COPY package*.json ./`: Copies the `package.json` and `package-lock.json` files from the host machine to the container's working directory.

- `RUN npm install`: Installs the project dependencies inside the container.

- `COPY . .`: Copies the entire project from the host machine to the container's working directory.

- `RUN npm run build`: Builds the production version of the Vite + React.js project inside the container.

- `EXPOSE 4173`: Exposes port 4173 on the container, allowing external access.

- `CMD ["npm", "run", "serve"]`: Specifies the command to run when the container starts. In this case, it starts the Vite server to serve the built project.

### Step 3: Build the Docker Image

With the Dockerfile in place, we can now build the Docker image for our Vite + React.js project.

Open the terminal and navigate to the directory containing the Dockerfile and your Vite + React.js project files. Then, run the following command:

```bash
docker build -t my-vite-react-app .
```

#### Explanation:

- `docker build`: This is the command to build a Docker image.
- `-t my-vite-react-app`: The `-t` flag is used to tag the image with a name (in this case, `my-vite-react-app`).
- `.`: The period `.` indicates that the Dockerfile is in the current directory.

This command will build the Docker image `my-vite-react-app` using the Dockerfile located in the current directory.

### Step 4: Run the Docker Container

Now that we have the Docker image built, we can create

 and run a Docker container based on that image.

Run the following command:

```bash
docker run -d -p 80:4173 my-vite-react-app
```

#### Explanation:

- `docker run`: This command creates and runs a Docker container based on the specified image.
- `-d`: The `-d` flag runs the container in detached mode, which means it runs in the background.
- `-p 80:4173`: The `-p` flag maps port 4173 from the container to port 80 on your local machine, allowing you to access the application at `http://localhost`.
- `my-vite-react-app`: The name of the Docker image to use when creating the container.

### Step 5: Access Your Vite + React.js Application

Congratulations! Your Vite + React.js application is now running in a Docker container and is accessible at `http://localhost` on port 80 of your local machine. You should see your application running successfully in the web browser.

### Step 6: Exiting the Docker Container

If you want to stop the Docker container, you can use the `docker stop` command. First, find the container ID or name:

```bash
docker ps
```

Locate the container ID or name in the output. Then, stop the container:

```bash
docker stop <container_id_or_name>
```

### Step 7: Starting a Container with --rm

By default, Docker retains stopped containers. If you want to automatically remove the container when it stops, you can use the `--rm` flag when running the container:

```bash
docker run -d -p 80:4173 --rm my-vite-react-app
```

#### Explanation:

- `--rm`: The `--rm` flag automatically removes the container when it stops running. This can help keep your system clean and organized.

## Conclusion

In this lesson, you've learned how to deploy a simple Vite + React.js project in a Docker container and bind it to port 80 on your local machine. You've seen the essential Docker commands and what each command does. Additionally, you've configured the Vite + React.js project to run inside the Docker container.

Docker provides a convenient way to package and deploy applications, ensuring consistency and portability across different environments. Now you can use Docker to deploy and manage more complex applications with ease. Happy coding!
