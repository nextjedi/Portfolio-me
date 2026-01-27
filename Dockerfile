# Stage 1: Build the Angular application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit

# Copy application source code
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from build stage
# Angular 20 outputs to dist/portfolio-redesign/browser
COPY --from=build /app/dist/portfolio-redesign/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
