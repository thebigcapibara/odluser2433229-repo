# Use the official Alpine image as a base
FROM node:24-alpine

# Update Alpine packages to latest versions to patch OS-level vulnerabilities
RUN apk upgrade --no-cache

# Update npm to latest to patch vulnerabilities in npm's bundled dependencies
RUN npm install -g npm@latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "app.js"]
