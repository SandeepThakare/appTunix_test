FROM node:carbon

ARG MACHINE_NAME=twitter_handler
ENV MACHINE_NAME=twitter_handler

WORKDIR /usr/src/twitter_handler
RUN mkdir -p /usr/src/twitter_handler/logs

# install app dependencies
COPY package*.json ./

# install nano cmd editor as it's not bundled with node:carbon
RUN apt-get update
RUN apt-get install nano

# test bcrypt segmentation fault error
RUN npm install
RUN npm install pm2 -g
RUN npm rebuild bcrypt --build-from-source
# RUN npm rebuild bcrypt --build-from-source

# bundle app ADD source
COPY . .

EXPOSE 3000

# todo define run script for both server and backend in forever mode
CMD pm2-docker server/loader.js --machine-name $MACHINE_NAME