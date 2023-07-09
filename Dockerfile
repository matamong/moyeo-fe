FROM node:15-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the project files
COPY ./ /app/

# Build the React app
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build/ /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/nginx.conf
