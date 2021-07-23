#Another attempt at dockerizing frontend


# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:12 as builder

# Set the working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Add the source code to app
COPY ./p3-frontend .

# Install all the dependencies
RUN npm ci
# RUN npm install @angular/cli@7.3.9

# Generate the build of the application
RUN npm run build --prod


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.21.1

# # Copy the build output to replace the default nginx contents.
COPY --from=builder /app/dist/p3-frontend /usr/share/nginx/html

# # Expose port 80
EXPOSE 80

