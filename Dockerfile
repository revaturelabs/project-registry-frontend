FROM node:16-alpine3.11
WORKDIR /app
COPY ./ .
WORKDIR /app/p3-frontend
RUN npm init -f
RUN npm install -f
RUN npm install npm@latest -g
RUN npm install -g @angular/cli@7.1.4
#RUN npm install @angular-devkit/build-angular@0.13.0
#RUN ng serve --open
#RUN npm init
#RUN npm install
#RUN npm install npm@latest -g
#RUN npm install -g @angular/cli@7.1.4
#RUN npm install
#RUN cd p3-frontend
#RUN ng serve --open

