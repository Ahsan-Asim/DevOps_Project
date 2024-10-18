# Stage 1: Build
FROM node:alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Stage 2: Production
FROM node:alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app ./

# Install only production dependencies
RUN npm install --only=production

# Install nodemon globally for development (optional)
RUN npm install -g nodemon

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose port
EXPOSE 3001

# Start the application using nodemon for hot reloading in development mode
CMD ["nodemon", "index.js"]  # Ensure index.js is the entry point

