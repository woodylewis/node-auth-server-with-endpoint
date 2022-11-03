FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/server

COPY . /usr/src/server/

WORKDIR /usr/src/server

RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]