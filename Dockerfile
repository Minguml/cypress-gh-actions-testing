# Use the official Cypress base image with Chrome and Node.js
FROM cypress/included:13.7.3

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of your project files
COPY . .

# Expose port 8080 (Cypress GUI uses this by default)
EXPOSE 8080

# Default command to open Cypress GUI
CMD ["npx", "cypress", "open"] 