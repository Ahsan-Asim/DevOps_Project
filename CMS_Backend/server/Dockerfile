# Stage 1: Build
FROM node:alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the application (if you have a build step)
# RUN npm run build

# Stage 2: Production
FROM node:alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app ./

# Install only production dependencies
RUN npm install --only=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]  # Adjust to your server entry point

