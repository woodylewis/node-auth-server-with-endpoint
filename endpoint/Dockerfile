FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app

# Create bin directory
# RUN mkdir -p /usr/src/app/bin
# COPY bin/* /usr/src/app/bin/

# Create dist directory
RUN mkdir -p /usr/src/app/dist/
COPY dist/* /usr/src/app/dist/

# Install app dependencies
COPY package.json /usr/src/app/
# COPY app.js /usr/src/app/

WORKDIR /usr/src/app

RUN npm install --production

EXPOSE 8080
CMD [ "npm", "run", "start-server" ]