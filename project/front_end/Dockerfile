# Use the official Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the production version of the Vite + React.js project
RUN npm run build

# Expose port 80 to allow external access
EXPOSE 4173

# Start the Vite server to serve the built project
CMD ["npm", "run", "preview"]