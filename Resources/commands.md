# Docker Cheatsheet

Docker is a powerful tool for building, shipping, and running applications in containers. This cheatsheet covers commonly used Docker commands, along with explanations of each flag and how the commands work.

## Docker Management Commands

### 1. `docker version`

- Display Docker version information for both the client and server.

### 2. `docker info`

- Display system-wide information about Docker, including the number of containers, images, and other configurations.

### 3. `docker --help`

- Display help information about Docker and its commands.

## Working with Docker Images

### 1. `docker image ls`

- List all Docker images available on the local machine.

### 2. `docker image build`

- Build a Docker image from a Dockerfile.
- Flags:
  - `-t, --tag`: Set a tag for the image (name:tag).
  - `--no-cache`: Build the image without using cached layers.

### 3. `docker image pull`

- Pull an image from a container registry (e.g., Docker Hub).
- Arguments:
  - `image_name`: The name of the image to pull.
  - Flags:
    - `--all-tags`: Pull all image tags from the specified repository.

### 4. `docker image push`

- Push an image to a container registry.
- Arguments:
  - `image_name`: The name of the image to push.
  - Flags:
    - `--all-tags`: Push all image tags to the specified repository.

### 5. `docker image rm`

- Remove one or more images from the local machine.
- Arguments:
  - `image_name`: The name of the image to remove.
  - Flags:
    - `-f, --force`: Force removal of the image.
    - `--no-prune`: Do not delete untagged parents.

## Managing Docker Containers

### 1. `docker container ls`

- List all running containers.
- Flags:
  - `-a, --all`: List all containers, including stopped ones.
  - `-q, --quiet`: Only display container IDs.

### 2. `docker container run`

- Run a command in a new container.
- Arguments:
  - `image_name`: The name of the image used to create the container.
  - Flags:
    - `-d, --detach`: Run the container in the background.
    - `-p, --publish`: Publish a container's port(s) to the host (hostPort:containerPort).
    - `--name`: Assign a name to the container.
    - `--rm`: Automatically remove the container when it exits.

### 3. `docker container exec`

- Execute a command in a running container.
- Arguments:
  - `container_id`: The ID or name of the container.
  - `command`: The command to execute.
  - Flags:
    - `-i, --interactive`: Keep STDIN open, even if not attached.
    - `-t, --tty`: Allocate a pseudo-TTY.

### 4. `docker container stop`

- Stop one or more running containers.
- Arguments:
  - `container_id`: The ID or name of the container.

### 5. `docker container rm`

- Remove one or more containers.
- Arguments:
  - `container_id`: The ID or name of the container.
  - Flags:
    - `-f, --force`: Force removal of the container.

## Docker Networking

### 1. `docker network ls`

- List all Docker networks on the local machine.

### 2. `docker network create`

- Create a new Docker network.
- Arguments:
  - `network_name`: The name of the new network.

### 3. `docker network connect`

- Connect a container to a network.
- Arguments:
  - `network_name`: The name of the network to connect to.
  - `container_id`: The ID or name of the container.

### 4. `docker network disconnect`

- Disconnect a container from a network.
- Arguments:
  - `network_name`: The name of the network to disconnect from.
  - `container_id`: The ID or name of the container.

## Docker Volume Management

### 1. `docker volume ls`

- List all Docker volumes on the local machine.

### 2. `docker volume create`

- Create a new Docker volume.
- Arguments:
  - `volume_name`: The name of the new volume.

### 3. `docker volume inspect`

- Display detailed information about a Docker volume.
- Arguments:
  - `volume_name`: The name of the volume.

### 4. `docker volume rm`

- Remove one or more Docker volumes.
- Arguments:
  - `volume_name`: The name of the volume.

## Conclusion

This Docker cheatsheet provides a handy reference for commonly used Docker commands and flags. With this knowledge, you can confidently work with Docker to build, run, and manage containers effectively. As you dive deeper into Docker, you'll discover additional commands and options that will further enhance your containerization workflow. Happy Dockerizing!
