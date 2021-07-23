#Another attempt at dockerizing frontend


# Stage 1: Compile and Build angular codebase

# Use official node image as the base image; Andrew's guide says to use node-14.17.3
FROM node:14.17.3 as builder

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./p3-frontend .

# Install all the dependencies
RUN npm ci

# Generate the build of the application
RUN npx ng build --prod

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.21.1

# default location for the app
WORKDIR /usr/share/nginx/html

# remove default nginx page
RUN rm -rf *

# config server for deep linking
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist/* .

# Expose port 80
EXPOSE 80

