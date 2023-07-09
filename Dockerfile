FROM node:15-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the React app
RUN npm run build

# Choose NGINX as our base Docker image
FROM nginx:alpine

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]